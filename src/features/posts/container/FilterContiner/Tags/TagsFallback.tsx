'use client';

import { Button } from '@/src/common/components/ui/button';

export const TagsFallback = ({
  resetErrorBoundary,
}: {
  resetErrorBoundary: () => void;
}) => {
  return (
    <div className="flex flex-col items-center gap-4 py-10">
      <p>태그를 불러오지 못했어요🥲</p>
      <Button onClick={() => resetErrorBoundary()}>다시 시도</Button>
    </div>
  );
};
