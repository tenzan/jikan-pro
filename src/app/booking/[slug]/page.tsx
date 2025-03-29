"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";

// Mock data for event type
const mockEventType = {
  id: "1",
  title: "30 Minute Meeting",
  description: "A quick 30 minute meeting to discuss your needs.",
  duration: 30,
  owner: {
    name: "John Doe",
    image: "https://github.com/shadcn.png",
  }
};

// Generate time slots for a given date
const generateTimeSlots = (date: Date) => {
  // In a real app, this would fetch available slots from the API
  // based on the user's availability and existing bookings
  const slots = [];
  const startHour = 9; // 9 AM
  const endHour = 17; // 5 PM
  
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const slotDate = new Date(date);
      slotDate.setHours(hour, minute, 0, 0);
      slots.push(slotDate);
    }
  }
  
  return slots;
};

export default function BookingPage() {
  const params = useParams();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    notes: "",
    location: "google_meet",
  });

  const timeSlots = date ? generateTimeSlots(date) : [];

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep(2);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = (value: string) => {
    setFormData(prev => ({ ...prev, location: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the booking to the API
    setStep(3);
  };

  return (
    <div className="container mx-auto py-10 max-w-3xl">
      {step === 1 && (
        <>
          <div className="mb-8">
            <h1 className="text-3xl font-bold">{mockEventType.title}</h1>
            <p className="text-muted-foreground mt-2">{mockEventType.description}</p>
            <div className="flex items-center mt-4">
              <div className="w-8 h-8 rounded-full bg-gray-300 mr-2"></div>
              <span>{mockEventType.owner.name}</span>
            </div>
            <div className="flex items-center mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>{mockEventType.duration} minutes</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Select a Date</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                  disabled={(date) => {
                    // Disable past dates and weekends in this example
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    const day = date.getDay();
                    return date < today || day === 0 || day === 6;
                  }}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Select a Time</CardTitle>
                <CardDescription>
                  {date ? format(date, "EEEE, MMMM d, yyyy") : "Select a date"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((slot, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      onClick={() => handleTimeSelect(format(slot, "h:mm a"))}
                    >
                      {format(slot, "h:mm a")}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Enter Your Details</CardTitle>
            <CardDescription>
              Booking {mockEventType.title} with {mockEventType.owner.name} on {date ? format(date, "EEEE, MMMM d, yyyy") : ""} at {selectedTime}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Select 
                  value={formData.location} 
                  onValueChange={handleLocationChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="google_meet">Google Meet</SelectItem>
                    <SelectItem value="zoom">Zoom</SelectItem>
                    <SelectItem value="microsoft_teams">Microsoft Teams</SelectItem>
                    <SelectItem value="phone">Phone Call</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea 
                  id="notes" 
                  name="notes" 
                  value={formData.notes} 
                  onChange={handleInputChange} 
                  placeholder="Add any additional information" 
                />
              </div>
              
              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button type="submit">
                  Schedule Event
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Booking Confirmed!</CardTitle>
            <CardDescription>
              Your meeting has been scheduled
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span className="font-medium">Your booking has been confirmed</span>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-lg">{mockEventType.title}</h3>
                <p className="text-muted-foreground">{mockEventType.duration} minutes</p>
              </div>
              
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span>{date ? format(date, "EEEE, MMMM d, yyyy") : ""} at {selectedTime}</span>
              </div>
              
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span>
                  {formData.location === "google_meet" && "Google Meet (link will be sent via email)"}
                  {formData.location === "zoom" && "Zoom (link will be sent via email)"}
                  {formData.location === "microsoft_teams" && "Microsoft Teams (link will be sent via email)"}
                  {formData.location === "phone" && "Phone Call"}
                </span>
              </div>
              
              <div className="border-t pt-4 mt-4">
                <p className="text-sm text-muted-foreground">
                  A calendar invitation has been sent to your email address. You can add this event to your calendar using the link in the email.
                </p>
              </div>
              
              <Button className="w-full" onClick={() => window.location.href = "/"}>
                Return to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
