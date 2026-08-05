'use client';
import { useData } from './DataProvider';

export default function Experience() {
  const d = useData();
  return (
    <section className="section section-white">
      <div className="section-title-wrapper">
        <span className="section-bg-text">EXPERIENCE</span>
        <h2 className="section-title">Experience</h2>
        <p className="section-subtitle">Total Experience: {d.stats.yearsExperience}+ Years</p>
      </div>
      <div style={{ maxWidth: '750px' }}>
        <div className="timeline">
          {d.experience.map((exp) => (
            <div className="timeline-item" key={exp.id}>
              <span className="timeline-year">{exp.duration}</span>
              <h4 className="timeline-title">{exp.role}</h4>
              <p className="timeline-subtitle">{exp.organization}</p>
              {exp.description && <p className="timeline-text">{exp.description}</p>}
              {exp.responsibilities && exp.responsibilities.length > 0 && (
                <ul style={{ marginTop: '8px', paddingLeft: '0' }}>
                  {exp.responsibilities.map((r, i) => (
                    <li key={i} style={{ fontSize: '13px', color: 'var(--text-light)', padding: '3px 0', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      </span>
                      {r}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
