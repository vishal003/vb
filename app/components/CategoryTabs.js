'use client';
import { useState } from 'react';

// Tab bar for sections stored as { categories: [{ id, name, items }] } in data.json
export function useActiveCategory(categories) {
  const [activeId, setActiveId] = useState(categories[0]?.id);
  // Fall back to the first tab if the active one was renamed away or deleted in the admin panel
  const active = categories.find(c => c.id === activeId) || categories[0];
  return [active, setActiveId];
}

export default function CategoryTabs({ categories, active, onChange }) {
  return (
    <div className="category-tabs">
      {categories.map(cat => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className={`category-tab ${active?.id === cat.id ? 'active' : ''}`}
        >
          {cat.name.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
