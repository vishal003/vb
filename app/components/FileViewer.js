'use client';
import { useEffect } from 'react';

// Opens a certificate (PDF or image from /public) in a lightbox
export default function FileViewer({ file, title, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const src = encodeURI(file);
  const isPdf = /\.pdf$/i.test(file);

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button className="lightbox-btn lightbox-close" onClick={onClose} aria-label="Close">✕</button>
      <div className="file-viewer" onClick={(e) => e.stopPropagation()}>
        {isPdf
          ? <iframe src={src} title={title} className="file-viewer-frame" />
          : <img src={src} alt={title} className="file-viewer-img" />}
        <div className="lightbox-caption">
          {title}
          <a href={src} target="_blank" rel="noopener noreferrer" className="file-viewer-open">Open in new tab ↗</a>
        </div>
      </div>
    </div>
  );
}
