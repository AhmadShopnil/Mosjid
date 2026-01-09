"use client";

import React, { createContext, useContext, useState } from "react";

const SelectedContext = createContext();

export const SelectedProvider = ({ children }) => {
  const [selected, setSelected] = useState(null);

  const clearSelected = () => setSelected(null);

  return (
    <SelectedContext.Provider value={{ selected, setSelected, clearSelected }}>
      {children}
    </SelectedContext.Provider>
  );
};

export const useSelected = () => {
  const context = useContext(SelectedContext);
  if (!context) {
    throw new Error("useSelected must be used within a SelectedProvider");
  }
  return context;
};
