'use client';
import Image from 'next/image';
import { useData } from './DataProvider';
import { Icons } from './Icons';

export default function Sidebar({ sections, activeTab, onNavigate, isOpen }) {
  const d = useData();

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      {/* Profile Header */}
      <div className="sidebar-header">
        <div className="sidebar-avatar">
          <Image
            src={d.personal.photo}
            alt={d.personal.name}
            width={100}
            height={100}
            priority
          />
        </div>
        <h1 className="sidebar-name">{d.personal.name}</h1>
        <p className="sidebar-title">{d.personal.title}</p>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {sections.map((sec) => (
          <button
            key={sec.id}
            className={`sidebar-link ${activeTab === sec.id ? 'active' : ''}`}
            onClick={() => onNavigate(sec.id)}
          >
            <span className="nav-icon">{sec.icon}</span>
            {sec.label}
            <span className="nav-arrow">›</span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="sidebar-phone">
          <span className="phone-icon" style={{ display: 'flex', alignItems: 'center' }}>{Icons.phone}</span>
          <a href={`tel:${d.personal.phone}`} style={{ color: 'inherit', textDecoration: 'none' }}>
            {d.personal.phone}
          </a>
        </div>
        <div className="sidebar-social">
          <a href={d.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="sidebar-social-icon" title="LinkedIn">{Icons.linkedin}</a>
          <a href={d.socialLinks.googleScholar} target="_blank" rel="noopener noreferrer" className="sidebar-social-icon" title="Google Scholar">{Icons.scholar}</a>
          <a href={d.socialLinks.orcid} target="_blank" rel="noopener noreferrer" className="sidebar-social-icon" title="ORCID">{Icons.orcid}</a>
          <a href={d.socialLinks.scopus} target="_blank" rel="noopener noreferrer" className="sidebar-social-icon" title="Scopus">{Icons.scopus}</a>
        </div>
      </div>
    </aside>
  );
}
