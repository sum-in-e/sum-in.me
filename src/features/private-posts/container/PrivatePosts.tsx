'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import PostItem from '@/src/features/posts/components/PostItem';
import queryKeys from '@/src/common/modules/queryKeys';
import { getPrivatePosts } from '@/src/features/private-posts/services/privatePostService';

export default function PrivatePosts() {
  const { data: posts } = useSuspenseQuery({
    queryKey: queryKeys.post.private(),
    queryFn: () => getPrivatePosts(),
  });

  if (!posts || posts.length === 0) {
    return (
      <div className="flex h-full items-center justify-center gap-5 pt-10">
        <h4 className="text-lg">작성된 비공개 게시글이 없습니다.</h4>
      </div>
    );
  }

  return (
    <section className="w-full">
      <div className="flex flex-col gap-10">
        <ul className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <PostItem key={post.id} {...post} />
          ))}
        </ul>
      </div>
    </section>
  );
}
