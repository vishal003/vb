'use client';
import { useData } from './DataProvider';

export default function Achievements() {
  const d = useData();
  return (
    <section className="section section-white">
      <div className="section-title-wrapper">
        <span className="section-bg-text">ACHIEVEMENTS</span>
        <h2 className="section-title">Achievements</h2>
      </div>
      <div className="achievements-grid">
        <div className="achievement-item animate-fade delay-1">
          <div className="achievement-number">{d.stats.publications}</div>
          <div className="achievement-label">Research Papers</div>
        </div>
        <div className="achievement-item animate-fade delay-2">
          <div className="achievement-number">{d.stats.citations}+</div>
          <div className="achievement-label">Citations</div>
        </div>
        <div className="achievement-item animate-fade delay-3">
          <div className="achievement-number">{d.stats.patents}</div>
          <div className="achievement-label">Patents</div>
        </div>
        <div className="achievement-item animate-fade delay-4">
          <div className="achievement-number">{d.stats.books}</div>
          <div className="achievement-label">Books</div>
        </div>
        <div className="achievement-item animate-fade delay-5">
          <div className="achievement-number">{d.stats.copyrights}</div>
          <div className="achievement-label">Copyrights</div>
        </div>
      </div>
    </section>
  );
}
