'use client';

import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import { PostsListSkeleton } from '@/src/features/posts/components/PostsListSkeleton';
import { User } from '@supabase/supabase-js';
import PostDetail from '@/src/features/post-detail/container/PostDetail';

interface Props {
  id: number;
  user: User | null;
}

export default function PostDetailContainer({ id, user }: Props) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <div className="flex h-full items-center justify-center gap-5 pt-10">
              <button
                onClick={() => resetErrorBoundary()}
                className="rounded-md bg-zinc-100 px-4 py-2 text-sm hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
              >
                다시 시도
              </button>
            </div>
          )}
        >
          <Suspense fallback={<PostsListSkeleton />}>
            <PostDetail id={id} user={user} />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
