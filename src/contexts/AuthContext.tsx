import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase, auth, UserProfile, db } from '@/lib/supabase'
import { toast } from 'sonner'

interface AuthContextType {
  user: User | null
  session: Session | null
  profile: UserProfile | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signUp: (email: string, password: string, userData: any) => Promise<{ success: boolean; error?: string }>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch user profile
  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await db.getUserProfile(userId)
      if (error) {
        console.error('Error fetching profile:', error)
        return
      }
      setProfile(data)
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Get initial session
        const { session } = await auth.getCurrentSession()
        setSession(session)
        setUser(session?.user ?? null)

        if (session?.user) {
          await fetchProfile(session.user.id)
        }

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            setSession(session)
            setUser(session?.user ?? null)
            
            if (session?.user) {
              await fetchProfile(session.user.id)
            } else {
              setProfile(null)
            }
            
            setLoading(false)
          }
        )

        setLoading(false)
        return () => subscription.unsubscribe()
      } catch (error) {
        console.error('Error initializing auth:', error)
        setLoading(false)
      }
    }

    initializeAuth()
  }, [])

  // Sign in function
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await auth.signIn(email, password)
      
      if (error) {
        toast.error(error.message)
        return { success: false, error: error.message }
      }

      if (data.user) {
        toast.success('Successfully signed in!')
        return { success: true }
      }

      return { success: false, error: 'Sign in failed' }
    } catch (error) {
      console.error('Sign in error:', error)
      toast.error('An unexpected error occurred')
      return { success: false, error: 'An unexpected error occurred' }
    }
  }

  // Sign up function
  const signUp = async (email: string, password: string, userData: any) => {
    try {
      const { data, error } = await auth.signUp(email, password, userData)
      
      if (error) {
        toast.error(error.message)
        return { success: false, error: error.message }
      }

      if (data.user) {
        // Don't try to create profile immediately - let user do it later
        // This avoids database errors during signup
        toast.success('Account created successfully! Please check your email to verify your account.')
        return { success: true }
      }

      return { success: false, error: 'Sign up failed' }
    } catch (error) {
      console.error('Sign up error:', error)
      toast.error('An unexpected error occurred')
      return { success: false, error: 'An unexpected error occurred' }
    }
  }

  // Sign out function
  const signOut = async () => {
    try {
      const { error } = await auth.signOut()
      
      if (error) {
        toast.error(error.message)
        return
      }

      setUser(null)
      setSession(null)
      setProfile(null)
      toast.success('Successfully signed out!')
    } catch (error) {
      console.error('Sign out error:', error)
      toast.error('An unexpected error occurred')
    }
  }

  // Update profile function
  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      if (!user) {
        return { success: false, error: 'No user logged in' }
      }

      const { data, error } = await db.upsertUserProfile({
        id: user.id,
        ...updates,
        updated_at: new Date().toISOString()
      })

      if (error) {
        toast.error(error.message)
        return { success: false, error: error.message }
      }

      setProfile(data)
      toast.success('Profile updated successfully!')
      return { success: true }
    } catch (error) {
      console.error('Update profile error:', error)
      toast.error('An unexpected error occurred')
      return { success: false, error: 'An unexpected error occurred' }
    }
  }

  // Reset password function
  const resetPassword = async (email: string) => {
    try {
      const { data, error } = await auth.resetPassword(email)
      
      if (error) {
        toast.error(error.message)
        return { success: false, error: error.message }
      }

      toast.success('Password reset email sent! Please check your inbox.')
      return { success: true }
    } catch (error) {
      console.error('Reset password error:', error)
      toast.error('An unexpected error occurred')
      return { success: false, error: 'An unexpected error occurred' }
    }
  }

  const value: AuthContextType = {
    user,
    session,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    resetPassword
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 