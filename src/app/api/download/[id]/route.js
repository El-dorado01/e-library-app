import { fetchBookById } from "@/lib/fetchBooks";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = await params;
  const { downloadUrl, book } = await fetchBookById(id);

  if (!downloadUrl) {
    return NextResponse.json(
      { error: "No download available" },
      { status: 404 }
    );
  }

  const response = await fetch(downloadUrl);
  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to fetch file" },
      { status: 500 }
    );
  }

  const blob = await response.blob();
  const headers = {
    "Content-Type": "application/pdf", // Adjust based on file type
    "Content-Disposition": `attachment; filename="${book.title || id}.pdf"`,
  };

  return new NextResponse(blob, { headers });
}
