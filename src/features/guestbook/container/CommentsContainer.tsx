'use client';

import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import { Button } from '@/src/common/components/ui/button';
import { Skeleton } from '@/src/common/components/ui/skeleton';
import Comments from './Comments';

export default function CommentsContainer() {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <CommentsFallback resetErrorBoundary={resetErrorBoundary} />
          )}
        >
          <Suspense fallback={<CommentsSkeleton />}>
            <Comments />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}

function CommentsSkeleton() {
  return (
    <div className="mt-10 flex flex-col gap-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-4 w-full" />
        </div>
      ))}
    </div>
  );
}

function CommentsFallback({
  resetErrorBoundary,
}: {
  resetErrorBoundary: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-4 py-10">
      <p>댓글을 불러오지 못했어요🥲</p>
      <Button onClick={() => resetErrorBoundary()}>다시 시도</Button>
    </div>
  );
}
