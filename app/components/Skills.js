'use client';
import { useState, useEffect, useRef } from 'react';

const SKILLS = [
  { name: 'Cyber Security & Network Security', percent: 90 },
  { name: 'Artificial Intelligence & Machine Learning', percent: 85 },
  { name: 'Cloud Computing (AWS, Azure, Oracle)', percent: 88 },
  { name: 'DevOps & Automation', percent: 92 },
  { name: 'Linux & Open-Source Technologies', percent: 95 },
  { name: 'Research & Academic Writing', percent: 90 },
  { name: 'Big Data Analytics', percent: 80 },
  { name: 'Teaching & Mentoring', percent: 95 },
];

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
  return (
    <section className="section section-white">
      <div className="section-title-wrapper">
        <span className="section-bg-text">KEY SKILLS</span>
        <h2 className="section-title">Key Skills</h2>
        <p className="section-subtitle">Integrity and Perseverance</p>
      </div>
      <div style={{ maxWidth: '700px' }}>
        <div className="skills-section">
          {SKILLS.map((s, i) => (
            <SkillBar key={i} name={s.name} percent={s.percent} />
          ))}
        </div>
      </div>
    </section>
  );
}
