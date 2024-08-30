import Link from "next/link";
import { HandMetal, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { getUser } from "@/lib/user";
const HeaderRoutes = async () => {
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
  const loggedIn = [
    {
      href: "/#home",
      label: "Home",
    },
    {
      href: "/dashboard",
      label: "Dashboard",
    },

    {
      href: "/features",
      label: "Features",
    },
  ];
  const loggedOut = [
    {
      href: "/#home",
      label: "Home",
    },
    {
      href: "/features",
      label: "Features",
    },
  ];

  return (
    <>
      <div className="flex items-center">
        <Sheet>
          <SheetTrigger>
            <Menu className="h-6 md:hidden w-6 text-white dark:text-black" />
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4">
              {navItems.map((route, i) => (
                <Link
                  key={i}
                  href={route.href}
                  className="block px-2 py-1 text-lg "
                >
                  {route.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <Link className="flex items-center justify-center" href="/">
          <span className="ml-2 text-lg font-bold text-[#ffffff] dark:text-black">
            URL Shortener
          </span>
        </Link>
      </div>
      <nav className="mx-6 flex items-center space-x-4 lg:space-x-6 hidden md:block">
        {navItems.map((route, i) => (
          <Link
            key={i}
            href={route.href}
            className="text-sm font-medium transition-colors text-[#ffffff] dark:text-black"
          >
            {route.name}
          </Link>
        ))}
      </nav>
    </>
  );
};

export default HeaderRoutes;
