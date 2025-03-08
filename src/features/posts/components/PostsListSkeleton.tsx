import { Skeleton } from '@/src/common/components/ui/skeleton';

interface Props {
  count?: number;
}

export function PostsListSkeleton({ count = 3 }: Props) {
  return (
    <div className="flex flex-col gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex flex-col gap-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}
