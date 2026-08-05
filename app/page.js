'use client';
import { useState, useCallback } from 'react';
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
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import { Icons } from './components/Icons';

const SECTIONS = [
  { id: 'home', label: 'Home', icon: Icons.home },
  { id: 'about', label: 'About Me', icon: Icons.user },
  { id: 'education', label: 'Qualification', icon: Icons.education },
  { id: 'experience', label: 'Experience', icon: Icons.experience },
  { id: 'skills', label: 'Key Skills', icon: Icons.skills },
  { id: 'certifications', label: 'Certifications', icon: Icons.certificate },
  { id: 'achievements', label: 'Achievements', icon: Icons.trophy },
  { id: 'publications', label: 'Research', icon: Icons.publication },
  { id: 'patents', label: 'Intellectual Property', icon: Icons.patent },
  { id: 'awards', label: 'Awards & Recognition', icon: Icons.award },
  { id: 'associations', label: 'Associations', icon: Icons.handshake },
  { id: 'gallery', label: 'Gallery', icon: Icons.gallery },
  { id: 'contact', label: 'Contact Me', icon: Icons.contact },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = useCallback((id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <Hero />;
      case 'about': return <About />;
      case 'education': return <Education />;
      case 'experience': return <Experience />;
      case 'skills': return <Skills />;
      case 'certifications': return <Certifications />;
      case 'achievements': return <Achievements />;
      case 'publications': return <Publications />;
      case 'patents': return <Patents />;
      case 'awards': return <Awards />;
      case 'associations': return <Associations />;
      case 'gallery': return <Gallery />;
      case 'contact': return <Contact />;
      default: return <Hero />;
    }
  };

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

      <main className="main-content" key={activeTab}>
        {renderContent()}
      </main>
    </div>
  );
}
