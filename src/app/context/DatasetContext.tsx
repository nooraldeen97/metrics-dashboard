'use client';

import React, { useState, ReactNode, createContext } from "react";

interface Dataset {
  id: string;
  name: string;
  status: string;
  description: string;
  fields: string[];
}

export interface DatasetContextType {
  contextData: Dataset | null;
  setContextData: (data: Dataset | null) => void;
}

export const DatasetContext =
  createContext<DatasetContextType | undefined>(undefined);

interface DatasetProviderProps {
  children: ReactNode;
}

export const DatasetProvider: React.FC<DatasetProviderProps> = ({ children }) => {
  const [contextData, setContextData] = useState<Dataset | null>(null);

  return (
    <DatasetContext.Provider value={{ contextData, setContextData }}>
      {children}
    </DatasetContext.Provider>
  );
};
