import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/database.types';
import PostItem from '@/src/features/posts/components/PostItem';

export const dynamic = 'force-dynamic';

export default async function PrivatePostsPage() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: user, error } = await supabase.auth.getUser();

  if (error?.status === 401) {
    // 관리자 외 접근 금지 페이지이므로 페이지를 인지하지 못하도록 404 표시
    return (
      <div className="flex justify-center h-full items-center gap-5 pt-10">
        <h4 className="text-2xl font-semibold">{`⚠️ Page Not Found ⚠️`}</h4>
      </div>
    );
  }

  let { data } = await supabase
    .from('post')
    .select('*')
    .eq('is_public', false)
    .order('created_at', { ascending: false });

  if (!data || data.length === 0) {
    return <div>No Post</div>;
  }

  return (
    <section className="w-full">
      <ul className="flex flex-col gap-10">
        {data.map((item) => (
          <PostItem key={item.id} {...item} />
        ))}
      </ul>
    </section>
  );
}
