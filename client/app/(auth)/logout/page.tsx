"use client";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/user";
import { createOptions } from "@/lib/utils";
import React from "react";

const page = () => {
  const handleLogout = async () => {
    const url = `${process.env.NEXT_PUBLIC_URL}/api/logout`;
    const options = await createOptions("GET");
    const res = await fetch(url, options);
    if (!res.ok) {
      return;
    }
  };
  return (
    <div className="flex justify-between items-center m-32 flex-col">
      <h1>Logout</h1>
      <p>Are you sure you want to logout?</p>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default page;
