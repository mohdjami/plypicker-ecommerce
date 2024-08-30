import { cookies } from "next/headers";
import { deleteSession, getToken } from "./cookie";
import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";
import { UserResponse } from "@/config/types";
export async function isLoggedIn() {
  const token = await getToken();
  return token !== undefined;
}
export async function isAuthorized() {
  try {
    const token = await getToken();
    const options: RequestInit = {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: {
        revalidate: 0,
      },
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/authenticated`,
      options
    );

    return response.ok;
  } catch (error) {
    return undefined;
  }
}

export async function getUser(): Promise<UserResponse | null> {
  const authorized = await isAuthorized();
  if (!authorized) {
    return null;
  }
  try {
    const token = await getToken();
    if (!token) {
      return null;
    }
    const decoded = jwtDecode<UserResponse>(token);
    return decoded;
  } catch (error) {
    return null;
  }
}

export async function createOptions(
  method: string,
  token?: string,
  body?: Object
): Promise<RequestInit> {
  switch (method) {
    case "GET":
      return {
        method: method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        next: { revalidate: 0 },
      };
    case "POST":
      return {
        method: method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
        next: { revalidate: 0 },
      };
    default:
      return {
        method: method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        next: { revalidate: 0 },
      };
  }
  // if (method === "POST") {
  //   return {
  //     method: method,
  //     credentials: "include",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: JSON.stringify(body),
  //     next: { revalidate: 3600 },
  //   };
  // }
  // return {
  //   method: method,
  //   credentials: "include",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${token}`,
  //   },
  //   next: { revalidate: 3600 },
  // };
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
