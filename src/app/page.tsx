import { Database } from '@/database.types';
import PostItem from '@/src/features/posts/components/PostItem';
import ReadMoreButton from '@/src/features/posts/components/ReadMoreButton';
import ProjectList from '@/src/features/projects/containers/ProjectList';
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
    .range(0, 2);

  let { data: notes, error: notesError } = await supabase
    .from('post')
    .select('*')
    .eq('type', 'note')
    .eq('is_public', true)
    .order('created_at', { ascending: false })
    .range(0, 2);

  return (
    <div className="w-full flex flex-col items-center gap-16">
      <section className="w-full">
        <p className="text-3xl font-bold mb-10 dark:text-white">Writing</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-10">
          <div className="flex-grow">
            <p className="text-lg text-black dark:text-white">Recent Posts</p>
            <div className="flex justify-end mb-7">
              <ReadMoreButton path="/blog" />
            </div>
            <ul className="flex flex-col gap-9">
              {blogPosts?.map((post) => (
                <PostItem key={post.id} {...post} />
              ))}
            </ul>
          </div>
          <div className="flex-grow">
            <p className="text-lg text-black dark:text-white">Recent Notes</p>
            <div className="flex justify-end mb-7">
              <ReadMoreButton path="/note" />
            </div>
            <ul className="flex flex-col gap-9">
              {notes?.map((post) => (
                <PostItem key={post.id} {...post} />
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="w-full">
        <p className="text-3xl font-bold mb-10 dark:text-white">Projects</p>
        <ProjectList />
      </section>
    </div>
  );
}
