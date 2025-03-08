'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { PostType } from '@/src/common/modules/types/postType';
import PostItem from '@/src/features/posts/components/PostItem';
import { getPosts } from '@/src/features/posts/services/postService';
import queryKeys from '@/src/common/modules/queryKeys';
import { PostsListSkeleton } from '@/src/features/posts/components/PostsListSkeleton';

interface Props {
  type: PostType;
}

export default function Posts({ type }: Props) {
  const searchParams = useSearchParams();
  const observerTarget = useRef<HTMLDivElement>(null);

  const tag = searchParams.get('tag');

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery({
      queryKey: queryKeys.post.list(type, tag),
      queryFn: ({ pageParam = 0 }) =>
        getPosts({
          type,
          tagId: tag || undefined,
          offset: pageParam,
        }),
      getNextPageParam: (lastPage, allPages) => {
        const nextPage =
          lastPage.length === 10 ? allPages.length * 10 : undefined;
        return nextPage;
      },
      initialPageParam: 0,
    });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  const posts = data.pages.flat();

  if (posts.length === 0) {
    return (
      <div className="flex w-full items-center justify-center rounded-md bg-zinc-100 px-5 py-10 dark:bg-opacity-10">
        <p className="text-lg">조건에 해당하는 게시글이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <ul className="flex flex-col gap-8">
        {posts.map((item) => (
          <PostItem key={item.id} {...item} />
        ))}
      </ul>
      {isFetchingNextPage && <PostsListSkeleton count={2} />}
      <div ref={observerTarget} className="h-4" />
    </div>
  );
}
