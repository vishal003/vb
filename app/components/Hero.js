'use client';
import { useEffect, useRef, useState } from 'react';
import { useData } from './DataProvider';

export default function Hero() {
  const d = useData();
  const [typedText, setTypedText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing effect
  useEffect(() => {
    const texts = d.personal.typingTexts;
    const current = texts[textIndex % texts.length];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setTypedText(current.substring(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
        if (charIndex + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setTypedText(current.substring(0, charIndex - 1));
        setCharIndex(prev => prev - 1);
        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setTextIndex(prev => prev + 1);
        }
      }
    }, isDeleting ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, d.personal.typingTexts]);

  return (
    <section className="hero" id="home" style={{ padding: '120px 0 60px 0', background: 'var(--bg-primary)', overflow: 'hidden', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <style jsx>{`
        @keyframes float1 { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
        @keyframes float2 { 0%,100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-20px) rotate(10deg); } }
        @keyframes float3 { 0%,100% { transform: translateY(0px) scale(1); } 50% { transform: translateY(-10px) scale(1.1); } }
        @keyframes pulse-ring { 0% { transform: scale(0.8); opacity: 0.5; } 50% { transform: scale(1.2); opacity: 0.15; } 100% { transform: scale(0.8); opacity: 0.5; } }
        @keyframes orbit { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .hero-dot { border-radius: 50%; position: absolute; z-index: 0; }
        
        .hero-container {
          width: 100%;
          max-width: 1300px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 5%;
          gap: 40px;
        }
        .hero-left {
          max-width: 520px;
          flex-shrink: 0;
        }
        .hero-right {
          position: relative;
          width: 440px;
          height: 500px;
          flex-shrink: 0;
        }
        
        .glow-circle {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 400px; height: 400px; border-radius: 50%;
          background: radial-gradient(circle, rgba(33,113,99,0.35) 0%, rgba(33,113,99,0.12) 50%, transparent 70%);
          z-index: 0; filter: blur(20px);
        }
        .ring-1 {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 360px; height: 360px; border-radius: 50%;
          border: 1px solid rgba(33,113,99,0.25);
          z-index: 0; animation: pulse-ring 4s ease-in-out infinite;
        }
        .ring-2 {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 440px; height: 440px; border-radius: 50%;
          border: 1px solid rgba(33,113,99,0.12);
          z-index: 0; animation: pulse-ring 4s ease-in-out infinite 1s;
        }
        .dashed-circle {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 320px; height: 320px; border-radius: 50%;
          border: 1px dashed rgba(33,113,99,0.2);
          z-index: 0; animation: orbit 30s linear infinite;
        }
        .profile-img {
          position: absolute; bottom: 0; left: 50%;
          transform: translateX(-50%);
          width: 350px; height: auto; z-index: 1;
          border-radius: 12px;
          object-fit: cover;
        }
        .exp-badge {
          position: absolute; bottom: 15%; left: -5%;
          background: var(--bg-card); padding: 14px 20px; border-radius: 12px;
          box-shadow: var(--shadow-lg); display: flex; align-items: center; gap: 10px; z-index: 2; backdrop-filter: blur(10px);
        }
        .cert-badge {
          position: absolute; top: 30%; right: -5%;
          background: var(--bg-card); padding: 14px; border-radius: 12px;
          box-shadow: var(--shadow-lg); display: flex; flex-direction: column; align-items: center; gap: 6px; z-index: 2; text-align: center; backdrop-filter: blur(10px);
        }

        @media (max-width: 900px) {
          .hero-container {
            flex-direction: column;
            text-align: center;
            gap: 60px;
            margin-top: 40px;
          }
          .hero-left {
            max-width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        }
        @media (max-width: 500px) {
          .hero-right {
            width: 100%;
            max-width: 320px;
            height: 380px;
            margin: 0 auto;
          }
          .glow-circle { width: 280px; height: 280px; }
          .ring-1 { width: 260px; height: 260px; }
          .ring-2 { width: 320px; height: 320px; }
          .dashed-circle { width: 220px; height: 220px; }
          .profile-img { width: 260px; }
          .exp-badge { left: -10%; bottom: 5%; transform: scale(0.85); transform-origin: left bottom; }
          .cert-badge { right: -10%; top: 10%; transform: scale(0.85); transform-origin: right top; }
        }
      `}</style>

      <div className="hero-container">

        {/* LEFT — Text content */}
        <div className="hero-left">
          <h1 className="hero-name" style={{ fontSize: 'clamp(42px, 5vw, 76px)', fontWeight: 800, lineHeight: 1.1, color: 'var(--text-primary)', marginBottom: '16px' }}>
            Hey There,<br />I&apos;m <span>{d.personal.firstName}</span>
          </h1>

          <div style={{ height: '40px', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '22px', color: 'var(--primary)', fontWeight: 700, margin: 0 }}>
              {typedText}<span style={{ animation: 'blink 1s step-end infinite' }}>|</span>
            </h2>
          </div>

          <p style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '32px', lineHeight: 1.7 }}>
            {d.personal.objective}
          </p>

          <a href={d.personal.cvFile} download target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '14px 30px', background: 'var(--primary)', color: 'white',
            borderRadius: '40px', fontSize: '15px', fontWeight: 700,
            textDecoration: 'none'
          }}>
            Download CV
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          </a>
        </div>

        {/* RIGHT — Image with effects */}
        <div className="hero-right">
          {/* Glow gradient circle behind image */}
          <div className="glow-circle" />

          {/* Pulsing ring effect */}
          <div className="ring-1" />
          <div className="ring-2" />

          {/* Floating decorative dots */}
          <div className="hero-dot" style={{ top: '5%', left: '10%', width: '12px', height: '12px', background: 'var(--primary)', opacity: 0.6, animation: 'float1 3s ease-in-out infinite' }} />
          <div className="hero-dot" style={{ top: '15%', right: '5%', width: '8px', height: '8px', background: 'var(--accent, #D4A853)', opacity: 0.5, animation: 'float2 4s ease-in-out infinite 0.5s' }} />
          <div className="hero-dot" style={{ bottom: '10%', left: '5%', width: '10px', height: '10px', background: 'var(--primary)', opacity: 0.4, animation: 'float3 3.5s ease-in-out infinite 1s' }} />
          <div className="hero-dot" style={{ bottom: '25%', right: '0%', width: '6px', height: '6px', background: 'var(--accent, #D4A853)', opacity: 0.6, animation: 'float1 5s ease-in-out infinite 0.3s' }} />
          <div className="hero-dot" style={{ top: '40%', left: '0%', width: '6px', height: '6px', background: '#fff', opacity: 0.2, animation: 'float2 3s ease-in-out infinite 1.5s' }} />
          <div className="hero-dot" style={{ top: '0%', right: '30%', width: '8px', height: '8px', background: '#fff', opacity: 0.15, animation: 'float3 4.5s ease-in-out infinite 0.8s' }} />

          {/* Small orbiting dashed circle */}
          <div className="dashed-circle" />

          {/* Profile image — no background, clean cutout */}
          <img
            src={d.personal.photo}
            alt={d.personal.name}
            className="profile-img"
            onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${d.personal.firstName}+${d.personal.lastName}&size=380&background=217163&color=fff&font-size=0.33`; }}
          />

          {/* Years Experience badge */}
          <div className="exp-badge">
            <span style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)' }}>{d.stats.yearsExperience}</span>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', lineHeight: 1.2 }}>YEARS<br/>EXPERIENCE</span>
          </div>

          {/* Certified badge */}
          <div className="cert-badge">
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2px solid var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
            </div>
            <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase' }}>CERTIFIED<br/>PROFESSIONAL</span>
          </div>
        </div>

      </div>
    </section>
  );
}
