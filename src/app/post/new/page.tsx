import { redirect } from 'next/navigation';
import Post from '@/src/features/post/container';
import { createClient } from '@/src/utils/supabase/server';

export const dynamic = 'force-dynamic';

export default async function NewPostPage() {
  const supabase = createClient();

  const { data: user, error } = await supabase.auth.getUser();

  if (error?.status === 401) {
    redirect('/login?error=Unauthorized');
  }

  return <Post user={user.user} />;
}
