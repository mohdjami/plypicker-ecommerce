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
import { ArrowLeft, Link, Save } from "lucide-react";
import Image from "next/image";
import { Product } from "@/config/types";
import { useFormState } from "react-dom";
import { createSubmission } from "./create-submission";
import UploadImage from "./UploadFile";

const initialState = {
  status: "",
};

export default function ProductSubmissionForm({
  productId,
}: {
  productId: string;
}) {
  const [state, formAction] = useFormState(createSubmission, initialState);
  const [product, setProduct] = useState<Product>({
    _id: 0,
    name: "",
    description: "",
    price: 0,
    imageUrl: "",
    department: "",
  });
  // Track only updated fields
  const [updatedFields, setUpdatedFields] = useState<Partial<Product>>({});
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
  const handleImageUpload = (url: string) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      imageUrl: url,
    }));
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
            <form action={formAction}>
              <input type="hidden" name="productId" value={product._id} />
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
                      type="text"
                      name="name"
                      defaultValue={product.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      name="price"
                      defaultValue={product.price}
                      onChange={handleInputChange}
                      step="0.01"
                    />
                  </div>
                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      name="department"
                      defaultValue={product.department}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
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
                  Submit for Approval
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
