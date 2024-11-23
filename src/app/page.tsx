import { Database } from '@/database.types';
import PostItem from '@/src/features/posts/components/PostItem';
import ReadMoreButton from '@/src/features/posts/components/ReadMoreButton';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const supabase = createServerComponentClient<Database>({ cookies });

  let { data: blogPosts, error: blogPostsError } = await supabase
    .from('post')
    .select('*')
    .eq('type', 'blog')
    .eq('is_public', true)
    .order('created_at', { ascending: false })
    .range(0, 3);

  let { data: notes, error: notesError } = await supabase
    .from('post')
    .select('*')
    .eq('type', 'note')
    .eq('is_public', true)
    .order('created_at', { ascending: false })
    .range(0, 3);

  return (
    <div className="flex w-full flex-col items-center gap-16">
      <section className="w-full">
        <p className="mb-10 text-3xl font-bold dark:text-white">Writing</p>
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-24">
          <div className="flex-grow">
            <p className="text-lg font-semibold text-black dark:text-white">
              Recent Posts
            </p>
            <div className="mb-7 flex justify-end">
              <ReadMoreButton path="/blog" />
            </div>
            {blogPosts && (
              <div className="flex flex-col gap-9">
                <ul className="flex flex-col gap-4">
                  {blogPosts.map((post) => (
                    <PostItem key={post.id} {...post} />
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex-grow">
            <p className="text-lg font-semibold text-black dark:text-white">
              Recent Notes
            </p>
            <div className="mb-7 flex justify-end">
              <ReadMoreButton path="/note" />
            </div>
            {notes && (
              <div className="flex flex-col gap-9">
                <ul className="flex flex-col gap-4">
                  {notes.map((post) => (
                    <PostItem key={post.id} {...post} />
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
