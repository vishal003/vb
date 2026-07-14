'use client';
import { useData } from './DataProvider';
import { useEffect, useRef } from 'react';

function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => e.target.classList.add('active'), delay); observer.unobserve(e.target); }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

export default function Education() {
  const d = useData();
  return (
    <section id="education">
      <div className="container">
        <Reveal><div className="section-header">
          <span className="section-number">02</span>
          <h2 className="section-title">Education</h2>
          <p className="section-subtitle">Academic journey from school to doctoral research.</p>
        </div></Reveal>
        <div className="timeline">
          {d.education.map((edu, i) => (
            <Reveal key={edu.id} delay={i * 100}>
              <div className="timeline-item">
                <span className="timeline-year">{edu.year}</span>
                <div className="timeline-card">
                  <h3 className="timeline-role">{edu.degree}</h3>
                  <p className="timeline-institution">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                    {edu.institution}
                  </p>
                  {edu.description && <p className="timeline-description">{edu.description}</p>}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
