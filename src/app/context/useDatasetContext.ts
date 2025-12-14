'use client';

import { useContext } from "react";
import { DatasetContext } from "./DatasetContext";

export const useDatasetContext = () => {
  const context = useContext(DatasetContext);

  if (!context) {
    throw new Error(
      "useDatasetContext must be used inside DatasetProvider"
    );
  }

  return context;
};
