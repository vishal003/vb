'use client';
import { useData, sectionHeading } from './DataProvider';

export default function Achievements() {
  const d = useData();
  return (
    <section className="section section-white">
      <div className="section-title-wrapper">
        <span className="section-bg-text">ACHIEVEMENTS</span>
        <h2 className="section-title">{sectionHeading(d, 'achievements', 'Achievements')}</h2>
      </div>
      <div className="achievements-grid">
        {(d.achievements || []).map((a, i) => (
          <div className={`achievement-item animate-fade delay-${Math.min(i + 1, 5)}`} key={a.id}>
            <div className="achievement-number">{a.value}</div>
            <div className="achievement-label">{a.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
