'use client';
import { useState } from 'react';
import { useData } from './DataProvider';
import { Icons } from './Icons';

export default function Publications() {
  const d = useData();
  const { journals, conferences, sci } = d.publications;
  const books = d.books;
  const [activeTab, setActiveTab] = useState('journals');

  const renderTabContent = () => {
    let list = [];
    if (activeTab === 'journals') list = journals;
    else if (activeTab === 'conferences') list = conferences;
    else if (activeTab === 'sci') list = sci || [];
    else if (activeTab === 'books') list = books || [];

    if (list.length === 0) {
      return <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>No items available in this category yet.</div>;
    }

    return (
      <div className="pub-category">
        {list.map((pub, index) => (
          <div className="pub-item" key={pub.id || index} style={{ marginBottom: '15px' }}>
            <div className="pub-title" style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-dark)' }}>{list.length - index}. {pub.title}</div>
            <div className="pub-meta" style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginTop: '4px' }}>
              {pub.authors && <span>{pub.authors} — </span>}
              <span className="pub-journal" style={{ color: 'var(--accent-dark)', fontWeight: '500' }}>{pub.journal || pub.conference || pub.publisher}</span> {pub.year && `(${pub.year})`}
              {pub.indexed && <span className="pub-badge" style={{ display: 'inline-block', fontSize: '11px', fontWeight: '600', padding: '2px 10px', background: 'var(--accent-light)', color: 'var(--accent-dark)', borderRadius: '20px', marginLeft: '8px' }}>{pub.indexed}</span>}
            </div>
            {pub.link && (
              <div style={{ marginTop: '8px' }}>
                <a href={pub.link} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: 'var(--accent)', fontWeight: '600', textDecoration: 'none' }}>
                  {Icons.externalLink} Cite / View Publication
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="section section-white">
      <div className="section-title-wrapper">
        <span className="section-bg-text">PUBLICATIONS</span>
        <h2 className="section-title">Research & Publications</h2>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', borderBottom: '2px solid var(--border)', paddingBottom: '10px', overflowX: 'auto' }}>
        <button
          onClick={() => setActiveTab('journals')}
          style={{ background: 'none', border: 'none', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', color: activeTab === 'journals' ? 'var(--accent)' : 'var(--text-muted)', borderBottom: activeTab === 'journals' ? '2px solid var(--accent)' : 'none', paddingBottom: '5px', whiteSpace: 'nowrap' }}
        >
          JOURNALS
        </button>
        <button
          onClick={() => setActiveTab('conferences')}
          style={{ background: 'none', border: 'none', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', color: activeTab === 'conferences' ? 'var(--accent)' : 'var(--text-muted)', borderBottom: activeTab === 'conferences' ? '2px solid var(--accent)' : 'none', paddingBottom: '5px', whiteSpace: 'nowrap' }}
        >
          CONFERENCES
        </button>
        <button
          onClick={() => setActiveTab('sci')}
          style={{ background: 'none', border: 'none', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', color: activeTab === 'sci' ? 'var(--accent)' : 'var(--text-muted)', borderBottom: activeTab === 'sci' ? '2px solid var(--accent)' : 'none', paddingBottom: '5px', whiteSpace: 'nowrap' }}
        >
          SCI
        </button>
        <button
          onClick={() => setActiveTab('books')}
          style={{ background: 'none', border: 'none', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', color: activeTab === 'books' ? 'var(--accent)' : 'var(--text-muted)', borderBottom: activeTab === 'books' ? '2px solid var(--accent)' : 'none', paddingBottom: '5px', whiteSpace: 'nowrap' }}
        >
          BOOKS
        </button>
      </div>

      {renderTabContent()}
    </section>
  );
}
