import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center gap-5">
      <h4 className="text-2xl font-semibold">⚠️ Page's Not Found ⚠️</h4>
      <Link
        href="/"
        className="px-4 py-2 bg-zinc-200 rounded-md dark:bg-opacity-20"
      >
        Go Home
      </Link>
    </div>
  );
};
export default NotFoundPage;
