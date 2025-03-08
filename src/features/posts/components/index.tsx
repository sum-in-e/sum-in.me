'use client';

import { PostsSection } from '@/src/features/posts/components/PostSection';

export default function RecentPosts() {
  return (
    <section className="w-full">
      <p className="mb-10 text-3xl font-bold dark:text-white">Writing</p>

      <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-24">
        <PostsSection type="blog" title="Recent Posts" />
        <PostsSection type="note" title="Recent Notes" />
      </div>
    </section>
  );
}
