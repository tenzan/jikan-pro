"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function EventTypesPage() {
  const [activeTab, setActiveTab] = useState("my-event-types");

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Event Types</h1>
        <Button>Create New Event Type</Button>
      </div>

      <Tabs defaultValue="my-event-types" onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="my-event-types">My Event Types</TabsTrigger>
          <TabsTrigger value="team-event-types">Team Event Types</TabsTrigger>
        </TabsList>
        
        <TabsContent value="my-event-types">
          {activeTab === "my-event-types" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>30 Minute Meeting</CardTitle>
                  <CardDescription>
                    30 min, One-on-One
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      /username/30min
                    </span>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>60 Minute Meeting</CardTitle>
                  <CardDescription>
                    60 min, One-on-One
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      /username/60min
                    </span>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-dashed border-2 flex flex-col items-center justify-center p-6 h-[200px]">
                <p className="text-muted-foreground mb-4 text-center">Create a new event type</p>
                <Button variant="outline">Add</Button>
              </Card>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="team-event-types">
          {activeTab === "team-event-types" && (
            <div className="text-center py-10">
              <h3 className="text-xl font-medium mb-2">No teams yet</h3>
              <p className="text-muted-foreground mb-6">
                Create a team to collaborate with others and schedule events together.
              </p>
              <Button>Create Team</Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
