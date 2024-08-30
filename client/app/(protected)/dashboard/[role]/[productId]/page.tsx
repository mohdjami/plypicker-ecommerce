import React, { useEffect, useState } from "react";

import { createOptions, getUser } from "@/lib/user";
import { getToken } from "@/lib/cookie";
import ProductCard from "@/components/ProductCard";

type Data = {
  params: {
    productId: string;
  };
};

export default async function ProductDetails({ params }: Data) {
  const { productId } = params;
  console.log(productId); //done
  const datas = await getUser();
  const userId = datas?.user._id; //done
  const token = await getToken(); //done
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/${productId}`;
  let res = await fetch(url, {
    method: "GET",
    credentials: "include",
    next: {
      revalidate: 3600,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  let data = await res.json();

  if (!data.product) return <div>Loading...</div>;

  return <ProductCard productId={productId} role={datas?.user.roles[0]!} />;
}
