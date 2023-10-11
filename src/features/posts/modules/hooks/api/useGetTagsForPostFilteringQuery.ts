import { Database } from '@/database.types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { PostType } from '@/src/common/modules/types/postType';
import { useQuery } from '@tanstack/react-query';
import queryKeys from '@/src/common/modules/queryKeys';

export type TagFilterItem = {
  id: number;
  name: string;
  posts: number;
};

export type GetTagsParams = {
  type: PostType;
};

async function getTags(params: GetTagsParams): Promise<TagFilterItem[]> {
  const supabase = createClientComponentClient<Database>();
  const { type } = params;

  // get_tags_and_post_counts -> supabase에 추가한 저장 프로시저
  // 넘겨받은 postType을 가진 post에 연결된 tag의 이름과 해당 태그에 연결된 post의 개수를 반환합니다.
  let { data, error } = await supabase.rpc('get_tags_and_post_counts', {
    post_type_value: type,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
}

export function useGetTagsForPostFilteringQuery(params: GetTagsParams) {
  return useQuery<TagFilterItem[] | null, Error>(
    queryKeys.tag.getTagsForPostFilering(params),
    () => getTags(params)
  );
}
