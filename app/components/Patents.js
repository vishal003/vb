'use client';
import { useData } from './DataProvider';

export default function Patents() {
  const d = useData();

  return (
    <section className="section section-white">
      <div className="section-title-wrapper">
        <span className="section-bg-text">INTELLECTUAL PROPERTY</span>
        <h2 className="section-title">Patents & Copyrights</h2>
      </div>

      {/* Patents */}
      <div style={{ marginBottom: '50px' }}>
        <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '20px', color: 'var(--text-dark)' }}>
          Patents ({d.patents.length})
        </h3>
        <div className="ip-grid">
          {d.patents.map(pat => (
            <div className="ip-card" key={pat.id}>
              <h4>{pat.title}</h4>
              <div className="ip-number">Application No: {pat.number} ({pat.year})</div>
              <span className="ip-status">{pat.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Copyrights */}
      <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '20px', color: 'var(--text-dark)' }}>
        Copyrights ({d.copyrights.length})
      </h3>
      <div className="ip-grid">
        {d.copyrights.map(cr => (
          <div className="ip-card" key={cr.id}>
            <h4>{cr.title}</h4>
            <div className="ip-number">Reg. No: {cr.regNo} — {cr.date}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
