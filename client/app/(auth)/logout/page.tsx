import { Button } from "@/components/ui/button";
import { logout } from "@/lib/user";
import React from "react";

const page = () => {
  return (
    <div className="flex justify-between items-center m-32 flex-col">
      <h1>Logout</h1>
      <p>Are you sure you want to logout?</p>
      <form
        action={async () => {
          "use server";
          await logout();
        }}
      >
        <Button>Yes</Button>
      </form>
    </div>
  );
};

export default page;
