'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useData } from './DataProvider';

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

  const prevImage = useCallback(() => {
    setLightbox(prev => ({ ...prev, index: (prev.index - 1 + filtered.length) % filtered.length }));
  }, [filtered.length]);

  const nextImage = useCallback(() => {
    setLightbox(prev => ({ ...prev, index: (prev.index + 1) % filtered.length }));
  }, [filtered.length]);

  useEffect(() => {
    const onKey = (e) => {
      if (!lightbox.open) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox.open, prevImage, nextImage]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightbox.open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [lightbox.open]);

  return (
    <section id="gallery" className="section section-white">
      <Reveal><div className="section-title-wrapper" style={{ marginTop: '0' }}>
        <span className="section-bg-text">GALLERY</span>
        <h2 className="section-title">Photo Gallery</h2>
        <p className="section-subtitle">Moments from conferences, awards, events, and academic milestones.</p>
      </div></Reveal>

      {/* Filter Buttons */}
      <Reveal delay={100}>
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

      {/* Image Count */}
      <Reveal delay={150}>
        <p style={{ textAlign: 'center', fontSize: '13px', color: 'var(--text-light)', marginBottom: '25px', letterSpacing: '1px', textTransform: 'uppercase' }}>
          Showing {filtered.length} {filtered.length === 1 ? 'photo' : 'photos'}
          {filter !== 'All' && ` in "${filter}"`}
        </p>
      </Reveal>

      {/* Gallery Grid */}
      <div className="gallery-masonry-grid">
        {filtered.map((img, i) => (
          <Reveal key={img.id} delay={i * 80}>
            <div
              className={`gallery-masonry-item ${i % 3 === 0 ? 'gallery-item-tall' : ''}`}
              onClick={() => openLightbox(i)}
            >
              <img
                src={img.src}
                alt={img.caption}
                loading="lazy"
              />
              <div className="gallery-item-overlay">
                <div className="gallery-item-zoom">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="11" y1="8" x2="11" y2="14" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                </div>
                <div className="gallery-item-caption-text">{img.caption}</div>
                <span className="gallery-item-category-badge">{img.category}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox.open && filtered[lightbox.index] && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button className="lightbox-btn lightbox-close" onClick={closeLightbox}>✕</button>
          <button className="lightbox-btn lightbox-prev" onClick={(e) => { e.stopPropagation(); prevImage(); }}>‹</button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={filtered[lightbox.index].src}
              alt={filtered[lightbox.index].caption}
            />
            <div className="lightbox-caption">
              {filtered[lightbox.index].caption}
              <span style={{ display: 'block', fontSize: '13px', opacity: 0.6, marginTop: '4px' }}>
                {lightbox.index + 1} / {filtered.length}
              </span>
            </div>
          </div>
          <button className="lightbox-btn lightbox-next" onClick={(e) => { e.stopPropagation(); nextImage(); }}>›</button>
        </div>
      )}
    </section>
  );
}
