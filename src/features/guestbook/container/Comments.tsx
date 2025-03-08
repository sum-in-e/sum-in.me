'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { getComments } from '../services/commentService';
import queryKeys from '@/src/common/modules/queryKeys';
import CommentItem from '../components/CommentItem';

export default function Comments() {
  const { data: comments } = useSuspenseQuery({
    queryKey: queryKeys.comment.list(),
    queryFn: getComments,
  });

  if (comments.length === 0) {
    return (
      <div className="mt-10 flex w-full items-center justify-center rounded-md bg-zinc-100 px-5 py-10 dark:bg-opacity-10">
        <p className="text-lg">아직 작성된 방명록이 없어요.</p>
      </div>
    );
  }

  return (
    <div className="mt-10 flex flex-col gap-4">
      {comments.map((comment) => (
        <CommentItem key={comment.id} {...comment} />
      ))}
    </div>
  );
}
