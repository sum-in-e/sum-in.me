'use client';

import { PostType } from '@/src/common/modules/types/postType';
import { useRouter, useSearchParams } from 'next/navigation';
import * as querystring from 'querystring';

const StaticTagFilter = ({
  postType,
  filterType,
}: {
  postType: PostType;
  filterType: '전체' | '미분류';
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTagId = searchParams.get('tag');
  const currentYear = searchParams.get('year');

  const handleClick = () => {
    const queryString = querystring.stringify({
      tag: filterType === '전체' ? '' : 'uncategorized',
      year: currentYear || '',
    });

    if (filterType === '전체' && currentTagId) {
      router.push(`/${postType}?${queryString}`);
    }

    if (filterType === '미분류' && currentTagId !== 'uncategorized') {
      router.push(`/${postType}?${queryString}`);
    }
  };

  return (
    <li
      className="rounded-full flex items-center md:hover:bg-opacity-50 bg-gray-200 dark:bg-opacity-20 w-fit px-3 py-1 text-xs cursor-pointer"
      onClick={handleClick}
    >
      {filterType}
    </li>
  );
};

export default StaticTagFilter;
