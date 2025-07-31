import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getCurrentUser, signOut } from 'aws-amplify/auth';
import { useEffect, useState } from 'react';
import { HomePage } from './components/HomePage';
import { LoginPage } from './components/LoginPage';
import { ResearchAnalysisPage } from './components/ResearchAnalysisPage';

function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.log('User not authenticated');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleLoginSuccess = () => {
    checkUser();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={<HomePage user={user} signOut={handleSignOut} />} 
        />
        <Route 
          path="/login" 
          element={<LoginPage onLoginSuccess={handleLoginSuccess} />} 
        />
        <Route 
          path="/research-analysis" 
          element={<ResearchAnalysisPage user={user} signOut={handleSignOut} />} 
        />
      </Routes>
    </Router>
  );
}

export default App;