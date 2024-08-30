import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  cookies().delete("jwt");
  req.cookies.delete("jwt");
  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/login`);
}
