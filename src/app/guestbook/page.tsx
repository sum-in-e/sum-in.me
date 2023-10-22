import CommentForm from '@/src/features/guestbook/container/CommentForm';
import Comments from '@/src/features/guestbook/container/Comments';

export default function GuestBookPage() {
  return (
    <section className="w-full">
      <h2 className="text-4xl mb-10 font-bold dark:text-white">GuestBook</h2>
      <h3 className="text-lg mb-5">Please sign the guestbook!</h3>
      <CommentForm />
      <Comments />
    </section>
  );
}
