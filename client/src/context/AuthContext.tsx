import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../services/supabase.js';
import { apiClient } from '../services/api.js';
import { UserProfile } from '../types/index.js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
  signInWithDemo: () => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProfile = async () => {
    try {
      const response = await apiClient.get('/profile');
      if (response.data?.success && response.data?.data) {
        setProfile(response.data.data);
      }
    } catch (err) {
      console.warn('Profile fetch warning (may be unauthenticated or initial setup):', err);
    }
  };

  useEffect(() => {
    // 1. Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile();
      }
      setLoading(false);
    });

    // 2. Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile();
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
  };

  // Demo fallback for instant offline/eval review
  const signInWithDemo = async () => {
    const demoUser = {
      id: '00000000-0000-0000-0000-000000000001',
      app_metadata: {},
      user_metadata: { full_name: 'Kisan Demo Farmer' },
      aud: 'authenticated',
      created_at: new Date().toISOString(),
      email: 'demo.farmer@agriassist.org',
    } as unknown as User;

    setUser(demoUser);
    setProfile({
      id: demoUser.id,
      full_name: 'Ramesh Patel',
      phone: '+91 98765 43210',
      state: 'Maharashtra',
      district: 'Nashik',
      village: 'Dindori',
      preferred_language: 'en',
      land_area: 5,
      land_area_unit: 'acre',
      soil_type: 'Black Soil',
      irrigation_availability: 'Drip & Borewell',
      farming_experience: '12 years',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        loading,
        signInWithDemo,
        logout,
        refreshProfile: fetchProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

