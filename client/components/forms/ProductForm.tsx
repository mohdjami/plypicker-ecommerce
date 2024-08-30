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
import { Product } from "@/config/types";
import UploadImage from "./UploadFile";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export default function ProductForm({ productId }: { productId: string }) {
  const [product, setProduct] = useState<Product>({
    _id: 0,
    name: "",
    description: "",
    price: 0,
    imageUrl: "",
    department: "",
  });
  const url = `${process.env.NEXT_PUBLIC_URL}/api/products/${productId}`;
  useEffect(() => {
    async function fetchProduct() {
      // const usersObj = await getUser();
      // setUser(usersObj?.user);
      let res = await fetch(url);
      let data = await res.json();
      setProduct(data.product);
    }
    fetchProduct();
  }, [url]);
  // Track only updated fields
  const [updatedFields, setUpdatedFields] = useState<Partial<Product>>({});
  const handleImageUpload = (url: string) => {
    setUpdatedFields((prefFields) => ({
      ...prefFields,
      imageUrl: url,
    }));
  };
  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;

    // Compare new value with original value
    if (value !== product[id as keyof Product]) {
      setUpdatedFields((prevFields) => ({
        ...prevFields,
        [id]: value,
      }));
    } else {
      // If the value matches the original value, remove it from updatedFields
      const updated = { ...updatedFields };
      delete updated[id as keyof Product];
      setUpdatedFields(updated);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Optionally send the updated fields to your server here
    const url = `${process.env.NEXT_PUBLIC_URL}/api/products/${product._id}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFields),
    });
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
                      defaultValue={product.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      defaultValue={product.price}
                      onChange={handleInputChange}
                      step="0.01"
                    />
                  </div>
                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      defaultValue={product.department}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      defaultValue={product.description}
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
