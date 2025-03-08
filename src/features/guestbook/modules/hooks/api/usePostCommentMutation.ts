import { useMutation } from '@tanstack/react-query';
import { createClient } from '@/src/utils/supabase/client';
import { Database } from '@/src/types/supabase';

type Guestbook = Database['public']['Tables']['guestbook']['Insert'];

type PostCommentParams = {
  comment: string;
};

async function postComment(params: PostCommentParams) {
  const supabase = createClient();

  const response = await supabase
    .from('guestbook')
    .insert(params)
    .select()
    .single();

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data;
}

export function usePostCommentMutation() {
  return useMutation({
    mutationFn: postComment,
  });
}
