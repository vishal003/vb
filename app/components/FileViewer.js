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

  const cleanFile = typeof file === 'string' ? file.trim() : (file || '');
  const isDrive = /drive\.google\.com/.test(cleanFile);
  const driveId = isDrive ? (cleanFile.match(/\/d\/([\w-]+)/)?.[1] || cleanFile.match(/[?&]id=([\w-]+)/)?.[1]) : null;
  const isPdf = /\.pdf$/i.test(cleanFile);

  const embedSrc = driveId ? `https://drive.google.com/file/d/${driveId}/preview` : encodeURI(cleanFile);
  const openSrc = driveId ? `https://drive.google.com/file/d/${driveId}/view` : encodeURI(cleanFile);

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button className="lightbox-btn lightbox-close" onClick={onClose} aria-label="Close">✕</button>
      <div className="file-viewer" onClick={(e) => e.stopPropagation()}>
        {isDrive || isPdf ? (
          <iframe src={embedSrc} title={title} className="file-viewer-frame" allow="autoplay" />
        ) : (
          <img src={embedSrc} alt={title} className="file-viewer-img" />
        )}
        <div className="lightbox-caption">
          {title}
          <a href={openSrc} target="_blank" rel="noopener noreferrer" className="file-viewer-open">Open in new tab ↗</a>
        </div>
      </div>
    </div>
  );
}
