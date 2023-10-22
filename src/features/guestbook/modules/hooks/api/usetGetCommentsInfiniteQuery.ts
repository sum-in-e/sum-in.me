import { useInfiniteQuery } from '@tanstack/react-query';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/database.types';
import queryKeys from '@/src/common/modules/queryKeys';

const PAGE_SIZE = 20;

async function getComments({ pageParam = 0 }) {
  const supabase = createClientComponentClient<Database>();

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
  return useInfiniteQuery(queryKeys.comment.getComments(), getComments, {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < PAGE_SIZE) {
        return undefined;
      }
      return pages.length * PAGE_SIZE;
    },
  });
}
