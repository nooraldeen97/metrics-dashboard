import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { apiCall } from "../lib/api";
import { useDatasetContext } from "../context/useDatasetContext";



interface EChartOption {
  title?: {
    text?: string;
  };

  tooltip?: {
    trigger?: "axis" | "item" | "none";
  };

  legend?: {
    data?: string[];
    bottom?: number | string;
  };

  grid?: {
    left?: string | number;
    right?: string | number;
    bottom?: string | number;
    top?: string | number;
    containLabel?: boolean;
  };

  xAxis?: {
    type?: "category" | "time" | "value";
    boundaryGap?: boolean;
    data?: (string | number)[];
  };

  yAxis?: {
    type?: "value" | "log";
    min?: number;
    max?: number;
  };

  series: SeriesOption[];
}

interface SeriesOption {
  name: string;
  type: "line" | "bar";
  data: number[];
  smooth?: boolean;
}

interface MetricRecord {
  datapoints: Array<{
    timestamp: string | number | Date;
    [key: string]: string | number | Date;
  }>;
}


function MetricsChart() {
  const { contextData } = useDatasetContext();
  const [option, setOption] = useState<EChartOption | undefined>(undefined);

  useEffect(() => {
    async function fetchData() {
      try {
        const records = await apiCall(
          `/metrics?dataset=${contextData?.id}`,
          "GET"
        );
        
        // Filter records that actually contain datapoints
        const validRecords = records.filter(
          (record: MetricRecord) =>
            Array.isArray(record.datapoints) && record.datapoints.length > 0
        );

        if (validRecords.length === 0) {
          setOption({
            title: { text: "No metrics available" },
            tooltip: { trigger: "axis" },
            xAxis: { type: "category", data: [] },
            yAxis: { type: "value" },
            series: [],
          });
          return;
        }

        /* =======================
           X AXIS (TIME)
        ======================= */

        const xAxisData = validRecords.map((record: MetricRecord) =>
          new Date(record.datapoints[0].timestamp).toLocaleTimeString()
        );

        /* =======================
           METRICS (SERIES)
        ======================= */

        const metricKeys = Object.keys(
          validRecords[0].datapoints[0]
        ).filter((key) => key !== "timestamp");

        const series: SeriesOption[] = metricKeys.map((key) => ({
          name: key
            .replace(/_/g, " ")
            .toLowerCase()
            .replace(/^\w/, (c) => c.toUpperCase()),
          type: "line",
          smooth: true,
          data: validRecords.map((record: MetricRecord) =>
            Number(record.datapoints[0][key] ?? 0)
          ),
        }));

        /* =======================
           SET OPTION
        ======================= */

        setOption({
          title: { text: "Performance Metrics" },
          tooltip: { trigger: "axis" },
          legend: {
            bottom: 0,
            data: series.map((s) => s.name),
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "12%",
            containLabel: true,
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: xAxisData,
          },
          yAxis: {
            type: "value",
          },
          series,
        });
      } catch (error) {
        setOption({
            title: { text: "No metrics available" },
            tooltip: { trigger: "axis" },
            xAxis: { type: "category", data: [] },
            yAxis: { type: "value" },
            series: [],
          });
          return;
      }
    }

    if (contextData?.id) {
      fetchData();
    }
  }, [contextData]);

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <ReactECharts
        option={option ?? {}}
        notMerge={true}
        lazyUpdate={true}
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
}

export default MetricsChart;
