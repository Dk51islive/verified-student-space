
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { User } from '@/types';

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: Partial<User> & { password: string }) => Promise<void>;
  logout: () => void;
  verifyEmail: (token: string) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  // Check if the user is logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('gtu-user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user', error);
        localStorage.removeItem('gtu-user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate a successful login after validation
      if (!email.includes('@') || password.length < 6) {
        throw new Error('Invalid email or password');
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock user data - in a real app this would come from your backend
      const loggedInUser: User = {
        id: '1',
        name: email.split('@')[0],
        email,
        enrollmentNumber: '2023001',
        yearOfStudy: '2nd Year',
        department: 'Computer Science',
        isAdmin: email.includes('admin'),
        isVerified: true
      };

      setUser(loggedInUser);
      localStorage.setItem('gtu-user', JSON.stringify(loggedInUser));
      
      toast({
        title: 'Login successful',
        description: `Welcome back, ${loggedInUser.name}!`,
      });
    } catch (error) {
      toast({
        title: 'Login failed',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: Partial<User> & { password: string }) => {
    try {
      setIsLoading(true);

      // Validate required fields
      if (!userData.name || !userData.email || !userData.password || 
          !userData.enrollmentNumber || !userData.department) {
        throw new Error('Please fill all required fields');
      }

      // Email validation
      if (!userData.email.includes('@')) {
        throw new Error('Please enter a valid email address');
      }

      // Password validation
      if (userData.password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // In a real app, this would be an API call to register the user
      // For now, we'll simulate a successful registration with verification pending
      toast({
        title: 'Registration successful',
        description: 'Please check your email to verify your account.',
      });

      // We don't automatically log in the user after signup because they need to verify email first
    } catch (error) {
      toast({
        title: 'Registration failed',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmail = async (token: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // In a real app, this would be an API call to verify the email
      // For demo purposes, we'll simulate a successful verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // This is just for demo - in a real app, the backend would validate the token
      if (token) {
        toast({
          title: 'Email verified',
          description: 'Your email has been verified successfully. You can now log in.',
        });
        return true;
      } else {
        throw new Error('Invalid verification token');
      }
    } catch (error) {
      toast({
        title: 'Verification failed',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gtu-user');
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully.',
    });
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    verifyEmail
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
