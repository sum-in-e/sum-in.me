import { createClient } from '@/src/utils/supabase/client';
import { Post } from '@/src/common/modules/types/post';
import { PostType } from '@/src/common/modules/types/postType';

export interface Tag {
  id: number;
  name: string;
  posts: number;
}

export interface GetPostsParams {
  type: PostType;
  tagId?: string;
  limit?: number;
  offset?: number;
}

export async function getRecentPosts(
  type: PostType,
  limit: number = 3
): Promise<Post[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('post')
    .select('*')
    .eq('type', type)
    .eq('is_public', true)
    .order('created_at', { ascending: false })
    .range(0, limit - 1);

  if (error) {
    throw new Error(`Failed to fetch ${type} posts: ${error.message}`);
  }

  return data as Post[];
}

export async function getPosts({
  type,
  tagId,
  limit = 10,
  offset = 0,
}: GetPostsParams): Promise<Post[]> {
  const supabase = createClient();
  let query = supabase
    .from('post')
    .select('*')
    .eq('type', type)
    .eq('is_public', true)
    .order('created_at', { ascending: false });

  if (tagId === 'uncategorized') {
    const { data: postIdsWithTags } = await supabase
      .from('post-tag')
      .select('post_id');

    const postIdsWithTagsArray =
      postIdsWithTags?.map((item) => item.post_id) || [];

    if (postIdsWithTagsArray.length > 0) {
      query = query.not('id', 'in', `(${postIdsWithTagsArray.join(',')})`);
    }
  } else if (tagId) {
    const { data: postIds } = await supabase
      .from('post-tag')
      .select('post_id')
      .eq('tag_id', tagId);

    const postIdsArray = postIds?.map((item) => item.post_id) || [];
    query = query.in('id', postIdsArray);
  }

  const { data, error } = await query.range(offset, offset + limit - 1);

  if (error) {
    throw new Error(`Failed to fetch posts: ${error.message}`);
  }

  return data as Post[];
}

export async function getTags(type: PostType): Promise<Tag[]> {
  const supabase = createClient();

  const { data, error } = await supabase.rpc('get_tags_and_post_counts', {
    post_type_value: type,
  });

  if (error) {
    throw new Error(`Failed to fetch tags: ${error.message}`);
  }

  return data as Tag[];
}
