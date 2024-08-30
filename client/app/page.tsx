"use client";
import { getToken } from "@/lib/cookie";
import { getUser, isAuthorized } from "@/lib/user";
import { useEffect } from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1 className="text-4xl font-bold text-center">
          Welcome to the Next.js E-commerce App
        </h1>
        <p className="text-center text-lg mt-4">
          This is a simple e-commerce app built with Next.js, Tailwind CSS, and
          MongoDB.
        </p>
      </div>
    </main>
  );
}
