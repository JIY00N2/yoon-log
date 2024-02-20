import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(req: NextRequest) {
  const path = req.nextUrl.searchParams.get("path");

  if (!path) {
    return Response.json({
      revalidated: false,
      message: "Missing path to revalidate",
    });
  }

  revalidatePath(path);
  return Response.json({ revalidated: true });
}
