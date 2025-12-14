import { NextRequest } from "next/server";
import ds1data from "../../JsonData/ds_1.json";
import ds2data from "../../JsonData/ds_2.json";

interface Datapoint {
  timestamp?: number;
  REQUESTS?: number;
  ERRORS?: number;
  P50_LATENCY?: number;
  P95_LATENCY?: number;
  P99_LATENCY?: number;
  AVG_LATENCY?: number
}

interface RecordType {
  from: number;
  to: number;
  datapoints: Datapoint[];
}

export async function GET(request: NextRequest) {

  function filterByTimeRange(
    records: RecordType[],
    startTime: number,
    endTime: number
  ): RecordType[] {
    return records.filter(record =>
      record.from >= startTime && record.to <= endTime
    );
  }

  function filterFields(records: RecordType[], fieldsQuery?: string): RecordType[] {
    console.log('Fields query:', fieldsQuery);
    if (!fieldsQuery) return records; // return original if no fields specified

    const fields = fieldsQuery.split(',').map(f => f.trim());
    console.log('Filtering fields:', fields);
    return records.map(record => ({
      ...record,
      datapoints: record.datapoints.map(dp => {
        const filtered: Datapoint = { timestamp: dp.timestamp };
        fields.forEach(field => {
          if (field in dp) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            filtered[field] = dp[field];
          }
        });
        return filtered;
      })
    }));
  }

  const { searchParams } = new URL(request.url);

  const datasetQuery = searchParams.get('dataset');
  const fromQuery = searchParams.get('from');
  const toQuery = searchParams.get('to');
  const fieldsQuery = searchParams.get('fields');

  switch (datasetQuery) {
    case 'ds_1':
      const filteredDs1 = filterByTimeRange(ds1data.records, fromQuery ? parseInt(fromQuery) : 0, toQuery ? parseInt(toQuery) : Date.now());
      if (fieldsQuery) {
        const fieldFilteredDs1 = filterFields(filteredDs1, fieldsQuery);
        return Response.json(fieldFilteredDs1);
      }
      return Response.json(filteredDs1);
    case 'ds_2':
      const filteredDs2 = filterByTimeRange(ds2data.records, fromQuery ? parseInt(fromQuery) : 0, toQuery ? parseInt(toQuery) : Date.now());
      if (fieldsQuery) {

        const fieldFilteredDs2 = filterFields(filteredDs2, fieldsQuery);
        return Response.json(fieldFilteredDs2);
      }
      // return filtered records when no fields filter is provided
      return Response.json(filteredDs2);
    default:
      return Response.json({ message: 'Dataset not found' }, { status: 404 });
  }

}


