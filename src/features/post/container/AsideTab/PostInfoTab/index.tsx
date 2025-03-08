'use client';

import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import { Editor } from '@tiptap/react';
import { Tables } from '@/src/types/supabase';
import PostInfo from '@/src/features/post/container/AsideTab/PostInfoTab/PostInfo';

interface Props {
  editor: Editor;
  initPost?: Tables<'post'>;
}

export default function PostInfoTab({ editor, initPost }: Props) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <button
              onClick={() => resetErrorBoundary()}
              className="w-full rounded-md bg-zinc-100 px-4 py-2 text-sm text-zinc-700 hover:bg-opacity-70"
            >
              다시 시도
            </button>
          )}
        >
          <Suspense
            fallback={
              <div className="flex animate-pulse flex-col gap-7">
                <div className="h-8 w-full rounded-md bg-zinc-200" />
                <div className="h-32 w-full rounded-md bg-zinc-200" />
                <div className="h-8 w-full rounded-md bg-zinc-200" />
                <div className="h-8 w-full rounded-md bg-zinc-200" />
              </div>
            }
          >
            <PostInfo editor={editor} initPost={initPost} />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
