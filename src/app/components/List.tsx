"use client";
import React from "react";
import BadgeComponent from "./badge";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface ListItem {
  id: string;
  name: string;
  status: string;
}

interface ListProps {
  dataList: ListItem[];
}

function List({ dataList }: ListProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!selectedId && dataList?.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedId(dataList[0].id);
      // router.push(dataList[0].id);
    }
  }, [dataList, selectedId]);

  function handleClick(id: string) {
    setSelectedId(id);
    router.replace(`/${id}`);
  }
  return (
    <div className="overflow-y-scroll">
      {dataList.map((item) => (
        <div className="w-full" key={item.id}>
          <div
            onClick={() => handleClick(item.id)}
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
              color={
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

export default List;
