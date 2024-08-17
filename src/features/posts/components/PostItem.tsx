'use client';

import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useState } from 'react';

interface Props {
  id: number;
  title: string;
  description: string;
  created_at: string;
  cover: string;
}

const PostItem = ({ id, title, description, created_at, cover }: Props) => {
  const router = useRouter();
  const createdAt = dayjs(created_at).format('YYYY-MM-DD');
  const [imageSrc, setImageSrc] = useState(cover);

  const handleClick = async () => {
    router.push(`/post/${id}`);
  };

  const handleImageError = () => {
    setImageSrc(
      'https://res.cloudinary.com/duinj0dld/image/upload/v1695111909/dev.sum-in.me/sumDev-cover.webp'
    );
  };

  return (
    <li onClick={handleClick} className="relative group cursor-pointer">
      <div className="hidden md:block absolute -inset-y-5 -inset-x-3 z-0 scale-95 bg-zinc-100 dark:bg-zinc-800  opacity-0 transition group-hover:scale-100 group-hover:opacity-50 rounded-lg duration-300" />
      <div className="relative z-10">
        <Image
          src={imageSrc}
          width={300}
          height={157}
          alt={title}
          className="h-full w-full object-cover"
          onError={handleImageError}
        />
        <h3 className="text-lg font-medium truncate dark:text-zinc-100 mt-5">
          {title}
        </h3>
        <p className="text-zinc-400 truncate ">{description}</p>
        <p className="mt-2 text-sm text-zinc-400">{createdAt}</p>
      </div>
    </li>
  );
};

export default PostItem;
