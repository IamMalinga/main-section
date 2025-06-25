import React, { createContext, useState, useEffect } from 'react';

export const TripContext = createContext();

export const TripContextProvider = ({ children }) => {
  const [tripData, setTripData] = useState(() => {
    const storedTripData = localStorage.getItem('trip');
    return storedTripData ? JSON.parse(storedTripData) : null;
  });

  useEffect(() => {
    if (tripData) {
      localStorage.setItem('trip', JSON.stringify(tripData));
    }
  }, [tripData]);

  return (
      <TripContext.Provider value={{ tripData, setTripData }}>
        {children}
      </TripContext.Provider>
  );
};
