-- Drop existing tables if they exist
DROP TABLE IF EXISTS health_records;
DROP TABLE IF EXISTS profiles;

-- Create profiles table with minimal structure
CREATE TABLE profiles (
  id UUID PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  username TEXT,
  blood_type TEXT,
  age INTEGER,
  date_of_birth DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create health_records table with minimal structure
CREATE TABLE health_records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  title TEXT,
  description TEXT,
  symptoms TEXT[],
  diagnosis TEXT,
  medications TEXT[],
  doctor_name TEXT,
  visit_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_records ENABLE ROW LEVEL SECURITY;

-- Create basic policies
CREATE POLICY "Enable all operations for authenticated users" ON profiles
  FOR ALL USING (auth.uid() = id);

CREATE POLICY "Enable all operations for authenticated users" ON health_records
  FOR ALL USING (auth.uid() = user_id); 