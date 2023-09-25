import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';
import NewPost from '@/src/features/newPost/container';

export const dynamic = 'force-dynamic';

export default async function PostPage() {
  const supabase = createServerComponentClient({ cookies });

  const { error } = await supabase.auth.getUser();

  if (error?.status === 401) {
    redirect('/login?error=Unauthorized');
  }

  return <NewPost />;
}