'use client';
import { useState, useEffect } from 'react';
import { DataManager, DEFAULT_DATA } from '@/lib/data';

export default function AdminPanel() {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState('personal');
  const [toast, setToast] = useState('');
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    setData(DataManager.getData());
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const saveAll = (newData) => {
    DataManager.saveData(newData);
    setData({ ...newData });
    showToast('✅ Changes saved successfully!');
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

  const deleteItem = (sectionKey, itemId) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    DataManager.deleteItem(sectionKey, itemId);
    setData(DataManager.getData());
    showToast('🗑️ Item deleted!');
  };

  const addItem = (sectionKey, template) => {
    DataManager.addItem(sectionKey, { ...template });
    setData(DataManager.getData());
    showToast('✅ Item added!');
  };

  const updateItemField = (sectionKey, itemId, field, value) => {
    DataManager.updateItem(sectionKey, itemId, { [field]: value });
    setData(DataManager.getData());
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

  const resetData = () => {
    if (!confirm('Reset all data to defaults? This cannot be undone!')) return;
    DataManager.resetToDefaults();
    setData(DataManager.getData());
    showToast('🔄 Reset to defaults!');
  };

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
    { key: 'gallery', label: '🖼️ Gallery', icon: '🖼️' },
    { key: 'talks', label: '🎤 Invited Talks', icon: '🎤' },
    { key: 'tools', label: '⚙️ Tools', icon: '⚙️' },
  ];

  const renderArrayEditor = (sectionKey, items, fields, template) => (
    <div>
      <button className="admin-add-btn" onClick={() => addItem(sectionKey, template)}>+ Add New</button>
      {items && items.map((item, idx) => (
        <div key={item.id || idx} className="admin-item-card">
          <div className="admin-item-header">
            <span className="admin-item-number">#{idx + 1}</span>
            <button className="admin-delete-btn" onClick={() => deleteItem(sectionKey, item.id)}>🗑️ Delete</button>
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
      `}</style>

      <div className="admin-sidebar">
        <h2>Admin Panel</h2>
        <p>Dr. Vishal S. Badgujar</p>
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
            <p>Manage your journal and conference publications.</p>
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
              { key: 'indexed', label: 'Indexed In', type: 'text' },
            ], { title: '', authors: '', conference: '', indexed: '' })}
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
            {renderArrayEditor('awards', data.awards, [
              { key: 'title', label: 'Award Title', type: 'text' },
              { key: 'organization', label: 'Organization', type: 'text' },
              { key: 'year', label: 'Year', type: 'text' },
              { key: 'description', label: 'Description', type: 'textarea' },
            ], { title: '', organization: '', year: '', description: '' })}
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

        {/* INVITED TALKS */}
        {activeTab === 'talks' && (
          <>
            <h3>🎤 Invited Talks</h3>
            {renderArrayEditor('invitedTalks', data.invitedTalks, [
              { key: 'title', label: 'Title', type: 'text' },
              { key: 'venue', label: 'Venue', type: 'text' },
              { key: 'type', label: 'Type', type: 'text' },
              { key: 'year', label: 'Year', type: 'text' },
            ], { title: '', venue: '', type: '', year: '' })}
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
              <p>Publications: {data.publications.journals.length + data.publications.conferences.length}</p>
              <p>Patents: {data.patents.length}</p>
              <p>Copyrights: {data.copyrights.length}</p>
              <p>Awards: {data.awards.length}</p>
              <p>Certifications: {data.certifications.length}</p>
              <p>Gallery Images: {data.gallery.length}</p>
              <p>Invited Talks: {data.invitedTalks.length}</p>
            </div>
          </>
        )}
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
