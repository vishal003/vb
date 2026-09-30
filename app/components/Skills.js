'use client';
import { useState, useEffect, useRef } from 'react';
import { useData, sectionHeading } from './DataProvider';

function SkillBar({ name, percent }) {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(percent), 200);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [percent]);

  return (
    <div className="skill-item" ref={ref}>
      <div className="skill-header">
        <span className="skill-name">{name}</span>
        <span className="skill-percent">{percent}%</span>
      </div>
      <div className="skill-bar">
        <div className="skill-fill" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}

export default function Skills() {
  const d = useData();
  return (
    <section className="section section-white">
      <div className="section-title-wrapper">
        <span className="section-bg-text">KEY SKILLS</span>
        <h2 className="section-title">{sectionHeading(d, 'skills', 'Key Skills')}</h2>
        <p className="section-subtitle">Integrity and Perseverance</p>
      </div>
      <div style={{ maxWidth: '700px' }}>
        <div className="skills-section">
          {(d.skills || []).map((s) => (
            <SkillBar key={s.id} name={s.name} percent={Number(s.percent) || 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
