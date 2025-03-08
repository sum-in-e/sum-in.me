import { createClient } from '@/src/utils/supabase/client';
import { Post } from '@/src/common/modules/types/post';

export async function getPrivatePosts(): Promise<Post[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('post')
    .select('*')
    .eq('is_public', false)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch private posts: ${error.message}`);
  }

  return data as Post[];
}
