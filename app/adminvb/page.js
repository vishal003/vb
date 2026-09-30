'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { DataManager, profilePhotoSrc, isUnoptimizedImage } from '@/lib/data';

const genId = (prefix) => `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

// Walk a dotted path like "publications.categories.0.items"
const getAt = (obj, path) => path.split('.').reduce((o, k) => o?.[k], obj);

// Text with a pencil button that switches to an inline input
function EditableName({ value, onSave, placeholder = 'Name', style }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  const start = () => { setDraft(value); setEditing(true); };
  const save = () => { if (draft.trim()) onSave(draft.trim()); setEditing(false); };

  if (!editing) {
    return (
      <span className="editable-name" style={style}>
        <span>{value || <em style={{ opacity: 0.5 }}>{placeholder}</em>}</span>
        <button className="pencil-btn" onClick={start} title="Edit name">✏️</button>
      </span>
    );
  }
  return (
    <span className="editable-name editing" style={style}>
      <input
        autoFocus
        value={draft}
        placeholder={placeholder}
        onChange={e => setDraft(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') save(); if (e.key === 'Escape') setEditing(false); }}
      />
      <button className="pencil-btn" onClick={save} title="Save">✔️</button>
      <button className="pencil-btn" onClick={() => setEditing(false)} title="Cancel">✖️</button>
    </span>
  );
}

// Field sets shared by the category-based sections
const PUBLICATION_FIELDS = [
  { key: 'title', label: 'Title' },
  { key: 'authors', label: 'Authors' },
  { key: 'venue', label: 'Journal / Conference / Publisher' },
  { key: 'year', label: 'Year' },
  { key: 'indexed', label: 'Indexed In' },
  { key: 'link', label: 'Link' },
];
const CERT_FIELDS = [
  { key: 'title', label: 'Certificate Title' },
  { key: 'details', label: 'Details' },
  { key: 'certId', label: 'Certificate ID' },
  { key: 'file', label: 'Certificate File (e.g. /Certifications/my-cert.pdf)', type: 'file' },
];
const ASSOCIATION_FIELDS = [
  { key: 'title', label: 'Name (Journal / Conference / Organization)' },
  { key: 'subtitle', label: 'Membership ID / Role (optional)' },
  { key: 'file', label: 'Certificate File (e.g. /Associations/my-cert.pdf)', type: 'file' },
];
const TALK_FIELDS = [
  { key: 'title', label: 'Title' },
  { key: 'venue', label: 'Venue' },
  { key: 'type', label: 'Type' },
  { key: 'year', label: 'Year' },
];
const ACTIVITY_FIELDS = [{ key: 'title', label: 'Activity', type: 'textarea' }];

const PROFILE_ICONS = ['linkedin', 'whatsapp', 'youtube', 'google-scholar', 'scopus', 'orcid', 'wos', 'vidwan', 'globe'];

export default function AdminPanel() {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState('personal');
  const [toast, setToast] = useState('');
  const [confirmModal, setConfirmModal] = useState(null); // { title, message, onConfirm }
  const [openCategories, setOpenCategories] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') === 'true') {
      setIsAuthenticated(true);
    }
    setData(DataManager.getData());
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const saveAll = async (newData) => {
    const result = await DataManager.saveData(newData);
    if (result.success) {
      setData({ ...newData });
      // Removed toast to make typing feel instantaneous
    } else {
      showToast(`❌ Failed to save locally: ${result.error}`);
    }
  };

  // Apply a change to a deep copy of the data and save it
  const mutate = (fn) => {
    const newData = JSON.parse(JSON.stringify(data));
    fn(newData);
    return saveAll(newData);
  };

  const commitToGithub = async () => {
    showToast('⏳ Committing to GitHub & Triggering Rebuild...');
    const result = await DataManager.commitToGithub();
    if (result.success) {
      showToast('✅ Saved successfully & Rebuild triggered!');
    } else {
      showToast(`❌ Failed to commit: ${result.error}`);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    try {
      const res = await fetch('/api/verify-password', {
        method: 'POST', body: JSON.stringify({ password: passwordInput })
      });
      const { success } = await res.json();
      if (success) {
        setIsAuthenticated(true);
        sessionStorage.setItem('admin_auth', 'true');
      } else {
        alert('Incorrect Password!');
      }
    } catch(err) {
      alert('Error verifying password.');
    }
    setLoginLoading(false);
  };

  const handlePersonalChange = (field, value) => mutate(d => { d.personal[field] = value; });
  const handleStatsChange = (field, value) => mutate(d => { d.stats[field] = parseInt(value) || 0; });

  const askConfirm = (title, message, onConfirm) => setConfirmModal({ title, message, onConfirm });

  const runConfirm = async () => {
    if (!confirmModal) return;
    await confirmModal.onConfirm();
    setConfirmModal(null);
  };

  // ── Array items (objects with an id). New items go to the top so the latest shows first. ──
  const addItem = (sectionKey, template) => {
    mutate(d => { getAt(d, sectionKey).unshift({ ...template, id: genId(sectionKey.replace(/\./g, '_')) }); });
    showToast('✅ Item added at the top. Click Commit to apply to live site.');
  };

  const updateItemField = (sectionKey, itemId, field, value) => {
    mutate(d => {
      const item = getAt(d, sectionKey).find(x => x.id === itemId);
      if (item) item[field] = value;
    });
  };

  const requestDelete = (sectionKey, itemId) => askConfirm(
    'Delete Item?',
    'Are you sure you want to delete this item? This action cannot be undone.',
    async () => {
      await mutate(d => {
        const arr = getAt(d, sectionKey);
        const idx = arr.findIndex(x => x.id === itemId);
        if (idx !== -1) arr.splice(idx, 1);
      });
      showToast('🗑️ Item deleted locally. Click Commit to apply to live site.');
    }
  );

  // ── Plain string lists (e.g. typewriter texts) ──
  const addString = (path) => mutate(d => { getAt(d, path).unshift(''); });
  const updateString = (path, idx, value) => mutate(d => { getAt(d, path)[idx] = value; });
  const requestDeleteString = (path, idx) => askConfirm('Delete Entry?', 'Remove this entry?', () => mutate(d => { getAt(d, path).splice(idx, 1); }));

  // ── Sub-categories ({ categories: [{ id, name, items }] }) ──
  const addCategory = (sectionKey) => {
    const id = genId('cat');
    mutate(d => { d[sectionKey].categories.unshift({ id, name: 'New Sub-category', items: [] }); });
    setOpenCategories(o => ({ ...o, [`${sectionKey}:${id}`]: true }));
    showToast('✅ Sub-category added at the top. Rename it with the ✏️ icon.');
  };

  const renameCategory = (sectionKey, ci, name) => mutate(d => { d[sectionKey].categories[ci].name = name; });

  const moveCategory = (sectionKey, ci, dir) => mutate(d => {
    const cats = d[sectionKey].categories;
    const to = ci + dir;
    if (to < 0 || to >= cats.length) return;
    [cats[ci], cats[to]] = [cats[to], cats[ci]];
  });

  const requestDeleteCategory = (sectionKey, ci) => {
    const cat = data[sectionKey].categories[ci];
    askConfirm(
      `Delete "${cat.name}"?`,
      `This removes the sub-category and all ${cat.items.length} item(s) inside it. This cannot be undone.`,
      async () => {
        await mutate(d => { d[sectionKey].categories.splice(ci, 1); });
        showToast('🗑️ Sub-category deleted locally. Click Commit to apply to live site.');
      }
    );
  };

  const exportData = () => {
    const blob = new Blob([DataManager.exportData()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'portfolio_data.json'; a.click();
    URL.revokeObjectURL(url);
    showToast('📦 Data exported!');
  };

  const importData = () => {
    const input = document.createElement('input');
    input.type = 'file'; input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = async (ev) => {
        const result = await DataManager.importData(ev.target.result);
        if (result && result.success) {
          setData(DataManager.getData());
          showToast('📥 Data imported!');
        } else {
          showToast('❌ Invalid JSON file!');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const resetData = async () => {
    if (!confirm('Reset all data to defaults? This cannot be undone!')) return;
    const result = await DataManager.resetToDefaults();
    if (result.success) {
      setData(DataManager.getData());
      showToast('🔄 Reset to defaults. Click Commit to apply to live site.');
    } else {
      showToast(`❌ Failed to reset: ${result.error}`);
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#0a0f1e', color: '#e8eaf0' }}>
        <form onSubmit={handleLogin} style={{ background: '#111827', padding: '40px', borderRadius: '12px', border: '1px solid #1f2940', width: '350px', textAlign: 'center' }}>
          <h2 style={{ color: '#e8b84d', marginBottom: '20px' }}>Admin Login</h2>
          <input
            type="password"
            placeholder="Enter Password"
            value={passwordInput}
            onChange={e => setPasswordInput(e.target.value)}
            style={{ width: '100%', padding: '12px', border: '1px solid #2a3555', borderRadius: '8px', background: '#0a0f1e', color: '#fff', marginBottom: '20px' }}
            required
          />
          <button type="submit" disabled={loginLoading} style={{ width: '100%', padding: '12px', background: '#e8b84d', color: '#0a0f1e', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: loginLoading ? 'not-allowed' : 'pointer' }}>
            {loginLoading ? 'Verifying...' : 'Login'}
          </button>
        </form>
      </div>
    );
  }

  if (!data) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#0a0f1e', color: '#e8eaf0' }}>Loading...</div>;

  const TABS = [
    { key: 'personal', label: '🏠 About Me / Home' },
    { key: 'sections', label: '🧭 Section Names' },
    { key: 'stats', label: '📊 Stats' },
    { key: 'education', label: '🎓 Qualification' },
    { key: 'experience', label: '💼 Experience' },
    { key: 'skills', label: '🛠️ Key Skills' },
    { key: 'certifications', label: '🎖️ Certifications & Badges' },
    { key: 'achievements', label: '🏅 Achievements' },
    { key: 'publications', label: '📄 Research & Publications' },
    { key: 'patents', label: '📋 Patents' },
    { key: 'copyrights', label: '©️ Copyrights' },
    { key: 'awards', label: '🏆 Awards' },
    { key: 'associations', label: '🤝 Associations' },
    { key: 'activities', label: '🧩 Professional Activities' },
    { key: 'talks', label: '🎤 Invited Talks' },
    { key: 'gallery', label: '🖼️ Gallery' },
    { key: 'contact', label: '📞 Contact Me' },
    { key: 'news', label: '📰 Recent News' },
    { key: 'tools', label: '⚙️ Tools' },
  ];

  const renderField = (sectionKey, item, f) => {
    const onChange = e => updateItemField(sectionKey, item.id, f.key, e.target.value);
    const value = item[f.key] ?? '';
    if (f.type === 'textarea') return <textarea value={value} onChange={onChange} rows={3} />;
    if (f.type === 'number') return <input type="number" value={value} onChange={onChange} />;
    if (f.type === 'select') {
      return (
        <select value={value} onChange={onChange}>
          {f.options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      );
    }
    if (f.type === 'file') {
      return (
        <div style={{ display: 'flex', gap: '8px' }}>
          <input type="text" value={value} onChange={onChange} placeholder="Leave empty if not available" />
          {value && <a href={encodeURI(value)} target="_blank" rel="noopener noreferrer" className="admin-view-link">👁 View</a>}
        </div>
      );
    }
    return <input type="text" value={value} onChange={onChange} />;
  };

  const renderArrayEditor = (sectionKey, items, fields, template, addLabel = '+ Add New') => (
    <div>
      <button className="admin-add-btn" onClick={() => addItem(sectionKey, template)}>{addLabel}</button>
      {items && items.map((item, idx) => (
        <div key={item.id || idx} className="admin-item-card">
          <div className="admin-item-header">
            <span className="admin-item-number">#{idx + 1}</span>
            <button className="admin-delete-btn" onClick={() => requestDelete(sectionKey, item.id)}>🗑️ Delete</button>
          </div>
          <div className={fields.length > 2 ? 'admin-grid' : ''}>
            {fields.map(f => (
              <div key={f.key} className="admin-field" style={f.type === 'textarea' || f.type === 'file' ? { gridColumn: '1 / -1' } : undefined}>
                <label>{f.label}</label>
                {renderField(sectionKey, item, f)}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderStringList = (path, label, placeholder) => {
    const list = getAt(data, path) || [];
    return (
      <div className="admin-field">
        <label>{label}</label>
        <button className="admin-add-btn" onClick={() => addString(path)}>+ Add New</button>
        {list.map((text, idx) => (
          <div key={idx} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
            <input value={text} placeholder={placeholder} onChange={e => updateString(path, idx, e.target.value)} />
            <button className="admin-delete-btn" onClick={() => requestDeleteString(path, idx)}>🗑️</button>
          </div>
        ))}
      </div>
    );
  };

  // Collapsible sub-category blocks, each with rename / reorder / delete and its own item list
  const renderCategoryEditor = (sectionKey, fields, template, itemName = 'Item') => {
    const categories = data[sectionKey]?.categories || [];
    return (
      <div>
        <button className="admin-add-btn" onClick={() => addCategory(sectionKey)}>+ Add Sub-category</button>
        {categories.map((cat, ci) => {
          const openKey = `${sectionKey}:${cat.id}`;
          const isOpen = !!openCategories[openKey];
          return (
            <div key={cat.id} className="admin-category">
              <div className="admin-category-header">
                <button className="admin-collapse-btn" onClick={() => setOpenCategories(o => ({ ...o, [openKey]: !isOpen }))}>
                  {isOpen ? '▾' : '▸'}
                </button>
                <EditableName value={cat.name} onSave={name => renameCategory(sectionKey, ci, name)} style={{ fontSize: '17px', fontWeight: 700, color: '#e8b84d' }} />
                <span className="admin-category-count">{cat.items.length} {itemName.toLowerCase()}(s)</span>
                <span style={{ flex: 1 }} />
                <button className="admin-icon-btn" disabled={ci === 0} onClick={() => moveCategory(sectionKey, ci, -1)} title="Move up">↑</button>
                <button className="admin-icon-btn" disabled={ci === categories.length - 1} onClick={() => moveCategory(sectionKey, ci, 1)} title="Move down">↓</button>
                <button className="admin-delete-btn" onClick={() => requestDeleteCategory(sectionKey, ci)}>🗑️</button>
              </div>
              {isOpen && (
                <div style={{ marginTop: '16px' }}>
                  {renderArrayEditor(`${sectionKey}.categories.${ci}.items`, cat.items, fields, template, `+ Add ${itemName}`)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const emptyOf = (fields) => Object.fromEntries(fields.map(f => [f.key, '']));

  return (
    <div className="admin-layout">
      <style jsx global>{`
        body { margin: 0; font-family: 'Inter', -apple-system, sans-serif; background: #0a0f1e; color: #e8eaf0; }
        .admin-layout { display: grid; grid-template-columns: 260px 1fr; min-height: 100vh; }
        .admin-sidebar { background: #0d1425; border-right: 1px solid #1f2940; padding: 24px 0; position: sticky; top: 0; height: 100vh; overflow-y: auto; }
        .admin-sidebar h2 { padding: 0 24px; margin-bottom: 8px; font-size: 20px; color: #e8b84d; }
        .admin-sidebar p { padding: 0 24px; margin-bottom: 24px; font-size: 12px; color: #6b7394; }
        .admin-tab { display: block; width: 100%; padding: 12px 24px; border: none; background: none; color: #a0a8c0; font-size: 14px; text-align: left; cursor: pointer; transition: all 0.2s; font-family: inherit; }
        .admin-tab:hover { background: rgba(255,255,255,0.04); color: #e8eaf0; }
        .admin-tab.active { background: rgba(232,184,77,0.1); color: #e8b84d; border-left: 3px solid #e8b84d; }
        .admin-main { padding: 40px; overflow-y: auto; }
        .admin-main h3 { font-size: 28px; margin-bottom: 8px; color: #e8eaf0; }
        .admin-main > p { color: #6b7394; margin-bottom: 32px; }
        .admin-field { margin-bottom: 20px; }
        .admin-field label { display: block; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: #6b7394; margin-bottom: 6px; }
        .admin-field input, .admin-field textarea, .admin-field select, .editable-name input { width: 100%; padding: 10px 14px; border: 1px solid #2a3555; border-radius: 8px; background: #111827; color: #e8eaf0; font-size: 14px; font-family: inherit; transition: border-color 0.2s; box-sizing: border-box; }
        .admin-field input:focus, .admin-field textarea:focus, .editable-name input:focus { outline: none; border-color: #e8b84d; }
        .admin-field textarea { resize: vertical; }
        .admin-item-card { background: #111827; border: 1px solid #1f2940; border-radius: 12px; padding: 24px; margin-bottom: 16px; }
        .admin-item-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
        .admin-item-number { font-size: 14px; font-weight: 700; color: #e8b84d; }
        .admin-delete-btn { background: rgba(217,64,64,0.1); border: 1px solid rgba(217,64,64,0.2); color: #ff6b6b; padding: 6px 14px; border-radius: 6px; cursor: pointer; font-size: 13px; transition: all 0.2s; font-family: inherit; white-space: nowrap; }
        .admin-delete-btn:hover { background: rgba(217,64,64,0.2); }
        .admin-add-btn { background: rgba(232,184,77,0.1); border: 1px solid rgba(232,184,77,0.2); color: #e8b84d; padding: 10px 24px; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 600; margin-bottom: 24px; transition: all 0.2s; font-family: inherit; }
        .admin-add-btn:hover { background: rgba(232,184,77,0.2); }
        .admin-actions { display: flex; gap: 12px; margin-bottom: 32px; flex-wrap: wrap; }
        .admin-action-btn { padding: 10px 20px; border-radius: 8px; border: 1px solid #2a3555; background: #151f33; color: #a0a8c0; cursor: pointer; font-size: 13px; transition: all 0.2s; font-family: inherit; }
        .admin-action-btn:hover { border-color: #e8b84d; color: #e8b84d; }
        .admin-action-btn.danger { border-color: rgba(217,64,64,0.3); color: #ff6b6b; }
        .admin-action-btn.danger:hover { background: rgba(217,64,64,0.1); }
        .admin-category { background: #0d1425; border: 1px solid #1f2940; border-radius: 12px; padding: 16px 20px; margin-bottom: 14px; }
        .admin-category-header { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .admin-category-count { font-size: 12px; color: #6b7394; }
        .admin-collapse-btn, .admin-icon-btn { background: #151f33; border: 1px solid #2a3555; color: #a0a8c0; width: 32px; height: 32px; border-radius: 6px; cursor: pointer; font-size: 14px; font-family: inherit; }
        .admin-collapse-btn:hover, .admin-icon-btn:hover:not(:disabled) { border-color: #e8b84d; color: #e8b84d; }
        .admin-icon-btn:disabled { opacity: 0.3; cursor: default; }
        .editable-name { display: inline-flex; align-items: center; gap: 6px; }
        .editable-name.editing { min-width: 260px; }
        .pencil-btn { background: none; border: none; cursor: pointer; font-size: 14px; padding: 4px; opacity: 0.75; }
        .pencil-btn:hover { opacity: 1; }
        .admin-view-link { white-space: nowrap; align-self: center; color: #e8b84d; font-size: 13px; text-decoration: none; }
        .admin-section-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; align-items: center; background: #111827; border: 1px solid #1f2940; border-radius: 10px; padding: 14px 20px; margin-bottom: 10px; }
        .admin-section-row small { display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: #6b7394; margin-bottom: 4px; }
        .toast { position: fixed; bottom: 30px; right: 30px; background: #1a2540; border: 1px solid #2a3555; color: #e8eaf0; padding: 14px 24px; border-radius: 10px; font-size: 14px; z-index: 9999; box-shadow: 0 8px 24px rgba(0,0,0,0.4); animation: slideUp 0.3s ease; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .admin-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 20px; }
        @media (max-width: 768px) {
          .admin-layout { grid-template-columns: 1fr; }
          .admin-sidebar { position: static; height: auto; display: flex; overflow-x: auto; padding: 12px; }
          .admin-tab { white-space: nowrap; padding: 8px 16px; }
          .admin-grid, .admin-section-row { grid-template-columns: 1fr; }
          .admin-main { padding: 20px; }
        }
        .confirm-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px); z-index: 10000; display: flex; align-items: center; justify-content: center; animation: fadeIn 0.2s ease; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .confirm-modal { background: #151f33; border: 1px solid #2a3555; border-radius: 16px; padding: 32px; max-width: 400px; width: 90%; text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,0.5); animation: scaleIn 0.2s ease; }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        .confirm-icon { font-size: 40px; margin-bottom: 12px; }
        .confirm-modal h4 { font-size: 20px; color: #e8eaf0; margin-bottom: 8px; }
        .confirm-modal p { font-size: 14px; color: #6b7394; margin-bottom: 24px; line-height: 1.5; }
        .confirm-actions { display: flex; gap: 12px; justify-content: center; }
        .confirm-cancel { padding: 10px 24px; border-radius: 8px; border: 1px solid #2a3555; background: #111827; color: #a0a8c0; cursor: pointer; font-size: 14px; font-family: inherit; transition: all 0.2s; }
        .confirm-cancel:hover { border-color: #e8b84d; color: #e8b84d; }
        .confirm-delete { padding: 10px 24px; border-radius: 8px; border: none; background: #dc2626; color: #fff; cursor: pointer; font-size: 14px; font-weight: 600; font-family: inherit; transition: all 0.2s; }
        .confirm-delete:hover { background: #ef4444; }
      `}</style>

      <div className="admin-sidebar">
        <div style={{ padding: '0 24px', marginBottom: '16px' }}>
          <h2 style={{ padding: '0', marginBottom: '8px' }}>Admin Panel</h2>
          <p style={{ padding: '0', marginBottom: '16px' }}>Dr. Vishal S. Badgujar</p>
          <button onClick={commitToGithub} style={{ width: '100%', background: '#e8b84d', color: '#0a0f1e', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 14px rgba(232,184,77,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <span>🚀</span> Commit to GitHub
          </button>
          <p style={{ fontSize: '11px', color: '#6b7394', marginTop: '8px', textAlign: 'center', padding: '0' }}>Click to publish local changes</p>
        </div>
        {TABS.map(tab => (
          <button key={tab.key} className={`admin-tab ${activeTab === tab.key ? 'active' : ''}`} onClick={() => setActiveTab(tab.key)}>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="admin-main">
        {/* ABOUT ME / HOME */}
        {activeTab === 'personal' && (
          <>
            <h3>🏠 About Me / Home</h3>
            <p>Edit your personal details shown on the Home and About Me sections.</p>
            <div className="admin-field">
              <label>PROFILE PHOTO (image link, Google Drive link, or a path like /images/gallery/vishal.png)</label>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                {data.personal.photo && (
                  <Image src={profilePhotoSrc(data.personal.photo)} unoptimized={isUnoptimizedImage(data.personal.photo)} width={72} height={72} alt="Profile preview" style={{ objectFit: 'cover', objectPosition: 'center top', borderRadius: '10px', border: '1px solid #2a3555', flexShrink: 0 }} />
                )}
                <input value={data.personal.photo || ''} onChange={e => handlePersonalChange('photo', e.target.value)} placeholder="https://… or /images/…" />
              </div>
              <small style={{ color: '#6b7394', fontSize: '12px' }}>Google Drive: set the file to “Anyone with the link can view”, then paste the share link.</small>
            </div>
            <div className="admin-grid">
              {['name','title','department','institution','university','email','phone','address'].map(f => (
                <div key={f} className="admin-field">
                  <label>{f.replace(/([A-Z])/g, ' $1').toUpperCase()}</label>
                  <input value={data.personal[f] || ''} onChange={e => handlePersonalChange(f, e.target.value)} />
                </div>
              ))}
            </div>
            <div className="admin-field">
              <label>BIO</label>
              <textarea value={data.personal.bio || ''} onChange={e => handlePersonalChange('bio', e.target.value)} rows={5} />
            </div>
            <div className="admin-field">
              <label>OBJECTIVE</label>
              <textarea value={data.personal.objective || ''} onChange={e => handlePersonalChange('objective', e.target.value)} rows={3} />
            </div>
            {renderStringList('personal.typingTexts', 'Typewriter Texts on Home ("I\'am …")', 'e.g. Cyber Security Researcher')}
          </>
        )}

        {/* SECTION NAMES */}
        {activeTab === 'sections' && (
          <>
            <h3>🧭 Section Names</h3>
            <p>Click ✏️ to rename a section. The sidebar name and the heading on the page can be different.</p>
            {Object.entries(data.sectionTitles || {}).map(([id, t]) => (
              <div key={id} className="admin-section-row">
                <div>
                  <small>Sidebar name</small>
                  <EditableName value={t.label} onSave={v => mutate(d => { d.sectionTitles[id].label = v; })} style={{ fontWeight: 600 }} />
                </div>
                <div>
                  <small>Page heading</small>
                  {id === 'home'
                    ? <span style={{ color: '#6b7394', fontSize: '13px' }}>No heading on Home</span>
                    : <EditableName value={t.heading} onSave={v => mutate(d => { d.sectionTitles[id].heading = v; })} />}
                </div>
              </div>
            ))}
          </>
        )}

        {/* STATS */}
        {activeTab === 'stats' && (
          <>
            <h3>📊 Statistics</h3>
            <p>Update your research metrics and counts. (The numbers on the Achievements section are edited in the 🏅 Achievements tab.)</p>
            <div className="admin-grid">
              {Object.keys(data.stats).map(f => (
                <div key={f} className="admin-field">
                  <label>{f.replace(/([A-Z])/g, ' $1').toUpperCase()}</label>
                  <input type="number" value={data.stats[f] || 0} onChange={e => handleStatsChange(f, e.target.value)} />
                </div>
              ))}
            </div>
          </>
        )}

        {/* QUALIFICATION */}
        {activeTab === 'education' && (
          <>
            <h3>🎓 Qualification</h3>
            <p>Manage your qualifications. New entries are added at the top.</p>
            {renderArrayEditor('education', data.education, [
              { key: 'degree', label: 'Degree' },
              { key: 'specialization', label: 'Specialization' },
              { key: 'institution', label: 'Institution' },
              { key: 'year', label: 'Year' },
              { key: 'description', label: 'Description', type: 'textarea' },
            ], { degree: '', specialization: '', institution: '', year: '', description: '' })}
          </>
        )}

        {/* EXPERIENCE */}
        {activeTab === 'experience' && (
          <>
            <h3>💼 Experience</h3>
            <p>Manage your work experience. New entries are added at the top.</p>
            {renderArrayEditor('experience', data.experience, [
              { key: 'role', label: 'Role' },
              { key: 'organization', label: 'Organization' },
              { key: 'duration', label: 'Duration' },
              { key: 'description', label: 'Description', type: 'textarea' },
            ], { role: '', organization: '', duration: '', type: 'Teaching', description: '', responsibilities: [] })}
          </>
        )}

        {/* KEY SKILLS */}
        {activeTab === 'skills' && (
          <>
            <h3>🛠️ Key Skills</h3>
            <p>Skills shown as progress bars in the Key Skills section.</p>
            {renderArrayEditor('skills', data.skills || [], [
              { key: 'name', label: 'Skill Name' },
              { key: 'percent', label: 'Level (0 – 100)', type: 'number' },
            ], { name: '', percent: 80 })}
          </>
        )}

        {/* CERTIFICATIONS & BADGES */}
        {activeTab === 'certifications' && (
          <>
            <h3>🎖️ Certifications & Badges</h3>
            <p>Put certificate files in <code>/public/Certifications/</code> and badge images in <code>/public/Badges/</code>, then enter the path below. A certificate without a file stays as a normal (non-clickable) widget.</p>

            <h4 style={{ color: '#e8b84d', margin: '16px 0' }}>Sub-categories & Certificates</h4>
            {renderCategoryEditor('certifications', CERT_FIELDS, emptyOf(CERT_FIELDS), 'Certificate')}

            <h4 style={{ color: '#e8b84d', margin: '40px 0 16px' }}>Badges Slider ({(data.badges || []).length})</h4>
            {renderArrayEditor('badges', data.badges || [], [
              { key: 'src', label: 'Badge Image (e.g. /Badges/my-badge.png)', type: 'file' },
              { key: 'title', label: 'Badge Name (optional)' },
            ], { src: '/Badges/', title: '' })}
          </>
        )}

        {/* ACHIEVEMENTS */}
        {activeTab === 'achievements' && (
          <>
            <h3>🏅 Achievements</h3>
            <p>The counters shown in the Achievements section, e.g. value “200+” with label “Citations”.</p>
            {renderArrayEditor('achievements', data.achievements || [], [
              { key: 'value', label: 'Value (e.g. 200+)' },
              { key: 'label', label: 'Label (e.g. Citations)' },
            ], { value: '', label: '' })}
          </>
        )}

        {/* RESEARCH & PUBLICATIONS */}
        {activeTab === 'publications' && (
          <>
            <h3>📄 Research & Publications</h3>
            <p>Each sub-category is a tab on the website (Journals, Conferences, SCI, Books…). Click ▸ to open one; new publications are added at the top.</p>
            {renderCategoryEditor('publications', PUBLICATION_FIELDS, emptyOf(PUBLICATION_FIELDS), 'Publication')}
          </>
        )}

        {/* PATENTS */}
        {activeTab === 'patents' && (
          <>
            <h3>📋 Patents</h3>
            {renderArrayEditor('patents', data.patents, [
              { key: 'title', label: 'Title' },
              { key: 'number', label: 'Application Number' },
              { key: 'status', label: 'Status' },
              { key: 'year', label: 'Year' },
              { key: 'inventors', label: 'Inventors' },
            ], { title: '', number: '', status: 'Published', year: '', inventors: '' })}
          </>
        )}

        {/* COPYRIGHTS */}
        {activeTab === 'copyrights' && (
          <>
            <h3>©️ Copyrights</h3>
            {renderArrayEditor('copyrights', data.copyrights, [
              { key: 'title', label: 'Title' },
              { key: 'regNo', label: 'Registration No.' },
              { key: 'date', label: 'Date' },
            ], { title: '', regNo: '', date: '' })}
          </>
        )}

        {/* AWARDS */}
        {activeTab === 'awards' && (
          <>
            <h3>🏆 Awards & Recognition</h3>
            <h4 style={{ color: '#e8b84d', margin: '16px 0 16px' }}>Awards ({data.awards.length})</h4>
            {renderArrayEditor('awards', data.awards, [
              { key: 'title', label: 'Award Title' },
              { key: 'organization', label: 'Organization' },
              { key: 'year', label: 'Year' },
              { key: 'description', label: 'Description', type: 'textarea' },
            ], { title: '', organization: '', year: '', description: '' })}

            <h4 style={{ color: '#e8b84d', margin: '32px 0 16px' }}>Recognition ({(data.recognitions || []).length})</h4>
            {renderArrayEditor('recognitions', data.recognitions || [], [
              { key: 'title', label: 'Title' },
              { key: 'organization', label: 'Organization' },
              { key: 'year', label: 'Year' },
              { key: 'description', label: 'Description', type: 'textarea' },
            ], { title: '', organization: '', year: '', description: '' })}

            <h4 style={{ color: '#e8b84d', margin: '32px 0 16px' }}>Funded Projects ({(data.fundedProjects || []).length})</h4>
            {renderArrayEditor('fundedProjects', data.fundedProjects || [], [
              { key: 'title', label: 'Title' },
              { key: 'funder', label: 'Funder / Agency' },
              { key: 'role', label: 'Role' },
              { key: 'value', label: 'Value/Amount' },
              { key: 'description', label: 'Description', type: 'textarea' },
            ], { title: '', funder: '', role: '', value: '', description: '' })}

            <h4 style={{ color: '#e8b84d', margin: '32px 0 16px' }}>Editorial Roles ({(data.professionalActivities.editorial || []).length})</h4>
            {renderArrayEditor('professionalActivities.editorial', data.professionalActivities.editorial || [], [
              { key: 'role', label: 'Role' },
              { key: 'journal', label: 'Journal' },
            ], { role: '', journal: '' })}

            <h4 style={{ color: '#e8b84d', margin: '32px 0 16px' }}>Reviewer ({(data.professionalActivities.reviewer || []).length})</h4>
            {renderArrayEditor('professionalActivities.reviewer', data.professionalActivities.reviewer || [], [
              { key: 'journal', label: 'Journal' },
            ], { journal: '' })}

            <h4 style={{ color: '#e8b84d', margin: '32px 0 16px' }}>UG Projects Guided ({(data.ugProjectsGuided || []).length})</h4>
            {renderArrayEditor('ugProjectsGuided', data.ugProjectsGuided || [], [
              { key: 'title', label: 'Project Title' },
            ], { title: '' })}
          </>
        )}

        {/* ASSOCIATIONS */}
        {activeTab === 'associations' && (
          <>
            <h3>🤝 Associations & Memberships</h3>
            <p>Put association certificates in <code>/public/Associations/</code> and enter the path to make the widget clickable.</p>
            {renderCategoryEditor('associations', ASSOCIATION_FIELDS, emptyOf(ASSOCIATION_FIELDS), 'Association')}
          </>
        )}

        {/* PROFESSIONAL ACTIVITIES */}
        {activeTab === 'activities' && (
          <>
            <h3>🧩 Professional Activities</h3>
            <p>Sub-categories like Institutional Contributions and University Level Responsibilities.</p>
            {renderCategoryEditor('activities', ACTIVITY_FIELDS, emptyOf(ACTIVITY_FIELDS), 'Activity')}
          </>
        )}

        {/* INVITED TALKS */}
        {activeTab === 'talks' && (
          <>
            <h3>🎤 Invited Talks & Lectures</h3>
            {renderCategoryEditor('invitedTalks', TALK_FIELDS, emptyOf(TALK_FIELDS), 'Talk')}
          </>
        )}

        {/* GALLERY */}
        {activeTab === 'gallery' && (
          <>
            <h3>🖼️ Gallery</h3>
            <p>Manage gallery images. Place image files in <code>/public/images/gallery/</code></p>
            {renderArrayEditor('gallery', data.gallery, [
              { key: 'src', label: 'Image Path (e.g. /images/gallery/img1.jpg)', type: 'file' },
              { key: 'caption', label: 'Caption' },
            ], { src: '/images/gallery/', caption: '' })}
          </>
        )}

        {/* CONTACT ME */}
        {activeTab === 'contact' && (
          <>
            <h3>📞 Contact Me</h3>
            <p>Details shown on the contact cards, and the “Connect With Me” links.</p>
            <div className="admin-grid">
              {[['email', 'Email'], ['phone', 'Phone'], ['institution', 'Institution'], ['address', 'Address']].map(([f, label]) => (
                <div key={f} className="admin-field">
                  <label>{label}</label>
                  <input value={data.personal[f] || ''} onChange={e => handlePersonalChange(f, e.target.value)} />
                </div>
              ))}
            </div>

            <h4 style={{ color: '#e8b84d', margin: '24px 0 16px' }}>Connect With Me ({(data.contactLinks || []).length})</h4>
            {renderArrayEditor('contactLinks', data.contactLinks || [], [
              { key: 'name', label: 'Name' },
              { key: 'url', label: 'URL' },
              { key: 'icon', label: 'Icon', type: 'select', options: PROFILE_ICONS },
              { key: 'color', label: 'Icon Color (e.g. #0A66C2)' },
            ], { name: '', url: '', icon: 'globe', color: '#D4A845' })}
          </>
        )}

        {/* RECENT NEWS */}
        {activeTab === 'news' && (
          <>
            <h3>📰 Recent News</h3>
            <p>Shown in the Recent News section at the end of the website. Latest news goes on top.</p>
            {renderArrayEditor('recentNews', data.recentNews || [], [
              { key: 'title', label: 'Title' },
              { key: 'description', label: 'Description', type: 'textarea' },
            ], { title: '', description: '' })}
          </>
        )}

        {/* TOOLS */}
        {activeTab === 'tools' && (
          <>
            <h3>⚙️ Data Tools</h3>
            <p>Export, import, or reset your portfolio data.</p>
            <div className="admin-actions">
              <button className="admin-action-btn" onClick={exportData}>📦 Export Data (JSON)</button>
              <button className="admin-action-btn" onClick={importData}>📥 Import Data (JSON)</button>
              <button className="admin-action-btn danger" onClick={resetData}>🔄 Reset to Defaults</button>
            </div>
            <div className="admin-item-card">
              <h4 style={{ color: '#e8b84d', marginBottom: '12px' }}>📋 Quick Stats</h4>
              {[
                ['Publications', 'publications'],
                ['Certifications', 'certifications'],
                ['Associations', 'associations'],
                ['Professional Activities', 'activities'],
                ['Invited Talks', 'invitedTalks'],
              ].map(([label, key]) => (
                <p key={key}>{label}: {(data[key]?.categories || []).reduce((n, c) => n + c.items.length, 0)}</p>
              ))}
              <p>Patents: {data.patents?.length || 0}</p>
              <p>Copyrights: {data.copyrights?.length || 0}</p>
              <p>Awards & Recognitions: {(data.awards?.length || 0) + (data.recognitions?.length || 0)}</p>
              <p>Badges: {data.badges?.length || 0}</p>
              <p>Gallery Images: {data.gallery?.length || 0}</p>
              <p>Recent News: {data.recentNews?.length || 0}</p>
            </div>
          </>
        )}
      </div>

      {toast && <div className="toast">{toast}</div>}

      {/* Custom Confirm Modal */}
      {confirmModal && (
        <div className="confirm-overlay" onClick={() => setConfirmModal(null)}>
          <div className="confirm-modal" onClick={e => e.stopPropagation()}>
            <div className="confirm-icon">🗑️</div>
            <h4>{confirmModal.title}</h4>
            <p>{confirmModal.message}</p>
            <div className="confirm-actions">
              <button className="confirm-cancel" onClick={() => setConfirmModal(null)}>Cancel</button>
              <button className="confirm-delete" onClick={runConfirm}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
