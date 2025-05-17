import { useState } from 'react';
import { TestPage } from './components/TestPage';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-white text-gray-900">
        <TestPage />
      </div>
    </AuthProvider>
  );
}

export default App;