import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  CheckCircle,
  Clock,
  XCircle,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
} from "lucide-react";
import { getUser } from "@/lib/user";
import { getRequests, getSubmissions } from "@/lib/query";
import { SP } from "next/dist/shared/lib/utils";

export default async function ProfilePage() {
  // Mock user data
  const data = await getUser();
  const user = data?.user;
  const name = user?.email.split("@")[0];
  const role = user?.roles[0]
    .split(" ")
    .map((i) => {
      return i.charAt(0).toUpperCase() + i.slice(1);
    })
    .join(" ");
  const dataS = await getSubmissions();
  const { Slength, Sapproved, Srejected, Spending } = dataS;

  // Mock request statistics
  const res = await getRequests();
  console.log(res);
  const { Rlength, Rapproved, Rrejected, Rpending } = res;
  console.log(Rapproved);
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto space-y-4">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Avatar className="w-24 h-24">
                {/* <AvatarImage src= alt={name} /> */}
                <AvatarFallback>{name}</AvatarFallback>
              </Avatar>
              <div className="space-y-1 text-center sm:text-left">
                <CardTitle className="text-2xl font-bold">{name}</CardTitle>
                <CardDescription>{role}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{user?.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>123456789</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>location</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-muted-foreground" />
                  <span>department</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>Joined Date</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Approved Requests
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {role === "Admin" ? Rapproved : Sapproved}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Rejected Requests
              </CardTitle>
              <XCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {role === "Admin" ? Rrejected : Srejected}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Requests
              </CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {role === "Admin" ? Rpending : Spending}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Profile Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="account">Account Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="personal">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input id="fullName" defaultValue={name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue={user?.email}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" defaultValue="123456789" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" defaultValue="location" />
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="account">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">
                        Confirm New Password
                      </Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Request History</CardTitle>
            <CardDescription>View your recent request activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* This would typically be a list or table of recent requests */}
              <p>Recent request history would be displayed here.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
