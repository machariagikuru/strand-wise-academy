
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string, role: string) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Admin',
    email: 'admin@strandnotes.com',
    role: 'admin',
    strandPoints: 1000,
    badges: [],
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    name: 'Jane Teacher',
    email: 'teacher@strandnotes.com',
    role: 'teacher',
    strandPoints: 500,
    badges: [],
    createdAt: '2024-01-01'
  },
  {
    id: '3',
    name: 'Bob Learner',
    email: 'learner@strandnotes.com',
    role: 'learner',
    strandPoints: 250,
    badges: [],
    createdAt: '2024-01-01'
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('strandnotes_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Mock authentication
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('strandnotes_user', JSON.stringify(foundUser));
    } else {
      throw new Error('Invalid credentials');
    }
    setIsLoading(false);
  };

  const register = async (name: string, email: string, password: string, role: string) => {
    setIsLoading(true);
    // Mock registration
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      role: role as 'admin' | 'teacher' | 'learner',
      strandPoints: 100,
      badges: [],
      createdAt: new Date().toISOString()
    };
    setUser(newUser);
    localStorage.setItem('strandnotes_user', JSON.stringify(newUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('strandnotes_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isLoading }}>
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
