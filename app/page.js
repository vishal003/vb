'use client';
import { useState, useCallback, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Achievements from './components/Achievements';
import Publications from './components/Publications';
import Patents from './components/Patents';
import Awards from './components/Awards';
import Associations from './components/Associations';
import InvitedTalks from './components/InvitedTalks';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import ProfessionalActivities from './components/ProfessionalActivities';
import RecentNews from './components/RecentNews';
import { useData } from './components/DataProvider';
import { Icons } from './components/Icons';
import { useTheme } from './components/ThemeProvider';

const SECTIONS = [
  { id: 'home', label: 'Home', icon: Icons.home },
  { id: 'about', label: 'About Me', icon: Icons.user },
  { id: 'education', label: 'Qualification', icon: Icons.education },
  { id: 'experience', label: 'Experience', icon: Icons.experience },
  { id: 'skills', label: 'Key Skills', icon: Icons.skills },
  { id: 'certifications', label: 'Certifications & Badges', icon: Icons.certificate },
  { id: 'achievements', label: 'Achievements', icon: Icons.trophy },
  { id: 'publications', label: 'Research', icon: Icons.publication },
  { id: 'patents', label: 'Intellectual Property', icon: Icons.patent },
  { id: 'awards', label: 'Awards & Recognition', icon: Icons.award },
  { id: 'associations', label: 'Associations', icon: Icons.handshake },
  { id: 'activities', label: 'Professional Activities', icon: Icons.briefcase },
  { id: 'invitedTalks', label: 'Invited Talks', icon: Icons.award },
  { id: 'recentNews', label: 'Recent News', icon: Icons.news },
  { id: 'gallery', label: 'Gallery', icon: Icons.gallery },
  { id: 'contact', label: 'Contact Me', icon: Icons.contact },
];

export default function Home() {
  const d = useData();
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    SECTIONS.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNav = useCallback((id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="layout-wrapper">
      <button
        className="mobile-menu-btn"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle Menu"
      >
        {mobileMenuOpen ? '✕' : '☰'}
      </button>

      <div
        className={`mobile-overlay ${mobileMenuOpen ? 'active' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      <Sidebar
        sections={SECTIONS}
        activeTab={activeTab}
        onNavigate={handleNav}
        isOpen={mobileMenuOpen}
      />

      <main className="main-content">
        <div id="home"><Hero /></div>
        <div id="about"><About /></div>
        <div id="education"><Education /></div>
        <div id="experience"><Experience /></div>
        <div id="skills"><Skills /></div>
        <div id="certifications"><Certifications /></div>
        <div id="achievements"><Achievements /></div>
        <div id="publications"><Publications /></div>
        <div id="patents"><Patents /></div>
        <div id="awards"><Awards /></div>
        <div id="associations"><Associations /></div>
        <div id="activities"><ProfessionalActivities /></div>
        <div id="invitedTalks"><InvitedTalks /></div>
        <div id="recentNews"><RecentNews /></div>
        <div id="gallery"><Gallery /></div>
        <div id="contact"><Contact /></div>

        <footer className="footer">
          <p>© {new Date().getFullYear()} {d.personal.name}. All Rights Reserved.</p>
        </footer>
      </main>

      {/* Theme Toggle Button */}
      <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle theme" title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}>
        {theme === 'light' ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        )}
      </button>
    </div>
  );
}
