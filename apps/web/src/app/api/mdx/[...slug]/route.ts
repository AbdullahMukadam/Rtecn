import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  const filePath = join(process.cwd(), "content", "docs", `${slug.join("/").replace(/^docs\//, "")}.mdx`);
  try {
    const content = await readFile(filePath, "utf-8");
    return new NextResponse(content, {
      headers: { "Content-Type": "text/markdown" },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
