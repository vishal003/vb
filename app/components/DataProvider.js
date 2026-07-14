'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { DataManager, DEFAULT_DATA } from '@/lib/data';

const DataContext = createContext(DEFAULT_DATA);

export function DataProvider({ children }) {
  const [data, setData] = useState(DEFAULT_DATA);

  useEffect(() => {
    // Initial fetch from localStorage
    setData(DataManager.getData());

    // Listen to custom event fired by the admin panel
    const handleDataUpdate = () => {
      setData(DataManager.getData());
    };

    // Also listen to standard storage event for cross-tab sync
    window.addEventListener('data-updated', handleDataUpdate);
    window.addEventListener('storage', handleDataUpdate);

    return () => {
      window.removeEventListener('data-updated', handleDataUpdate);
      window.removeEventListener('storage', handleDataUpdate);
    };
  }, []);

  return (
    <DataContext.Provider value={data}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
