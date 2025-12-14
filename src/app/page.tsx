"use client";
import Image from "next/image";
import { apiCall } from "./lib/api";
import { SelectStatus } from "./components/select";
import { SearchInput } from "./components/input";
import List from "./components/List";
import { useEffect, useState } from "react";
import { SkeletonCard } from "./components/skeletonLoading";
import Chart from "./components/MetricsChart";

interface Dataset {
  id: string;
  name: string;
  status: string;
}
export default function Home() {
  const [myList, setMyList] = useState<Dataset[]>([]);
  const [isloading, setIsloading] = useState<boolean>(true);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      if (!isloading) setIsloading(true);

      const response = await apiCall(
        `${"/datasets"}?search=${searchQuery}&status=${statusFilter}`,
        "GET",
        undefined,
        "mysecrettoken"
      );
      setMyList(response);
      setIsloading(false);
    }

    fetchData();
  }, [searchQuery, statusFilter]);

  return (
    <div className="grid grid-cols-[3fr_4fr_2fr] ">
      <div className="flex flex-col py-2 p-8 border m-5 rounded-lg shadow-md min-w-fit h-4/5" >
        <h1 className="text-s font-bold mb-4">DATASETS</h1>
        <SearchInput changeFilter={setSearchQuery} />
        <SelectStatus changeFilter={setStatusFilter} />
        {isloading ? <SkeletonCard count={5} /> : <List dataList={myList} />}
      </div>
      <div className="grid grid-rows-[2fr_4fr_1fr] gap-3">
        <div className="border  shadow-md rounded-lg mt-5">performance</div>
        <div className="border shadow-md rounded-lg min-h-fit h-4/5">
          <Chart />
        </div>
      </div>
    </div>
  );
}
