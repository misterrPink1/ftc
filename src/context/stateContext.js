'use client';

import React, { createContext, useState, useContext } from 'react';

// Create the state context
export const StateContext = createContext();

// Custom hook for using the created context
export function useMyState() {
  return useContext(StateContext);
}

// Create the state provider component
export const StateProvider = ({ children }) => {
  const [working, setWorking] = useState(null);
  const [aiOpen, setAiOpen] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <StateContext.Provider value={{ working, setWorking, aiOpen, setAiOpen, loggedIn, setLoggedIn }}>
      {children}
    </StateContext.Provider>
  );
};
