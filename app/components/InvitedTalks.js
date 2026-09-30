'use client';
import { useData, sectionHeading } from './DataProvider';
import CategoryTabs, { useActiveCategory } from './CategoryTabs';

export default function InvitedTalks() {
  const d = useData();
  const categories = d.invitedTalks?.categories || [];
  const [active, setActive] = useActiveCategory(categories);
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
            <div className="talk-item" key={talk.id || index} style={{ background: 'var(--bg-white)', padding: '20px', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
              <h4 style={{ margin: '0 0 5px 0', fontSize: '16px', color: 'var(--text-dark)' }}>{talk.title}</h4>
              <div className="talk-meta" style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                {talk.venue} {talk.type && <>— <span className="talk-type" style={{ color: 'var(--accent)', fontWeight: '500' }}>{talk.type}</span></>} {talk.year && `(${talk.year})`}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
