import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

interface AuthenticatedContentProps {
  signOut: () => void;
  user: any;
  onLoginSuccess: () => void;
}

function AuthenticatedContent({ signOut, user, onLoginSuccess }: AuthenticatedContentProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      onLoginSuccess();
      navigate('/');
    }
  }, [user, navigate, onLoginSuccess]);

  return (
    <div className="text-center">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Welcome back, {user?.username}!
      </h3>
      <button
        onClick={() => navigate('/')}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
      >
        Go to Homepage
      </button>
      <button
        onClick={signOut}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      >
        Sign Out
      </button>
    </div>
  );
}

interface LoginPageProps {
  onLoginSuccess: () => void;
}

export function LoginPage({ onLoginSuccess }: LoginPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to LuLu Ventures
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Access exclusive content and features
          </p>
        </div>
        
        <Authenticator
          socialProviders={['google']}
          loginMechanisms={['email']}
        >
          {({ signOut, user }) => (
            <AuthenticatedContent signOut={signOut} user={user} onLoginSuccess={onLoginSuccess} />
          )}
        </Authenticator>
      </div>
    </div>
  );
}