import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const groups = searchParams.get("groups");
    const result = await axios.get(
      `http://127.0.0.1:5000/Articles?groups=${groups}`
    );

    return NextResponse.json(result.data, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "ERROR", err }, { status: 500 });
  }
}
// "https://py-flask-final.vercel.app/"
