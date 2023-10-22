'use client';

import queryKeys from '@/src/common/modules/queryKeys';
import { usePostCommentMutation } from '@/src/features/guestbook/modules/hooks/api/usePostCommentMutation';
import { useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, FormEvent, useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';

const CommentForm = () => {
  const queryClient = useQueryClient();
  const { mutate: postComment, isLoading } = usePostCommentMutation();

  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isLoading && comment.length > 0) {
      if (message.length > 0) {
        setMessage('');
      }

      postComment(
        { comment },
        {
          onSuccess: (data) => {
            queryClient.invalidateQueries(queryKeys.comment.getComments());

            setComment('');
          },
          onError: (error) => {
            setMessage(
              '오류로 인해 방명록을 추가하지 못했습니다. 다시 시도해 주세요.'
            );
          },
        }
      );
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (message.length > 0) {
      setMessage('');
    }

    setComment(value);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 text-sm items-center rounded-lg border border-zinc-200 dark:border-zinc-600 dark:bg-zinc-800 bg-zinc-100 p-3"
      >
        <input
          id="comment"
          onChange={handleChange}
          className="w-full reset-input px-4 py-2 rounded-full dark:bg-zinc-700 bg-zinc-200"
          placeholder="Add your comment"
          value={comment}
          required
        />
        <button
          type="submit"
          className="px-4 h-full py-[10px] flex items-center md:hover:bg-opacity-70 justify-center rounded-full bg-zinc-200 dark:bg-zinc-700"
        >
          <BsArrowRight className="w-4 h-4" />
        </button>
      </form>
      <p className="text-xs text-red-500 mt-2 italic">{message}</p>
    </div>
  );
};

export default CommentForm;
