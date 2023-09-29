import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/database.types';
import PostItem from '@/src/features/postList/components/PostItem';

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  const supabase = createServerComponentClient<Database>({ cookies });

  let { data: list, error } = await supabase
    .from('post')
    .select('*')
    .eq('type', 'blog')
    .eq('is_public', true)
    .order('created_at', { ascending: false });

  // .range(0, 10); // TODO: 페이지네이션
  // TODO: 미발행글 리스트로 따로 만들기(나만 볼 수 있도록 권한 설정)

  return (
    <section className="w-full">
      <h2 className="text-4xl mb-10 font-bold dark:text-white">Blog</h2>
      <ul className="flex flex-col gap-10">
        {list?.map((item) => (
          <PostItem
            id={item.id}
            key={item.id}
            title={item.title}
            description={item.description}
            created_at={item.created_at}
          />
        ))}
      </ul>
    </section>
  );
}
