import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const page = searchParams.get("page");
    const result = await axios.get(
      `http://127.0.0.1:5000/courseComment?id=${id}&page=${page}`
    );
    return NextResponse.json(result.data, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "ERROR", err }, { status: 500 });
  }
}
