'use client';
import { useData } from './DataProvider';
import { useEffect, useRef, useState } from 'react';

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => e.target.classList.add('active'), delay); observer.unobserve(e.target); }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);
  return <div ref={ref} className="reveal">{children}</div>;
}

export default function Gallery() {
  const d = useData();
  const [filter, setFilter] = useState('All');
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });

  const categories = ['All', ...new Set(d.gallery.map(g => g.category))];
  const filtered = filter === 'All' ? d.gallery : d.gallery.filter(g => g.category === filter);

  const openLightbox = (i) => setLightbox({ open: true, index: i });
  const closeLightbox = () => setLightbox({ open: false, index: 0 });
  const prevImage = () => setLightbox(prev => ({ ...prev, index: (prev.index - 1 + filtered.length) % filtered.length }));
  const nextImage = () => setLightbox(prev => ({ ...prev, index: (prev.index + 1) % filtered.length }));

  useEffect(() => {
    const onKey = (e) => {
      if (!lightbox.open) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox.open]);

  return (
    <section className="section-alt" id="gallery">
      <div className="container">
        <Reveal><div className="section-header">
          <span className="section-number">11</span>
          <h2 className="section-title">Gallery</h2>
          <p className="section-subtitle">Moments from conferences, workshops, and academic events.</p>
        </div></Reveal>

        <Reveal>
          <div className="gallery-filters">
            {categories.map(cat => (
              <button
                key={cat}
                className={`gallery-filter-btn ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="gallery-grid">
          {filtered.map((img, i) => (
            <Reveal key={img.id} delay={i * 60}>
              <div className="gallery-item" onClick={() => openLightbox(i)}>
                <img
                  src={img.src}
                  alt={img.caption}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(img.caption)}&size=400&background=1e3a5f&color=fff&font-size=0.2`;
                  }}
                />
                <div className="gallery-overlay">
                  <span className="gallery-caption">{img.caption}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <div className={`lightbox ${lightbox.open ? 'active' : ''}`} onClick={closeLightbox}>
        <button className="lightbox-close" onClick={closeLightbox}>✕</button>
        <button className="lightbox-nav lightbox-prev" onClick={(e) => { e.stopPropagation(); prevImage(); }}>‹</button>
        {lightbox.open && filtered[lightbox.index] && (
          <>
            <img
              src={filtered[lightbox.index].src}
              alt={filtered[lightbox.index].caption}
              onClick={(e) => e.stopPropagation()}
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(filtered[lightbox.index].caption)}&size=800&background=1e3a5f&color=fff&font-size=0.15`;
              }}
            />
            <div className="lightbox-caption">{filtered[lightbox.index].caption}</div>
          </>
        )}
        <button className="lightbox-nav lightbox-next" onClick={(e) => { e.stopPropagation(); nextImage(); }}>›</button>
      </div>
    </section>
  );
}
