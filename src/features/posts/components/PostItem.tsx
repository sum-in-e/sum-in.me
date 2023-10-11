'use client';

import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';

interface Props {
  id: number;
  title: string;
  description: string;
  created_at: string;
}

const PostItem = ({ id, title, description, created_at }: Props) => {
  const router = useRouter();
  const createdAt = dayjs(created_at).format('YYYY-MM-DD');

  const handleClick = async () => {
    router.push(`/post/${id}`);
  };

  return (
    <li onClick={handleClick} className="relative group cursor-pointer ">
      <div className="hidden md:block absolute -inset-y-5 -inset-x-3 z-0 scale-95 bg-zinc-100 dark:bg-zinc-800  opacity-0 transition group-hover:scale-100 group-hover:opacity-50 rounded-lg duration-300" />
      <div className="relative z-10">
        <h3 className="text-lg font-medium truncate dark:text-zinc-100">
          {title}
        </h3>
        <p className="text-zinc-400 truncate ">{description}</p>
        <p className="mt-2 text-sm text-zinc-400">{createdAt}</p>
      </div>
    </li>
  );
};

export default PostItem;
