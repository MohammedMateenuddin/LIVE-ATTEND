'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface AuthContextType {
  user: any;
  professorToken: string | null;
  studentToken: string | null;
  loginProfessor: (token: string, userData: any) => void;
  loginStudent: (token: string, userData: any) => void;
  logoutProfessor: () => void;
  logoutStudent: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [professorToken, setProfessorToken] = useState<string | null>(null);
  const [studentToken, setStudentToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const profToken = localStorage.getItem('professor_token');
    const stuToken = localStorage.getItem('student_token');
    
    if (profToken) {
      setProfessorToken(profToken);
      fetchProfile(profToken, 'professor');
    } else if (stuToken) {
      setStudentToken(stuToken);
      fetchProfile(stuToken, 'student');
    } else {
      setLoading(false);
    }
  }, []);

  const fetchProfile = async (token: string, role: 'professor' | 'student') => {
    try {
      const res = await fetch(`http://localhost:5000/api/auth/${role}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUser({ ...data, role });
      } else if (res.status === 401) {
        role === 'professor' ? logoutProfessor() : logoutStudent();
      }
    } catch (err) {
      console.error('Profile fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const loginProfessor = (token: string, userData: any) => {
    localStorage.setItem('professor_token', token);
    setProfessorToken(token);
    setUser({ ...userData, role: 'professor' });
    router.push('/professor');
  };

  const loginStudent = (token: string, userData: any) => {
    localStorage.setItem('student_token', token);
    setStudentToken(token);
    setUser({ ...userData, role: 'student' });
    router.push('/student');
  };

  const logoutProfessor = () => {
    localStorage.removeItem('professor_token');
    setProfessorToken(null);
    setUser(null);
    router.push('/');
  };

  const logoutStudent = () => {
    localStorage.removeItem('student_token');
    setStudentToken(null);
    setUser(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      professorToken, 
      studentToken, 
      loginProfessor, 
      loginStudent, 
      logoutProfessor, 
      logoutStudent, 
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
