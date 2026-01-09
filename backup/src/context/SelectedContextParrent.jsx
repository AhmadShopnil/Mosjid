"use client";

import React, { createContext, useContext, useState } from "react";

const SelectedContextParrent = createContext();

export const SelectedParrentProvider = ({ children }) => {
  const [selectedParrent, setSelectedParrent] = useState(null);
   const [selectedSlug, setSelectedSlug] = useState(null);

  const clearSelectedParrent = () => setSelectedParrent(null);

  return (
    <SelectedContextParrent.Provider value={{ selectedParrent, setSelectedParrent, clearSelectedParrent,selectedSlug, setSelectedSlug }}>
      {children}
    </SelectedContextParrent.Provider>
  );
};

export const useSelectedParrent = () => {
  const context = useContext(SelectedContextParrent);
  if (!context) {
    throw new Error("useSelected must be used within a SelectedContextParrent");
  }
  return context;
};
