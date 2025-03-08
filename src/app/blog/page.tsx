import TagFiltersContainer from '@/src/features/posts/container/FilterContiner/Tags/TagFiltersContainer';
import PostsContainer from '@/src/features/posts/container/PostsContainer';

export default function BlogPage() {
  return (
    <section className="w-full">
      <h2 className="mb-10 text-4xl font-bold dark:text-white">Blog</h2>
      <TagFiltersContainer type="blog" />
      <PostsContainer type="blog" />
    </section>
  );
}
