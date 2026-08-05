'use client';
import { useData } from './DataProvider';
import { Icons } from './Icons';

export default function Contact() {
  const d = useData();

  return (
    <>
      <section className="section section-white">
        <div className="section-title-wrapper">
          <span className="section-bg-text">CONTACT</span>
          <h2 className="section-title">Contact Me</h2>
        </div>

        {/* Contact Cards */}
        <div className="contact-grid">
          <div className="contact-card">
            <div className="contact-card-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>{Icons.mail}</div>
            <div className="contact-card-info">
              <h4>Email</h4>
              <a href={`mailto:${d.personal.email}`}>{d.personal.email}</a>
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-card-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>{Icons.phone}</div>
            <div className="contact-card-info">
              <h4>Phone</h4>
              <a href={`tel:${d.personal.phone}`}>{d.personal.phone}</a>
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-card-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>{Icons.building}</div>
            <div className="contact-card-info">
              <h4>Institution</h4>
              <p>{d.personal.institution}</p>
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-card-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>{Icons.mapPin}</div>
            <div className="contact-card-info">
              <h4>Address</h4>
              <p>{d.personal.address}</p>
            </div>
          </div>
        </div>

        {/* Social Profiles */}
        <div style={{ marginTop: '40px' }}>
          <div className="section-title-wrapper" style={{ marginBottom: '25px' }}>
            <h3 className="section-title" style={{ fontSize: '22px' }}>Connect With Me</h3>
          </div>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href={d.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="research-link-card" style={{ minWidth: '200px', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', color: '#0A66C2' }}>{Icons.linkedin}</div>
              <span style={{ fontWeight: '600', fontSize: '14px' }}>LinkedIn</span>
            </a>
            <a href={d.socialLinks.googleScholar} target="_blank" rel="noopener noreferrer" className="research-link-card" style={{ minWidth: '200px', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', color: '#4285F4' }}>{Icons.scholar}</div>
              <span style={{ fontWeight: '600', fontSize: '14px' }}>Google Scholar</span>
            </a>
            <a href={d.socialLinks.orcid} target="_blank" rel="noopener noreferrer" className="research-link-card" style={{ minWidth: '200px', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', color: '#A6CE39' }}>{Icons.orcid}</div>
              <span style={{ fontWeight: '600', fontSize: '14px' }}>ORCID</span>
            </a>
            <a href={d.personal.websiteUrl} target="_blank" rel="noopener noreferrer" className="research-link-card" style={{ minWidth: '200px', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', color: 'var(--accent)' }}>{Icons.globe}</div>
              <span style={{ fontWeight: '600', fontSize: '14px' }}>Website</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} {d.personal.name}. All Rights Reserved.</p>
      </footer>
    </>
  );
}
