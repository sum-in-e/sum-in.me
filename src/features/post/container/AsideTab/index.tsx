'use client';

import { ReactNode, useState } from 'react';
import { Editor } from '@tiptap/react';
import { BsFillPaletteFill, BsFillPencilFill } from 'react-icons/bs';
import EditorStylingTab from '@/src/features/post/container/AsideTab/EditorStylingTab';
import PostInfoTab from '@/src/features/post/container/AsideTab/PostInfoTab';
import { Post } from '@/src/common/modules/types/postType';

interface Props {
  editor: Editor;
  initPost?: Post;
}

const AsideTab = ({ editor, initPost }: Props) => {
  const [activeTab, setActiveTab] = useState('info');

  return (
    <div className="fixed rounded-lg top-25 right-5 w-[280px] min-h-[600px] shadow-xl bg-gray-200 text-white z-10">
      <div className="flex">
        {/* Tabs */}
        <Tab
          onClick={() => setActiveTab('info')}
          isActive={activeTab === 'info'}
        >
          <BsFillPencilFill size={15} className="fill-zinc-700" />
        </Tab>
        <Tab
          onClick={() => setActiveTab('style')}
          isActive={activeTab === 'style'}
        >
          <BsFillPaletteFill size={15} className="fill-zinc-700" />
        </Tab>
      </div>

      {/* View of tab */}
      <div className="px-4 py-4">
        <div className={`${activeTab === 'info' ? 'block' : 'hidden'}`}>
          <PostInfoTab editor={editor} initPost={initPost} />
        </div>
        <div className={`${activeTab === 'style' ? 'block' : 'hidden'}`}>
          <EditorStylingTab editor={editor} />
        </div>
      </div>
    </div>
  );
};

export default AsideTab;

interface TapProps {
  onClick: () => void;
  isActive: boolean;
  children: ReactNode;
}

const Tab = ({ onClick, isActive, children }: TapProps) => {
  return (
    <button
      className={`flex items-center justify-center py-4 flex-grow px-4 border-b-2 ${
        isActive ? 'border-zinc-700' : 'border-transparent'
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
