'use client';
import { useData, sectionHeading } from './DataProvider';
import { resolveImageUrl } from '@/lib/data';

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
              {n.image && (
                <div className="news-item-image">
                  <img src={resolveImageUrl(n.image)} alt={n.title} loading="lazy" />
                </div>
              )}
              <div className="news-item-content">
                <h4>{n.title}</h4>
                {n.description && <p>{n.description}</p>}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
