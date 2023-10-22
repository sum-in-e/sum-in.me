'use client';

import { useRef, useEffect, Fragment } from 'react';
import dayjs from 'dayjs';
import { useGetCommentInfiniteQuery } from '@/src/features/guestbook/modules/hooks/api/usetGetCommentsInfiniteQuery';

const Comments = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetCommentInfiniteQuery();

  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loadMoreRef.current && hasNextPage) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            fetchNextPage();
          }
        },
        { threshold: 1 }
      );

      observer.observe(loadMoreRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, [fetchNextPage, hasNextPage]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <ul className="py-5">
      {data?.pages.map((page, index) => (
        <Fragment key={index}>
          {page.map(({ id, comment, created_at }) => (
            <li key={id} className="flex gap-2 items-start mb-2">
              <span className="">✏️</span>
              <div>
                <span className="text-sm break-all">{comment}</span>
                <span className="text-[10px] text-zinc-400 ml-3">
                  {dayjs(created_at).format('YY.MM.DD')}
                </span>
              </div>
            </li>
          ))}
        </Fragment>
      ))}

      <div ref={loadMoreRef} className="text-zinc-400 mt-5 text-sm">
        {isFetchingNextPage && 'Loading more...'}
      </div>
    </ul>
  );
};

export default Comments;
