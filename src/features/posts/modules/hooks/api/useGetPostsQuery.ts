import { Database } from '@/database.types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Post, PostType } from '@/src/common/modules/types/postType';
import { useQuery } from '@tanstack/react-query';
import queryKeys from '@/src/common/modules/queryKeys';

export type PostItem = Pick<
  Post,
  'id' | 'title' | 'description' | 'created_at'
>;

export type GetPostsParams = {
  type: PostType;
  tagId?: string | 'uncategorized';
  year?: string;
};

// public post중 조건에 맞는 post를 조회합니다.
async function getPosts(params: GetPostsParams): Promise<PostItem[]> {
  const supabase = createClientComponentClient<Database>();

  const { type, tagId, year } = params;

  let { data, error } = await supabase.rpc('fetch_posts', {
    post_type_value: type,
    tag_id_value: tagId,
    year_value: year,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
}

export function useGetPostsQuery(params: GetPostsParams) {
  return useQuery<PostItem[] | null, Error>(
    queryKeys.post.getPosts(params),
    () => getPosts(params)
  );
}
