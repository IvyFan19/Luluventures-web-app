import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      if (!success) {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="you@example.com"
        />
      </div>
      
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="••••••••"
          minLength={6}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember"
            type="checkbox"
            className="h-4 w-4 text-blue-900 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
            Remember me
          </label>
        </div>
        
        <button type="button" className="text-sm text-blue-900 hover:text-blue-700">
          Forgot password?
        </button>
      </div>
      
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-2 px-4 rounded-lg text-white font-medium ${
          isLoading ? 'bg-blue-400' : 'bg-blue-900 hover:bg-blue-800'
        } transition-colors`}
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </button>
      
      <p className="text-sm text-gray-600 text-center mt-4">
        Don't have an account?{' '}
        <button type="button" className="text-blue-900 hover:text-blue-700 font-medium">
          Create one
        </button>
      </p>
    </form>
  );
}