'use client';
import { useState } from 'react';
import { useData } from './DataProvider';

export default function InvitedTalks() {
  const d = useData();
  const { fdps, webinars, technicalLectures, conferenceInvitedTalks } = d.invitedTalks || {};
  const [activeTab, setActiveTab] = useState('fdps');

  const renderTabContent = () => {
    let list = [];
    if (activeTab === 'fdps') list = fdps || [];
    else if (activeTab === 'webinars') list = webinars || [];
    else if (activeTab === 'technicalLectures') list = technicalLectures || [];
    else if (activeTab === 'conferenceInvitedTalks') list = conferenceInvitedTalks || [];

    if (list.length === 0) {
      return <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>No talks available in this category yet.</div>;
    }

    return (
      <div className="talks-list" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {list.map((talk, index) => (
          <div className="talk-item" key={talk.id || index} style={{ background: 'var(--bg-white)', padding: '20px', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
            <h4 style={{ margin: '0 0 5px 0', fontSize: '16px', color: 'var(--text-dark)' }}>{talk.title}</h4>
            <div className="talk-meta" style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
              {talk.venue} {talk.type && <>— <span className="talk-type" style={{ color: 'var(--accent)', fontWeight: '500' }}>{talk.type}</span></>} {talk.year && `(${talk.year})`}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="section section-white">
      <div className="section-title-wrapper">
        <span className="section-bg-text">TALKS</span>
        <h2 className="section-title">Invited Talks</h2>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', borderBottom: '2px solid var(--border)', paddingBottom: '10px', overflowX: 'auto' }}>
        <button
          onClick={() => setActiveTab('fdps')}
          style={{ background: 'none', border: 'none', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', color: activeTab === 'fdps' ? 'var(--accent)' : 'var(--text-muted)', borderBottom: activeTab === 'fdps' ? '2px solid var(--accent)' : 'none', paddingBottom: '5px', whiteSpace: 'nowrap' }}
        >
          FDPS
        </button>
        <button
          onClick={() => setActiveTab('webinars')}
          style={{ background: 'none', border: 'none', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', color: activeTab === 'webinars' ? 'var(--accent)' : 'var(--text-muted)', borderBottom: activeTab === 'webinars' ? '2px solid var(--accent)' : 'none', paddingBottom: '5px', whiteSpace: 'nowrap' }}
        >
          WEBINARS
        </button>
        <button
          onClick={() => setActiveTab('technicalLectures')}
          style={{ background: 'none', border: 'none', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', color: activeTab === 'technicalLectures' ? 'var(--accent)' : 'var(--text-muted)', borderBottom: activeTab === 'technicalLectures' ? '2px solid var(--accent)' : 'none', paddingBottom: '5px', whiteSpace: 'nowrap' }}
        >
          TECHNICAL LECTURES
        </button>
        <button
          onClick={() => setActiveTab('conferenceInvitedTalks')}
          style={{ background: 'none', border: 'none', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', color: activeTab === 'conferenceInvitedTalks' ? 'var(--accent)' : 'var(--text-muted)', borderBottom: activeTab === 'conferenceInvitedTalks' ? '2px solid var(--accent)' : 'none', paddingBottom: '5px', whiteSpace: 'nowrap' }}
        >
          CONFERENCE INVITED TALKS
        </button>
      </div>

      {renderTabContent()}
    </section>
  );
}
