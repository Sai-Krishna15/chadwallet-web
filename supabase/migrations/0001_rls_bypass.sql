-- DROP existing strict policies
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

-- CREATE open policies for MVP testing
CREATE POLICY "Allow public inserts" ON public.profiles
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public updates" ON public.profiles
  FOR UPDATE USING (true);
