'use client';
import { useData, sectionHeading } from './DataProvider';

export default function RecentNews() {
  const d = useData();
  const news = d.recentNews || [];

  return (
    <section className="section section-alt">
      <div className="section-title-wrapper">
        <span className="section-bg-text">NEWS</span>
        <h2 className="section-title">{sectionHeading(d, 'recentNews', 'Recent News')}</h2>
      </div>

      {news.length === 0 ? (
        <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>No news yet. Stay tuned!</div>
      ) : (
        <div className="news-list">
          {news.map((n) => (
            <article className="news-item" key={n.id}>
              <h4>{n.title}</h4>
              {n.description && <p>{n.description}</p>}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
