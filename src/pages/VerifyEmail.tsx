
import { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const { verifyEmail } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUserEmail = async () => {
      if (token) {
        setVerifying(true);
        try {
          const success = await verifyEmail(token);
          setVerified(success);
          if (success) {
            // Redirect to login after short delay
            setTimeout(() => {
              navigate('/login');
            }, 3000);
          }
        } catch (error) {
          console.error('Error verifying email:', error);
        } finally {
          setVerifying(false);
        }
      }
    };

    verifyUserEmail();
  }, [token, verifyEmail, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <Link to="/">
            <span className="text-3xl font-bold text-brand-blue">GTU<span className="text-brand-orange">Hub</span></span>
          </Link>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          {token ? (
            <>
              {verifying ? (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-blue"></div>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">Verifying your email...</h2>
                  <p className="text-gray-600">Please wait while we verify your email address.</p>
                </div>
              ) : verified ? (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-100 text-green-600">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">Email Verified!</h2>
                  <p className="text-gray-600">
                    Your email has been successfully verified. You can now log in to your account.
                  </p>
                  <div className="pt-4">
                    <Link to="/login">
                      <Button>Continue to Login</Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <div className="rounded-full h-12 w-12 flex items-center justify-center bg-red-100 text-red-600">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">Verification Failed</h2>
                  <p className="text-gray-600">
                    We couldn't verify your email with the provided token. The token might be invalid or expired.
                  </p>
                  <div className="pt-4">
                    <Link to="/contact">
                      <Button variant="outline">Contact Support</Button>
                    </Link>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Email Verification Required</h2>
              <div className="rounded-full h-12 w-12 mx-auto flex items-center justify-center bg-blue-100 text-blue-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-gray-600">
                We've sent a verification email to your registered email address.
                Please check your inbox and click on the link to verify your email.
              </p>
              <div className="pt-4 space-y-2">
                <p className="text-sm text-gray-500">
                  Didn't receive an email? Check your spam folder, or
                </p>
                <Button variant="link" className="text-brand-blue">Resend verification email</Button>
              </div>
            </div>
          )}
        </div>
        
        <p className="text-sm text-gray-600">
          Need help? <Link to="/contact" className="text-brand-blue hover:underline">Contact our support team</Link>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
