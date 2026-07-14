'use client';
import { useData } from './DataProvider';
import { useEffect, useRef } from 'react';

function RevealSection({ children, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { e.target.classList.add('active'); observer.unobserve(e.target); }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

export default function About() {
  const d = useData();
  return (
    <section className="section-alt" id="about">
      <div className="container">
        <RevealSection>
          <div className="section-header">
            <span className="section-number">01</span>
            <h2 className="section-title">About Me</h2>
          </div>
        </RevealSection>

        <div className="about-grid">
          <div className="about-sidebar">
            <RevealSection>
              <div className="sidebar-block">
                <h3 className="sidebar-label">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  Personal Info
                </h3>
                <div className="info-list">
                  <div className="info-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                    <div><span className="info-label">Department</span><span className="info-value">{d.personal.department}</span></div>
                  </div>
                  <div className="info-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                    <div><span className="info-label">Institution</span><span className="info-value">{d.personal.institution}</span></div>
                  </div>
                  <div className="info-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    <div><span className="info-label">Location</span><span className="info-value">Kalyan West, Maharashtra, India</span></div>
                  </div>
                  <div className="info-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    <div><span className="info-label">Email</span><span className="info-value">{d.personal.email}</span></div>
                  </div>
                  <div className="info-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    <div><span className="info-label">Phone</span><span className="info-value">{d.personal.phone}</span></div>
                  </div>
                  <div className="info-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                    <div><span className="info-label">Languages</span><span className="info-value">{d.personal.languages.join(', ')}</span></div>
                  </div>
                </div>
              </div>
            </RevealSection>

            <RevealSection>
              <div className="sidebar-block">
                <h3 className="sidebar-label">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  Research Interests
                </h3>
                <div className="tags-grid">
                  {d.areasOfInterest.map((area, i) => (
                    <span key={i} className="tag">{area}</span>
                  ))}
                </div>
              </div>
            </RevealSection>

            <RevealSection>
              <div className="sidebar-block">
                <h3 className="sidebar-label">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                  Research Profiles
                </h3>
                <div className="research-profiles-grid">
                  {d.researchProfiles.map(rp => (
                    <a key={rp.id} href={rp.url} target="_blank" rel="noopener noreferrer" className="research-profile-card" style={{ '--rp-color': rp.color }}>
                      <span className="rp-icon" style={{ color: rp.color, fontSize: '28px' }}>
                        {rp.icon === 'google-scholar' && '🎓'}
                        {rp.icon === 'scopus' && '📊'}
                        {rp.icon === 'orcid' && '🔬'}
                        {rp.icon === 'wos' && '🌐'}
                        {rp.icon === 'vidwan' && '👨‍🎓'}
                        {rp.icon === 'linkedin' && '💼'}
                      </span>
                      <span className="rp-name">{rp.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </RevealSection>
          </div>

          <div className="about-main">
            <RevealSection>
              <p className="about-bio">{d.personal.bio}</p>
            </RevealSection>

            <RevealSection>
              <div className="sidebar-block" style={{ marginBottom: '24px' }}>
                <h3 className="sidebar-label">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>
                  Professional Memberships
                </h3>
                <div className="memberships-list">
                  {d.professionalActivities.memberships.map(m => (
                    <div key={m.id} className="membership-item">
                      <span className="membership-org">{m.organization}</span>
                      <span className="membership-id">{m.membershipId}</span>
                    </div>
                  ))}
                </div>
              </div>
            </RevealSection>

            <RevealSection>
              <div className="sidebar-block" style={{ marginBottom: '24px' }}>
                <h3 className="sidebar-label">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                  Books Authored
                </h3>
                {d.books.map(book => (
                  <div key={book.id} className="book-item">
                    <h4 className="book-title">{book.title}</h4>
                    <p className="book-publisher">{book.publisher} ({book.year})</p>
                  </div>
                ))}
              </div>
            </RevealSection>

            <RevealSection>
              <div className="sidebar-block">
                <h3 className="sidebar-label">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                  Academic Leadership
                </h3>
                <ul className="leadership-list">
                  {d.professionalActivities.leadership.map((item, i) => (
                    <li key={i} className="leadership-item">{item}</li>
                  ))}
                </ul>
              </div>
            </RevealSection>
          </div>
        </div>
      </div>
    </section>
  );
}
