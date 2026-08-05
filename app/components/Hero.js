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
      {/* Photo Side */}
      <div className="hero-photo">
        <Image
          src={d.personal.photo}
          alt={d.personal.name}
          fill
          sizes="45vw"
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
          priority
        />
      </div>

      {/* Content Side */}
      <div className="hero-content">
        <p className="hero-greeting animate-fade delay-1">Hey There!</p>
        <h1 className="hero-name animate-fade delay-2">
          {d.personal.firstName || d.personal.name}
        </h1>

        <div className="hero-typing animate-fade delay-3">
          <span>I'am </span>
          <span className="typed-text">{typedText}</span>
          <span className="cursor"></span>
        </div>

        <p className="hero-bio animate-fade delay-4">
          {d.personal.bio}
        </p>

        <div className="hero-buttons animate-fade delay-5">
          {d.personal.cvFile && (
            <a href={d.personal.cvFile} download="Dr_Vishal_Badgujar_Academic_CV.pdf" className="btn-primary">
              {Icons.download} Curriculum Vitae
            </a>
          )}
          <a href={d.personal.websiteUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
            {Icons.externalLink} Research Profile
          </a>
        </div>
      </div>
    </section>
  );
}
