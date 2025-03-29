"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CalendarsPage() {
  const [activeTab, setActiveTab] = useState("connected-calendars");
  const [isGoogleConnected, setIsGoogleConnected] = useState(false);
  const [isMicrosoftConnected, setIsMicrosoftConnected] = useState(false);

  const handleConnectGoogle = () => {
    // In a real implementation, this would redirect to OAuth flow
    setIsGoogleConnected(true);
  };

  const handleConnectMicrosoft = () => {
    // In a real implementation, this would redirect to OAuth flow
    setIsMicrosoftConnected(true);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Calendar Connections</h1>

      <Tabs defaultValue="connected-calendars" onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="connected-calendars">Connected Calendars</TabsTrigger>
          <TabsTrigger value="calendar-settings">Calendar Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="connected-calendars">
          {activeTab === "connected-calendars" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Google Calendar</CardTitle>
                  <CardDescription>
                    Connect your Google Calendar to automatically check for conflicts and update your availability
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      {isGoogleConnected ? (
                        <div className="flex items-center space-x-2">
                          <div className="h-4 w-4 rounded-full bg-green-500"></div>
                          <span>Connected</span>
                        </div>
                      ) : (
                        <span>Not connected</span>
                      )}
                    </div>
                    <Button 
                      variant={isGoogleConnected ? "outline" : "default"}
                      onClick={handleConnectGoogle}
                    >
                      {isGoogleConnected ? "Disconnect" : "Connect"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Microsoft Outlook</CardTitle>
                  <CardDescription>
                    Connect your Microsoft Outlook Calendar to automatically check for conflicts and update your availability
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      {isMicrosoftConnected ? (
                        <div className="flex items-center space-x-2">
                          <div className="h-4 w-4 rounded-full bg-green-500"></div>
                          <span>Connected</span>
                        </div>
                      ) : (
                        <span>Not connected</span>
                      )}
                    </div>
                    <Button 
                      variant={isMicrosoftConnected ? "outline" : "default"}
                      onClick={handleConnectMicrosoft}
                    >
                      {isMicrosoftConnected ? "Disconnect" : "Connect"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="calendar-settings">
          {activeTab === "calendar-settings" && (
            <Card>
              <CardHeader>
                <CardTitle>Calendar Settings</CardTitle>
                <CardDescription>
                  Configure how your calendars are used
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="buffer-before">Buffer time before meetings (minutes)</Label>
                  <Input id="buffer-before" type="number" defaultValue="0" min="0" max="60" />
                  <p className="text-sm text-muted-foreground">
                    Add a buffer before each meeting to prepare
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="buffer-after">Buffer time after meetings (minutes)</Label>
                  <Input id="buffer-after" type="number" defaultValue="0" min="0" max="60" />
                  <p className="text-sm text-muted-foreground">
                    Add a buffer after each meeting to wrap up
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="min-notice">Minimum scheduling notice (hours)</Label>
                  <Input id="min-notice" type="number" defaultValue="24" min="0" />
                  <p className="text-sm text-muted-foreground">
                    Minimum amount of notice required before someone can book a meeting
                  </p>
                </div>

                <Button>Save Settings</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
