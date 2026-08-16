// ══════════════════════════════════════════════════════════════
// Dr. Vishal S. Badgujar — Portfolio Data Layer
// ══════════════════════════════════════════════════════════════
import jsonData from './data.json';

export const DEFAULT_DATA = jsonData;

// ── Data Manager (client-side localStorage & GitHub Sync) ──
export const DataManager = {
  STORAGE_KEY: 'vb_portfolio_data_v3',

  getData() {
    if (typeof window === 'undefined') return JSON.parse(JSON.stringify(DEFAULT_DATA));
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) return deepMerge(DEFAULT_DATA, JSON.parse(stored));
    } catch (e) { console.warn('Error reading localStorage:', e); }
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  },

  async saveData(data) {
    if (typeof window === 'undefined') return { success: false };
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
      window.dispatchEvent(new Event('data-updated'));
      return { success: true };
    } catch (e) {
      console.error('Error saving:', e);
      return { success: false, error: e.message };
    }
  },

  async commitToGithub() {
    if (typeof window === 'undefined') return { success: false };
    try {
      const data = this.getData();
      const response = await fetch('/api/update-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        const errText = await response.text();
        console.error('Failed to sync to GitHub:', errText);
        return { success: false, error: errText };
      }
      return { success: true };
    } catch (e) {
      console.error('Error committing:', e);
      return { success: false, error: e.message };
    }
  },

  async updateSection(key, value) {
    const data = this.getData();
    data[key] = value;
    return await this.saveData(data);
  },

  async addItem(sectionKey, item) {
    const data = this.getData();
    const keys = sectionKey.split('.');
    let target = data;
    for (const k of keys) target = target[k];
    if (Array.isArray(target)) {
      item.id = item.id || genId(sectionKey);
      target.push(item);
      return await this.saveData(data);
    }
    return { success: false, error: 'Invalid section' };
  },

  async updateItem(sectionKey, itemId, updated) {
    const data = this.getData();
    const keys = sectionKey.split('.');
    let target = data;
    for (const k of keys) target = target[k];
    if (Array.isArray(target)) {
      const i = target.findIndex(x => x.id === itemId);
      if (i !== -1) { target[i] = { ...target[i], ...updated, id: itemId }; return await this.saveData(data); }
    }
    return { success: false, error: 'Item not found' };
  },

  async deleteItem(sectionKey, itemId) {
    const data = this.getData();
    const keys = sectionKey.split('.');
    let target = data;
    for (const k of keys) target = target[k];
    if (Array.isArray(target)) {
      const i = target.findIndex(x => x.id === itemId);
      if (i !== -1) { target.splice(i, 1); return await this.saveData(data); }
    }
    return { success: false, error: 'Item not found' };
  },

  async resetToDefaults() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.STORAGE_KEY);
      window.dispatchEvent(new Event('data-updated'));
      return await this.saveData(DEFAULT_DATA);
    }
    return { success: true };
  },

  exportData() { return JSON.stringify(this.getData(), null, 2); },

  async importData(json) {
    try { return await this.saveData(JSON.parse(json)); }
    catch (e) { return false; }
  }
};

function genId(prefix) {
  return prefix.replace(/\./g, '_') + '_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
}

function deepMerge(target, source) {
  const out = { ...target };
  for (const key of Object.keys(source)) {
    if (Array.isArray(source[key])) {
      // Arrays from source fully replace target arrays — never merge by index
      out[key] = source[key];
    } else if (source[key] && typeof source[key] === 'object' &&
      target[key] && typeof target[key] === 'object' && !Array.isArray(target[key])) {
      out[key] = deepMerge(target[key], source[key]);
    } else {
      out[key] = source[key];
    }
  }
  return out;
}
