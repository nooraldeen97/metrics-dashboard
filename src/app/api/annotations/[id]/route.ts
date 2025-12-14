import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface Annotation {
    id: number;
    timestamp: number;
    text: string;
}

interface DatasetFile {
    dataset_id: string;
    annotations: Annotation[];
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }
) {

    const { id } = await params;


    const filePath = path.join(process.cwd(), "src/app/JsonData/", `ds_1.json`);



    // Read file
    let jsonData: DatasetFile;
    if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, "utf-8");
        jsonData = JSON.parse(fileData) as DatasetFile;

        const initialLength = jsonData.annotations.length;


        // Remove annotation by id
        console.log("Initial annotations:", jsonData.annotations);
        jsonData.annotations = jsonData.annotations.filter(
            annotation => annotation.id !== parseInt(id)
        );
        console.log("Updated annotations:", jsonData.annotations);
        if (jsonData.annotations.length === initialLength) {
            return NextResponse.json(
                { message: "Annotation not found" },
                { status: 404 }
            );
        }

        // Write updated file
        fs.writeFileSync(
            filePath,
            JSON.stringify(jsonData, null, 2),
            "utf-8"
        );
    }

    return NextResponse.json({ message: "Annotation Deleted successfully" }, { status: 200 });
}

