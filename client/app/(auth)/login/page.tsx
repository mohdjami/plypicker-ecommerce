import LogInForm from "@/components/forms/LogInForm";
import { getUser } from "@/lib/user";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const user = await getUser();
  if (user) {
    redirect("/products");
  }
  return (
    <div>
      <LogInForm />
    </div>
  );
};

export default page;
