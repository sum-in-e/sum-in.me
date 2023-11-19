'use client';

import { useSearchParams } from 'next/navigation';
import { PostType } from '@/src/common/modules/types/postType';
import PostItem from '@/src/features/posts/components/PostItem';
import { useGetPostsQuery } from '@/src/features/posts/modules/hooks/api/useGetPostsQuery';

type Props = {
  type: PostType;
};

const Posts = ({ type }: Props) => {
  const searchParams = useSearchParams();

  const tag = searchParams.get('tag');
  const year = searchParams.get('year');

  const { data, error, isLoading } = useGetPostsQuery({
    type,
    tagId: tag || undefined,
    year: year || undefined,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="skeleton w-full flex justify-center items-center px-5 py-11 rounded-md"
          />
        ))}
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-10">
      {data && data?.length > 0 ? (
        data.map((item) => <PostItem key={item.id} {...item} />)
      ) : (
        <div className="w-full flex justify-center items-center px-5 py-10 bg-zinc-100 dark:bg-opacity-10 rounded-md">
          <p className="text-lg">조건에 해당하는 게시글이 없습니다.</p>
        </div>
      )}
    </ul>
  );
};

export default Posts;
