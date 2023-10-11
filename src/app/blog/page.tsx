import FilterContainer from '@/src/features/posts/container/FilterContiner';
import Posts from '@/src/features/posts/container/Posts';

export default function BlogPage() {
  return (
    <section className="w-full">
      <h2 className="text-4xl mb-10 font-bold dark:text-white">Blog</h2>
      <FilterContainer type="blog" />
      <Posts type="blog" />
    </section>
  );
}
