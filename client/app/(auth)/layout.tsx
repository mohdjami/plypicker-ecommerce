import Navbar from "@/components/Navbar";
import { getUser } from "@/lib/user";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Auth",
  description: "Sign Up or Login",
};
export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  if (user) {
    redirect("/products");
  }
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
