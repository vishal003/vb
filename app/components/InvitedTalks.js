'use client';
import { useState } from 'react';
import { useData, sectionHeading } from './DataProvider';
import CategoryTabs, { useActiveCategory } from './CategoryTabs';
import FileViewer from './FileViewer';

export default function InvitedTalks() {
  const d = useData();
  const categories = d.invitedTalks?.categories || [];
  const [active, setActive] = useActiveCategory(categories);
  const [viewing, setViewing] = useState(null);
  const list = active?.items || [];

  return (
    <section className="section section-white">
      <div className="section-title-wrapper">
        <span className="section-bg-text">TALKS</span>
        <h2 className="section-title">{sectionHeading(d, 'invitedTalks', 'Invited Talks')}</h2>
      </div>

      <CategoryTabs categories={categories} active={active} onChange={setActive} />

      {list.length === 0 ? (
        <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>No talks available in this category yet.</div>
      ) : (
        <div className="talks-list" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {list.map((talk, index) => (
            <div
              className={`talk-item ${talk.file ? 'talk-item-has-cert' : ''}`}
              key={talk.id || index}
              style={{
                background: 'var(--bg-white)',
                padding: '20px',
                borderRadius: '8px',
                border: '1px solid var(--border-light)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '16px',
                flexWrap: 'wrap'
              }}
            >
              <div style={{ flex: '1 1 260px' }}>
                <h4 style={{ margin: '0 0 6px 0', fontSize: '16px', color: 'var(--text-dark)' }}>{talk.title}</h4>
                <div className="talk-meta" style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                  {talk.venue} {talk.type && <>— <span className="talk-type" style={{ color: 'var(--accent)', fontWeight: '500' }}>{talk.type}</span></>} {talk.year && ` (${talk.year})`}
                </div>
              </div>
              {talk.file && (
                <button
                  type="button"
                  onClick={() => setViewing(talk)}
                  className="btn-talk-cert"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '6px',
                    background: 'rgba(212, 168, 69, 0.1)',
                    border: '1px solid var(--accent)',
                    color: 'var(--accent)',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'var(--transition)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                  View Certificate →
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {viewing && (
        <FileViewer
          file={viewing.file}
          title={viewing.title}
          onClose={() => setViewing(null)}
        />
      )}
    </section>
  );
}
