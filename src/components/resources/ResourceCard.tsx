
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Resource } from '@/types';
import { useResources } from '@/context/ResourceContext';
import { Download, Eye } from 'lucide-react';

interface ResourceCardProps {
  resource: Resource;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  const { downloadResource, likeResource } = useResources();

  const getTypeIcon = () => {
    switch (resource.type) {
      case 'PDF':
        return (
          <div className="text-red-500 flex items-center justify-center h-12 w-12 mb-4">
            <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 18H17V16H7V18Z" fill="currentColor" />
              <path d="M17 14H7V12H17V14Z" fill="currentColor" />
              <path d="M7 10H11V8H7V10Z" fill="currentColor" />
              <path fillRule="evenodd" clipRule="evenodd" d="M6 2C4.34315 2 3 3.34315 3 5V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V9C21 5.13401 17.866 2 14 2H6ZM6 4H13V9H19V19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V5C5 4.44772 5.44772 4 6 4ZM15 4.10002C16.6113 4.4271 17.9413 5.52906 18.584 7H15V4.10002Z" fill="currentColor" />
            </svg>
          </div>
        );
      case 'Video':
        return (
          <div className="text-blue-500 flex items-center justify-center h-12 w-12 mb-4">
            <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 12.0001L9 16.0001V8.00006L15 12.0001Z" fill="currentColor" />
              <path fillRule="evenodd" clipRule="evenodd" d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" fill="currentColor" />
            </svg>
          </div>
        );
      case 'Article':
        return (
          <div className="text-green-500 flex items-center justify-center h-12 w-12 mb-4">
            <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 5H6V7H8V5Z" fill="currentColor" />
              <path d="M8 9H6V11H8V9Z" fill="currentColor" />
              <path d="M8 13H6V15H8V13Z" fill="currentColor" />
              <path d="M14 5H10V7H14V5Z" fill="currentColor" />
              <path d="M14 9H10V11H14V9Z" fill="currentColor" />
              <path d="M14 13H10V15H14V13Z" fill="currentColor" />
              <path d="M18 5H16V7H18V5Z" fill="currentColor" />
              <path d="M18 9H16V11H18V9Z" fill="currentColor" />
              <path d="M18 13H16V15H18V13Z" fill="currentColor" />
              <path d="M18 17H6V19H18V17Z" fill="currentColor" />
              <path fillRule="evenodd" clipRule="evenodd" d="M2 2C2 0.895431 2.89543 0 4 0H20C21.1046 0 22 0.895431 22 2V22C22 23.1046 21.1046 24 20 24H4C2.89543 24 2 23.1046 2 22V2ZM20 2H4V22H20V2Z" fill="currentColor" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  const typeBadge = () => {
    switch (resource.type) {
      case 'PDF':
        return <span className="resource-badge pdf">PDF</span>;
      case 'Video':
        return <span className="resource-badge video">Video</span>;
      case 'Article':
        return <span className="resource-badge article">Article</span>;
      default:
        return null;
    }
  };

  const handleDownload = () => {
    downloadResource(resource.id);
  };

  const handleLike = () => {
    likeResource(resource.id);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <div className="mb-2">{typeBadge()}</div>
            <h3 className="text-lg font-semibold">{resource.title}</h3>
          </div>
          {getTypeIcon()}
        </div>
        <div className="text-sm text-gray-500 mt-1">{resource.subject}</div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600">{resource.description}</p>
        <div className="text-xs text-gray-400 mt-3">
          By {resource.uploadedBy.name} • {resource.uploadDate}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <button 
            className="flex items-center space-x-1 hover:text-blue-600"
            onClick={handleLike}
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="none" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <span>{resource.likes}</span>
          </button>
          <div className="flex items-center space-x-1">
            <Download className="h-4 w-4" />
            <span>{resource.downloads}</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-1" /> Download
          </Button>
          <Button size="sm">
            <Eye className="h-4 w-4 mr-1" /> View
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
