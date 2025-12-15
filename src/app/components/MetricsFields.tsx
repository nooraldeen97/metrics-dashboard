import React, { useState } from "react";
import { useDatasetContext } from "../context/useDatasetContext";

interface MetricsPropType {
  metricsData?: string[];
}

function MetricsFields({ metricsData = [] }: MetricsPropType) {

  const {setMetricsFilters}=useDatasetContext();

  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);

  const handleMetricClick = (metric: string) => {
    if (selectedMetrics.includes(metric)) {
      const filteredMetrics =selectedMetrics.filter((m) => m !== metric);
      setSelectedMetrics(filteredMetrics);
      setMetricsFilters(filteredMetrics.join(','))
    } else {
      setSelectedMetrics([...selectedMetrics, metric]);
      setMetricsFilters([...selectedMetrics, metric].join(','))
    }
  };

  const handleSelectAll = () => {
    if (selectedMetrics.length === metricsData.length) {
      setSelectedMetrics([]);
      setMetricsFilters('')
    } else {
      setSelectedMetrics([...metricsData]);
      setMetricsFilters([...metricsData].join(','))
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <h1 className="font-normal text-sm text-gray-500">METRICS</h1>

      <div className="flex gap-2">
        {metricsData.map((metric, index) => {
          const isSelected = selectedMetrics.includes(metric);
          return (
            <div
              key={index}
              className={`p-1 rounded text-sm cursor-pointer border ${
                isSelected
                  ? "bg-blue-200 border-blue-500" // Selected style
                  : "bg-white border-gray-300" // Default style
              }`}
              onClick={() => handleMetricClick(metric)}
            >
              {metric[0] + metric.slice(1).toLowerCase()}
            </div>
          );
        })}
      </div>

      <p
        className="text-[12px] font-semibold text-fuchsia-900 cursor-pointer"
        onClick={handleSelectAll}
      >
        {selectedMetrics.length === metricsData.length ? "Deselect All" : "Select All"}
      </p>
    </div>
  );
}

export default MetricsFields;
