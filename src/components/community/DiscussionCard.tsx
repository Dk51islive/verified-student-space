
import { MessageSquare } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Discussion } from '@/types';

interface DiscussionCardProps {
  discussion: Discussion;
}

export default function DiscussionCard({ discussion }: DiscussionCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">{discussion.title}</h3>
              <div className="flex items-center text-sm text-muted-foreground gap-2">
                <span>{discussion.author.name}</span>
                <span>•</span>
                <span>{formatDate(discussion.createdAt)}</span>
                {discussion.isSolved && (
                  <>
                    <span>•</span>
                    <span className="text-green-600 font-medium">Solved</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <Badge variant="outline">{discussion.category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-gray-700">{discussion.content}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {discussion.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-gray-100">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        <div className="flex gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 10v12l7-6 7 6V10a4 4 0 0 0-4-4h-6a4 4 0 0 0-4 4Z" />
            </svg>
            <span>{discussion.likes} likes</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            <span>{discussion.replies} replies</span>
          </div>
        </div>
        <Button variant="ghost" size="sm">
          View Discussion
        </Button>
      </CardFooter>
    </Card>
  );
}
