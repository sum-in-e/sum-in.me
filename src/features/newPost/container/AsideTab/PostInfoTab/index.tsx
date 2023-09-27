'use client';

import { ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Editor } from '@tiptap/react';
import { Database } from '@/database.types';
import { PostType } from '@/src/common/modules/types/postType';
import TagArea from '@/src/features/newPost/container/AsideTab/PostInfoTab/Tags';
import {
  useDescriptionState,
  usePostTypeState,
  usePublishState,
  useSelectedTagsState,
  useTitleState,
} from '@/src/features/newPost/modules/newPostStore';

interface Props {
  editor: Editor;
}

const PostInfoTab = ({ editor }: Props) => {
  const router = useRouter();

  const supabase = createClientComponentClient<Database>();

  const { title } = useTitleState();
  const { description, setDescrption } = useDescriptionState();
  const { postType, setPostType } = usePostTypeState();
  const { isPublic, setIsPublic } = usePublishState();
  const { selectedTags, setSelectedTags } = useSelectedTagsState();

  const handleChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setDescrption(e.target.value);
  };

  const handleChangePostType = (newType: PostType) => {
    setPostType(newType);
  };

  const handleClickTag = (id: number) => {
    let newTagIds = [...selectedTags, id];

    if (selectedTags.includes(id)) {
      // 선택된 태그 클릭 시 선택 해제
      newTagIds = [...selectedTags].filter((tagId) => tagId !== id);
    }

    setSelectedTags(newTagIds);
  };

  const handlePost = async () => {
    const html = editor.getHTML();

    if (selectedTags.length > 0) {
      // insert_post_with_tag는 SQL Editor로 생성한 PostgreSQL 함수
      // 게시글을 생성하고 post-tag 테이블에 선택된 태그와 생성된 게시물의 연결 관계를 담은 로우를 추가하는 작업을 하나로 묶어 수행하며, 하나라도 실패 시 롤백된다.
      const { data: newPostId, error } = await supabase.rpc(
        'insert_post_with_tag',
        {
          post_title: title,
          post_description: description,
          post_content: html,
          post_is_public: isPublic,
          post_type: postType,
          tag_ids: selectedTags,
        }
      );

      if (error) {
        alert(`Error: ${JSON.stringify(error)}`);
        return;
      }

      router.push(`/post/${newPostId}`);
    } else {
      const { data, error } = await supabase
        .from('post')
        .insert([
          {
            title,
            description,
            content: html,
            is_public: isPublic,
            type: postType,
          },
        ])
        .select();

      if (error) {
        alert(`Error: ${JSON.stringify(error)}`);
        return;
      }

      router.push(`/post/${data[0].id}`);
    }
  };

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-2">
        <p className="text-xs text-zinc-400">Description</p>
        <input
          className="bg-inherit border-b border-zinc-700 reset-input text-black"
          placeholder="Description"
          value={description}
          onChange={handleChangeDescription}
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs text-zinc-400">Tag</p>
        <TagArea selectedTags={selectedTags} onClick={handleClickTag} />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs text-zinc-400">Type</p>
        <div className="flex gap-1">
          <Button
            onClick={() => handleChangePostType('blog')}
            isActive={postType === 'blog'}
            text="Blog"
          />
          <Button
            onClick={() => handleChangePostType('note')}
            isActive={postType === 'note'}
            text="Note"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs text-zinc-400">Public</p>
        <div className="flex gap-1">
          <Button
            onClick={() => setIsPublic(true)}
            isActive={isPublic}
            text="Public"
          />
          <Button
            onClick={() => setIsPublic(false)}
            isActive={!isPublic}
            text="Private"
          />
        </div>
      </div>

      <button
        onClick={handlePost}
        disabled={description === ''}
        className="reset-button w-full px-4 py-2 rounded-md bg-accent md:hover:bg-opacity-70 text-sm"
      >
        Publish
      </button>
    </div>
  );
};

export default PostInfoTab;

interface ButtonProps {
  onClick: () => void;
  isActive: boolean;
  text: string;
}

const Button = ({ onClick, isActive, text }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`text-sm p-2 rounded-md flex-grow md:hover:bg-opacity-70 ${
        isActive ? 'bg-zinc-900 text-white' : 'text-zinc-700 bg-gray-100'
      }`}
    >
      {text}
    </button>
  );
};
