import CommentForm from '@/src/features/guestbook/container/CommentForm';
import CommentsContainer from '@/src/features/guestbook/container/CommentsContainer';

export default function GuestBookPage() {
  return (
    <section className="w-full">
      <h2 className="mb-10 text-4xl font-bold dark:text-white">GuestBook</h2>
      <h3 className="mb-5 text-lg">Please sign the guestbook!</h3>
      <CommentForm />
      <CommentsContainer />
    </section>
  );
}
