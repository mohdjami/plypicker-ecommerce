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
  const id = params.productId;
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/${id}`;
  const options = await createOptions("GET", await getToken());
  const res = await fetch(url, options);
  const data = await res.json();
  return NextResponse.json({ product: data.product });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { productId: string } }
) {
  const id = params.productId;
  const updatedProduct = await req.json();
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/${id}`;
  const token = await getToken();
  const body = {
    productId: id,
    product: updatedProduct,
  };
  const options = await createOptions("POST", await getToken(), body);
  const res = await fetch(url, options);
  return NextResponse.json({ product: "success" });
}
