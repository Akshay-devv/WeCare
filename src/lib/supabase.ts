import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Check if environment variables are set
if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'https://your-project.supabase.co' || supabaseAnonKey === 'your-anon-key') {
  console.error('❌ Supabase configuration missing!')
  console.error('Please set up your environment variables:')
  console.error('1. Create a .env.local file in your project root')
  console.error('2. Add your Supabase credentials:')
  console.error('   VITE_SUPABASE_URL=https://your-project-id.supabase.co')
  console.error('   VITE_SUPABASE_ANON_KEY=your-anon-key-here')
  console.error('3. Get these values from https://supabase.com > Your Project > Settings > API')
  
  // Show user-friendly error in browser
  if (typeof window !== 'undefined') {
    alert('❌ Supabase configuration missing!\n\nPlease check the console for setup instructions.\n\nYou need to:\n1. Create a Supabase project\n2. Set up environment variables\n3. Restart the development server')
  }
}

export const supabase = createClient(
  supabaseUrl || 'https://your-project.supabase.co',
  supabaseAnonKey || 'your-anon-key'
)

// Auth helper functions
export const auth = {
  // Sign up with email and password
  async signUp(email: string, password: string, userData?: any) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      })
      return { data, error }
    } catch (error) {
      console.error('Sign up error:', error)
      return { data: null, error: { message: 'Network error. Please check your Supabase configuration.' } }
    }
  },

  // Sign in with email and password
  async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      return { data, error }
    } catch (error) {
      console.error('Sign in error:', error)
      return { data: null, error: { message: 'Network error. Please check your Supabase configuration.' } }
    }
  },

  // Sign out
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut()
      return { error }
    } catch (error) {
      console.error('Sign out error:', error)
      return { error: { message: 'Network error. Please check your Supabase configuration.' } }
    }
  },

  // Get current user
  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      return { user, error }
    } catch (error) {
      console.error('Get current user error:', error)
      return { user: null, error: { message: 'Network error. Please check your Supabase configuration.' } }
    }
  },

  // Get current session
  async getCurrentSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      return { session, error }
    } catch (error) {
      console.error('Get current session error:', error)
      return { session: null, error: { message: 'Network error. Please check your Supabase configuration.' } }
    }
  },

  // Reset password
  async resetPassword(email: string) {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      })
      return { data, error }
    } catch (error) {
      console.error('Reset password error:', error)
      return { data: null, error: { message: 'Network error. Please check your Supabase configuration.' } }
    }
  },

  // Update password
  async updatePassword(newPassword: string) {
    try {
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword
      })
      return { data, error }
    } catch (error) {
      console.error('Update password error:', error)
      return { data: null, error: { message: 'Network error. Please check your Supabase configuration.' } }
    }
  },

  // Update user profile
  async updateProfile(updates: any) {
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: updates
      })
      return { data, error }
    } catch (error) {
      console.error('Update profile error:', error)
      return { data: null, error: { message: 'Network error. Please check your Supabase configuration.' } }
    }
  }
}

// User profile types
export interface UserProfile {
  id: string
  email: string
  full_name?: string
  username?: string
  blood_type?: string
  age?: number
  date_of_birth?: string
  created_at: string
  updated_at: string
}

// Database helper functions
export const db = {
  // Get user profile
  async getUserProfile(userId: string) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
      return { data, error }
    } catch (error) {
      console.error('Get user profile error:', error)
      return { data: null, error: { message: 'Network error. Please check your Supabase configuration.' } }
    }
  },

  // Create or update user profile
  async upsertUserProfile(profile: Partial<UserProfile>) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .upsert(profile)
        .select()
        .single()
      return { data, error }
    } catch (error) {
      console.error('Upsert user profile error:', error)
      return { data: null, error: { message: 'Network error. Please check your Supabase configuration.' } }
    }
  },

  // Get user health records
  async getUserHealthRecords(userId: string) {
    try {
      const { data, error } = await supabase
        .from('health_records')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
      return { data, error }
    } catch (error) {
      console.error('Get user health records error:', error)
      return { data: null, error: { message: 'Network error. Please check your Supabase configuration.' } }
    }
  },

  // Create health record
  async createHealthRecord(record: any) {
    try {
      const { data, error } = await supabase
        .from('health_records')
        .insert(record)
        .select()
        .single()
      return { data, error }
    } catch (error) {
      console.error('Create health record error:', error)
      return { data: null, error: { message: 'Network error. Please check your Supabase configuration.' } }
    }
  }
} 