import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { createOptions, getUser } from "@/lib/user";
import { getToken } from "@/lib/cookie";
import { redirect } from "next/navigation";
import { getSubmissions } from "@/lib/query";

export default async function SubmissionCards() {
  const dataa = await getUser();
  if (dataa?.user.roles[0] === "admin") {
    return redirect("/profile");
  }
  const data = await getSubmissions();
  const submissions = data?.submissions;
  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500";
      case "rejected":
        return "bg-red-500";
      case "pending":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Submissions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {submissions?.map((submission: any) => (
          <Card key={submission.id} className="w-full">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">
                  Submission #{submission._id}
                </CardTitle>
                <Badge
                  className={`${getStatusColor(submission.status)} text-white`}
                >
                  {submission.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2">
                Issuer:{" "}
                <span className="font-semibold">{submission.userId}</span>
              </p>
              <p className="text-sm text-gray-600 mb-2">
                Date:{" "}
                <span className="font-semibold">{submission.createdAt}</span>
              </p>
              <p className="text-sm text-gray-600 mb-1">Updated fields:</p>
              <ScrollArea className="h-20 w-full rounded-md border p-2">
                <div className="grid grid-cols-2">
                  <li className="text-sm">
                    {Object.keys(submission?.updatedFields).map((item) => {
                      return <div key={submission?._id}>{item}</div>;
                    })}
                  </li>
                  <li className="text-sm">
                    {Object.values(submission?.updatedFields).map(
                      (item: any) => {
                        return <div key={submission._id}>{item}</div>;
                      }
                    )}
                  </li>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
