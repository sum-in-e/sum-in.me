'use client';

import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import { PostsListSkeleton } from '@/src/features/posts/components/PostsListSkeleton';
import { PostsList } from '@/src/features/posts/components/PostList';
import ReadMoreButton from '@/src/features/posts/components/ReadMoreButton';
import { PostListFallback } from '@/src/features/posts/components/PostListFallback';
import { PostType } from '@/src/common/modules/types/postType';

interface PostsSectionProps {
  type: PostType;
  title: string;
}

export const PostsSection = ({ type, title }: PostsSectionProps) => {
  return (
    <div className="flex-grow">
      <p className="text-lg font-semibold text-black dark:text-white">
        {title}
      </p>

      <div className="mb-7 flex justify-end">
        <ReadMoreButton path={`/${type}`} />
      </div>

      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            fallbackRender={({ resetErrorBoundary }) => (
              <PostListFallback resetErrorBoundary={resetErrorBoundary} />
            )}
          >
            <Suspense fallback={<PostsListSkeleton />}>
              <PostsList type={type} />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </div>
  );
};
