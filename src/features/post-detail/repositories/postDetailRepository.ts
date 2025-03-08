import { createClient } from '@/src/utils/supabase/client';
import { Post } from '@/src/common/modules/types/post';

export async function getPostDetail(id: number): Promise<Post | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('post')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(`Failed to fetch post detail: ${error.message}`);
  }

  return data;
}

export async function getSuggestedPosts(): Promise<Post[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('post')
    .select('*')
    .eq('is_public', true)
    .order('created_at', { ascending: false })
    .limit(3);

  if (error) {
    throw new Error(`Failed to fetch suggested posts: ${error.message}`);
  }

  return data;
}
