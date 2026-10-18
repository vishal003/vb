'use client';
import { useState, useEffect } from 'react';
import { useData, sectionHeading } from './DataProvider';
import { resolveImageUrl } from '@/lib/data';

export default function RecentNews() {
  const d = useData();
  const news = d.recentNews || [];
  const [selectedNews, setSelectedNews] = useState(null);

  // Close modal on Escape key & lock body scroll
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setSelectedNews(null);
    };
    if (selectedNews) {
      window.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [selectedNews]);

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
          {news.map((n) => {
            const imgSrc = n.image ? resolveImageUrl(n.image) : null;
            return (
              <article
                className="news-item news-item-clickable"
                key={n.id}
                onClick={() => setSelectedNews(n)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') setSelectedNews(n); }}
              >
                {imgSrc && (
                  <div className="news-item-image">
                    <img src={imgSrc} alt={n.title} loading="lazy" />
                    <div className="news-image-overlay">
                      <span className="news-zoom-badge">🔍 Click to View</span>
                    </div>
                  </div>
                )}
                <div className="news-item-content">
                  <h4>{n.title}</h4>
                  {n.description && <p>{n.description}</p>}
                  <span className="news-view-link">View Full News & Image →</span>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Large View Modal */}
      {selectedNews && (
        <div className="lightbox-overlay" onClick={() => setSelectedNews(null)}>
          <button
            className="lightbox-btn lightbox-close"
            onClick={() => setSelectedNews(null)}
            aria-label="Close"
          >
            ✕
          </button>
          <div
            className="news-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedNews.image && (
              <div className="news-modal-image-wrapper">
                <img
                  src={resolveImageUrl(selectedNews.image)}
                  alt={selectedNews.title}
                  className="news-modal-image"
                />
                <a
                  href={resolveImageUrl(selectedNews.image)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="news-modal-external-link"
                >
                  Open original image in new tab ↗
                </a>
              </div>
            )}
            <div className="news-modal-body">
              <h3 className="news-modal-title">{selectedNews.title}</h3>
              {selectedNews.description && (
                <div className="news-modal-desc">
                  {selectedNews.description}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
