import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Define the annotation interface
interface Annotation {
  id: number;
  timestamp: number;
  text: string;
  name: string
}

interface DatasetFile {
  dataset_id: string;
  annotations: Annotation[];
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const { name, dataset_id, timestamp, text } = await request.json();
    console.log(timestamp)
    if (!dataset_id || !timestamp || !text || !name) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), "src/app/JsonData/", `${dataset_id}.json`);
    console.log("File path:", filePath);
    // Read existing JSON file
    let jsonData: DatasetFile;
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, "utf-8");
      jsonData = JSON.parse(fileData) as DatasetFile;
    } else {
      // If file doesn't exist, create a new structure
      jsonData = { dataset_id, annotations: [] };
    }

    // Add the new annotation
    const id = jsonData.annotations.length > 0 ? jsonData.annotations[jsonData.annotations.length - 1].id + 1 : 1;
    jsonData.annotations.push({ id, timestamp, text, name });

    // Write back to the file
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf-8");

    return NextResponse.json({ message: "Annotation added successfully", data: jsonData }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error updating file", error }, { status: 500 });
  }
}
