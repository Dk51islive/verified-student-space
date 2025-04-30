
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import ResourceCard from '@/components/resources/ResourceCard';
import EventCard from '@/components/events/EventCard';
import { useResources } from '@/context/ResourceContext';
import { Book, Calendar, Users, MessageSquare } from 'lucide-react';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const { resources } = useResources();
  
  // Mock events data with correct type values
  const events = [
    {
      id: '1',
      title: 'Tech Fest 2023',
      description: 'Annual technology festival showcasing student projects, workshops, and competitions.',
      date: 'May 15, 2023',
      time: '10:00 AM - 5:00 PM',
      location: 'GTU Main Campus, Auditorium',
      type: 'Festival' as 'Festival',  // Explicitly typed as a literal
      capacity: 200,
      attendees: 120
    },
    {
      id: '2',
      title: 'Workshop on Web Development',
      description: 'Hands-on workshop on modern web development techniques using React and Node.js.',
      date: 'May 20, 2023',
      time: '2:00 PM - 5:00 PM',
      location: 'Computer Science Building, Room 302',
      type: 'Workshop' as 'Workshop',  // Explicitly typed as a literal
      capacity: 50,
      attendees: 45
    }
  ];
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="hero-section py-16 md:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6 md:pr-12">
              <h1 className="text-4xl md:text-5xl font-bold">
                Welcome to GTUInsta community
              </h1>
              <p className="text-lg md:text-xl opacity-90">
                Your one-stop platform for academic resources, community engagement, and campus updates. Connect, learn, and excel together!
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Link to="/resources">
                  <Button size="lg" className="bg-white text-brand-blue hover:bg-gray-100">
                    Explore Resources
                  </Button>
                </Link>
                <Link to="/community">
                  <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                    Join Community
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:flex justify-end">
              <div className="relative w-full max-w-lg">
                <img
                  src="/lovable-uploads/e1932f4a-518f-46ec-8ba3-5865c4a5ad33.png"
                  alt="Students celebrating graduation"
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">What We Offer</h2>
            <p className="mt-4 text-lg text-gray-600">
              Discover all the tools and resources we provide to help you succeed in your academic journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Study Resources */}
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-brand-blue mb-4">
                <Book className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Study Resources</h3>
              <p className="text-gray-600 mb-4">
                Access a vast library of study materials, notes, previous year papers, and video tutorials.
              </p>
              <Link to="/resources" className="text-brand-blue font-medium flex items-center">
                Explore
                <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>

            {/* Events & Workshops */}
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-brand-orange mb-4">
                <Calendar className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Events & Workshops</h3>
              <p className="text-gray-600 mb-4">
                Stay updated with campus events, workshops, seminars, and tech fests happening at GTU.
              </p>
              <Link to="/events" className="text-brand-blue font-medium flex items-center">
                Explore
                <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>

            {/* Student Community */}
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-brand-blue mb-4">
                <Users className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Student Community</h3>
              <p className="text-gray-600 mb-4">
                Connect with fellow students, form study groups, and collaborate on projects and assignments.
              </p>
              <Link to="/community" className="text-brand-blue font-medium flex items-center">
                Explore
                <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>

            {/* Discussion Forum */}
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-brand-orange mb-4">
                <MessageSquare className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Discussion Forum</h3>
              <p className="text-gray-600 mb-4">
                Ask questions, share knowledge, and participate in academic discussions with peers and faculty.
              </p>
              <Link to="/forum" className="text-brand-blue font-medium flex items-center">
                Explore
                <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Resources Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Recent Study Resources</h2>
            <Link to="/resources" className="text-brand-blue font-medium hover:underline">
              View All Resources →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.slice(0, 3).map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Upcoming Events</h2>
            <Link to="/events" className="text-brand-blue font-medium hover:underline">
              View All Events →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">GTUHub</h3>
              <p className="text-gray-400">
                Your student community platform for resources, events, and academic collaboration.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
                <li><Link to="/resources" className="text-gray-400 hover:text-white">Resources</Link></li>
                <li><Link to="/events" className="text-gray-400 hover:text-white">Events</Link></li>
                <li><Link to="/community" className="text-gray-400 hover:text-white">Community</Link></li>
                <li><Link to="/forum" className="text-gray-400 hover:text-white">Forum</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-400">
                GTU Campus<br />
                Email: support@gtuhub.edu<br />
                Phone: (123) 456-7890
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6">
            <p className="text-center text-gray-500">
              © {new Date().getFullYear()} GTUHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
