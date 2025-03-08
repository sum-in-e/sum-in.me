import { createClient } from '@/src/utils/supabase/client';

export interface Comment {
  id: number;
  comment: string;
  created_at: string;
}

export async function getComments(): Promise<Comment[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('guestbook')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch comments: ${error.message}`);
  }

  return data?.filter((item): item is Comment => item.comment !== null) ?? [];
}

export async function createComment(comment: string): Promise<Comment> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('guestbook')
    .insert([{ comment }])
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create comment: ${error.message}`);
  }

  if (!data.comment) {
    throw new Error('Created comment is null');
  }

  return data as Comment;
}
