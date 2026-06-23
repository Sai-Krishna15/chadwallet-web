-- Drop existing tables if they exist
DROP TABLE IF EXISTS public.recently_viewed_tokens CASCADE;
DROP TABLE IF EXISTS public.watchlists CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Create profiles table (id must be TEXT because Privy uses did:privy:...)
CREATE TABLE public.profiles (
  id TEXT PRIMARY KEY,
  email TEXT,
  wallet_address TEXT,
  avatar_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create watchlists table
CREATE TABLE public.watchlists (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  token_address TEXT NOT NULL,
  token_symbol TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, token_address)
);

-- Create recently_viewed_tokens table
CREATE TABLE public.recently_viewed_tokens (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  token_address TEXT NOT NULL,
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.watchlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recently_viewed_tokens ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING ((auth.jwt() ->> 'sub') = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK ((auth.jwt() ->> 'sub') = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING ((auth.jwt() ->> 'sub') = id);

-- Watchlists Policies
CREATE POLICY "Users can view their own watchlists" ON public.watchlists
  FOR SELECT USING ((auth.jwt() ->> 'sub') = user_id);

CREATE POLICY "Users can insert into their own watchlists" ON public.watchlists
  FOR INSERT WITH CHECK ((auth.jwt() ->> 'sub') = user_id);

CREATE POLICY "Users can delete from their own watchlists" ON public.watchlists
  FOR DELETE USING ((auth.jwt() ->> 'sub') = user_id);

-- Recently Viewed Tokens Policies
CREATE POLICY "Users can view their own recently viewed tokens" ON public.recently_viewed_tokens
  FOR SELECT USING ((auth.jwt() ->> 'sub') = user_id);

CREATE POLICY "Users can insert into their own recently viewed tokens" ON public.recently_viewed_tokens
  FOR INSERT WITH CHECK ((auth.jwt() ->> 'sub') = user_id);

CREATE POLICY "Users can update their own recently viewed tokens" ON public.recently_viewed_tokens
  FOR UPDATE USING ((auth.jwt() ->> 'sub') = user_id);
