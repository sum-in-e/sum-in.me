'use client';

import dayjs from 'dayjs';
import { Comment } from '../services/commentService';

interface Props extends Comment {}

export default function CommentItem({ comment, created_at }: Props) {
  return (
    <div className="flex items-start gap-2">
      <span>✏️</span>
      <div>
        <span className="break-all text-sm">{comment}</span>
        <span className="ml-3 text-[10px] text-zinc-400">
          {dayjs(created_at).format('YY.MM.DD')}
        </span>
      </div>
    </div>
  );
}
