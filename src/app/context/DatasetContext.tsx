"use client";

import React, { useState, ReactNode, createContext } from "react";

interface Dataset {
  id: string;
  name: string;
  status: string;
  description: string;
  fields: string[];
}

interface Annotation {
  id: string;
  timestamp: number;
  text: string;
}

export interface DatasetContextType {
  contextData: Dataset | null;
  setContextData: (data: Dataset | null) => void;
  metricsFilters: string;
  setMetricsFilters: (metric: string) => void;
  AnnotationData: Annotation[];
  setAnnotationData: (Annontation: Annotation[]) => void;
}

export const DatasetContext = createContext<DatasetContextType | undefined>(
  undefined
);

interface DatasetProviderProps {
  children: ReactNode;
}

export const DatasetProvider: React.FC<DatasetProviderProps> = ({
  children,
}) => {
  const [contextData, setContextData] = useState<Dataset | null>(null);
  const [metricsFilters, setMetricsFilters] = useState<string>("");
  const [AnnotationData, setAnnotationData] = useState<Annotation[]>([]);

  return (
    <DatasetContext.Provider
      value={{
        metricsFilters,
        setMetricsFilters,
        contextData,
        setContextData,
        AnnotationData,
        setAnnotationData,
      }}
    >
      {children}
    </DatasetContext.Provider>
  );
};
