
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
    markLine?: any
}


interface MetricRecord {
    datapoints: Array<{
        timestamp: string | number | Date;
        [key: string]: string | number | Date;
    }>;
}
interface MetricRecordPropType {
    records: MetricRecord[]
    annotations: {
        "id": number,
        "timestamp": number,
        "text": string,
        "name": string
    }[]
}


export function formateChartData({ records, annotations }: MetricRecordPropType) {
    try {
        // Filter records that actually contain datapoints
        const validRecords = records.filter(
            (record: MetricRecord) =>
                Array.isArray(record.datapoints) && record.datapoints.length > 0
        );

        if (validRecords.length === 0) {
            return ({
                title: { text: "No metrics available" },
                tooltip: { trigger: "axis" },
                xAxis: { type: "category", data: [] },
                yAxis: { type: "value" },
                series: [],
            });
        }

        /* =======================
           X AXIS (TIME)
        ======================= */

        const xAxisData = validRecords.map((record: MetricRecord) =>
            new Date(record.datapoints[0].timestamp).toLocaleString()
        );

        /* =======================
           METRICS (SERIES)
        ======================= */

        const metricKeys = Object.keys(
            validRecords[0].datapoints[0]
        ).filter((key) => key !== "timestamp");

        const series: SeriesOption[] = metricKeys.map((key) => {
            const validAnnotations = annotations.filter(ann => key.toLowerCase() == ann.name.toLocaleLowerCase())
            return ({
                name: key
                    .replace(/_/g, " ")
                    .toLowerCase()
                    .replace(/^\w/, (c) => c.toUpperCase()),
                type: "line",
                smooth: true,
                data: validRecords.map((record: MetricRecord) =>
                    Number(record.datapoints[0][key] ?? 0)
                ),
                ...(validAnnotations.length && {
                    markLine: {
                        symbol: 'none',
                        lineStyle: { type: 'dashed', color: '#ff7300' },
                        data: validAnnotations.map(va => ({ xAxis: new Date(va.timestamp).toLocaleString(), label: { formatter: va.text } }))
                    }
                })
            })
        });

        /* =======================
           SET OPTION
        ======================= */

        return ({
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
        return ({
            title: { text: "No metrics available" },
            tooltip: { trigger: "axis" },
            xAxis: { type: "category", data: [] },
            yAxis: { type: "value" },
            series: [],
        });
    }

}