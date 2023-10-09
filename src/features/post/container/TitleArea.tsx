'use client';

import { ChangeEvent, useEffect, useRef } from 'react';
import { useTitleState } from '@/src/features/post/modules/postStore';

interface Props {
  isAdmin: boolean;
  initTitle?: string;
}

const TitleArea = ({ isAdmin, initTitle }: Props) => {
  const { title, setTitle } = useTitleState();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    if (initTitle) {
      // 기존 게시글인 경우 타이틀 할당
      setTitle(initTitle);
    } else {
      // 새 게시글인 경우 초기화(전역 상태)
      setTitle('');
    }
  }, [initTitle, setTitle]);

  return isAdmin ? (
    <input
      className="text-4xl mb-2 font-bold reset-input dark:text-white bg-inherit"
      placeholder="제목을 입력하세요."
      value={title}
      onChange={handleChange}
    />
  ) : (
    <h1 className="text-4xl mb-2 font-bold dark:text-white">{initTitle}</h1>
  );
};

export default TitleArea;
