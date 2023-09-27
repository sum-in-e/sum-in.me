'use client';

import { ChangeEvent } from 'react';
import { useTitleState } from '@/src/features/newPost/modules/newPostStore';

const TitleInput = () => {
  const { title, setTitle } = useTitleState();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <input
      className="p-2 text-3xl font-bold bg-inherit border-b reset-input dark:text-white"
      placeholder="제목을 입력하세요."
      value={title}
      onChange={handleChange}
    />
  );
};

export default TitleInput;
