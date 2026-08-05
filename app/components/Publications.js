'use client';
import { useData } from './DataProvider';

export default function Publications() {
  const d = useData();
  const { journals, conferences } = d.publications;

  return (
    <section className="section section-white">
      <div className="section-title-wrapper">
        <span className="section-bg-text">PUBLICATIONS</span>
        <h2 className="section-title">Publications</h2>
      </div>

      <div className="pub-category">
        <h3>Journals</h3>
        {journals.map((pub, index) => (
          <div className="pub-item" key={pub.id}>
            <div className="pub-title">{index + 1}. {pub.title}</div>
            <div className="pub-meta">
              {pub.authors} — <span className="pub-journal">{pub.journal}</span> {pub.year && `(${pub.year})`}
              {pub.indexed && <span className="pub-badge">{pub.indexed}</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="pub-category">
        <h3>Conferences</h3>
        {conferences.map((pub, index) => (
          <div className="pub-item" key={pub.id}>
            <div className="pub-title">{index + 1}. {pub.title}</div>
            <div className="pub-meta">
              {pub.authors} — <span className="pub-journal">{pub.conference}</span>
              {pub.indexed && <span className="pub-badge">{pub.indexed}</span>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
