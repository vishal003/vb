'use client';
import { useState, useEffect } from 'react';
import { DataManager, DEFAULT_DATA } from '@/lib/data';

export default function AdminPanel() {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState('personal');
  const [toast, setToast] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [confirmModal, setConfirmModal] = useState(null); // { sectionKey, itemId }
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

  const handlePersonalChange = (field, value) => {
    const newData = { ...data };
    newData.personal = { ...newData.personal, [field]: value };
    saveAll(newData);
  };

  const handleStatsChange = (field, value) => {
    const newData = { ...data };
    newData.stats = { ...newData.stats, [field]: parseInt(value) || 0 };
    saveAll(newData);
  };

  const handleSocialChange = (field, value) => {
    const newData = { ...data };
    newData.socialLinks = { ...newData.socialLinks, [field]: value };
    saveAll(newData);
  };

  const requestDelete = (sectionKey, itemId) => {
    setConfirmModal({ sectionKey, itemId });
  };

  const confirmDelete = async () => {
    if (!confirmModal) return;
    const { sectionKey, itemId } = confirmModal;
    // Operate directly on current data state to avoid deepMerge issues
    const newData = JSON.parse(JSON.stringify(data));
    const keys = sectionKey.split('.');
    let target = newData;
    for (const k of keys) target = target[k];
    if (Array.isArray(target)) {
      const idx = target.findIndex(x => x.id === itemId);
      if (idx !== -1) {
        target.splice(idx, 1);
        const result = await DataManager.saveData(newData);
        if (result.success) {
          setData(newData);
          showToast('🗑️ Item deleted locally. Click Commit to apply to live site.');
        } else {
          showToast(`❌ Failed to delete: ${result.error}`);
        }
      }
    }
    setConfirmModal(null);
  };

  const addItem = async (sectionKey, template) => {
    const result = await DataManager.addItem(sectionKey, { ...template });
    if (result.success) {
      setData(DataManager.getData());
      showToast('✅ Item added locally. Click Commit to apply to live site.');
    } else {
      showToast(`❌ Failed to add item: ${result.error}`);
    }
  };

  const updateItemField = async (sectionKey, itemId, field, value) => {
    const result = await DataManager.updateItem(sectionKey, itemId, { [field]: value });
    if (result.success) setData(DataManager.getData());
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
      reader.onload = (ev) => {
        if (DataManager.importData(ev.target.result)) {
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
    { key: 'personal', label: '👤 Personal Info', icon: '👤' },
    { key: 'stats', label: '📊 Stats', icon: '📊' },
    { key: 'social', label: '🔗 Social Links', icon: '🔗' },
    { key: 'education', label: '🎓 Education', icon: '🎓' },
    { key: 'experience', label: '💼 Experience', icon: '💼' },
    { key: 'publications', label: '📄 Publications', icon: '📄' },
    { key: 'patents', label: '📋 Patents', icon: '📋' },
    { key: 'copyrights', label: '©️ Copyrights', icon: '©️' },
    { key: 'awards', label: '🏆 Awards', icon: '🏆' },
    { key: 'certifications', label: '🎖️ Certifications', icon: '🎖️' },
    { key: 'associations', label: '🤝 Associations', icon: '🤝' },
    { key: 'talks', label: '🎤 Invited Talks', icon: '🎤' },
    { key: 'gallery', label: '🖼️ Gallery', icon: '🖼️' },
    { key: 'tools', label: '⚙️ Tools', icon: '⚙️' },
  ];

  const renderArrayEditor = (sectionKey, items, fields, template) => (
    <div>
      <button className="admin-add-btn" onClick={() => addItem(sectionKey, template)}>+ Add New</button>
      {items && items.map((item, idx) => (
        <div key={item.id || idx} className="admin-item-card">
          <div className="admin-item-header">
            <span className="admin-item-number">#{idx + 1}</span>
            <button className="admin-delete-btn" onClick={() => requestDelete(sectionKey, item.id)}>🗑️ Delete</button>
          </div>
          {fields.map(f => (
            <div key={f.key} className="admin-field">
              <label>{f.label}</label>
              {f.type === 'textarea' ? (
                <textarea value={item[f.key] || ''} onChange={e => updateItemField(sectionKey, item.id, f.key, e.target.value)} rows={3} />
              ) : (
                <input type="text" value={item[f.key] || ''} onChange={e => updateItemField(sectionKey, item.id, f.key, e.target.value)} />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );

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
        .admin-field input, .admin-field textarea, .admin-field select { width: 100%; padding: 10px 14px; border: 1px solid #2a3555; border-radius: 8px; background: #111827; color: #e8eaf0; font-size: 14px; font-family: inherit; transition: border-color 0.2s; }
        .admin-field input:focus, .admin-field textarea:focus { outline: none; border-color: #e8b84d; }
        .admin-field textarea { resize: vertical; }
        .admin-item-card { background: #111827; border: 1px solid #1f2940; border-radius: 12px; padding: 24px; margin-bottom: 16px; }
        .admin-item-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
        .admin-item-number { font-size: 14px; font-weight: 700; color: #e8b84d; }
        .admin-delete-btn { background: rgba(217,64,64,0.1); border: 1px solid rgba(217,64,64,0.2); color: #ff6b6b; padding: 6px 14px; border-radius: 6px; cursor: pointer; font-size: 13px; transition: all 0.2s; font-family: inherit; }
        .admin-delete-btn:hover { background: rgba(217,64,64,0.2); }
        .admin-add-btn { background: rgba(232,184,77,0.1); border: 1px solid rgba(232,184,77,0.2); color: #e8b84d; padding: 10px 24px; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 600; margin-bottom: 24px; transition: all 0.2s; font-family: inherit; }
        .admin-add-btn:hover { background: rgba(232,184,77,0.2); }
        .admin-actions { display: flex; gap: 12px; margin-bottom: 32px; flex-wrap: wrap; }
        .admin-action-btn { padding: 10px 20px; border-radius: 8px; border: 1px solid #2a3555; background: #151f33; color: #a0a8c0; cursor: pointer; font-size: 13px; transition: all 0.2s; font-family: inherit; }
        .admin-action-btn:hover { border-color: #e8b84d; color: #e8b84d; }
        .admin-action-btn.danger { border-color: rgba(217,64,64,0.3); color: #ff6b6b; }
        .admin-action-btn.danger:hover { background: rgba(217,64,64,0.1); }
        .toast { position: fixed; bottom: 30px; right: 30px; background: #1a2540; border: 1px solid #2a3555; color: #e8eaf0; padding: 14px 24px; border-radius: 10px; font-size: 14px; z-index: 9999; box-shadow: 0 8px 24px rgba(0,0,0,0.4); animation: slideUp 0.3s ease; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .admin-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        @media (max-width: 768px) {
          .admin-layout { grid-template-columns: 1fr; }
          .admin-sidebar { position: static; height: auto; display: flex; overflow-x: auto; padding: 12px; }
          .admin-tab { white-space: nowrap; padding: 8px 16px; }
          .admin-grid { grid-template-columns: 1fr; }
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
        {/* PERSONAL INFO */}
        {activeTab === 'personal' && (
          <>
            <h3>👤 Personal Information</h3>
            <p>Edit your personal details displayed on the portfolio.</p>
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
          </>
        )}

        {/* STATS */}
        {activeTab === 'stats' && (
          <>
            <h3>📊 Statistics</h3>
            <p>Update your research metrics and counts.</p>
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

        {/* SOCIAL LINKS */}
        {activeTab === 'social' && (
          <>
            <h3>🔗 Social & Research Links</h3>
            <p>Update your profile URLs.</p>
            {Object.keys(data.socialLinks).map(f => (
              <div key={f} className="admin-field">
                <label>{f.replace(/([A-Z])/g, ' $1').toUpperCase()}</label>
                <input value={data.socialLinks[f] || ''} onChange={e => handleSocialChange(f, e.target.value)} />
              </div>
            ))}
          </>
        )}

        {/* EDUCATION */}
        {activeTab === 'education' && (
          <>
            <h3>🎓 Education</h3>
            <p>Manage your educational qualifications.</p>
            {renderArrayEditor('education', data.education, [
              { key: 'degree', label: 'Degree', type: 'text' },
              { key: 'specialization', label: 'Specialization', type: 'text' },
              { key: 'institution', label: 'Institution', type: 'text' },
              { key: 'year', label: 'Year', type: 'text' },
              { key: 'description', label: 'Description', type: 'textarea' },
            ], { degree: '', specialization: '', institution: '', year: '', description: '' })}
          </>
        )}

        {/* EXPERIENCE */}
        {activeTab === 'experience' && (
          <>
            <h3>💼 Experience</h3>
            <p>Manage your work experience.</p>
            {renderArrayEditor('experience', data.experience, [
              { key: 'role', label: 'Role', type: 'text' },
              { key: 'organization', label: 'Organization', type: 'text' },
              { key: 'duration', label: 'Duration', type: 'text' },
              { key: 'description', label: 'Description', type: 'textarea' },
            ], { role: '', organization: '', duration: '', type: 'Teaching', description: '', responsibilities: [] })}
          </>
        )}

        {/* PUBLICATIONS */}
        {activeTab === 'publications' && (
          <>
            <h3>📄 Publications</h3>
            <p>Manage your journal, conference publications, SCI, and books.</p>
            <h4 style={{ color: '#e8b84d', marginBottom: '16px' }}>Journals ({data.publications.journals.length})</h4>
            {renderArrayEditor('publications.journals', data.publications.journals, [
              { key: 'title', label: 'Title', type: 'text' },
              { key: 'authors', label: 'Authors', type: 'text' },
              { key: 'journal', label: 'Journal', type: 'text' },
              { key: 'year', label: 'Year', type: 'text' },
              { key: 'indexed', label: 'Indexed In', type: 'text' },
            ], { title: '', authors: '', journal: '', year: '', indexed: '' })}
            
            <h4 style={{ color: '#e8b84d', margin: '32px 0 16px' }}>Conferences ({data.publications.conferences.length})</h4>
            {renderArrayEditor('publications.conferences', data.publications.conferences, [
              { key: 'title', label: 'Title', type: 'text' },
              { key: 'authors', label: 'Authors', type: 'text' },
              { key: 'conference', label: 'Conference/Venue', type: 'text' },
              { key: 'year', label: 'Year', type: 'text' },
              { key: 'indexed', label: 'Indexed In', type: 'text' },
              { key: 'link', label: 'Link', type: 'text' },
            ], { title: '', authors: '', conference: '', year: '', indexed: '', link: '' })}

            <h4 style={{ color: '#e8b84d', margin: '32px 0 16px' }}>SCI Publications ({data.publications.sci.length})</h4>
            {renderArrayEditor('publications.sci', data.publications.sci, [
              { key: 'title', label: 'Title', type: 'text' },
              { key: 'authors', label: 'Authors', type: 'text' },
              { key: 'journal', label: 'Journal', type: 'text' },
              { key: 'year', label: 'Year', type: 'text' },
              { key: 'indexed', label: 'Indexed In', type: 'text' },
              { key: 'link', label: 'Link', type: 'text' },
            ], { title: '', authors: '', journal: '', year: '', indexed: '', link: '' })}

            <h4 style={{ color: '#e8b84d', margin: '32px 0 16px' }}>Books Authored ({data.books.length})</h4>
            {renderArrayEditor('books', data.books, [
              { key: 'title', label: 'Title', type: 'text' },
              { key: 'authors', label: 'Authors', type: 'text' },
              { key: 'publisher', label: 'Publisher', type: 'text' },
              { key: 'year', label: 'Year', type: 'text' },
              { key: 'link', label: 'Link', type: 'text' },
            ], { title: '', authors: '', publisher: '', year: '', link: '' })}
          </>
        )}

        {/* PATENTS */}
        {activeTab === 'patents' && (
          <>
            <h3>📋 Patents</h3>
            {renderArrayEditor('patents', data.patents, [
              { key: 'title', label: 'Title', type: 'text' },
              { key: 'number', label: 'Application Number', type: 'text' },
              { key: 'status', label: 'Status', type: 'text' },
              { key: 'year', label: 'Year', type: 'text' },
              { key: 'inventors', label: 'Inventors', type: 'text' },
            ], { title: '', number: '', status: 'Published', year: '', inventors: '' })}
          </>
        )}

        {/* COPYRIGHTS */}
        {activeTab === 'copyrights' && (
          <>
            <h3>©️ Copyrights</h3>
            {renderArrayEditor('copyrights', data.copyrights, [
              { key: 'title', label: 'Title', type: 'text' },
              { key: 'regNo', label: 'Registration No.', type: 'text' },
              { key: 'date', label: 'Date', type: 'text' },
            ], { title: '', regNo: '', date: '' })}
          </>
        )}

        {/* AWARDS */}
        {activeTab === 'awards' && (
          <>
            <h3>🏆 Awards & Recognition</h3>
            <h4 style={{ color: '#e8b84d', margin: '16px 0 16px' }}>Awards ({data.awards.length})</h4>
            {renderArrayEditor('awards', data.awards, [
              { key: 'title', label: 'Award Title', type: 'text' },
              { key: 'organization', label: 'Organization', type: 'text' },
              { key: 'year', label: 'Year', type: 'text' },
              { key: 'description', label: 'Description', type: 'textarea' },
            ], { title: '', organization: '', year: '', description: '' })}

            <h4 style={{ color: '#e8b84d', margin: '32px 0 16px' }}>Funded Projects ({(data.fundedProjects || []).length})</h4>
            {renderArrayEditor('fundedProjects', data.fundedProjects || [], [
              { key: 'title', label: 'Title', type: 'text' },
              { key: 'funder', label: 'Funder / Agency', type: 'text' },
              { key: 'role', label: 'Role', type: 'text' },
              { key: 'value', label: 'Value/Amount', type: 'text' },
              { key: 'description', label: 'Description', type: 'textarea' },
            ], { title: '', funder: '', role: '', value: '', description: '' })}

            <h4 style={{ color: '#e8b84d', margin: '32px 0 16px' }}>Editorial Roles ({(data.professionalActivities.editorial || []).length})</h4>
            {renderArrayEditor('professionalActivities.editorial', data.professionalActivities.editorial || [], [
              { key: 'role', label: 'Role', type: 'text' },
              { key: 'journal', label: 'Journal', type: 'text' },
            ], { role: '', journal: '' })}

            <h4 style={{ color: '#e8b84d', margin: '32px 0 16px' }}>Reviewer ({(data.professionalActivities.reviewer || []).length})</h4>
            {renderArrayEditor('professionalActivities.reviewer', data.professionalActivities.reviewer || [], [
              { key: 'journal', label: 'Journal', type: 'text' },
            ], { journal: '' })}

            <h4 style={{ color: '#e8b84d', margin: '32px 0 16px' }}>UG Projects Guided ({(data.ugProjectsGuided || []).length})</h4>
            {renderArrayEditor('ugProjectsGuided', data.ugProjectsGuided || [], [
              { key: 'title', label: 'Project Title', type: 'text' },
              { key: 'year', label: 'Year', type: 'text' },
            ], { title: '', year: '' })}
          </>
        )}

        {/* CERTIFICATIONS */}
        {activeTab === 'certifications' && (
          <>
            <h3>🎖️ Certifications</h3>
            {renderArrayEditor('certifications', data.certifications, [
              { key: 'title', label: 'Certificate Title', type: 'text' },
              { key: 'issuer', label: 'Issuer', type: 'text' },
              { key: 'category', label: 'Category', type: 'text' },
            ], { title: '', issuer: '', category: '' })}
          </>
        )}

        {/* GALLERY */}
        {activeTab === 'gallery' && (
          <>
            <h3>🖼️ Gallery</h3>
            <p>Manage gallery images. Place image files in <code>/public/images/gallery/</code></p>
            {renderArrayEditor('gallery', data.gallery, [
              { key: 'src', label: 'Image Path (e.g. /images/gallery/img1.jpg)', type: 'text' },
              { key: 'caption', label: 'Caption', type: 'text' },
              { key: 'category', label: 'Category', type: 'text' },
            ], { src: '/images/gallery/', caption: '', category: '' })}
          </>
        )}

        {/* ASSOCIATIONS */}
        {activeTab === 'associations' && (
          <>
            <h3>🤝 Associations & Memberships</h3>
            <h4 style={{ color: '#e8b84d', margin: '16px 0 16px' }}>Journal Associations ({(data.professionalActivities.journalAssociations || []).length})</h4>
            {renderArrayEditor('professionalActivities.journalAssociations', data.professionalActivities.journalAssociations || [], [
              { key: 'journal', label: 'Journal Name', type: 'text' },
            ], { journal: '' })}

            <h4 style={{ color: '#e8b84d', margin: '32px 0 16px' }}>Conference Associations ({(data.professionalActivities.conferenceAssociations || []).length})</h4>
            {renderArrayEditor('professionalActivities.conferenceAssociations', data.professionalActivities.conferenceAssociations || [], [
              { key: 'organization', label: 'Organization / Conference', type: 'text' },
              { key: 'role', label: 'Role', type: 'text' },
            ], { organization: '', role: 'Author / Contributor' })}

            <h4 style={{ color: '#e8b84d', margin: '32px 0 16px' }}>Memberships ({(data.professionalActivities.memberships || []).length})</h4>
            {renderArrayEditor('professionalActivities.memberships', data.professionalActivities.memberships || [], [
              { key: 'organization', label: 'Organization Name', type: 'text' },
              { key: 'membershipId', label: 'Membership ID / Role', type: 'text' },
            ], { organization: '', membershipId: '' })}
          </>
        )}

        {/* INVITED TALKS */}
        {activeTab === 'talks' && (
          <>
            <h3>🎤 Invited Talks & Lectures</h3>
            
            <h4 style={{ color: '#e8b84d', margin: '16px 0 16px' }}>FDPs ({(data.invitedTalks.fdps || []).length})</h4>
            {renderArrayEditor('invitedTalks.fdps', data.invitedTalks.fdps || [], [
              { key: 'title', label: 'Title', type: 'text' },
              { key: 'venue', label: 'Venue', type: 'text' },
              { key: 'type', label: 'Type', type: 'text' },
            ], { title: '', venue: '', type: '' })}

            <h4 style={{ color: '#e8b84d', margin: '32px 0 16px' }}>Webinars ({(data.invitedTalks.webinars || []).length})</h4>
            {renderArrayEditor('invitedTalks.webinars', data.invitedTalks.webinars || [], [
              { key: 'title', label: 'Title', type: 'text' },
              { key: 'venue', label: 'Venue', type: 'text' },
              { key: 'year', label: 'Year', type: 'text' },
            ], { title: '', venue: '', year: '' })}

            <h4 style={{ color: '#e8b84d', margin: '32px 0 16px' }}>Technical Lectures ({(data.invitedTalks.technicalLectures || []).length})</h4>
            {renderArrayEditor('invitedTalks.technicalLectures', data.invitedTalks.technicalLectures || [], [
              { key: 'title', label: 'Title', type: 'text' },
              { key: 'venue', label: 'Venue', type: 'text' },
              { key: 'type', label: 'Type', type: 'text' },
              { key: 'year', label: 'Year', type: 'text' },
            ], { title: '', venue: '', type: '', year: '' })}

            <h4 style={{ color: '#e8b84d', margin: '32px 0 16px' }}>Conference Invited Talks ({(data.invitedTalks.conferenceInvitedTalks || []).length})</h4>
            {renderArrayEditor('invitedTalks.conferenceInvitedTalks', data.invitedTalks.conferenceInvitedTalks || [], [
              { key: 'title', label: 'Title', type: 'text' },
              { key: 'venue', label: 'Venue / Conference', type: 'text' },
              { key: 'year', label: 'Year', type: 'text' },
            ], { title: '', venue: '', year: '' })}
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
              <p>Publications: {(data.publications?.journals?.length || 0) + (data.publications?.conferences?.length || 0) + (data.publications?.sci?.length || 0)}</p>
              <p>Books: {data.books?.length || 0}</p>
              <p>Patents: {data.patents?.length || 0}</p>
              <p>Copyrights: {data.copyrights?.length || 0}</p>
              <p>Awards & Recognitions: {data.awards?.length || 0}</p>
              <p>Certifications: {data.certifications?.length || 0}</p>
              <p>Gallery Images: {data.gallery?.length || 0}</p>
              <p>Invited Talks: {(data.invitedTalks?.fdps?.length || 0) + (data.invitedTalks?.webinars?.length || 0) + (data.invitedTalks?.technicalLectures?.length || 0) + (data.invitedTalks?.conferenceInvitedTalks?.length || 0)}</p>
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
            <h4>Delete Item?</h4>
            <p>Are you sure you want to delete this item? This action cannot be undone.</p>
            <div className="confirm-actions">
              <button className="confirm-cancel" onClick={() => setConfirmModal(null)}>Cancel</button>
              <button className="confirm-delete" onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
