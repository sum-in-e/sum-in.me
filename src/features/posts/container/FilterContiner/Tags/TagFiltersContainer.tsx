'use client';

import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import { PostType } from '@/src/common/modules/types/postType';
import TagFilters from '@/src/features/posts/container/FilterContiner/Tags';
import { TagsFallback } from '@/src/features/posts/container/FilterContiner/Tags/TagsFallback';
import { TagsSkeleton } from '@/src/features/posts/container/FilterContiner/Tags/TagsSkeleton';

interface Props {
  type: PostType;
}

export default function TagFiltersContainer({ type }: Props) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <TagsFallback resetErrorBoundary={resetErrorBoundary} />
          )}
        >
          <Suspense fallback={<TagsSkeleton />}>
            <TagFilters type={type} />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
