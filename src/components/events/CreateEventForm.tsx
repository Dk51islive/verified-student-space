
import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DialogFooter } from '@/components/ui/dialog';
import { Event } from '@/types';
import { toast } from 'sonner';

interface CreateEventFormProps {
  onCreateEvent: (event: Event) => void;
}

export default function CreateEventForm({ onCreateEvent }: CreateEventFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState<'Festival' | 'Workshop' | 'Seminar' | 'Competition'>('Workshop');
  const [capacity, setCapacity] = useState(50);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!title || !description || !date || !time || !location) {
      toast.error('Please fill in all the fields');
      return;
    }

    const newEvent: Event = {
      id: Date.now().toString(),
      title,
      description,
      date,
      time,
      location,
      type,
      capacity,
      attendees: 0
    };

    onCreateEvent(newEvent);
    toast.success('Event created successfully!');
    
    // Reset form
    setTitle('');
    setDescription('');
    setDate('');
    setTime('');
    setLocation('');
    setType('Workshop');
    setCapacity(50);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="title">Event Title</Label>
          <Input 
            id="title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Enter event title" 
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea 
            id="description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            placeholder="Describe your event" 
            rows={3} 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="date">Date</Label>
            <Input 
              id="date" 
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="time">Time</Label>
            <Input 
              id="time" 
              type="text" 
              value={time} 
              onChange={(e) => setTime(e.target.value)} 
              placeholder="e.g., 2:00 PM - 5:00 PM" 
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="location">Location</Label>
          <Input 
            id="location" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
            placeholder="Event location" 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="type">Event Type</Label>
            <Select value={type} onValueChange={(value: 'Festival' | 'Workshop' | 'Seminar' | 'Competition') => setType(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select event type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Festival">Festival</SelectItem>
                <SelectItem value="Workshop">Workshop</SelectItem>
                <SelectItem value="Seminar">Seminar</SelectItem>
                <SelectItem value="Competition">Competition</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="capacity">Capacity</Label>
            <Input 
              id="capacity" 
              type="number" 
              min="1"
              value={capacity} 
              onChange={(e) => setCapacity(parseInt(e.target.value, 10))} 
            />
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button type="submit">
          <Calendar className="mr-2 h-4 w-4" />
          Create Event
        </Button>
      </DialogFooter>
    </form>
  );
}
