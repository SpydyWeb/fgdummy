// keyStoreManager.js
let keyStore = {};

export const setKeyStoreGlobal = (store) => {
  keyStore = store;
};

export const getKeyStoreGlobal = () => {
  return keyStore;
};
