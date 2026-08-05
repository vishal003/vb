'use client';
import { useData } from './DataProvider';
import { Icons } from './Icons';

export default function About() {
  const d = useData();

  const services = [
    { icon: Icons.teaching, title: 'Teaching', desc: 'Delivering high-quality education in Computer Engineering and IT, mentoring students, and guiding academic projects with over 11 years of experience.' },
    { icon: Icons.research, title: 'Research', desc: 'Conducting advanced research in Cyber Security, AI, and Cloud Computing with 200+ Google Scholar citations and Scopus indexed publications.' },
    { icon: Icons.openSource, title: 'Open-Source & DevOps', desc: 'Active contribution to open-source technologies, Red Hat Academy coordination, and DevOps Club mentorship at APSIT.' },
    { icon: Icons.reviewer, title: 'Reviewer & Editor', desc: 'Providing expert reviews for prestigious journals from Elsevier, Springer, and Web of Science with excellent reviewer ratings.' },
  ];

  return (
    <>
      {/* About Section */}
      <section className="section section-white">
        <div className="section-title-wrapper">
          <span className="section-bg-text">ABOUT ME</span>
          <h2 className="section-title">About Me</h2>
        </div>

        <div style={{ maxWidth: '800px', margin: '0 auto 40px' }}>
          <p style={{ fontSize: '16px', color: 'var(--text-muted)', lineHeight: '1.9', textAlign: 'center' }}>
            {d.personal.bio}
          </p>
        </div>

        {/* Info Table */}
        <div style={{ maxWidth: '700px', margin: '0 auto 50px' }}>
          <div className="info-table">
            <div className="info-row">
              <span className="info-label">Full Name</span>
              <span className="info-value">{d.personal.name}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Department</span>
              <span className="info-value">{d.personal.department}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Institution</span>
              <span className="info-value">{d.personal.institution}</span>
            </div>
            <div className="info-row">
              <span className="info-label">University</span>
              <span className="info-value">{d.personal.university}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Email</span>
              <span className="info-value">
                <a href={`mailto:${d.personal.email}`}>{d.personal.email}</a>
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">Phone</span>
              <span className="info-value">{d.personal.phone}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Languages</span>
              <span className="info-value">{d.personal.languages?.join(', ')}</span>
            </div>
          </div>
        </div>

        {/* What I Do */}
        <div className="section-title-wrapper" style={{ marginBottom: '30px' }}>
          <h3 className="section-title" style={{ fontSize: '24px' }}>What I Do</h3>
        </div>

        <div className="services-grid">
          {services.map((s, i) => (
            <div className="service-card animate-fade" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="service-icon" style={{ color: 'var(--accent)' }}>{s.icon}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Research Profiles Section */}
      <section className="section section-alt">
        <div className="section-title-wrapper">
          <span className="section-bg-text">RESEARCH</span>
          <h3 className="section-title" style={{ fontSize: '24px' }}>Research Links</h3>
        </div>
        <div className="research-grid">
          {d.researchProfiles.map(rp => (
            <a key={rp.id} href={rp.url} target="_blank" rel="noopener noreferrer" className="research-link-card">
              <div className="research-link-icon" style={{ background: `${rp.color}15`, color: rp.color }}>
                {rp.icon === 'google-scholar' && Icons.scholar}
                {rp.icon === 'scopus' && Icons.scopus}
                {rp.icon === 'orcid' && Icons.orcid}
                {rp.icon === 'wos' && Icons.globe}
                {rp.icon === 'vidwan' && Icons.education}
                {rp.icon === 'linkedin' && Icons.linkedin}
              </div>
              <div className="research-link-info">
                <h4>{rp.name}</h4>
                <p>{rp.description}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
