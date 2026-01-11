"use client";

import { createContext, useContext, useState } from "react";

const RegionFilterContext = createContext(null);

export function RegionFilterProvider({ children }) {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedPrefecture, setSelectedPrefecture] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);


  const handleSelectRegion = (region) => {
    setSelectedRegion(region);
    setSelectedPrefecture(null);
    setSelectedCity(null);
    setSelectedDistrict(null);
  };

  const handleSelectPrefecture = (prefecture) => {
    setSelectedPrefecture(prefecture);
    setSelectedCity(null);
    setSelectedDistrict(null);
  };

  const handleSelectCity = (city) => {
    setSelectedCity(city);
    setSelectedDistrict(null);
  };

  return (
    <RegionFilterContext.Provider
      value={{
        selectedRegion,
        setSelectedRegion: handleSelectRegion,

        selectedPrefecture,
        setSelectedPrefecture: handleSelectPrefecture,

        selectedCity,
        setSelectedCity: handleSelectCity,

        selectedDistrict,
        setSelectedDistrict,
      }}
    >
      {children}
    </RegionFilterContext.Provider>
  );
}

export function useRegionFilters() {
  const ctx = useContext(RegionFilterContext);
  if (!ctx) throw new Error("useRegionFilters must be used inside Provider");
  return ctx;
}
