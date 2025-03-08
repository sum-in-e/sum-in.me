import { useInfiniteQuery } from '@tanstack/react-query';
import queryKeys from '@/src/common/modules/queryKeys';
import { createClient } from '@/src/utils/supabase/client';

const PAGE_SIZE = 20;

async function getComments({ pageParam = 0 }) {
  const supabase = createClient();

  const response = await supabase
    .from('guestbook')
    .select('*')
    .order('created_at', { ascending: false })
    .range(pageParam, pageParam + PAGE_SIZE - 1);

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data;
}

export function useGetCommentInfiniteQuery() {
  return useInfiniteQuery({
    queryKey: queryKeys.comment.list(),
    queryFn: getComments,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < PAGE_SIZE) {
        return undefined;
      }
      return pages.length * PAGE_SIZE;
    },
  });
}
