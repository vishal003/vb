'use client';
import { useState } from 'react';
import { useData, sectionHeading } from './DataProvider';
import { Icons } from './Icons';
import CategoryTabs, { useActiveCategory } from './CategoryTabs';
import FileViewer from './FileViewer';

const CATEGORY_ICONS = { journal: Icons.publication, conference: Icons.award, memberships: Icons.handshake };

export default function Associations() {
  const d = useData();
  const categories = d.associations?.categories || [];
  const [active, setActive] = useActiveCategory(categories);
  const [viewing, setViewing] = useState(null);
  const list = active?.items || [];

  return (
    <section className="section section-white">
      <div className="section-title-wrapper">
        <span className="section-bg-text">ASSOCIATIONS</span>
        <h2 className="section-title">{sectionHeading(d, 'associations', 'Associations & Memberships')}</h2>
      </div>

      <CategoryTabs categories={categories} active={active} onChange={setActive} />

      {list.length === 0 ? (
        <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>No associations available in this category yet.</div>
      ) : (
        <div className="cert-grid">
          {list.map((item) => (
            <div
              className={`cert-item ${item.file ? 'cert-item-clickable' : ''}`}
              key={item.id}
              onClick={item.file ? () => setViewing(item) : undefined}
              role={item.file ? 'button' : undefined}
              tabIndex={item.file ? 0 : undefined}
              onKeyDown={item.file ? (e) => { if (e.key === 'Enter') setViewing(item); } : undefined}
            >
              <span className="cert-icon" style={{ display: 'flex', alignItems: 'center' }}>
                {CATEGORY_ICONS[active.id] || Icons.handshake}
              </span>
              <div className="cert-info">
                <div className="cert-title">{item.title}</div>
                {item.subtitle && <div className="cert-issuer">{item.subtitle}</div>}
                {item.file && <div className="cert-view-hint">View certificate →</div>}
              </div>
            </div>
          ))}
        </div>
      )}

      {viewing && <FileViewer file={viewing.file} title={viewing.title} onClose={() => setViewing(null)} />}
    </section>
  );
}
