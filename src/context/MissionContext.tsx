import React, { createContext, useState, useContext, ReactNode } from 'react';

interface MissionContextType {
  missionName: string;
  setMissionName: React.Dispatch<React.SetStateAction<string>>;
  missionType: string;
  setMissionType: React.Dispatch<React.SetStateAction<string>>;
}

const MissionContext = createContext<MissionContextType | undefined>(undefined);

export const useMission = () => {
  const context = useContext(MissionContext);
  if (!context) {
    throw new Error('useMission must be used within a MissionProvider');
  }
  return context;
};

interface MissionProviderProps {
  children: ReactNode;
}

export const MissionProvider = ({ children }: MissionProviderProps) => {
  const [missionName, setMissionName] = useState('');
  const [missionType, setMissionType] = useState('');

  return (
    <MissionContext.Provider value={{ missionName, setMissionName, missionType, setMissionType }}>
      {children}
    </MissionContext.Provider>
  );
};
