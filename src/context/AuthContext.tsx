import { createContext, useContext, useState, ReactNode } from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mock login function - in a real app, this would call an API
  const login = async (email: string, password: string) => {
    // Simulate API call
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        // Simple validation - in a real app this would verify with a server
        if (email && password.length >= 6) {
          setIsAuthenticated(true);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 800);
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}