-- Create profiles table
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  wallet_address TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create watchlists table
CREATE TABLE public.watchlists (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  token_address TEXT NOT NULL,
  token_symbol TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, token_address)
);

-- Create recently_viewed_tokens table
CREATE TABLE public.recently_viewed_tokens (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  token_address TEXT NOT NULL,
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.watchlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recently_viewed_tokens ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Watchlists Policies
CREATE POLICY "Users can view their own watchlists" ON public.watchlists
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert into their own watchlists" ON public.watchlists
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete from their own watchlists" ON public.watchlists
  FOR DELETE USING (auth.uid() = user_id);

-- Recently Viewed Tokens Policies
CREATE POLICY "Users can view their own recently viewed tokens" ON public.recently_viewed_tokens
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert into their own recently viewed tokens" ON public.recently_viewed_tokens
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own recently viewed tokens" ON public.recently_viewed_tokens
  FOR UPDATE USING (auth.uid() = user_id);
