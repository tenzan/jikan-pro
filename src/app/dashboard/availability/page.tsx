"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const daysOfWeek = [
  { id: 0, name: "Sunday" },
  { id: 1, name: "Monday" },
  { id: 2, name: "Tuesday" },
  { id: 3, name: "Wednesday" },
  { id: 4, name: "Thursday" },
  { id: 5, name: "Friday" },
  { id: 6, name: "Saturday" },
];

const timeSlots = Array.from({ length: 24 * 4 }, (_, i) => {
  const hour = Math.floor(i / 4);
  const minute = (i % 4) * 15;
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  const period = hour < 12 ? "AM" : "PM";
  return {
    value: `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`,
    label: `${formattedHour}:${minute.toString().padStart(2, "0")} ${period}`,
  };
});

export default function AvailabilityPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState("schedule");

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Availability</h1>

      <Tabs defaultValue="schedule" onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="date-overrides">Date Overrides</TabsTrigger>
        </TabsList>
        
        <TabsContent value="schedule">
          {activeTab === "schedule" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Working Hours</CardTitle>
                    <CardDescription>
                      Set your weekly working hours
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {daysOfWeek.map((day) => (
                        <div key={day.id} className="flex items-center space-x-4">
                          <div className="w-1/4">
                            <div className="flex items-center space-x-2">
                              <Checkbox id={`day-${day.id}`} defaultChecked={day.id >= 1 && day.id <= 5} />
                              <Label htmlFor={`day-${day.id}`}>{day.name}</Label>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 w-3/4">
                            <Select defaultValue={day.id >= 1 && day.id <= 5 ? "09:00" : ""}>
                              <SelectTrigger className="w-[140px]">
                                <SelectValue placeholder="Start time" />
                              </SelectTrigger>
                              <SelectContent>
                                {timeSlots.map((slot) => (
                                  <SelectItem key={slot.value} value={slot.value}>
                                    {slot.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <span>to</span>
                            <Select defaultValue={day.id >= 1 && day.id <= 5 ? "17:00" : ""}>
                              <SelectTrigger className="w-[140px]">
                                <SelectValue placeholder="End time" />
                              </SelectTrigger>
                              <SelectContent>
                                {timeSlots.map((slot) => (
                                  <SelectItem key={slot.value} value={slot.value}>
                                    {slot.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6">
                      <Button>Save Schedule</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Timezone</CardTitle>
                    <CardDescription>
                      Set your timezone for accurate scheduling
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Select defaultValue="America/New_York">
                      <SelectTrigger>
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/New_York">Eastern Time (US & Canada)</SelectItem>
                        <SelectItem value="America/Chicago">Central Time (US & Canada)</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time (US & Canada)</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time (US & Canada)</SelectItem>
                        <SelectItem value="Europe/London">London</SelectItem>
                        <SelectItem value="Europe/Paris">Paris</SelectItem>
                        <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="date-overrides">
          {activeTab === "date-overrides" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Select Date</CardTitle>
                    <CardDescription>
                      Choose a date to override your availability
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border"
                    />
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Date Override</CardTitle>
                    <CardDescription>
                      {date ? date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : "Select a date"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {date && (
                      <div className="space-y-6">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="unavailable" />
                          <Label htmlFor="unavailable">Mark as unavailable</Label>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium">Available time slots</h3>
                            <Button variant="outline" size="sm">Add Time Slot</Button>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Select defaultValue="09:00">
                              <SelectTrigger className="w-[140px]">
                                <SelectValue placeholder="Start time" />
                              </SelectTrigger>
                              <SelectContent>
                                {timeSlots.map((slot) => (
                                  <SelectItem key={slot.value} value={slot.value}>
                                    {slot.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <span>to</span>
                            <Select defaultValue="17:00">
                              <SelectTrigger className="w-[140px]">
                                <SelectValue placeholder="End time" />
                              </SelectTrigger>
                              <SelectContent>
                                {timeSlots.map((slot) => (
                                  <SelectItem key={slot.value} value={slot.value}>
                                    {slot.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Button variant="ghost" size="icon">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                <path d="M18 6 6 18"></path>
                                <path d="m6 6 12 12"></path>
                              </svg>
                            </Button>
                          </div>
                        </div>
                        
                        <Button>Save Override</Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
