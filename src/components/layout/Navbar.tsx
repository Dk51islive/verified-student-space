
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'font-medium' : '';
  };
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-brand-blue">GTU<span className="text-brand-orange">Hub</span></span>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link to="/" className={`inline-flex items-center px-1 pt-1 text-sm ${isActive('/')}`}>
                Home
              </Link>
              <Link to="/resources" className={`inline-flex items-center px-1 pt-1 text-sm ${isActive('/resources')}`}>
                Resources
              </Link>
              <Link to="/events" className={`inline-flex items-center px-1 pt-1 text-sm ${isActive('/events')}`}>
                Events
              </Link>
              <Link to="/community" className={`inline-flex items-center px-1 pt-1 text-sm ${isActive('/community')}`}>
                Community
              </Link>
              <Link to="/forum" className={`inline-flex items-center px-1 pt-1 text-sm ${isActive('/forum')}`}>
                Forum
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <div className="hidden md:mr-4 md:flex md:items-center">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium hidden md:inline">
                  {user.name}
                </span>
                <Button variant="outline" size="sm" onClick={logout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="default" size="sm" className="bg-gray-900 text-white">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
