
import { useState } from 'react';
import { Calendar, MessageSquare, Upload } from 'lucide-react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import EventCard from "@/components/events/EventCard";
import CreateEventForm from "@/components/events/CreateEventForm";
import { Event } from "@/types";

const SAMPLE_EVENTS: Event[] = [
  {
    id: "1",
    title: "Annual Tech Festival",
    description: "Join us for a weekend of innovation, technology, and fun at our annual tech festival.",
    date: "2025-05-15",
    time: "10:00 AM - 6:00 PM",
    location: "University Main Campus",
    type: "Festival",
    capacity: 500,
    attendees: 320
  },
  {
    id: "2",
    title: "Web Development Workshop",
    description: "Learn the fundamentals of web development with React, Node.js, and MongoDB in this hands-on workshop.",
    date: "2025-05-20",
    time: "2:00 PM - 5:00 PM",
    location: "Computer Science Building, Room 301",
    type: "Workshop",
    capacity: 50,
    attendees: 35
  },
  {
    id: "3",
    title: "AI Research Seminar",
    description: "Listen to prominent researchers discussing the latest advancements in artificial intelligence.",
    date: "2025-05-25",
    time: "11:00 AM - 1:00 PM",
    location: "Engineering Building, Auditorium A",
    type: "Seminar",
    capacity: 200,
    attendees: 175
  }
];

export default function Events() {
  const [events, setEvents] = useState<Event[]>(SAMPLE_EVENTS);
  const [filterType, setFilterType] = useState<string | null>(null);
  
  const filteredEvents = filterType
    ? events.filter(event => event.type === filterType)
    : events;

  const handleCreateEvent = (newEvent: Event) => {
    setEvents([...events, newEvent]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Upcoming Events</h1>
          <p className="text-muted-foreground mt-2">Discover and join events happening around the university</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-4 md:mt-0" size="lg">
              <Calendar className="mr-2 h-4 w-4" />
              Create Event
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
            </DialogHeader>
            <CreateEventForm onCreateEvent={handleCreateEvent} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex overflow-x-auto mb-6 pb-2 gap-2">
        <Button
          variant={filterType === null ? "default" : "outline"}
          onClick={() => setFilterType(null)}
          className="whitespace-nowrap"
        >
          All Events
        </Button>
        <Button
          variant={filterType === "Festival" ? "default" : "outline"}
          onClick={() => setFilterType("Festival")}
          className="whitespace-nowrap"
        >
          Festivals
        </Button>
        <Button
          variant={filterType === "Workshop" ? "default" : "outline"}
          onClick={() => setFilterType("Workshop")}
          className="whitespace-nowrap"
        >
          Workshops
        </Button>
        <Button
          variant={filterType === "Seminar" ? "default" : "outline"}
          onClick={() => setFilterType("Seminar")}
          className="whitespace-nowrap"
        >
          Seminars
        </Button>
        <Button
          variant={filterType === "Competition" ? "default" : "outline"}
          onClick={() => setFilterType("Competition")}
          className="whitespace-nowrap"
        >
          Competitions
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
