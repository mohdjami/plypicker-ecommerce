import ProductsPage from "@/components/pages/Product";
import { getSlugs } from "@/lib/helpers";
import { getUser } from "@/lib/user";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const user = await getUser();
  if (!user) {
    return redirect("/login");
  }
  return <ProductsPage searchParams={searchParams} />;
};

export default page;
