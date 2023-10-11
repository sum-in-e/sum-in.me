'use client';

import { useSearchParams } from 'next/navigation';
import { Disclosure } from '@headlessui/react';
import { BsChevronUp } from 'react-icons/bs';
import { PostType } from '@/src/common/modules/types/postType';
import { useGetTagsForPostFilteringQuery } from '@/src/features/posts/modules/hooks/api/useGetTagsForPostFilteringQuery';
import DynamicTagFilter from '@/src/features/posts/container/FilterContiner/Tags/DynamicTagFilter';
import StaticTagFilter from '@/src/features/posts/container/FilterContiner/Tags/StaticTagFilter';

interface Props {
  type: PostType;
}

const TagFilters = ({ type }: Props) => {
  const searchParams = useSearchParams();
  const currentTagId = searchParams.get('tag');

  const { data, isLoading } = useGetTagsForPostFilteringQuery({
    type,
  });

  const getSelectedTag = () => {
    let result = '전체';

    const dynamicTag = data?.find(
      (tag) => tag.id === Number(currentTagId)
    )?.name;

    if (!currentTagId) {
    } else if (currentTagId === 'uncategorized') {
      result = '미분류';
    } else if (dynamicTag) {
      result = dynamicTag;
    } else {
      result = currentTagId || '';
    }

    return result;
  };

  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex w-full px-2 justify-between rounded-t-lg border-b  border-zinc-400 py-2 text-sm text-zinc-800 dark:text-zinc-200 dark:hover:bg-opacity-20 ">
            <span>{`Tag - ${getSelectedTag()}`}</span>
            <BsChevronUp
              className={`${
                open ? 'rotate-180 transform' : ''
              } h-4 w-4 text-zinc-800 dark:text-zinc-100`}
            />
          </Disclosure.Button>
          <Disclosure.Panel>
            <ul className="flex gap-3 flex-wrap mt-3 px-2">
              {isLoading ? (
                <TagsSkeleton />
              ) : (
                <>
                  <StaticTagFilter postType={type} filterType="전체" />
                  {data?.map((tag) => (
                    <DynamicTagFilter key={tag.id} tag={tag} type={type} />
                  ))}
                  <StaticTagFilter postType={type} filterType="미분류" />
                </>
              )}
            </ul>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default TagFilters;

const TagsSkeleton = () => {
  return (
    <div className="flex gap-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <li
          key={index}
          className="rounded-full md:hover:bg-opacity-50 bg-zinc-200 dark:bg-opacity-20 w-24 h-6"
        />
      ))}
    </div>
  );
};
