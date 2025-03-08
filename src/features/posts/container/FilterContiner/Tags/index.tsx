'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { PostType } from '@/src/common/modules/types/postType';
import { getTags } from '@/src/features/posts/services/postService';
import DynamicTagFilter from '@/src/features/posts/container/FilterContiner/Tags/DynamicTagFilter';
import StaticTagFilter from '@/src/features/posts/container/FilterContiner/Tags/StaticTagFilter';
import queryKeys from '@/src/common/modules/queryKeys';

interface Props {
  type: PostType;
}

export default function TagFilters({ type }: Props) {
  const { data: tags } = useSuspenseQuery({
    queryKey: queryKeys.post.tags(type),
    queryFn: () => getTags(type),
  });

  return (
    <div className="mb-8">
      <p className="mb-3 text-sm font-medium text-zinc-800 dark:text-zinc-200">
        태그
      </p>
      <ul className="flex flex-nowrap gap-2 overflow-x-auto pb-2 scrollbar-hide md:flex-wrap md:overflow-x-visible">
        <StaticTagFilter postType={type} filterType="전체" />
        {tags?.map((tag) => (
          <DynamicTagFilter key={tag.id} tag={tag} type={type} />
        ))}
        <StaticTagFilter postType={type} filterType="미분류" />
      </ul>
    </div>
  );
}
