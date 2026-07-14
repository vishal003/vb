'use client';
import { useData } from './DataProvider';
import { useEffect, useRef, useState } from 'react';

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => e.target.classList.add('active'), delay); observer.unobserve(e.target); }
    }, { threshold: 0.05 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);
  return <div ref={ref} className="reveal">{children}</div>;
}

function CountUp({ end, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const counted = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !counted.current) {
        counted.current = true;
        const dur = 2000, start = performance.now();
        const step = (now) => {
          const p = Math.min((now - start) / dur, 1);
          setCount(Math.floor((1 - Math.pow(1 - p, 3)) * end));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);
  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Publications() {
  const d = useData();
  const [filter, setFilter] = useState('all');

  const allPubs = [
    ...d.publications.journals.map(p => ({ ...p, type: 'journal' })),
    ...d.publications.conferences.map(p => ({ ...p, type: 'conference' })),
  ];

  const filtered = filter === 'all' ? allPubs :
    filter === 'journal' ? allPubs.filter(p => p.type === 'journal') :
    allPubs.filter(p => p.type === 'conference');

  const springerCount = d.publications.conferences.filter(c => c.indexed === 'Springer').length;
  const ieeeCount = d.publications.conferences.filter(c => c.indexed === 'IEEE').length;

  return (
    <section className="section-dark" id="research">
      <div className="container">
        <Reveal><div className="section-header">
          <span className="section-number">04</span>
          <h2 className="section-title">Research & Publications</h2>
          <p className="section-subtitle">Advancing knowledge through Scopus, IEEE, and Springer indexed publications.</p>
        </div></Reveal>

        <Reveal>
          <div className="pub-stats-row">
            <div className="pub-stat-card">
              <span className="stat-number"><CountUp end={d.stats.citations} suffix="+" /></span>
              <span className="stat-label">Citations</span>
            </div>
            <div className="pub-stat-card">
              <span className="stat-number"><CountUp end={d.stats.hIndex} /></span>
              <span className="stat-label">H-Index</span>
            </div>
            <div className="pub-stat-card">
              <span className="stat-number"><CountUp end={d.stats.i10Index} /></span>
              <span className="stat-label">i10-Index</span>
            </div>
            <div className="pub-stat-card">
              <span className="stat-number"><CountUp end={d.publications.journals.length} /></span>
              <span className="stat-label">Journals</span>
            </div>
            <div className="pub-stat-card">
              <span className="stat-number"><CountUp end={d.publications.conferences.length} /></span>
              <span className="stat-label">Conferences</span>
            </div>
            <div className="pub-stat-card">
              <span className="stat-number"><CountUp end={d.stats.books} /></span>
              <span className="stat-label">Books</span>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="pub-filters">
            <button className={`pub-filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All ({allPubs.length})</button>
            <button className={`pub-filter-btn ${filter === 'journal' ? 'active' : ''}`} onClick={() => setFilter('journal')}>Journals ({d.publications.journals.length})</button>
            <button className={`pub-filter-btn ${filter === 'conference' ? 'active' : ''}`} onClick={() => setFilter('conference')}>Conferences ({d.publications.conferences.length})</button>
          </div>
        </Reveal>

        <div className="pub-list">
          {filtered.map((pub, i) => (
            <Reveal key={pub.id} delay={i * 50}>
              <div className="pub-item">
                <span className="pub-number">{String(i + 1).padStart(2, '0')}</span>
                <div className="pub-info">
                  <h4 className="pub-title">{pub.title}</h4>
                  <p className="pub-authors">{pub.authors}</p>
                  <p className="pub-venue">
                    {pub.type === 'journal' ? pub.journal : pub.conference}
                    {pub.year ? ` • ${pub.year}` : ''}
                  </p>
                </div>
                <span className={`pub-badge ${(pub.indexed || '').toLowerCase().includes('scopus') ? 'scopus' : (pub.indexed || '').toLowerCase().includes('ieee') ? 'ieee' : 'springer'}`}>
                  {pub.indexed}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Patents & Copyrights */}
        <div style={{ marginTop: '80px' }}>
          <Reveal><h3 className="section-title" style={{ fontSize: 'clamp(28px,3vw,40px)', marginBottom: '32px' }}>Patents & Copyrights</h3></Reveal>
          <div className="patents-grid" style={{ marginBottom: '40px' }}>
            {d.patents.map((pat, i) => (
              <Reveal key={pat.id} delay={i * 100}>
                <div className="patent-card" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <span className="patent-status published" style={{ background: 'rgba(45,154,78,0.15)' }}>{pat.status}</span>
                  <h4 className="patent-title" style={{ color: '#e8eaf0' }}>{pat.title}</h4>
                  <div className="patent-meta" style={{ color: '#a0a8c0' }}>
                    <span>📋 Application No. {pat.number}</span>
                    <span>📅 {pat.year}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal><h4 style={{ color: '#e8b84d', fontSize: '18px', fontFamily: 'var(--font-heading)', marginBottom: '20px' }}>Software Copyrights Registered: {d.copyrights.length}</h4></Reveal>
          <div className="pub-list">
            {d.copyrights.map((cr, i) => (
              <Reveal key={cr.id} delay={i * 80}>
                <div className="pub-item">
                  <span className="pub-number">{String(i + 1).padStart(2, '0')}</span>
                  <div className="pub-info">
                    <h4 className="pub-title">{cr.title}</h4>
                    <p className="pub-venue">Reg. No: {cr.regNo} • {cr.date}</p>
                  </div>
                  <span className="pub-badge" style={{ background: 'rgba(166,206,57,0.15)', color: '#a6ce39' }}>©</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
