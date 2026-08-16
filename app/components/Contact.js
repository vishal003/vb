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
            <a href="https://www.linkedin.com/in/vishalbadgujar/" target="_blank" rel="noopener noreferrer" className="research-link-card" style={{ minWidth: '200px', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', color: '#0A66C2' }}>{Icons.linkedin}</div>
              <span style={{ fontWeight: '600', fontSize: '14px' }}>LinkedIn</span>
            </a>
            <a href={`https://wa.me/${d.personal.phone?.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="research-link-card" style={{ minWidth: '200px', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', color: '#25D366' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </div>
              <span style={{ fontWeight: '600', fontSize: '14px' }}>WhatsApp</span>
            </a>
            <a href="https://www.youtube.com/channel/UCEiZ4U0rR9S44pFM3aweA8w" target="_blank" rel="noopener noreferrer" className="research-link-card" style={{ minWidth: '200px', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', color: '#FF0000' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <span style={{ fontWeight: '600', fontSize: '14px' }}>YouTube</span>
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
