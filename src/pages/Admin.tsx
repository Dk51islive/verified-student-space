
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Resource, User, Event, Discussion } from '@/types';

export default function Admin() {
  // Sample data - in a real app, this would come from the backend
  const [users, setUsers] = useState<User[]>([
    { id: "1", name: "John Doe", email: "john@university.edu", enrollmentNumber: "EN2021001", yearOfStudy: "2nd Year", isVerified: true },
    { id: "2", name: "Jane Smith", email: "jane@university.edu", enrollmentNumber: "EN2020035", yearOfStudy: "3rd Year", isVerified: true },
    { id: "3", name: "Mike Johnson", email: "mike@university.edu", enrollmentNumber: "EN2022089", yearOfStudy: "1st Year", isVerified: false }
  ]);
  
  const [resources, setResources] = useState<Resource[]>([
    {
      id: "1", 
      title: "Introduction to Machine Learning", 
      description: "A comprehensive guide to ML fundamentals",
      type: "PDF",
      url: "#",
      uploadedBy: users[0], 
      subject: "Computer Science",
      uploadDate: "2025-04-10",
      likes: 45,
      downloads: 120
    },
    {
      id: "2", 
      title: "Database Management Systems Tutorial", 
      description: "Learn about SQL, NoSQL, and database design",
      type: "Video",
      url: "#",
      uploadedBy: users[1], 
      subject: "Information Technology",
      uploadDate: "2025-03-22",
      likes: 32,
      downloads: 87
    }
  ]);

  const toggleUserVerification = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId ? {...user, isVerified: !user.isVerified} : user
    ));
  };

  const deleteResource = (resourceId: string) => {
    setResources(resources.filter(resource => resource.id !== resourceId));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
      <p className="text-muted-foreground mb-8">Manage users, resources, events and discussions</p>
      
      <Tabs defaultValue="users">
        <TabsList className="mb-6">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
        </TabsList>
        
        {/* Users Tab */}
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Manage Users</CardTitle>
              <CardDescription>Approve, verify or remove user accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Name</th>
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">Enrollment</th>
                      <th className="text-left py-3 px-4">Year</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {user.name}
                          </div>
                        </td>
                        <td className="py-3 px-4">{user.email}</td>
                        <td className="py-3 px-4">{user.enrollmentNumber}</td>
                        <td className="py-3 px-4">{user.yearOfStudy}</td>
                        <td className="py-3 px-4">
                          {user.isVerified ? (
                            <Badge className="bg-green-100 text-green-800">Verified</Badge>
                          ) : (
                            <Badge variant="outline" className="text-yellow-800">Pending</Badge>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => toggleUserVerification(user.id)}
                            >
                              {user.isVerified ? "Revoke" : "Verify"}
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm" 
                              onClick={() => setUsers(users.filter(u => u.id !== user.id))}
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Resources Tab */}
        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle>Manage Resources</CardTitle>
              <CardDescription>Add, edit or remove educational resources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Title</th>
                      <th className="text-left py-3 px-4">Type</th>
                      <th className="text-left py-3 px-4">Subject</th>
                      <th className="text-left py-3 px-4">Upload Date</th>
                      <th className="text-left py-3 px-4">Stats</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resources.map((resource) => (
                      <tr key={resource.id} className="border-b">
                        <td className="py-3 px-4">{resource.title}</td>
                        <td className="py-3 px-4">
                          <Badge className={`resource-badge ${resource.type.toLowerCase()}`}>
                            {resource.type}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">{resource.subject}</td>
                        <td className="py-3 px-4">{resource.uploadDate}</td>
                        <td className="py-3 px-4">
                          <div className="text-sm text-muted-foreground">
                            {resource.downloads} downloads • {resource.likes} likes
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                            >
                              Edit
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => deleteResource(resource.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Events Tab */}
        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle>Manage Events</CardTitle>
              <CardDescription>Oversee and moderate campus events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <p className="text-muted-foreground">The events management interface will be implemented here</p>
                <Button className="mt-4">Add New Event</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Discussions Tab */}
        <TabsContent value="discussions">
          <Card>
            <CardHeader>
              <CardTitle>Manage Discussions</CardTitle>
              <CardDescription>Moderate forum discussions and topics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <p className="text-muted-foreground">The discussions management interface will be implemented here</p>
                <Button className="mt-4">Moderate Discussions</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
