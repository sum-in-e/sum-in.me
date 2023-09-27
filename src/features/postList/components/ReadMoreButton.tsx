'use client';

import { useRouter } from 'next/navigation';
import { BsArrowRightShort } from 'react-icons/bs';

interface Props {
  path: string;
}

const ReadMoreButton = ({ path }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(path);
  };

  return (
    <button
      onClick={handleClick}
      className="flex justify-center group items-center"
    >
      <span className="text-zinc-400 text-xs group-hover:text-black dark:group-hover:text-zinc-300">
        Read More
      </span>
      <BsArrowRightShort
        size={15}
        className="fill-zinc-400 group-hover:fill-black dark:group-hover:fill-zinc-300"
      />
    </button>
  );
};

export default ReadMoreButton;
