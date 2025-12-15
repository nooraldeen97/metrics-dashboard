import React from "react";
import BadgeComponent from "./StatusBadge";
import TimeTabs from "./TimeTabs";
import Metrics from "./MetricsFields";

interface Dataset {
  id: string;
  name: string;
  status: string;
  description: string;
  fields: string[];
}

interface DatasetDetailsProps {
  data: Dataset | null;
}

export function MtericsDetails({ data }: DatasetDetailsProps) {
  return (
    <div className="border shadow-md rounded-lg mt-5 p-5">
      <div className=" flex  mb-2">
        <h1 className="font-semibold">{data ? data.name : "Loading..."}</h1>
        <div className="float-left pl-2">
          {data && (
            <BadgeComponent
              variant={data.status === "archived" ? "outline" : "secondary"}
              title={data.status}
              className={
                data.status === "active"
                  ? "bg-green-200"
                  : data.status === "inactive"
                  ? "bg-yellow-200"
                  : "bg-gray-200"
              }
            />
          )}
        </div>
      </div>
      <hr></hr>
      <div className="flex items-center gap-2 mt-5">
        <h1 className="font-normal text-sm text-gray-500"> TIME RANGE</h1>
        <TimeTabs />
      </div>
      <div className="mt-5">
        <Metrics metricsData={data?.fields} />
      </div>
    </div>
  );
}


