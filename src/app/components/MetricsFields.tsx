import React from "react";

interface MetricsPropType {
  metricsData?: string[];
}

function MetricsFields({ metricsData = [] }: MetricsPropType) {
  return (
    <div className="flex gap-2 items-center">
      <h1 className="font-normal text-sm text-gray-500">METRICS</h1>

      <div className="flex  gap-2">
        {metricsData.map((metric, index) => (
          <div key={index} className="p-1 border rounded text-sm">
            {metric[0] + metric.slice(1).toLowerCase()}
          </div>
        ))}
      </div>

      <p className="text-[12px] font-semibold text-fuchsia-900"> Select All</p>
    </div>
  );
}

export default MetricsFields;
