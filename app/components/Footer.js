'use client';
import { useData } from './DataProvider';

export default function Footer() {
  const d = useData();
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div>
            <h3 className="footer-brand">{d.personal.name}</h3>
            <p className="footer-desc">{d.personal.title}, {d.personal.department}<br />{d.personal.institution}</p>
          </div>
          <div>
            <h4 className="footer-heading">Quick Links</h4>
            <div className="footer-links">
              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#research">Research</a>
              <a href="#awards">Awards</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
          <div>
            <h4 className="footer-heading">Research Profiles</h4>
            <div className="footer-links">
              <a href={d.socialLinks.googleScholar} target="_blank" rel="noopener noreferrer">Google Scholar</a>
              <a href={d.socialLinks.scopus} target="_blank" rel="noopener noreferrer">Scopus</a>
              <a href={d.socialLinks.orcid} target="_blank" rel="noopener noreferrer">ORCID</a>
              <a href={d.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {year} {d.personal.name}. All rights reserved.</span>
          <div className="footer-social">
            <a href={d.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href={d.socialLinks.googleScholar} target="_blank" rel="noopener noreferrer" aria-label="Scholar">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/></svg>
            </a>
            <a href={d.socialLinks.orcid} target="_blank" rel="noopener noreferrer" aria-label="ORCID">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-2.016-1.284-3.722-3.919-3.722h-2.4z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
