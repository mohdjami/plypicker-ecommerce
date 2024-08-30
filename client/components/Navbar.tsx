import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getUser } from "@/lib/user";

export default async function Navbar() {
  const data = await getUser();
  const slug = data?.user.roles[0].split(" ").join("");
  const navItems = [
    { name: "Home", href: "/" },

    { name: "Products", href: "/products" },
    { name: "Pending Requests", href: "/pending-requests" },
    { name: "Profile", href: "/profile" },
    { name: "Submissions", href: "/profile/mysubmissions" },
    { name: "Dashboard", href: `/dashboard/${slug}` },
    data?.user
      ? { name: "Logout", href: "/logout" }
      : { name: "Login", href: "/login" },
  ];

  return (
    <nav className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <div className="flex h-14 items-center border-b px-4">
                <h1 className="text-lg font-semibold">E-commerce Dashboard</h1>
              </div>{" "}
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                {navItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link href={item.href}>{item.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
