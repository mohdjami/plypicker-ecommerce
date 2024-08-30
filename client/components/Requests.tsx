"use client";
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
import { createOptions } from "@/lib/utils";
import { IRequests } from "@/config/types";

export default function Requests({
  requests,
  adminId,
}: {
  requests: IRequests[];
  adminId: string;
}) {
  const handleApprove = async (requestId: string) => {
    // Here you would typically make an API call to update the status
    const url = `${process.env.NEXT_PUBLIC_URL}/api/requests/approve`;
    const options = await createOptions("POST", undefined, {
      requestId: requestId,
      adminId: adminId,
    });
    const res = await fetch(url, options);
    window.location.reload();

    console.log("Submission approved");
  };

  const handleReject = async (requestId: string) => {
    const url = `${process.env.NEXT_PUBLIC_URL}/api/requests/reject`;
    const options = await createOptions("POST", undefined, {
      requestId: requestId,
      adminId: adminId,
    });
    const res = await fetch(url, options);
    console.log("Submission rejected");

    window.location.reload();

    // Here you would typically make an API call to update the status
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "rejected":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };
  return (
    <div className="container mx-auto p-4 grid grid-cols-2 gap-4 ">
      {requests.map((request: any) => {
        return (
          <Card className="w-full max-w-2xl mx-auto" key={request._id}>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Submission Request
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Status:</span>
                  <Badge
                    className={`${getStatusColor(
                      request.status
                    )} flex items-center gap-1`}
                  >
                    {getStatusIcon(request.status)}
                    {request.status}
                  </Badge>
                </div>
                <div>
                  <span className="font-semibold">Submission ID:</span>{" "}
                  {request.submissionId?._id}
                </div>
                <div>
                  <span className="font-semibold">Product ID:</span>{" "}
                  {request.submissionId?.productId}
                </div>
                <div>
                  <span className="font-semibold">User ID:</span>{" "}
                  {request.submissionId?.userId}
                </div>
                <div>
                  <span className="font-semibold">Created At:</span>
                  {request.submissionId?.createdAt}
                </div>
                <div>
                  <span className="font-semibold">Updated Fields:</span>
                  <ul className="list-disc list-inside mt-2">
                    {request.submissionId?.updatedFields &&
                      Object.entries(request.submissionId.updatedFields).map(
                        ([key, value]: any) => (
                          <li key={key}>
                            {key}: {value}
                          </li>
                        )
                      )}
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  handleReject(request._id);
                }}
                disabled={request.status !== "pending"}
              >
                Reject
              </Button>
              <Button
                onClick={() => {
                  handleApprove(request._id);
                }}
                disabled={request.status !== "pending"}
              >
                Approve
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
