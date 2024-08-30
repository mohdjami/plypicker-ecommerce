import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { getToken } from "@/lib/cookie";
import { Product, ProductsProps } from "@/config/types";
import { fetchProducts } from "@/lib/query";
import { getSlugs } from "@/lib/helpers";
import { headers } from "next/headers";
import Image from "next/image";
export default async function ProductsPage({ searchParams }: any) {
  const pathname = headers().get("x-current-path");

  const fetchedData = await fetchProducts(searchParams);
  // console.log(fetchedData);
  const { products, currentPage, totalPages, category, search } = fetchedData;
  // console.log("products", products);
  const categories: string[] = [
    "All",
    ...new Set(products?.map((product: Product) => product?.department)),
  ];

  return (
    <div className="flex h-auto bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="hidden w-64 bg-white dark:bg-gray-800 md:block">
        <div className="flex h-full flex-col">
          <nav className="flex-1 space-y-2 p-4">
            <Button variant="ghost" className="w-full justify-start">
              Products
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Orders
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Customers
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Analytics
            </Button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        {/* <header className="flex h-14 items-center border-b bg-white dark:bg-gray-800 px-4">
          <Button variant="ghost" size="icon" className="md:hidden mr-2">
            <Link href={`${process.env.NEXT_PUBLIC_URL}`}>
              <ChevronLeft className="h-6 w-6" />
            </Link>
          </Button>
          <div className="flex flex-1 items-center justify-between">
            <div className="w-full max-w-xl flex items-center space-x-2">
              <form className="flex-1" method="GET" action="/products">
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Search products?..."
                    className="w-full bg-gray-100 dark:bg-gray-700 pl-8"
                    defaultValue={search}
                    name="search"
                    disabled={true}
                  />
                </div>
              </form>
              <select
                name="category"
                defaultValue={category}
                className="w-[180px] bg-gray-100 dark:bg-gray-700 pl-2"
              >
                {categories.map((category: string) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </header> */}
        <main className="flex-1 overflow-y-auto p-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:h-[500px]">
            {products &&
              products?.map((product: Product) => (
                <Link
                  key={product._id}
                  href={`${process.env.NEXT_PUBLIC_URL}${pathname}/${product._id}`}
                >
                  <Card
                    key={product.name}
                    className="flex flex-col justify-between gap-0 p-2 text-left dark:bg-secondary lg:h-[550px]"
                  >
                    <CardHeader className="lg:h-10 lg:p-4">
                      <CardTitle>{product.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-square relative">
                        <Image
                          src={product.imageUrl}
                          width={500}
                          height={375}
                          alt={product.name}
                          className="object-cover rounded-md"
                          style={{ width: "100%", height: "100%" }}
                        />
                      </div>
                      <div className="flex justify-between items-center smt-2">
                        <Badge>{product.department} </Badge>
                        <span className="text-lg font-semibold">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>{" "}
                      <CardFooter className="flex justify-between mt-4">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Description: {product.description}
                        </span>
                      </CardFooter>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between space-x-2 py-10">
            <Button
              variant="outline"
              size="sm"
              asChild
              disabled={currentPage === 1}
            >
              <Link
                href={`${process.env.NEXT_PUBLIC_URL}${pathname}?page=${
                  currentPage - 1
                }&limit=${
                  products?.length
                }&category=${category}&search=${search}`}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                  >
                    <Link
                      href={`${process.env.NEXT_PUBLIC_URL}${pathname}?page=${page}&limit=${products?.length}&category=${category}&search=${search}`}
                    >
                      {page}
                    </Link>
                  </Button>
                )
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
            >
              <Link
                href={`${process.env.NEXT_PUBLIC_URL}${pathname}?page=${
                  currentPage + 1
                }&limit=${
                  products?.length
                }&category=${category}&search=${search}`}
              >
                Next
              </Link>

              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
