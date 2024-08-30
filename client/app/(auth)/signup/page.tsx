import SignUpForm from "@/components/forms/SignUpForm";
import { getUser } from "@/lib/user";
import { redirect } from "next/navigation";
import React from "react";

const SignUp = async () => {
  const user = await getUser();
  if (user) {
    redirect("/products");
  }
  return (
    <div>
      <SignUpForm />
    </div>
  );
};

export default SignUp;
