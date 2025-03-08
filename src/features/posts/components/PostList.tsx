'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { PostType } from '@/src/common/modules/types/postType';
import queryKeys from '@/src/common/modules/queryKeys';
import PostItem from '@/src/features/posts/components/PostItem';
import { getRecentPosts } from '@/src/features/posts/services/postService';

interface PostsListProps {
  type: PostType;
}

export function PostsList({ type }: PostsListProps) {
  const { data: posts } = useSuspenseQuery({
    queryKey: queryKeys.post.recent(type),
    queryFn: () => getRecentPosts(type),
  });

  return (
    <div className="flex flex-col gap-9">
      <ul className="flex flex-col gap-4">
        {posts.map((post) => (
          <PostItem key={post.id} {...post} />
        ))}
      </ul>
    </div>
  );
}
