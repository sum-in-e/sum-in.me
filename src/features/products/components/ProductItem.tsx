'use client';

import { BsArrowRightShort, BsBoxArrowUpRight } from 'react-icons/bs';

interface Props {
  id: number;
  name: string;
  description: string;
  url: string;
  path: string;
  duration: string;
}

import { useRouter } from 'next/navigation';
import { MouseEvent } from 'react';

const ProductItem = ({ id, name, description, duration, url, path }: Props) => {
  const router = useRouter();

  const handleOpenTheSite = () => {
    window.open(url, '_blank');
  };

  const handleClickViewDetail = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    router.push(path);
  };

  return (
    <li
      onClick={handleOpenTheSite}
      className="relative group cursor-pointer w-full"
    >
      <div className="hidden md:block absolute -inset-y-5 -inset-x-3 z-0 scale-95 bg-zinc-100 opacity-0 transition group-hover:scale-100 group-hover:opacity-50 rounded-lg duration-300" />
      <div className="flex gap-5 relative z-10">
        <div className="border bg-white rounded-lg w-fit h-fit p-1">
          <img
            src="/images/products/linkloud/logo.png"
            alt="Linkloud logo"
            height={50}
            width={50}
          ></img>
        </div>
        <div className="flex-grow">
          <h4 className="text-xl font-semibold">{name}</h4>
          <p className="text-zinc-400 mt-2">{description}</p>
          <p className="text-zinc-400 mt-2">{duration}</p>
          <div className="flex justify-end items-center mt-5">
            <button
              onClick={handleClickViewDetail}
              className="rounded-md md:hover:bg-zinc-200 flex justify-center items-center px-4 py-2 color-duration"
            >
              <span className="text-zinc-600 text-sm group-hover:text-black">
                View Detail
              </span>
              <BsArrowRightShort
                size={20}
                className="fill-zinc-600 group-hover:fill-black"
              />
            </button>
          </div>
        </div>
      </div>
      <BsBoxArrowUpRight
        size={15}
        className="absolute top-1 right-4 fill-zinc-500"
      />
    </li>
  );
};

export default ProductItem;
