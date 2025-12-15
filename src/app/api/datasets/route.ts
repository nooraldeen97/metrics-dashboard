import { NextRequest, NextResponse } from "next/server";
import data from "../../JsonData/datasets.json";


export async function GET(request: NextRequest) {



  const headersAuth = request.headers.get('Authorization')?.split(' ')[1];

  if (headersAuth !== 'mysecrettoken') {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  let datasets = data.datasets;

  const { searchParams } = new URL(request.url);

  const searchInput = searchParams.get('search');
  const statusInput = searchParams.get('status');

  if (searchInput) {
    datasets = datasets.filter((dataset) =>
      dataset.name && dataset.name.toLowerCase().includes(searchInput.toLowerCase())
    );
  }

  if (statusInput ) {
    datasets = datasets.filter((dataset) =>
      dataset.status && dataset.status.toLowerCase()==(statusInput.toLowerCase())
    );
  }

   await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);

    }, 1500);
  });
  return NextResponse.json(datasets )
}