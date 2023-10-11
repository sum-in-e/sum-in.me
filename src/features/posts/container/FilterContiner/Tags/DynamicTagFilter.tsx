'use client';

import { PostType } from '@/src/common/modules/types/postType';
import { TagFilterItem } from '@/src/features/posts/modules/hooks/api/useGetTagsForPostFilteringQuery';
import { useRouter, useSearchParams } from 'next/navigation';
import * as querystring from 'querystring';

const DynamicTagFilter = ({
  tag,
  type,
}: {
  tag: TagFilterItem;
  type: PostType;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTagId = searchParams.get('tag');
  const currentYear = searchParams.get('year');

  const handleClick = () => {
    const queryString = querystring.stringify({
      tag: tag.id,
      year: currentYear || '',
    });

    if (Number(currentTagId) !== tag.id) router.push(`/${type}?${queryString}`);
  };

  return (
    <li
      className="rounded-full flex gap-3 items-center md:hover:bg-opacity-50 bg-gray-200 dark:bg-opacity-20 w-fit px-3 py-1 text-xs cursor-pointer"
      onClick={handleClick}
    >
      <span>{tag.name}</span>
      <span>{tag.posts}</span>
    </li>
  );
};

export default DynamicTagFilter;
