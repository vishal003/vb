'use client';
import { useData, sectionHeading } from './DataProvider';
import CategoryTabs, { useActiveCategory } from './CategoryTabs';

export default function ProfessionalActivities() {
  const d = useData();
  const categories = d.activities?.categories || [];
  const [active, setActive] = useActiveCategory(categories);
  const list = active?.items || [];

  return (
    <section className="section section-white">
      <div className="section-title-wrapper">
        <span className="section-bg-text">ACTIVITIES</span>
        <h2 className="section-title">{sectionHeading(d, 'activities', 'Professional Activities')}</h2>
      </div>

      <CategoryTabs categories={categories} active={active} onChange={setActive} />

      {list.length === 0 ? (
        <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>No activities available in this category yet.</div>
      ) : (
        <ul className="activity-list">
          {list.map((item) => (
            <li key={item.id}>
              <span className="activity-check">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              </span>
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
