import { getToken } from "@/lib/cookie";
import { createOptions } from "@/lib/user";
import { getTime } from "date-fns";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { requestId, adminId } = await req.json();
    const token = await getToken();
    const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/requests/reject`;
    const options = await createOptions("POST", token, {
      requestId: requestId,
      adminId: adminId,
    });
    const res = await fetch(url, options);
    // Here you would typically make an API call to update the status
    console.log("Submission approved");
    revalidatePath("/");
    return NextResponse.json({
      status: "success",
      message: "Submission approved",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: "error",
      message: "Error approving submission",
    });
  }
}
