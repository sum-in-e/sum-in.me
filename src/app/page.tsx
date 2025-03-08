import RecentPosts from '@/src/features/posts/components';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  return (
    <div className="flex w-full flex-col items-center gap-16">
      <RecentPosts />
    </div>
  );
}
