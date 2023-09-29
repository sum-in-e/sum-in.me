import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';
import Post from '@/src/features/post/container';
import { Database } from '@/database.types';

export const dynamic = 'force-dynamic';

export default async function NewPostPage() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: user, error } = await supabase.auth.getUser();

  if (error?.status === 401) {
    redirect('/login?error=Unauthorized');
  }

  return <Post user={user.user} />;
}
