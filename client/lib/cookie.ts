import { cookies } from "next/headers";

export async function getToken() {
  const cookieStore = cookies();
  const data = cookieStore.get("jwt");
  return data?.value;
}

import "server-only";

export async function deleteSession() {
  cookies().delete("session");
}
