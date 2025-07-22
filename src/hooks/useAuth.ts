import { useState } from 'react';
import { VALIDATION_RULES } from '../utils/constants';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock login function - in a real app, this would call an API
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        // Simple validation - in a real app this would verify with a server
        const isValidEmail = VALIDATION_RULES.EMAIL_REGEX.test(email);
        const isValidPassword = password.length >= VALIDATION_RULES.PASSWORD_MIN_LENGTH;
        
        if (isValidEmail && isValidPassword) {
          setIsAuthenticated(true);
          resolve(true);
        } else {
          resolve(false);
        }
        
        setIsLoading(false);
      }, 800);
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  // Validate email format
  const validateEmail = (email: string): boolean => {
    return VALIDATION_RULES.EMAIL_REGEX.test(email);
  };

  // Validate password strength
  const validatePassword = (password: string): { isValid: boolean; message?: string } => {
    if (password.length < VALIDATION_RULES.PASSWORD_MIN_LENGTH) {
      return {
        isValid: false,
        message: `Password must be at least ${VALIDATION_RULES.PASSWORD_MIN_LENGTH} characters long`,
      };
    }
    return { isValid: true };
  };

  return {
    isAuthenticated,
    isLoading,
    login,
    logout,
    validateEmail,
    validatePassword,
  };
}