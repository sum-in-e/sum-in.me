'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { PostType } from '@/src/common/modules/types/postType';
import { Tag as TagType } from '@/src/features/posts/repositories/postRepository';
import Tag from '@/src/features/posts/components/Tag';

interface Props {
  tag: TagType;
  type: PostType;
}

export default function DynamicTagFilter({ tag, type }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTagId = searchParams.get('tag');

  const isSelected = currentTagId === String(tag.id);

  const handleClick = () => {
    const params = new URLSearchParams();
    params.set('tag', String(tag.id));
    router.push(`/${type}?${params.toString()}`);
  };

  return (
    <Tag
      label={tag.name}
      count={tag.posts}
      isSelected={isSelected}
      onClick={handleClick}
    />
  );
}
