'use client';
import { useData } from './DataProvider';
import { useEffect, useRef } from 'react';

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

// Contextual icons based on award content
function getAwardIcon(title, org) {
  const t = (title + ' ' + org).toLowerCase();
  if (t.includes('ieee')) return '⚡';
  if (t.includes('red hat')) return '🎩';
  if (t.includes('gate')) return '🎓';
  if (t.includes('reviewer') || t.includes('review')) return '📝';
  if (t.includes('best faculty') || t.includes('performance')) return '🏆';
  if (t.includes('blueprism') || t.includes('educator')) return '🤖';
  if (t.includes('nptel') || t.includes('translation')) return '🌐';
  if (t.includes('csta')) return '💻';
  return '⭐';
}

export default function Awards() {
  const d = useData();
  return (
    <section id="awards">
      <div className="container">
        {/* ─── Awards & Recognition ─── */}
        <Reveal><div className="section-title-wrapper" style={{ marginTop: '0' }}>
          <span className="section-bg-text">AWARDS</span>
          <h2 className="section-title">Awards & Recognition</h2>
          <p className="section-subtitle">Honors and achievements in teaching, research, and professional service.</p>
        </div></Reveal>

        <div className="awards-structured-grid">
          {d.awards.map((aw, i) => (
            <Reveal key={aw.id} delay={i * 60}>
              <div className="award-structured-card">
                <div className="award-structured-icon">
                  {getAwardIcon(aw.title, aw.organization)}
                </div>
                <div className="award-structured-content">
                  <h3 className="award-structured-title">{aw.title}</h3>
                  <p className="award-structured-org">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', verticalAlign: '-2px', opacity: 0.5 }}>
                      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                      <path d="M9 22v-4h6v4" />
                      <line x1="8" y1="6" x2="10" y2="6" /><line x1="14" y1="6" x2="16" y2="6" />
                      <line x1="8" y1="10" x2="10" y2="10" /><line x1="14" y1="10" x2="16" y2="10" />
                    </svg>
                    {aw.organization}
                  </p>
                  {aw.year && <span className="award-structured-year">{aw.year}</span>}
                  {aw.description && <p className="award-structured-desc">{aw.description}</p>}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ─── Certifications ─── */}
        <div style={{ marginTop: '80px' }}>
          <Reveal><div className="section-title-wrapper">
            <span className="section-bg-text">CERTIFICATIONS</span>
            <h2 className="section-title">Certifications</h2>
            <p className="section-subtitle">Industry-recognized professional certifications.</p>
          </div></Reveal>

          <div className="certs-grid">
            {d.certifications.map((cert, i) => (
              <Reveal key={cert.id} delay={i * 60}>
                <div className="cert-card">
                  <div className="cert-icon">
                    {cert.category.includes('Cloud') && '☁️'}
                    {cert.category.includes('AI') && '🤖'}
                    {cert.category.includes('Cyber') && '🔒'}
                    {cert.category.includes('Teaching') && '📚'}
                  </div>
                  <div>
                    <h4 className="cert-title">{cert.title}</h4>
                    <p className="cert-issuer">{cert.issuer}</p>
                    <div className="cert-meta">
                      <span className="cert-category">{cert.category}</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ─── Invited Talks ─── */}
        <div style={{ marginTop: '80px' }}>
          <Reveal><div className="section-title-wrapper">
            <span className="section-bg-text">TALKS</span>
            <h2 className="section-title">Invited Talks</h2>
            <p className="section-subtitle">Expert sessions delivered at various institutions and conferences.</p>
          </div></Reveal>
          <div className="fdp-list">
            {d.invitedTalks.map((talk, i) => (
              <Reveal key={talk.id} delay={i * 80}>
                <div className="fdp-item">
                  <div>
                    <h4 className="fdp-title">{talk.title}</h4>
                    <p className="fdp-organizer">{talk.venue} — {talk.type}</p>
                  </div>
                  <div className="fdp-meta">
                    {talk.year && <span className="fdp-year">{talk.year}</span>}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ─── Funded Projects ─── */}
        <div style={{ marginTop: '80px' }}>
          <Reveal><div className="section-title-wrapper">
            <span className="section-bg-text">FUNDING</span>
            <h2 className="section-title">Funded Projects</h2>
            <p className="section-subtitle">Research projects supported by government and institutional funding.</p>
          </div></Reveal>
          {d.fundedProjects.map((fp, i) => (
            <Reveal key={fp.id} delay={i * 100}>
              <div className="funded-project-card">
                <div className="funded-project-header">
                  <div className="funded-project-value">{fp.value}</div>
                  <span className="funded-project-role">{fp.role}</span>
                </div>
                <h3 className="funded-project-title">{fp.title}</h3>
                <p className="funded-project-funder">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', verticalAlign: '-2px', opacity: 0.5 }}>
                    <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                  </svg>
                  {fp.funder}
                </p>
                <p className="funded-project-desc">{fp.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ─── Editorial & Reviewing ─── */}
        <div style={{ marginTop: '80px' }}>
          <Reveal><div className="section-title-wrapper">
            <span className="section-bg-text">EDITORIAL</span>
            <h2 className="section-title">Editorial & Reviewing</h2>
            <p className="section-subtitle">Active reviewer for top-tier Elsevier, Springer journals and international conferences.</p>
          </div></Reveal>
          <div className="activities-grid">
            <Reveal>
              <div className="activity-group">
                <h3 className="activity-group-title">📝 Editorial Roles</h3>
                {d.professionalActivities.editorial.map(e => (
                  <div key={e.id} className="activity-item">
                    <p className="activity-role">{e.role}</p>
                    <p className="activity-org">{e.journal}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="activity-group">
                <h3 className="activity-group-title">🔍 Journal Reviewer ({d.professionalActivities.reviewer.length} Journals)</h3>
                {d.professionalActivities.reviewer.map(r => (
                  <div key={r.id} className="activity-item">
                    <p className="activity-role">{r.journal}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        {/* ─── UG Projects Guided ─── */}
        <div style={{ marginTop: '80px' }}>
          <Reveal><div className="section-title-wrapper">
            <span className="section-bg-text">GUIDANCE</span>
            <h2 className="section-title">UG Projects Guided</h2>
            <p className="section-subtitle">{d.ugProjectsGuided.length} undergraduate projects guided in AI, ML, IoT, and Cyber Security.</p>
          </div></Reveal>
          <div className="certs-grid">
            {d.ugProjectsGuided.map((proj, i) => (
              <Reveal key={i} delay={i * 50}>
                <div className="cert-card" style={{ alignItems: 'center' }}>
                  <div className="cert-icon">🎯</div>
                  <div><h4 className="cert-title" style={{ fontSize: '14px' }}>{proj}</h4></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
