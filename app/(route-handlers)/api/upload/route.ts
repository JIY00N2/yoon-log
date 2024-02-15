import { uploadFile } from "@/app/_utils/bucket";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const imageFile = formData.get("file") as File;
    const imageFileName = imageFile.name;
    const imageFilepath = `${uuid()}.${imageFileName.split(".").pop()}`;
    const imageUrl = await uploadFile(imageFile, imageFilepath);
    return NextResponse.json({ imageFileName, imageUrl });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
