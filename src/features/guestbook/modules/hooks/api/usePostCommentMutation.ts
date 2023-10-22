import { useMutation } from '@tanstack/react-query';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/database.types';

type PostCommentParams = {
  comment: string;
};

async function postComment({ comment }: PostCommentParams) {
  const supabase = createClientComponentClient<Database>();

  const response = await supabase
    .from('guestbook')
    .insert({ comment })
    .select();

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data;
}

export function usePostCommentMutation() {
  return useMutation(postComment);
}
