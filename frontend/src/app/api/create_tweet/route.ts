import { NextRequest, NextResponse } from "next/server";

export function POST(request: NextRequest) {
  const body = request.body;
  console.log("request body: ", body);
  return NextResponse.json({ isSuceess: true });
}
