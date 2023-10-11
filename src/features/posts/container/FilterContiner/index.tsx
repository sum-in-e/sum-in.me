'use client';

import { PostType } from '@/src/common/modules/types/postType';
import TagFilters from '@/src/features/posts/container/FilterContiner/Tags';
import YearFilters from '@/src/features/posts/container/FilterContiner/Years';

type Props = {
  type: PostType;
};

const FilterContainer = ({ type }: Props) => {
  return (
    <div className="flex flex-col gap-5 md:gap-0 md:flex-row md:justify-between mb-10">
      <div className="md:w-[49%]">
        <TagFilters type={type} />
      </div>
      <div className="md:w-[49%]">
        <YearFilters type={type} />
      </div>
    </div>
  );
};

export default FilterContainer;
