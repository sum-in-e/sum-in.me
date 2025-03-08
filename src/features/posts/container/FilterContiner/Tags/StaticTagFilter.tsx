'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { PostType } from '@/src/common/modules/types/postType';
import Tag from '@/src/features/posts/components/Tag';

interface Props {
  filterType: '전체' | '미분류';
  postType: PostType;
}

export default function StaticTagFilter({ filterType, postType }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTagId = searchParams.get('tag');

  const isSelected =
    (filterType === '전체' && !currentTagId) ||
    (filterType === '미분류' && currentTagId === 'uncategorized');

  const handleClick = () => {
    const params = new URLSearchParams();
    if (filterType === '미분류') {
      params.set('tag', 'uncategorized');
    }
    router.push(`/${postType}?${params.toString()}`);
  };

  return (
    <Tag label={filterType} isSelected={isSelected} onClick={handleClick} />
  );
}
