"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Save } from "lucide-react";
import Image from "next/image";
import { Product, User } from "@/config/types";
import UploadImage from "@/components/forms/UploadFile";
import Link from "next/link";
// import { getUser } from "@/lib/user";

type Data = {
  params: {
    productId: string;
  };
};

export default function ProductDetails(data: Data) {
  const { productId } = data.params;
  const [user, setUser] = useState<User>();
  console.log(user);
  // State variables for form fields
  const [product, setProduct] = useState<Product>({
    _id: 0,
    name: "",
    description: "",
    price: 0,
    imageUrl: "",
    department: "",
  });

  // Fetch product data on component mount
  const url = `${process.env.NEXT_PUBLIC_URL}/api/products/${productId}`;
  useEffect(() => {
    async function fetchProduct() {
      // const usersObj = await getUser();
      // setUser(usersObj?.user);
      let res = await fetch(url);
      let data = await res.json();
      console.log("Fetched product data:", data.product);
      setProduct(data.product);
    }
    fetchProduct();
  }, [url]);

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setProduct((prevProduct: any) => ({
      ...prevProduct,
      [id]: value,
    }));
  };
  const handleImageUpload = (url: string) => {
    console.log("url updated", url);
    setProduct((prevProduct) => ({
      ...prevProduct,
      imageUrl: url,
    }));
  };
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated Product Info:", product);
    const url = `${process.env.NEXT_PUBLIC_URL}/api/products/${productId}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    console.log(await response.json());
    // Optionally send the updated product data to your server here
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <Link href={`${process.env.NEXT_PUBLIC_URL}/products`} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Link>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Product Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="aspect-square relative rounded-lg overflow-hidden">
                    <div>
                      <Label htmlFor="name">Product Image</Label>
                      <Input
                        id="imageUrl"
                        value={product.imageUrl}
                        onChange={handleInputChange}
                        type="text"
                        placeholder="Enter image URL or upload a file"
                      />
                      <UploadImage
                        initial={product.imageUrl}
                        onImageUpload={handleImageUpload}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      value={product.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={product.price}
                      onChange={handleInputChange}
                      step="0.01"
                    />
                  </div>
                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={product.department}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={product.description}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <CardFooter className="flex justify-between mt-4">
                <Badge variant="outline">{product.department}</Badge>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
