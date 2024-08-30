import Link from "next/link";
import HeaderRoutes from "./header-routes";
import { buttonVariants } from "./ui/button";
import { getUser } from "@/lib/user";

const Navbar = async () => {
  const user = await getUser();
  return (
    <header className="sm:flex sm:justify-between   px-4  bg-slate-900 dark:bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0">
      <div className="relative px-4 sm:px-6 lg:px-8 flex h-12 items-center justify-between w-full mx-auto max-w-7xl">
        <HeaderRoutes />
        <div className="flex items-center justify-center">
          {user ? (
            <Link
              className={buttonVariants({ variant: "secondary" })}
              href="/logout"
            >
              Logout
            </Link>
          ) : (
            <Link
              className={buttonVariants({ variant: "secondary" })}
              href="/sign-in"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
