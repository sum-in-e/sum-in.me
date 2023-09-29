'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';
import { Database } from '@/database.types';
import { Tags } from '@/src/common/modules/types/tag';

interface Props {
  selectedTags: number[];
  onClick: (id: number) => void;
}

const TagArea = ({ selectedTags, onClick }: Props) => {
  const supabase = createClientComponentClient<Database>();

  const [tags, setTags] = useState<Tags | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleClick = (id: number) => {
    onClick(id);
  };

  useEffect(() => {
    const getTags = async () => {
      const { data, error } = await supabase.from('tag').select();

      if (data) setTags(data);
      if (error) setError(error.message);
    };

    getTags();
  }, [supabase]);

  if (error) return <p>{`Error: ${error}`}</p>;

  if (!tags) return <p>Loading...</p>;

  if (tags.length === 0) return <p>No Tags</p>;

  return (
    <ul className="flex gap-x-2 gap-y-1 flex-wrap">
      {tags?.map((tag) => (
        <li
          key={tag.id}
          className={`py-1 text-sm cursor-pointer md:hover:text-opacity-70 flex justify-center items-center ${
            selectedTags.includes(tag.id)
              ? 'text-zinc-800 underline'
              : 'text-zinc-500'
          }`}
          onClick={() => handleClick(tag.id)}
        >
          {`#${tag.name}`}
        </li>
      ))}
    </ul>
  );
};

export default TagArea;
