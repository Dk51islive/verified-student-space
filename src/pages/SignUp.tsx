
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    enrollmentNumber: '',
    yearOfStudy: '',
    department: '',
    password: '',
    confirmPassword: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signup } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Passwords do not match',
        description: 'Please make sure your passwords match.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await signup({
        name: formData.name,
        email: formData.email,
        enrollmentNumber: formData.enrollmentNumber,
        yearOfStudy: formData.yearOfStudy,
        department: formData.department,
        password: formData.password,
      });
      
      // Redirect to a verification pending page
      navigate('/verify-email');
    } catch (error) {
      console.error('Signup error:', error);
      // Error handling is done in the AuthContext
    } finally {
      setIsSubmitting(false);
    }
  };

  // Sample department options
  const departments = [
    'Computer Science & Engineering',
    'Information Technology',
    'Electronics & Communication',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Chemical Engineering',
    'Biotechnology',
  ];

  // Sample year options
  const years = [
    '1st Year',
    '2nd Year',
    '3rd Year',
    '4th Year',
    'Masters',
    'PhD',
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <Link to="/">
            <span className="text-3xl font-bold text-brand-blue">GTU<span className="text-brand-orange">Hub</span></span>
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create your account</h2>
          <p className="mt-2 text-gray-600">Or <Link to="/login" className="text-brand-blue hover:underline font-medium">sign in to existing account</Link></p>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-6">Join the GTU community</h2>
          <p className="text-gray-600 mb-6">Fill in your details to create your account</p>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="enrollmentNumber">Enrollment Number</Label>
                <Input
                  id="enrollmentNumber"
                  value={formData.enrollmentNumber}
                  onChange={handleChange}
                  placeholder="Enter enrollment no."
                  required
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="yearOfStudy">Year of Study</Label>
                <Select
                  value={formData.yearOfStudy}
                  onValueChange={(value) => handleSelectChange('yearOfStudy', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="department">Department</Label>
                <Select
                  value={formData.department}
                  onValueChange={(value) => handleSelectChange('department', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                  className="mt-1"
                />
              </div>
            </div>
            
            <div className="pt-4">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Creating account...' : 'Create Account'}
              </Button>
            </div>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-600">
            By signing up, you agree to our{' '}
            <Link to="/terms" className="text-brand-blue hover:underline">Terms of Service</Link>
            {' '}and{' '}
            <Link to="/privacy" className="text-brand-blue hover:underline">Privacy Policy</Link>.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
