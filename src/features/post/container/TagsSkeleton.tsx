import { Skeleton } from '@/src/common/components/ui/skeleton';

export function TagsSkeleton() {
  return (
    <div className="mb-1 flex gap-1">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-5 w-16 rounded-full" />
      ))}
    </div>
  );
}
