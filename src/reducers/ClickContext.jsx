import React, { createContext, useState } from 'react';

const ClickContext = createContext();

const ClickProvider = ({ children }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <ClickContext.Provider value={{ clicked, handleClick }}>
      {children}
    </ClickContext.Provider>
  );
};

export { ClickProvider, ClickContext };