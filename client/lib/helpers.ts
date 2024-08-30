import { headers } from "next/headers";

export async function getSlugs(headersList: any) {
  const referer = headersList.get("referer") || "";
  const slug = referer.split("3000/")[1];
  return slug;
}
