import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Clock } from "lucide-react";
import { format } from "date-fns";
import { createOptions, getUser } from "@/lib/user";
import { redirect } from "next/navigation";
import { getToken } from "@/lib/cookie";
import Requests from "@/components/Requests";

// Mock submission data based on the provided object structure
const mockSubmission = {
  _id: "66ce2c90afc7e9bd9d793aff",
  submissionId: {
    _id: "66ce2c90afc7e9bd9d793afd",
    productId: "66cb832ba02b8fc730306d56",
    userId: "66cc109d0670270eae9b571b",
    updatedFields: {
      name: "Keyboard Updated",
    },
    status: "pending",
    createdAt: "2024-08-27T19:44:16.069Z",
    __v: 0,
  },
  status: "pending",
  __v: 0,
};

export default async function AdminSubmissionView() {
  const data = await getUser();
  if (data?.user.roles[0] !== "admin") {
    return redirect("/profile");
  }
  const token = await getToken();
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/requests`;
  const options = await createOptions("GET", token);
  const res = await fetch(url, options);
  const json = await res.json();
  // console.log(json.requests);
  const requests = json.requests;
  // console.log(requests);
  const adminId = data.user._id;

  return <Requests requests={requests} adminId={adminId} />;
}
