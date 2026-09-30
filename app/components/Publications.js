'use client';
import { useData, sectionHeading } from './DataProvider';
import { Icons } from './Icons';
import CategoryTabs, { useActiveCategory } from './CategoryTabs';

export default function Publications() {
  const d = useData();
  const categories = d.publications?.categories || [];
  const [active, setActive] = useActiveCategory(categories);
  const list = active?.items || [];

  return (
    <section className="section section-white">
      <div className="section-title-wrapper">
        <span className="section-bg-text">PUBLICATIONS</span>
        <h2 className="section-title">{sectionHeading(d, 'publications', 'Research & Publications')}</h2>
      </div>

      <CategoryTabs categories={categories} active={active} onChange={setActive} />

      {list.length === 0 ? (
        <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>No items available in this category yet.</div>
      ) : (
        <div className="pub-category">
          {list.map((pub, index) => (
            <div className="pub-item" key={pub.id || index} style={{ marginBottom: '15px' }}>
              <div className="pub-title" style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-dark)' }}>{list.length - index}. {pub.title}</div>
              <div className="pub-meta" style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginTop: '4px' }}>
                {pub.authors && <span>{pub.authors} — </span>}
                <span className="pub-journal" style={{ color: 'var(--accent-dark)', fontWeight: '500' }}>{pub.venue}</span> {pub.year && `(${pub.year})`}
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
      )}
    </section>
  );
}
