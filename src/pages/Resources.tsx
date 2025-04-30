
import { useState } from 'react';
import { useResources } from '@/context/ResourceContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ResourceType } from '@/types';
import ResourceCard from '@/components/resources/ResourceCard';
import { Book, Search } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<ResourceType | undefined>(undefined);
  const [selectedSubject, setSelectedSubject] = useState<string | undefined>(undefined);
  const { resources, getResourcesByType, searchResources } = useResources();
  const { user } = useAuth();
  
  // Get unique subjects from resources
  const subjects = [...new Set(resources.map(resource => resource.subject))];
  
  // Filter resources by search, type, and subject
  const filteredResources = searchQuery 
    ? searchResources(searchQuery) 
    : selectedType 
      ? getResourcesByType(selectedType)
      : resources;
  
  // Further filter by subject if selected
  const displayResources = selectedSubject 
    ? filteredResources.filter(resource => resource.subject === selectedSubject)
    : filteredResources;
  
  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white py-10">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Book className="h-10 w-10" />
            <div>
              <h1 className="text-3xl font-bold">Study Resources</h1>
              <p className="mt-2 text-purple-100">Browse and download study materials, notes, video tutorials, and more to ace your exams.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Search and Filter Section */}
      <div className="container mx-auto px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button
                variant={!selectedType ? "default" : "outline"}
                onClick={() => setSelectedType(undefined)}
                size="sm"
              >
                All Types
              </Button>
              <Button
                variant={selectedType === "PDF" ? "default" : "outline"}
                onClick={() => setSelectedType("PDF")}
                size="sm"
              >
                PDFs
              </Button>
              <Button
                variant={selectedType === "Video" ? "default" : "outline"}
                onClick={() => setSelectedType("Video")}
                size="sm"
              >
                Videos
              </Button>
              <Button
                variant={selectedType === "Article" ? "default" : "outline"}
                onClick={() => setSelectedType("Article")}
                size="sm"
              >
                Articles
              </Button>
            </div>
            
            {user?.isAdmin && (
              <Button className="whitespace-nowrap">
                Upload Resource
              </Button>
            )}
          </div>
          
          {/* Subject Filter */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={!selectedSubject ? "secondary" : "ghost"}
              onClick={() => setSelectedSubject(undefined)}
              size="sm"
            >
              All Subjects
            </Button>
            {subjects.map(subject => (
              <Button
                key={subject}
                variant={selectedSubject === subject ? "secondary" : "ghost"}
                onClick={() => setSelectedSubject(subject)}
                size="sm"
              >
                {subject}
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Copyright Warning */}
      <div className="container mx-auto px-6 lg:px-8 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-blue-800 font-medium">Copyright Protection</h3>
          <p className="text-blue-700 text-sm">
            All downloaded resources are watermarked with your enrollment number and phone number for copyright protection. 
            Do not share the downloaded materials to protect your personal information.
          </p>
        </div>
      </div>
      
      {/* Resources Grid */}
      <div className="container mx-auto px-6 lg:px-8">
        {displayResources.length === 0 ? (
          <div className="text-center py-12">
            <svg className="h-16 w-16 text-gray-400 mx-auto mb-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.5 15.5L20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M10 7V10M10 13H10.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h3 className="text-lg font-medium text-gray-900">No resources found</h3>
            <p className="text-gray-600 mt-1">Try adjusting your search or filter to find what you're looking for.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayResources.map(resource => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Resources;
