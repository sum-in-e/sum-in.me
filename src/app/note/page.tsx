import FilterContainer from '@/src/features/posts/container/FilterContiner';
import Posts from '@/src/features/posts/container/Posts';

export default function NotePage() {
  return (
    <section className="w-full">
      <h2 className="text-4xl mb-10 font-bold dark:text-white">Note</h2>
      <FilterContainer type="note" />
      <Posts type="note" />
    </section>
  );
}
