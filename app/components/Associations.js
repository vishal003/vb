'use client';
import { useState } from 'react';
import { useData } from './DataProvider';
import { Icons } from './Icons';

export default function Associations() {
  const d = useData();
  const { journalAssociations, conferenceAssociations, memberships } = d.professionalActivities || {};
  const [activeTab, setActiveTab] = useState('journal');

  const renderTabContent = () => {
    let list = [];
    if (activeTab === 'journal') list = journalAssociations || [];
    else if (activeTab === 'conference') list = conferenceAssociations || [];
    else if (activeTab === 'memberships') list = memberships || [];

    if (list.length === 0) {
      return <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>No associations available in this category yet.</div>;
    }

    return (
      <div className="cert-grid">
        {list.map((item, index) => (
          <div className="cert-item" key={item.id || index}>
            <span className="cert-icon" style={{ display: 'flex', alignItems: 'center' }}>
              {activeTab === 'journal' && Icons.publication}
              {activeTab === 'conference' && Icons.award}
              {activeTab === 'memberships' && Icons.handshake}
            </span>
            <div className="cert-info">
              <div className="cert-title">{item.organization || item.journal || item.title || "Association"}</div>
              {activeTab === 'memberships' && <div className="cert-issuer">{item.membershipId || item.role || item.venue || ""}</div>}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="section section-white">
      <div className="section-title-wrapper">
        <span className="section-bg-text">ASSOCIATIONS</span>
        <h2 className="section-title">Associations & Memberships</h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', gap: '20px', borderBottom: '2px solid var(--border)', paddingBottom: '10px' }}>
          <button
            onClick={() => setActiveTab('journal')}
            style={{ background: 'none', border: 'none', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', color: activeTab === 'journal' ? 'var(--accent)' : 'var(--text-muted)', borderBottom: activeTab === 'journal' ? '2px solid var(--accent)' : 'none', paddingBottom: '5px' }}
          >
            JOURNAL ASSOCIATIONS
          </button>
          <button
            onClick={() => setActiveTab('conference')}
            style={{ background: 'none', border: 'none', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', color: activeTab === 'conference' ? 'var(--accent)' : 'var(--text-muted)', borderBottom: activeTab === 'conference' ? '2px solid var(--accent)' : 'none', paddingBottom: '5px' }}
          >
            CONFERENCE ASSOCIATIONS
          </button>
          <button
            onClick={() => setActiveTab('memberships')}
            style={{ background: 'none', border: 'none', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', color: activeTab === 'memberships' ? 'var(--accent)' : 'var(--text-muted)', borderBottom: activeTab === 'memberships' ? '2px solid var(--accent)' : 'none', paddingBottom: '5px' }}
          >
            MEMBERSHIPS
          </button>
        </div>

        {renderTabContent()}
      </div>
    </section>
  );
}
