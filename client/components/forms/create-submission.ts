"use server";

import { getToken } from "@/lib/cookie";
import { getUser } from "@/lib/user";
import { revalidatePath } from "next/cache";

export async function createSubmission(prevState: any, formData: FormData) {
  const token = await getToken();
  const UserData = await getUser();
  // Access the productId from formData
  const productId = formData.get("productId");
  const updatedFields: any = {};

  // Collect only the updated fields
  formData.forEach((value: any, key: any) => {
    if (key !== "productId") {
      updatedFields[key] = value;
    }
  });

  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/submissions`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
    body: JSON.stringify({
      productId,
      userId: UserData?.user._id,
      updatedFields,
    }),
  });
  revalidatePath("/");
  return { status: "success" };
}
