import { createClient } from '@/src/utils/supabase/client';

interface PostTag {
  tag?: {
    name: string | null;
  } | null;
}

export async function getPostTags(postId: number): Promise<string[]> {
  const supabase = createClient();

  const { data: tagData, error } = await supabase
    .from('post-tag')
    .select(
      `
      tag_id,
      tag (
        name
      )
    `
    )
    .eq('post_id', postId);

  if (error) {
    throw new Error(`Failed to fetch post tags: ${error.message}`);
  }

  const tagNames = (tagData as PostTag[])
    .map((item) => item.tag?.name)
    .filter((name): name is string => name !== null && name !== undefined);

  return tagNames;
}
