-- ==============================================================================
-- ADD CUSTOMER USERS & LOGIN AUDIT LOGS IN SUPABASE
-- Run this in Supabase SQL Editor
-- ==============================================================================

-- 1. CUSTOMERS / PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.customer_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password_hash VARCHAR(255), -- For password validation
    role VARCHAR(20) DEFAULT 'customer', -- 'customer' or 'admin'
    last_login TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. LOGIN AUDIT ACTIVITY LOGS TABLE (Shows in Admin Dashboard)
CREATE TABLE IF NOT EXISTS public.login_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_email VARCHAR(150) NOT NULL,
    user_name VARCHAR(150),
    role VARCHAR(20) DEFAULT 'customer', -- 'customer' or 'admin'
    login_status VARCHAR(50) DEFAULT 'success', -- 'success', 'failed'
    device_info TEXT,
    ip_address VARCHAR(50) DEFAULT 'Cloud/Client',
    logged_in_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.customer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.login_logs ENABLE ROW LEVEL SECURITY;

-- Allow public read & insert for auth and logs
CREATE POLICY "Public read customer_profiles" ON public.customer_profiles FOR SELECT USING (true);
CREATE POLICY "Public insert customer_profiles" ON public.customer_profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update customer_profiles" ON public.customer_profiles FOR UPDATE USING (true);

CREATE POLICY "Public read login_logs" ON public.login_logs FOR SELECT USING (true);
CREATE POLICY "Public insert login_logs" ON public.login_logs FOR INSERT WITH CHECK (true);

-- Insert Default Admin Account
INSERT INTO public.customer_profiles (full_name, email, phone, password_hash, role)
VALUES ('Store Administrator', 'admin@aurojewels.com', '+91 98200 12345', 'admin123', 'admin')
ON CONFLICT (email) DO UPDATE SET role = 'admin', password_hash = 'admin123';
