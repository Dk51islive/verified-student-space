
import { useState } from 'react';
import { MessageSquare, Users } from 'lucide-react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Discussion } from "@/types";
import DiscussionCard from "@/components/community/DiscussionCard";
import CreateDiscussionForm from "@/components/community/CreateDiscussionForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const SAMPLE_DISCUSSIONS: Discussion[] = [
  {
    id: "1",
    title: "Tips for studying Data Structures and Algorithms?",
    content: "I'm struggling with understanding complex algorithms like dynamic programming. Any tips or resources that helped you understand these concepts better?",
    author: {
      id: "101",
      name: "John Doe",
      email: "john@university.edu",
      enrollmentNumber: "EN2021001",
      yearOfStudy: "2nd Year"
    },
    category: "Academics",
    tags: ["DSA", "Programming", "Study Tips"],
    createdAt: "2025-04-28T14:30:00Z",
    likes: 24,
    replies: 8,
    isSolved: false
  },
  {
    id: "2",
    title: "Internship opportunities for Computer Science students",
    content: "I'm looking for summer internship opportunities in the field of AI/ML. Has anyone had a good experience with local companies or remote internships?",
    author: {
      id: "102",
      name: "Jane Smith",
      email: "jane@university.edu",
      enrollmentNumber: "EN2020035",
      yearOfStudy: "3rd Year"
    },
    category: "Career",
    tags: ["Internships", "AI/ML", "Computer Science"],
    createdAt: "2025-04-27T09:15:00Z",
    likes: 32,
    replies: 15,
    isSolved: true
  },
  {
    id: "3",
    title: "Setting up a development environment for ReactJS",
    content: "I'm new to React and struggling with setting up a proper development environment. What tools do you recommend for a smooth development experience?",
    author: {
      id: "103",
      name: "Mike Johnson",
      email: "mike@university.edu",
      enrollmentNumber: "EN2022089",
      yearOfStudy: "1st Year"
    },
    category: "Technical",
    tags: ["React", "Web Development", "JavaScript"],
    createdAt: "2025-04-26T18:45:00Z",
    likes: 16,
    replies: 12,
    isSolved: false
  }
];

export default function Community() {
  const [discussions, setDiscussions] = useState<Discussion[]>(SAMPLE_DISCUSSIONS);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  const filteredDiscussions = activeCategory
    ? discussions.filter(discussion => discussion.category === activeCategory)
    : discussions;

  const handleCreateDiscussion = (newDiscussion: Discussion) => {
    setDiscussions([newDiscussion, ...discussions]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Community Forum</h1>
          <p className="text-muted-foreground mt-2">Ask questions, share knowledge, and connect with fellow students</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-4 md:mt-0" size="lg">
              <MessageSquare className="mr-2 h-4 w-4" />
              Start a Discussion
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Create New Discussion</DialogTitle>
            </DialogHeader>
            <CreateDiscussionForm onCreateDiscussion={handleCreateDiscussion} />
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all" onClick={() => setActiveCategory(null)}>
            All Topics
          </TabsTrigger>
          <TabsTrigger value="academics" onClick={() => setActiveCategory("Academics")}>
            Academics
          </TabsTrigger>
          <TabsTrigger value="technical" onClick={() => setActiveCategory("Technical")}>
            Technical
          </TabsTrigger>
          <TabsTrigger value="career" onClick={() => setActiveCategory("Career")}>
            Career
          </TabsTrigger>
          <TabsTrigger value="campus" onClick={() => setActiveCategory("Campus Life")}>
            Campus Life
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-6">
          {filteredDiscussions.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center">
                <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-4 text-lg font-medium">No discussions found</p>
                <p className="text-muted-foreground">Start a new discussion to get the conversation going!</p>
              </CardContent>
            </Card>
          ) : (
            filteredDiscussions.map((discussion) => (
              <DiscussionCard key={discussion.id} discussion={discussion} />
            ))
          )}
        </TabsContent>
        
        {/* The same content is shown for all tabs, filtering is handled by state */}
        <TabsContent value="academics" className="space-y-6">
          {filteredDiscussions.map((discussion) => (
            <DiscussionCard key={discussion.id} discussion={discussion} />
          ))}
        </TabsContent>
        <TabsContent value="technical" className="space-y-6">
          {filteredDiscussions.map((discussion) => (
            <DiscussionCard key={discussion.id} discussion={discussion} />
          ))}
        </TabsContent>
        <TabsContent value="career" className="space-y-6">
          {filteredDiscussions.map((discussion) => (
            <DiscussionCard key={discussion.id} discussion={discussion} />
          ))}
        </TabsContent>
        <TabsContent value="campus" className="space-y-6">
          {filteredDiscussions.map((discussion) => (
            <DiscussionCard key={discussion.id} discussion={discussion} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
