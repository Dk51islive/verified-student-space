
import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DialogFooter } from '@/components/ui/dialog';
import { Discussion, User } from '@/types';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

interface CreateDiscussionFormProps {
  onCreateDiscussion: (discussion: Discussion) => void;
}

export default function CreateDiscussionForm({ onCreateDiscussion }: CreateDiscussionFormProps) {
  const { user } = useAuth();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Academics');
  const [tags, setTags] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!title || !content || !category) {
      toast.error('Please fill in all required fields');
      return;
    }

    // If no user is logged in, use a sample user
    const author: User = user || {
      id: "guest-" + Date.now().toString(),
      name: "Guest User",
      email: "guest@example.com",
    };

    const newDiscussion: Discussion = {
      id: Date.now().toString(),
      title,
      content,
      author,
      category,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      createdAt: new Date().toISOString(),
      likes: 0,
      replies: 0,
      isSolved: false
    };

    onCreateDiscussion(newDiscussion);
    toast.success('Discussion created successfully!');
    
    // Reset form
    setTitle('');
    setContent('');
    setCategory('Academics');
    setTags('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="title">Discussion Title</Label>
          <Input 
            id="title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Enter a clear, specific title for your discussion" 
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="content">Content</Label>
          <Textarea 
            id="content" 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            placeholder="Describe your question or topic in detail" 
            rows={5} 
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="category">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Academics">Academics</SelectItem>
              <SelectItem value="Technical">Technical</SelectItem>
              <SelectItem value="Career">Career</SelectItem>
              <SelectItem value="Campus Life">Campus Life</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="tags">Tags (comma separated)</Label>
          <Input 
            id="tags" 
            value={tags} 
            onChange={(e) => setTags(e.target.value)} 
            placeholder="e.g., programming, mathematics, internships" 
          />
          <p className="text-xs text-muted-foreground">Separate tags with commas</p>
        </div>
      </div>

      <DialogFooter>
        <Button type="submit">
          <MessageSquare className="mr-2 h-4 w-4" />
          Post Discussion
        </Button>
      </DialogFooter>
    </form>
  );
}
