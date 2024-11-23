'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';
import { Database } from '@/database.types';
import { Badge } from '@/src/common/components/ui/badge';
import { Skeleton } from '@/src/common/components/ui/skeleton';

interface TagsContainerProps {
  postId: number;
}

const TagsContainer = ({ postId }: TagsContainerProps) => {
  const supabase = createClientComponentClient<Database>();

  const [tags, setTags] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getTags = async () => {
      try {
        setIsLoading(true);
        const { data: tagData, error: tagError } = await supabase
          .from('post-tag')
          .select(
            `
            tag_id,
            tag (
              name
            )
          `
          )
          .eq('post_id', postId);

        if (tagError) {
          throw tagError;
        }

        if (tagData) {
          const tagNames = tagData
            .map((item) => item.tag?.name)
            .filter(
              (name): name is string => name !== null && name !== undefined
            );
          setTags(tagNames);
        }
      } catch (err) {
        console.error('Error fetching tags:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch tags');
      } finally {
        setIsLoading(false);
      }
    };

    getTags();
  }, [supabase, postId]);

  if (isLoading) {
    return (
      <div className="mb-1 flex gap-1">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-5 w-16 rounded-full" />
        ))}
      </div>
    );
  }

  if (error) {
    return null;
  }

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
};

export default TagsContainer;
