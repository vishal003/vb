'use client';
import { useData } from './DataProvider';

export default function Education() {
  const d = useData();
  return (
    <section className="section section-white">
      <div className="section-title-wrapper">
        <span className="section-bg-text">QUALIFICATION</span>
        <h2 className="section-title">Qualification</h2>
      </div>
      <div style={{ maxWidth: '750px' }}>
        <div className="timeline">
          {d.education.map((edu) => (
            <div className="timeline-item" key={edu.id}>
              <span className="timeline-year">{edu.year}</span>
              <h4 className="timeline-title">{edu.degree}</h4>
              <p className="timeline-subtitle">{edu.institution}</p>
              {edu.description && <p className="timeline-text">{edu.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
