import TagFiltersContainer from '@/src/features/posts/container/FilterContiner/Tags/TagFiltersContainer';
import PostsContainer from '@/src/features/posts/container/PostsContainer';

export default function NotePage() {
  return (
    <section className="w-full">
      <h2 className="mb-10 text-4xl font-bold dark:text-white">Note</h2>
      <TagFiltersContainer type="note" />
      <PostsContainer type="note" />
    </section>
  );
}
