import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { getCookie } from "cookies-next";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const getClientSideCookie = (name: string): string | undefined => {
  const cookie = getCookie(name);

  // const cookieValue = document.cookie
  //   .split("; ")
  //   .find((row) => row.startsWith(`${name}=`))
  //   ?.split("=")[1];

  return cookie;
};

export async function createOptions(
  method: string,
  token?: string,
  body?: Object
): Promise<RequestInit> {
  if (method === "POST") {
    if (!token) {
      return {
        method: method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        next: { revalidate: 3600 },
      };
    }
    return {
      method: method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
      next: { revalidate: 3600 },
    };
  }

  return {
    method: method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: { revalidate: 3600 },
  };
}
