import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { apiCall } from "../lib/api";
import { useDatasetContext } from "../context/useDatasetContext";
import { formateChartData } from "../utils/formateChartData";
import AnnotationModal from "./AnnotationModal";

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

function MetricsChart() {
  const { contextData } = useDatasetContext();
  const [option, setOption] = useState<EChartOption | undefined>(undefined);
  const { metricsFilters, setAnnotationData } = useDatasetContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [annotationDataToCreate, setAnnotationToCreate] = useState<{
    time: string;
    name: string;
  }>({
    name: "",
    time: "",
  });
  useEffect(() => {
    async function fetchData() {
      const metricsData = await apiCall(
        `/metrics?dataset=${contextData?.id}&fields=${metricsFilters}`,
        "GET"
      );
      const { annotations } = metricsData;
      setAnnotationData(annotations);

      const formatedOptions = formateChartData({
        records: metricsData.records,
        annotations,
      }) as EChartOption;

      setOption(formatedOptions);
    }

    if (contextData?.id) {
      fetchData();
    }
  }, [contextData, metricsFilters]);

  const onEvents = {
    click: (params: any) => {
      console.log(params);
      setAnnotationToCreate({ time: params.name, name: params.seriesName });
      setIsModalOpen(true);
    },
  };

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <ReactECharts
        option={option ?? {}}
        notMerge={true}
        lazyUpdate={true}
        style={{ height: "100%", width: "100%" }}
        onEvents={onEvents}
      />
      <AnnotationModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        annotationData={annotationDataToCreate}
      />
      ;
    </div>
  );
}

export default MetricsChart;
