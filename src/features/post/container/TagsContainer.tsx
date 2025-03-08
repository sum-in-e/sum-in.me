'use client';

import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import { TagsSkeleton } from '@/src/features/post/container/TagsSkeleton';
import Tags from '@/src/features/post/container/Tags';

interface Props {
  postId: number;
}

export default function TagsContainer({ postId }: Props) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} fallbackRender={() => null}>
          <Suspense fallback={<TagsSkeleton />}>
            <Tags postId={postId} />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
