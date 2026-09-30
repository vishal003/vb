'use client';
import Image from 'next/image';
import { useData } from './DataProvider';
import { profilePhotoSrc, isUnoptimizedImage } from '@/lib/data';

export default function Sidebar({ sections, activeTab, onNavigate, isOpen }) {
  const d = useData();

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      {/* Profile Header */}
      <div className="sidebar-header">
        <div className="sidebar-avatar">
          <Image
            src={profilePhotoSrc(d.personal.photo)}
            alt={d.personal.name}
            unoptimized={isUnoptimizedImage(d.personal.photo)}
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
            {d.sectionTitles?.[sec.id]?.label || sec.label}
            <span className="nav-arrow">›</span>
          </button>
        ))}
      </nav>

    </aside>
  );
}
