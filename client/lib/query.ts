import { Product, ProductsProps } from "@/config/types";
import { getToken } from "./cookie";

export async function fetchProducts(query: any): Promise<ProductsProps> {
  try {
    const currentPage = parseInt(query.page) || 0;
    const limit = parseInt(query.limit) || 4;
    const category = query.category || "ALL";
    const search = query.search || "";
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
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products?page=${currentPage}&limit=${limit}&department=${category}&search=${search}`,
      options
    );
    const data = await response.json();
    // console.log(data);
    if (!response.ok) {
      throw new Error(data.message);
    }

    const products: Product[] = data.products;
    const totalProducts = data.totalProducts;
    const totalPages = Math.ceil(totalProducts / limit);
    return {
      products,
      currentPage,
      totalPages,
      category,
      search,
    };
  } catch (error) {
    console.error(error);
    return {
      products: [],
      currentPage: 0,
      totalPages: 0,
      category: "ALL",
      search: "",
    };
  }
}

export async function getSubmissions() {
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
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/submissions`,
    options
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function getRequests() {
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
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/requests`,
    options
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}
