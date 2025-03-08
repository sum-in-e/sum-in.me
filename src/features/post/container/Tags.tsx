'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { Badge } from '@/src/common/components/ui/badge';
import { getPostTags } from '../services/tagService';
import queryKeys from '@/src/common/modules/queryKeys';

interface Props {
  postId: number;
}

export default function Tags({ postId }: Props) {
  const { data: tags } = useSuspenseQuery({
    queryKey: queryKeys.post.tags(postId),
    queryFn: () => getPostTags(postId),
  });

  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className="mb-1 flex gap-1">
      {tags.map((tag, index) => (
        <Badge key={`${tag}_${index}`} variant="outline" className="font-light">
          {tag}
        </Badge>
      ))}
    </div>
  );
}
