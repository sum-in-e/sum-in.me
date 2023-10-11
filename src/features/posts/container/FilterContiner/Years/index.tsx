'use client';

import { PostType } from '@/src/common/modules/types/postType';
import { Disclosure } from '@headlessui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { BsChevronUp } from 'react-icons/bs';
import * as querystring from 'querystring';

type Props = {
  type: PostType;
};

const YearFilters = ({ type }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentYearFilter = searchParams.get('year');
  const currentTagFilter = searchParams.get('tag');

  const currentYear = new Date().getFullYear();
  const years = [
    '전체',
    ...Array.from({ length: currentYear - 2020 }, (v, i) => i + 2021),
  ];

  const handleClick = (year: number | string) => {
    const queryString = querystring.stringify({
      tag: currentTagFilter || '',
      year: year === '전체' ? '' : year,
    });

    if (Number(currentYearFilter) !== year)
      router.push(`/${type}?${queryString}`);
  };

  const selectedFilter = currentYearFilter || '전체';

  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex w-full px-2 justify-between rounded-t-lg border-b  border-zinc-400 py-2 text-sm text-zinc-800 dark:text-zinc-200 dark:hover:bg-opacity-20 ">
            <span>{`Year - ${selectedFilter}`}</span>
            <BsChevronUp
              className={`${
                open ? 'rotate-180 transform' : ''
              } h-4 w-4 text-zinc-800 dark:text-zinc-100`}
            />
          </Disclosure.Button>
          <Disclosure.Panel>
            <ul className="flex gap-3 flex-wrap mt-3 px-2">
              {years.map((year, index) => (
                <li
                  key={index}
                  className="rounded-full flex gap-3 items-center md:hover:bg-opacity-50 bg-gray-200 dark:bg-opacity-20 w-fit px-4 py-1 text-xs cursor-pointer"
                  onClick={() => handleClick(year)}
                >
                  <span>{year}</span>
                </li>
              ))}
            </ul>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default YearFilters;
