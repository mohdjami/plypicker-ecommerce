import ProductsPage from "@/components/pages/Product";
import { getSlugs } from "@/lib/helpers";
import { getUser } from "@/lib/user";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
interface PageProps {
  params: {
    role: string;
  };
  searchParams: {
    page?: string;
    limit?: string;
    category?: string;
    search?: string;
  };
}
const page = async ({ params, searchParams }: PageProps) => {
  const user = await getUser();
  if (!user) {
    return redirect("/login");
  }
  return <ProductsPage searchParams={searchParams} Role={params.role} />;
};

export default page;
