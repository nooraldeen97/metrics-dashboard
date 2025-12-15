import React from "react";
import BadgeComponent from "./StatusBadge";
import { useState, useEffect } from "react";
import { useDatasetContext } from "../context/useDatasetContext";

interface Dataset {
  id: string;
  name: string;
  status: string;
  description: string;
  fields: string[];
}

interface ListProps {
  dataList: Dataset[];
}

function DatasetList({ dataList }: ListProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { contextData, setContextData } = useDatasetContext();
  useEffect(() => {
    if (!selectedId && dataList?.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedId(dataList[0].id);
      // router.push(dataList[0].id);
    }
  }, [dataList, selectedId]);

  function handleClick(item: Dataset) {
    setSelectedId(item.id);
    setContextData(item);
  }
  return (
    <div className="overflow-y-scroll">
      {dataList.map((item) => (
        <div className="w-full" key={item.id}>
          <div
            onClick={() => handleClick(item)}
            className={`
      flex mt-5 rounded-md p-4 items-center justify-between
      cursor-pointer transition-colors
      ${
        selectedId === item.id
          ? "bg-violet-100 border border-violet-300"
          : "bg-gray-100 hover:bg-gray-200"
      }
    `}
          >
            <p className="text-s">{item.name}</p>
            <BadgeComponent
              variant={item.status === "archived" ? "outline" : "secondary"}
              title={item.status}
              className={
                item.status === "active"
                  ? "bg-green-200"
                  : item.status === "inactive"
                  ? "bg-yellow-200"
                  : "bg-gray-200"
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default DatasetList;
