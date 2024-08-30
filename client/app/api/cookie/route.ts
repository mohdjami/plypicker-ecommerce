import { getToken } from "@/lib/cookie";
import { createOptions } from "@/lib/user";
import { NextRequest, NextResponse } from "next/server";
interface Params {
  productId: string;
}
export async function GET(
  req: NextRequest,
  { params }: { params: { productId: string } }
) {
  // const id = params.productId;
  // const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/${id}`;
  const token = await getToken();
  console.log("token from cookie id", token);
  // const options = await createOptions("GET", await getToken());
  // const res = await fetch(url, options);
  // const data = await res.json();
  // console.log(data.product);
  return NextResponse.json({ product: "success" });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { productId: string } }
) {
  const id = params.productId;
  const updatedProduct = await req.json();
  console.log(updatedProduct);
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/${id}`;
  const token = await getToken();
  console.log("token from prod/ucts id", token);
  const body = {
    productId: id,
    product: updatedProduct,
  };
  const options = await createOptions("POST", await getToken(), body);
  const res = await fetch(url, options);
  console.log(await res.json());
  return NextResponse.json({ product: "success" });
}
