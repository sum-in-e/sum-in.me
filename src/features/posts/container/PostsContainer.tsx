'use client';

import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import { PostType } from '@/src/common/modules/types/postType';
import Posts from './Posts';
import { PostsListSkeleton } from '@/src/features/posts/components/PostsListSkeleton';
import { PostListFallback } from '@/src/features/posts/components/PostListFallback';

interface Props {
  type: PostType;
}

export default function PostsContainer({ type }: Props) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <PostListFallback resetErrorBoundary={resetErrorBoundary} />
          )}
        >
          <Suspense fallback={<PostsListSkeleton />}>
            <Posts type={type} />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
