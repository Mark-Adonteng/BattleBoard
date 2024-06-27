import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context
type UnitContextType = {
  unit: string;
  setUnit: React.Dispatch<React.SetStateAction<string>>;
};

// Create the context
const UnitContext = createContext<UnitContextType | undefined>(undefined);

// Define props for the provider component
type UnitProviderProps = {
  children: ReactNode; // children prop of type ReactNode
};

// Create the provider component
export const UnitProvider: React.FC<UnitProviderProps> = ({ children }) => {
  const [unit, setUnit] = useState('');

  return (
    <UnitContext.Provider value={{ unit, setUnit }}>
      {children}
    </UnitContext.Provider>
  );
};

// Custom hook to use the mission type context
export const useUnit = () => {
  const context = useContext(UnitContext);
  if (!context) {
    throw new Error('useUnit must be used within a UnitProvider');
  }
  return context;
};
