"use client";
import Image from "next/image";
import { apiCall } from "./lib/api";
import { StatusSelect } from "./components/StatusSelect";
import { SearchInput } from "./components/SearchInput";
import DatasetList from "./components/DatasetList";
import { useEffect, useState } from "react";
import { SkeletonCard } from "./components/SkeletonCard";
import MetricsChart from "./components/MetricsChart";
import { useDatasetContext } from "./context/useDatasetContext";
import DatasetDetails from "./components/DatasetDetails";

interface Dataset {
  id: string;
  name: string;
  status: string;
  description: string;
  fields: string[];
}

export default function Home() {
  const [myList, setMyList] = useState<Dataset[]>([]);
  const [isloading, setIsloading] = useState<boolean>(true);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { contextData, setContextData } = useDatasetContext();

  useEffect(() => {
    async function fetchData() {
      if (!isloading) setIsloading(true);

      const response = await apiCall(
        `/datasets?search=${searchQuery}&status=${statusFilter}`,
        "GET",
        undefined,
        "mysecrettoken"
      );
      setMyList(response);
      setIsloading(false);
      setContextData(response[0]);
    }

    fetchData();
  }, [searchQuery, statusFilter, setContextData]);

  return (
    <div className="grid grid-cols-[3fr_4fr_2fr]">
      <div className="flex flex-col py-2 p-8 border m-5 rounded-lg shadow-md min-w-fit h-4/5">
        <h1 className="text-s font-bold mb-4">DATASETS</h1>
        <SearchInput changeFilter={setSearchQuery} />
        <StatusSelect changeFilter={setStatusFilter} />
        {isloading ? (
          <SkeletonCard count={5} className="h-16" />
        ) : (
          <DatasetList dataList={myList} />
        )}
      </div>
      <div className="grid grid-rows-[2fr_4fr_1fr] gap-3">
        {isloading ? (
          <SkeletonCard count={1} className="h-50" />
        ) : (
          <DatasetDetails data={contextData} />
        )}
        {isloading ? (
          <SkeletonCard count={1} className="h-100" />
        ) : (
          <div className="border shadow-md rounded-lg min-h-fit h-4/5">
            <MetricsChart />
          </div>
        )}
      </div>
      <div className="border rounded-lg shadow-md p-4 m-5">
        {/* future content */}
      </div>
    </div>
  );
}
