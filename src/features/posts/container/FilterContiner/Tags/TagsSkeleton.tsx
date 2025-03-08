import { Skeleton } from '@/src/common/components/ui/skeleton';

export function TagsSkeleton() {
  return (
    <div className="mb-8 flex gap-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton key={index} className="h-6 w-24 rounded-full" />
      ))}
    </div>
  );
}
