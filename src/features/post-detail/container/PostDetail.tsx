'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { User } from '@supabase/supabase-js';
import PostItem from '@/src/features/posts/components/PostItem';

import queryKeys from '@/src/common/modules/queryKeys';
import Post from '@/src/features/post/container';
import CommentsContainer from '@/src/features/post/container/CommentsContainer';
import {
  getPostDetail,
  getSuggestedPosts,
} from '@/src/features/post-detail/services/postDetailService';

interface Props {
  id: number;
  user: User | null;
}

export default function PostDetail({ id, user }: Props) {
  const { data: post } = useSuspenseQuery({
    queryKey: queryKeys.post.detail(id),
    queryFn: () => getPostDetail(id),
  });

  const { data: suggestedPosts } = useSuspenseQuery({
    queryKey: queryKeys.post.suggested(),
    queryFn: () => getSuggestedPosts(),
  });
  
  if (!post) {
    return (
      <div className="w-full">
        <div className="mb-10 flex w-full items-center justify-center rounded-md bg-zinc-100 px-5 py-10 dark:bg-opacity-10">
          <h3 className="text-lg text-zinc-800 dark:text-zinc-200">
            존재하지 않는 게시글입니다.
          </h3>
        </div>
        {suggestedPosts && suggestedPosts?.length > 0 && (
          <>
            <h4 className="mb-8 text-xl font-semibold">
              이런 글은 어떠세요?👀
            </h4>
            <div className="flex flex-col gap-10">
              <ul className="grid grid-cols-1 gap-8">
                {suggestedPosts?.map((post) => (
                  <PostItem key={post.id} {...post} />
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    );
  }

  if (!post.is_public && !user) {
    return (
      <div className="mb-10 flex w-full items-center justify-center rounded-md bg-zinc-100 px-5 py-10 dark:bg-opacity-10">
        <h3 className="text-lg text-zinc-800 dark:text-zinc-200">
          비공개 글입니다.
        </h3>
      </div>
    );
  }

  return (
    <>
      <Post user={user} initPost={post} />
      <CommentsContainer />
    </>
  );
}
