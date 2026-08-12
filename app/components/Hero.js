'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useData } from './DataProvider';
import { Icons } from './Icons';

export default function Hero() {
  const d = useData();
  const [typedText, setTypedText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const texts = d.personal.typingTexts || [];

  useEffect(() => {
    if (texts.length === 0) return;

    const currentText = texts[textIndex];
    let timeout;

    if (!isDeleting) {
      if (charIndex < currentText.length) {
        timeout = setTimeout(() => {
          setTypedText(currentText.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, 80);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setTypedText(currentText.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, 40);
      } else {
        setIsDeleting(false);
        setTextIndex((textIndex + 1) % texts.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts]);

  return (
    <section className="hero-section animate-fade">
      <div className="hero-left-panel" style={{ width: '45%', display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'center', padding: '20px' }}>
        <div className="hero-photo" style={{ width: '100%', height: '70vh', position: 'relative', overflow: 'hidden', borderRadius: '10px' }}>
          <Image
            src={d.personal.photo}
            alt={d.personal.name}
            fill
            sizes="45vw"
            style={{ objectFit: 'cover', objectPosition: 'center top' }}
            priority
          />
        </div>
        <div className="hero-photo-buttons" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', marginTop: '20px', flexWrap: 'wrap' }}>
          <a href="/cv/Teaching%20Statement.pdf" download="Teaching_Statement.pdf" className="btn-statement" style={{ background: 'var(--accent-gradient)', color: 'white', padding: '10px', borderRadius: '8px', textAlign: 'center', fontWeight: '600', fontSize: '14px', flex: '1', minWidth: '120px', height: '64px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', boxShadow: 'var(--shadow-md)', textDecoration: 'none', lineHeight: '1.2', border: 'none' }}>Teaching<br/>Statement</a>
          <a href="/cv/Research%20Statement.pdf" download="Research_Statement.pdf" className="btn-statement" style={{ background: 'var(--accent-gradient)', color: 'white', padding: '10px', borderRadius: '8px', textAlign: 'center', fontWeight: '600', fontSize: '14px', flex: '1', minWidth: '120px', height: '64px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', boxShadow: 'var(--shadow-md)', textDecoration: 'none', lineHeight: '1.2', border: 'none' }}>Research<br/>Statement</a>
          <a href="/cv/Dr_Vishal_Badgujar_Academic_CV%20(3).pdf" download="Dr_Vishal_Badgujar_CV.pdf" className="btn-statement" style={{ background: 'var(--accent-gradient)', color: 'white', padding: '10px', borderRadius: '8px', textAlign: 'center', fontWeight: '600', fontSize: '14px', flex: '1', minWidth: '120px', height: '64px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', boxShadow: 'var(--shadow-md)', textDecoration: 'none', lineHeight: '1.2', border: 'none' }}>Curriculum<br/>Vitae</a>
        </div>
      </div>

      {/* Content Side */}
      <div className="hero-content">
        <p className="hero-greeting animate-fade delay-1" style={{ fontSize: '20px' }}>Hey There!</p>
        <h1 className="hero-name animate-fade delay-2" style={{ fontSize: '56px' }}>
          {d.personal.firstName || d.personal.name}
        </h1>

        <div className="hero-typing animate-fade delay-3" style={{ fontSize: '32px' }}>
          <span>I'am </span>
          <span className="typed-text">{typedText}</span>
          <span className="cursor"></span>
        </div>

        <p className="hero-bio animate-fade delay-4" style={{ fontSize: '18px', textAlign: 'justify', lineHeight: '1.9', maxWidth: '650px' }}>
          {d.personal.bio}
        </p>

        <div className="hero-buttons animate-fade delay-5">
          <a href={d.personal.websiteUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
            {Icons.externalLink} Research Profile
          </a>
        </div>
      </div>
    </section>
  );
}
