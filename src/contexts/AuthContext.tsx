import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, mockUsers } from '@/data/mockData';
import { storage, STORAGE_KEYS } from '@/lib/localStorage';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  hasRole: (roles: User['role'][]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = storage.get<User>(STORAGE_KEYS.USER);
    const token = storage.get<string>(STORAGE_KEYS.TOKEN);
    
    if (storedUser && token) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Check mock users (password is "password123" for all mock users)
    const foundUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!foundUser) {
      return { success: false, error: 'Email không tồn tại trong hệ thống' };
    }

    // Mock password validation (in real app, this would be server-side)
    if (password !== 'password123') {
      return { success: false, error: 'Mật khẩu không đúng' };
    }

    // Generate mock token
    const token = `mock_token_${Date.now()}_${foundUser.id}`;
    
    // Save to localStorage
    storage.set(STORAGE_KEYS.USER, foundUser);
    storage.set(STORAGE_KEYS.TOKEN, token);
    
    setUser(foundUser);
    return { success: true };
  };

  const signup = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (existingUser) {
      return { success: false, error: 'Email đã được sử dụng' };
    }

    // Create new user
    const newUser: User = {
      id: `usr_${Date.now()}`,
      email,
      name,
      role: 'user',
    };

    // Add to mock users (in memory only)
    mockUsers.push(newUser);

    // Generate mock token
    const token = `mock_token_${Date.now()}_${newUser.id}`;
    
    // Save to localStorage
    storage.set(STORAGE_KEYS.USER, newUser);
    storage.set(STORAGE_KEYS.TOKEN, token);
    
    setUser(newUser);
    return { success: true };
  };

  const logout = () => {
    storage.remove(STORAGE_KEYS.USER);
    storage.remove(STORAGE_KEYS.TOKEN);
    setUser(null);
  };

  const hasRole = (roles: User['role'][]): boolean => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading,
      login, 
      signup, 
      logout,
      hasRole 
    }}>
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
