'use client';
import { useState } from 'react';
import { useData } from './DataProvider';
import { Icons } from './Icons';

export default function Contact() {
  const d = useData();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError('');

    const formData = new FormData(e.target);
    const data = {
      name: formData.get('Name'),
      email: formData.get('Email'),
      phone: formData.get('Phone'),
      subject: formData.get('Subject'),
      message: formData.get('Message'),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (res.ok) {
        setSuccess(true);
        e.target.reset();
      } else {
        setError(result.error || 'Failed to send message.');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

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

        {/* Contact Form */}
        <div style={{ marginTop: '50px', background: 'var(--bg-section-alt)', padding: '40px', borderRadius: '10px' }}>
          <div className="section-title-wrapper" style={{ marginBottom: '30px' }}>
            <h3 className="section-title" style={{ fontSize: '24px' }}>Send a Message</h3>
          </div>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '800px', margin: '0 auto' }}>
            {success && <div style={{ background: '#d4edda', color: '#155724', padding: '15px', borderRadius: '4px', textAlign: 'center' }}>Your message was sent successfully!</div>}
            {error && <div style={{ background: '#f8d7da', color: '#721c24', padding: '15px', borderRadius: '4px', textAlign: 'center' }}>{error}</div>}
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <input type="text" name="Name" placeholder="Your Name*" required disabled={loading} style={{ width: '100%', padding: '15px', border: '1px solid var(--border)', borderRadius: '4px', background: 'white' }} />
              <input type="email" name="Email" placeholder="Email Address*" required disabled={loading} style={{ width: '100%', padding: '15px', border: '1px solid var(--border)', borderRadius: '4px', background: 'white' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <input type="text" name="Phone" placeholder="Your Phone Number" disabled={loading} style={{ width: '100%', padding: '15px', border: '1px solid var(--border)', borderRadius: '4px', background: 'white' }} />
              <input type="text" name="Subject" placeholder="Your Subject" disabled={loading} style={{ width: '100%', padding: '15px', border: '1px solid var(--border)', borderRadius: '4px', background: 'white' }} />
            </div>
            <textarea name="Message" placeholder="Write Message*" required rows="6" disabled={loading} style={{ width: '100%', padding: '15px', border: '1px solid var(--border)', borderRadius: '4px', background: 'white', resize: 'vertical' }}></textarea>
            <button type="submit" disabled={loading} style={{ background: loading ? '#666' : '#333333', color: 'white', padding: '15px 30px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '10px', width: '100%', transition: 'background 0.3s' }}>
              {loading ? 'SENDING...' : 'SUBMIT NOW'}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} {d.personal.name}. All Rights Reserved.</p>
      </footer>
    </>
  );
}
