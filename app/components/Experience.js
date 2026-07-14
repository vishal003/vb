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

export default function Experience() {
  const d = useData();
  return (
    <section className="section-alt" id="experience">
      <div className="container">
        <Reveal><div className="section-header">
          <span className="section-number">03</span>
          <h2 className="section-title">Experience</h2>
          <p className="section-subtitle">Over 11 years of teaching and research excellence.</p>
        </div></Reveal>
        <div className="experience-grid">
          {d.experience.map((exp, i) => (
            <Reveal key={exp.id} delay={i * 100}>
              <div className="experience-card">
                <div className="experience-year-badge">{exp.duration}</div>
                <div className="experience-info">
                  <h3 className="experience-role">{exp.role}</h3>
                  <p className="experience-org">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                    {exp.organization}
                  </p>
                  <p className="experience-desc">{exp.description}</p>
                  {exp.responsibilities && (
                    <div className="experience-tags">
                      {exp.responsibilities.map((r, j) => (
                        <span key={j} className="experience-tag">{r}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
