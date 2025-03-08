import { Database } from '@/src/types/supabase';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const createClient = () => {
  const cookieStore = cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => {
          return Array.from(cookieStore.getAll()).map(({ name, value }) => ({
            name,
            value,
          }));
        },
        setAll: (cookiesList) => {
          try {
            cookiesList.forEach((cookie) => {
              cookieStore.set(cookie);
            });
          } catch (error) {
            // Handle cookie errors
          }
        },
      },
    }
  );
};
