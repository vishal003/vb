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

const AWARD_ICONS = ['🏆', '⭐', '🎓', '🏅', '✅', '💡', '📝', '📚', '🌟', '🔍'];

export default function Awards() {
  const d = useData();
  return (
    <section id="awards">
      <div className="container">
        <Reveal><div className="section-header">
          <span className="section-number">05</span>
          <h2 className="section-title">Awards & Recognition</h2>
          <p className="section-subtitle">Honors and achievements in teaching, research, and professional service.</p>
        </div></Reveal>

        <div className="awards-grid">
          {d.awards.map((aw, i) => (
            <Reveal key={aw.id} delay={i * 80}>
              <div className="award-card">
                <div className="award-icon">{AWARD_ICONS[i % AWARD_ICONS.length]}</div>
                <h3 className="award-title">{aw.title}</h3>
                <p className="award-org">{aw.organization}</p>
                {aw.year && <span className="award-year">{aw.year}</span>}
                <p className="award-desc">{aw.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Certifications */}
        <div style={{ marginTop: '80px' }}>
          <Reveal><div className="section-header">
            <span className="section-number">06</span>
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

        {/* Invited Talks */}
        <div style={{ marginTop: '80px' }}>
          <Reveal><div className="section-header">
            <span className="section-number">07</span>
            <h2 className="section-title">Invited Talks</h2>
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

        {/* Funded Projects */}
        <div style={{ marginTop: '80px' }}>
          <Reveal><div className="section-header">
            <span className="section-number">08</span>
            <h2 className="section-title">Funded Projects</h2>
          </div></Reveal>
          {d.fundedProjects.map((fp, i) => (
            <Reveal key={fp.id} delay={i * 100}>
              <div className="experience-card">
                <div className="experience-year-badge" style={{ color: 'var(--accent)', fontStyle: 'normal', fontSize: '16px' }}>{fp.value}</div>
                <div className="experience-info">
                  <h3 className="experience-role">{fp.title}</h3>
                  <p className="experience-org">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                    {fp.funder}
                  </p>
                  <p className="experience-desc">{fp.description}</p>
                  <div className="experience-tags">
                    <span className="experience-tag">Role: {fp.role}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Editorial & Reviewing */}
        <div style={{ marginTop: '80px' }}>
          <Reveal><div className="section-header">
            <span className="section-number">09</span>
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

        {/* UG Projects Guided */}
        <div style={{ marginTop: '80px' }}>
          <Reveal><div className="section-header">
            <span className="section-number">10</span>
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
