'use client';
import { useState, useEffect } from 'react';
import { useData, sectionHeading } from './DataProvider';
import CategoryTabs, { useActiveCategory } from './CategoryTabs';
import FileViewer from './FileViewer';

// Category-specific SVG icons (keyed by category id so renaming a category keeps its icon)
const ISSUER_ICONS = {
  redhat: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.009 13.386c1.577 0 3.86-.326 3.86-2.202 0-1.306-1.12-2.084-3.139-2.084-1.672 0-3.6.477-5.535 1.385l-.86-2.128c2.235-1.078 4.606-1.696 6.8-1.696 3.37 0 5.624 1.467 5.624 4.243 0 3.368-3.487 4.463-6.3 4.463h-.9c-1.525 0-2.162.442-2.162 1.142 0 .654.544 1.023 1.88 1.023h1.177c3.3 0 5.389 1.373 5.389 3.952 0 3.322-3.58 5.088-7.756 5.088-2.7 0-5.03-.605-6.8-1.696l.86-2.128c1.577.744 3.58 1.385 5.535 1.385 2.815 0 4.931-.93 4.931-2.55 0-1.166-.93-1.9-2.908-1.9h-1.177c-2.68 0-4.164-.977-4.164-2.783 0-1.88 1.718-3.09 4.37-3.228l1.275-.292zM6.276 6.1l-1.37 3.3H.854L3.882.8h4.417l2.013 4.836L8.849 6.7z"/>
    </svg>
  ),
  oracle: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7.2 4.8C3.22 4.8 0 8.02 0 12s3.22 7.2 7.2 7.2h9.6c3.98 0 7.2-3.22 7.2-7.2s-3.22-7.2-7.2-7.2H7.2zm0 11.52c-2.38 0-4.32-1.94-4.32-4.32S4.82 7.68 7.2 7.68h9.6c2.38 0 4.32 1.94 4.32 4.32s-1.94 4.32-4.32 4.32H7.2z"/>
    </svg>
  ),
  microsoft: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M0 0h11.5v11.5H0V0zm12.5 0H24v11.5H12.5V0zM0 12.5h11.5V24H0V12.5zm12.5 0H24V24H12.5V12.5z"/>
    </svg>
  ),
  nvidia: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8.948 8.798v-1.43a6.7 6.7 0 0 1 .424-.018c3.922-.124 6.493 3.374 6.493 3.374s-2.78 3.775-5.762 3.775a4.58 4.58 0 0 1-1.155-.149V9.952c1.57.197 1.888.926 2.829 2.348l2.105-1.763s-1.669-1.777-3.93-1.777c-.342 0-.672.019-1.004.038zm0-4.497v2.093l.424-.035c5.125-.2 8.474 4.2 8.474 4.2s-4.057 4.856-7.792 4.856a6.26 6.26 0 0 1-1.106-.098v1.445a7.08 7.08 0 0 0 .899.059c3.43 0 5.934-1.726 8.345-3.764.399.32 2.034 1.1 2.368 1.438-2.24 1.777-7.447 3.785-10.623 3.785a8.42 8.42 0 0 1-.989-.06v1.63h14.073V4.3H8.948zM0 19.7h7.855v-1.26A5.56 5.56 0 0 1 7 18.554c-3.347 0-5.6-2.667-5.6-6.147 0-4.09 3.06-5.95 5.39-6.193V4.28H0V19.7z"/>
    </svg>
  ),
  ibm: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M0 5.6h7.8v1.2H0V5.6zm0 2.4h7.8v1.2H0V8zm0 2.4h4.2v1.2H0v-1.2zm0 2.4h4.2v1.2H0v-1.2zm0 2.4h7.8v1.2H0v-1.2zm0 2.4h7.8V19H0v-1.2zM5.4 10.4h2.4v1.2H5.4v-1.2zm0 2.4h2.4v1.2H5.4v-1.2zM9 5.6h6v1.2H9V5.6zm0 2.4h4.8v1.2h-2.4v1.2h2.4v1.2h-2.4v1.2h2.4v1.2H9V8zm0 9.6h6V19H9v-1.4zm6-2.4h-3.6v1.2H15v-1.2zM16.2 5.6H24v1.2h-7.8V5.6zm0 2.4H24v1.2h-7.8V8zm3.6 2.4H24v1.2h-4.2v-1.2zm0 2.4H24v1.2h-4.2v-1.2zm-3.6 2.4H24v1.2h-7.8v-1.2zm0 2.4H24V19h-7.8v-1.2zm1.2-7.2h2.4v1.2h-2.4v-1.2zm0 2.4h2.4v1.2h-2.4v-1.2z"/>
    </svg>
  ),
  icsi: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  google: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  ),
  nptel: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5" />
    </svg>
  ),
};

// Category brand colors
const ISSUER_COLORS = {
  redhat: '#EE0000',
  oracle: '#F80000',
  microsoft: '#00A4EF',
  nvidia: '#76B900',
  ibm: '#0530AD',
  icsi: '#1B5E20',
  google: '#4285F4',
  nptel: '#E65100',
  cisco: '#049FD9',
  blueprism: '#0F2A4A',
};

function getCertIcon(categoryId) {
  return ISSUER_ICONS[categoryId] || (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}

function getCertColor(categoryId) {
  return ISSUER_COLORS[categoryId] || 'var(--accent)';
}

// Auto-sliding badge strip: moves one badge right-to-left every 3s, loops forever
function BadgeSlider({ badges }) {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || badges.length < 2) return;
    const t = setInterval(() => { setAnimate(true); setIndex(i => i + 1); }, 3000);
    return () => clearInterval(t);
  }, [paused, badges.length]);

  // After sliding onto the duplicated first badge, jump back to the real one without animation
  const onTransitionEnd = () => {
    if (index >= badges.length) { setAnimate(false); setIndex(0); }
  };

  if (badges.length === 0) return null;

  return (
    <div className="badge-slider" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div
        className="badge-track"
        style={{ '--idx': index, transition: animate ? undefined : 'none' }}
        onTransitionEnd={onTransitionEnd}
      >
        {[...badges, ...badges].map((b, i) => (
          <div className="badge-slide" key={`${b.id}-${i}`} aria-hidden={i >= badges.length}>
            <img src={encodeURI(b.src)} alt={b.title || 'Badge'} title={b.title} loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Certifications() {
  const d = useData();
  const categories = d.certifications?.categories || [];
  const [active, setActive] = useActiveCategory(categories);
  const [viewing, setViewing] = useState(null);

  return (
    <section className="section section-white">
      <div className="section-title-wrapper">
        <span className="section-bg-text">CERTIFICATIONS</span>
        <h2 className="section-title" style={{ fontSize: '32px' }}>{sectionHeading(d, 'certifications', 'Certifications and Badges Earned')}</h2>
      </div>

      <BadgeSlider badges={d.badges || []} />

      <CategoryTabs categories={categories} active={active} onChange={setActive} />

      <div className="cert-grid">
        {(active?.items || []).map((cert) => {
          const brandColor = getCertColor(active.id);
          return (
            <div
              className={`cert-item ${cert.file ? 'cert-item-clickable' : ''}`}
              key={cert.id}
              onClick={cert.file ? () => setViewing(cert) : undefined}
              role={cert.file ? 'button' : undefined}
              tabIndex={cert.file ? 0 : undefined}
              onKeyDown={cert.file ? (e) => { if (e.key === 'Enter') setViewing(cert); } : undefined}
            >
              <span
                className="cert-icon"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: brandColor,
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: `${brandColor}15`,
                  flexShrink: 0,
                }}
              >
                {getCertIcon(active.id)}
              </span>
              <div className="cert-info">
                <div className="cert-title">{cert.title}</div>
                {cert.details && <div className="cert-issuer">{cert.details}</div>}
                {cert.certId && cert.certId !== '-' && <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>ID: {cert.certId}</div>}
                {cert.file && <div className="cert-view-hint">View certificate →</div>}
              </div>
            </div>
          );
        })}
      </div>

      {viewing && <FileViewer file={viewing.file} title={viewing.title} onClose={() => setViewing(null)} />}
    </section>
  );
}
