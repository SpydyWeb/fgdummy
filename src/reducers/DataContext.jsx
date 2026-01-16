import { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [sharedData, setSharedData] = useState(null);
  const [showIntRequestTime, setShowIntRequestTime] = useState(false);

  return (
    <DataContext.Provider value={{ sharedData, setSharedData, showIntRequestTime, setShowIntRequestTime }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
