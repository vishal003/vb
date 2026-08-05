'use client';
import { useData } from './DataProvider';
import { Icons } from './Icons';

export default function Associations() {
  const d = useData();
  const memberships = d.professionalActivities?.memberships || [];

  return (
    <section className="section section-white">
      <div className="section-title-wrapper">
        <span className="section-bg-text">ASSOCIATIONS</span>
        <h2 className="section-title">Associations & Memberships</h2>
      </div>
      <div className="cert-grid">
        {memberships.map((mem) => (
          <div className="cert-item" key={mem.id}>
            <span className="cert-icon" style={{ display: 'flex', alignItems: 'center' }}>{Icons.handshake}</span>
            <div className="cert-info">
              <div className="cert-title">{mem.organization}</div>
              <div className="cert-issuer">{mem.membershipId}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
