"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Welcome, {session?.user?.name || "User"}!</CardTitle>
            <CardDescription>
              Manage your scheduling and availability
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Your account is ready to use. Start by creating your first event type or connecting your calendar.</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/dashboard/event-types">Create Event Type</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Connect Calendar</CardTitle>
            <CardDescription>
              Sync with your existing calendars
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Connect your Google or Microsoft calendar to automatically check for conflicts and update your availability.</p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/dashboard/calendars">Connect Calendar</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Set Availability</CardTitle>
            <CardDescription>
              Define when you're available for meetings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Set your working hours and create availability schedules to control when people can book time with you.</p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/dashboard/availability">Set Availability</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Your Booking Page</h2>
        <Card>
          <CardHeader>
            <CardTitle>Share your booking link</CardTitle>
            <CardDescription>
              Let others schedule meetings with you
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="bg-muted p-2 rounded-md flex-1 text-sm">
                {`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/${session?.user?.name?.toLowerCase().replace(/\s+/g, "") || "user"}`}
              </div>
              <Button variant="outline" size="sm">Copy</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10 text-center">
        <Button variant="destructive" onClick={() => signOut({ callbackUrl: "/auth/login" })}>
          Sign Out
        </Button>
      </div>
    </div>
  );
}
