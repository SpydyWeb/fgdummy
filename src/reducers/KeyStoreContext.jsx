// KeyStoreContext.js
import { createContext, useContext, useState } from 'react';
import { setKeyStoreGlobal } from './keyStoreManager';

const KeyStoreContext = createContext();

export const KeyStoreProvider = ({ children }) => {
  const [keyStore, setKeyStore] = useState({});

  const updateKeyStore = (store) => {
    setKeyStore(store);
    setKeyStoreGlobal(store); // 🔥 sync global store
  };

  return (
    <KeyStoreContext.Provider value={{ keyStore, setKeyStore: updateKeyStore }}>
      {children}
    </KeyStoreContext.Provider>
  );
};

export const useKeyStore = () => useContext(KeyStoreContext);
