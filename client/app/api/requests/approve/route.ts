import { getToken } from "@/lib/cookie";
import { createOptions } from "@/lib/user";
import { getTime } from "date-fns";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { requestId, adminId } = await req.json();

  const token = await getToken();
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/requests/approve`;
  const options = await createOptions("POST", token, {
    requestId: requestId,
    adminId: adminId,
  });
  const res = await fetch(url, options);
  revalidatePath("/");
  return NextResponse.json({
    status: "success",
    message: "Submission approved",
  });
}
