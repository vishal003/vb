'use client';
import { useState, useEffect } from 'react';
import { useData } from './DataProvider';
import { Icons } from './Icons';

export default function Portfolio() {
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
    <>
      {/* Awards & Recognition */}
      <section className="section section-white">
        <div className="section-title-wrapper">
          <span className="section-bg-text">AWARDS</span>
          <h2 className="section-title">Awards & Recognition</h2>
        </div>
        <div className="awards-grid">
          {d.awards.map((aw) => (
            <div className="award-card" key={aw.id}>
              <div className="award-icon">{Icons.award}</div>
              <div className="award-info">
                <h4>{aw.title}</h4>
                <p>{aw.organization} {aw.year && `(${aw.year})`}</p>
                {aw.description && <p style={{ marginTop: '4px', fontSize: '12px', color: 'var(--text-light)' }}>{aw.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Invited Talks */}
      <section className="section section-alt">
        <div className="section-title-wrapper">
          <span className="section-bg-text">TALKS</span>
          <h2 className="section-title">Invited Talks</h2>
        </div>
        <div className="talks-list">
          {d.invitedTalks.map((talk) => (
            <div className="talk-item" key={talk.id}>
              <h4>{talk.title}</h4>
              <div className="talk-meta">
                {talk.venue} — <span className="talk-type">{talk.type}</span> {talk.year && `(${talk.year})`}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Funded Projects */}
      <section className="section section-white">
        <div className="section-title-wrapper">
          <span className="section-bg-text">PROJECTS</span>
          <h2 className="section-title">Funded Projects</h2>
        </div>
        {d.fundedProjects.map((fp) => (
          <div className="funded-card" key={fp.id}>
            <h4>{fp.title}</h4>
            <div className="funded-value">{fp.value}</div>
            <div className="funded-meta">{fp.funder} — Role: {fp.role}</div>
            <p style={{ marginTop: '8px', fontSize: '14px', color: 'var(--text-muted)' }}>{fp.description}</p>
          </div>
        ))}
      </section>

      {/* Editorial & Reviewing + Memberships */}
      <section className="section section-alt">
        <div className="section-title-wrapper">
          <span className="section-bg-text">ASSOCIATIONS</span>
          <h2 className="section-title">Professional Associations</h2>
        </div>

        <div className="editorial-grid">
          <div className="editorial-col">
            <h4>Editorial Roles</h4>
            {d.professionalActivities.editorial.map((e) => (
              <div className="editorial-item" key={e.id}>
                <span className="editorial-role">{e.role}</span>
                <span className="editorial-journal">{e.journal}</span>
              </div>
            ))}

            <h4 style={{ marginTop: '30px' }}>Journal Reviewer</h4>
            {d.professionalActivities.reviewer.map((r) => (
              <div className="editorial-item" key={r.id}>
                {r.journal}
              </div>
            ))}
          </div>

          <div className="editorial-col">
            <h4>Memberships</h4>
            <div className="membership-list">
              {d.professionalActivities.memberships.map((m) => (
                <div className="membership-badge" key={m.id}>
                  <strong>{m.organization}</strong>
                  <span className="membership-id">{m.membershipId}</span>
                </div>
              ))}
            </div>

            <h4 style={{ marginTop: '30px' }}>Leadership Roles</h4>
            {d.professionalActivities.leadership.map((l, i) => (
              <div className="editorial-item" key={i}>{l}</div>
            ))}
          </div>
        </div>
      </section>

      {/* UG Projects Guided */}
      <section className="section section-white">
        <div className="section-title-wrapper">
          <span className="section-bg-text">MENTORING</span>
          <h2 className="section-title">UG Projects Guided</h2>
        </div>
        <div className="projects-grid">
          {d.ugProjectsGuided.map((proj, i) => (
            <div className="project-item" key={i}>
              <span className="project-icon" style={{ display: 'flex', alignItems: 'center' }}>{Icons.target}</span>
              {proj}
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="section section-alt">
        <div className="section-title-wrapper">
          <span className="section-bg-text">GALLERY</span>
          <h2 className="section-title">Gallery</h2>
        </div>

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

        <div className="gallery-grid">
          {filtered.map((img, i) => (
            <div className="gallery-item" key={img.id} onClick={() => openLightbox(i)}>
              <img
                src={img.src}
                alt={img.caption}
                loading="lazy"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(img.caption)}&size=400&background=D4A845&color=fff&font-size=0.2`;
                }}
              />
              <div className="gallery-caption">{img.caption}</div>
            </div>
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
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(filtered[lightbox.index].caption)}&size=800&background=D4A845&color=fff&font-size=0.15`;
                }}
              />
              <div className="lightbox-caption">{filtered[lightbox.index].caption}</div>
            </div>
            <button className="lightbox-btn lightbox-next" onClick={(e) => { e.stopPropagation(); nextImage(); }}>›</button>
          </div>
        )}
      </section>
    </>
  );
}
