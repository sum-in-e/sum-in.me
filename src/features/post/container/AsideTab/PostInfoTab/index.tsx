'use client';

import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Editor } from '@tiptap/react';
import { Database } from '@/database.types';
import { Post, PostType } from '@/src/common/modules/types/postType';
import { useTitleState } from '@/src/features/post/modules/postStore';
import TagArea from '@/src/features/post/container/AsideTab/PostInfoTab/Tags';

interface Props {
  editor: Editor;
  initPost?: Post;
}

const PostInfoTab = ({ editor, initPost }: Props) => {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const html = editor.getHTML();

  const { title } = useTitleState();
  const [description, setDescrption] = useState<string>('');
  const [postType, setPostType] = useState<PostType>('blog');
  const [isPublic, setIsPublic] = useState(true);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

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

  const checkTagIdArraysEqual = (array1: number[], array2: number[]) => {
    if (array1.length !== array2.length) return false;

    const sortedArray1 = array1.slice().sort();
    const sortedArray2 = array2.slice().sort();

    for (let i = 0; i < sortedArray1.length; i++) {
      if (sortedArray1[i] !== sortedArray2[i]) return false;
    }

    return true;
  };

  const insertPost = async () => {
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
  };

  const insertPostWithTag = async () => {
    // insert_post_with_tag는 supabase에 추가한 PostgreSQL 함수
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
  };

  const updatePost = async () => {
    if (initPost) {
      const { data, error } = await supabase
        .from('post')
        .update({
          title,
          description,
          content: html,
          is_public: isPublic,
          type: postType,
          updated_at: new Date().toISOString(),
        })
        .eq('id', initPost.id)
        .select();

      if (error) {
        alert(`Error: ${JSON.stringify(error)}`);
        return;
      }

      alert('Post Updated');
      router.push(`/post/${data[0].id}`);
    }
  };

  const updatePostWithTag = async () => {
    if (initPost) {
      // update_post_with_tags는 supabase에 추가한 PostgreSQL 함수 / 게시글 수정 시 태그를 수정한 경우 post 수정과 함께 post-tag 로우에 대한 삭제 혹은 추가를 일괄로 작업한다. (트랜잭션)
      let { data: updatedPostId, error } = await supabase.rpc(
        'update_post_with_tags',
        {
          exist_post_id: initPost.id,
          post_title: title,
          post_description: description,
          post_content: html,
          post_is_public: isPublic,
          post_type: postType,
          new_tags_ids: selectedTags,
        }
      );

      if (error) {
        console.error(error);
        return;
      }

      alert('Post Updated');
      router.push(`/post/${updatedPostId}`);
    }
  };

  const handlePost = async () => {
    if (initPost) {
      // 수정
      const initTagIds = await getInitTagIds(initPost);

      if (checkTagIdArraysEqual(initTagIds, selectedTags)) {
        // 태그 수정 안 한 경우 (게시글 단일 업데이트)
        updatePost();
      } else {
        // 태그 수정한 경우 (게시글과 post-tag 테이블도 일괄 업데이트)
        updatePostWithTag();
      }
    } else {
      // 새 글
      if (selectedTags.length > 0) {
        // 태그 선택한 경우 (게시글과 post-tag 테이블도 일괄 생성)
        insertPostWithTag();
      } else {
        // 태그 미선택 (게시글 단일 생성)
        insertPost();
      }
    }
  };

  const getInitTagIds = useCallback(
    async (init: Post) => {
      let { data } = await supabase
        .from('post-tag')
        .select('tag_id')
        .eq('post_id', init.id);
      return data ? data.map((item) => item.tag_id) : [];
    },
    [supabase]
  );

  useEffect(() => {
    // 새 게시글 작성이 아닌 경우 기존 게시글 값 할당
    if (initPost) {
      const setInitPostData = async () => {
        const initTagIds = await getInitTagIds(initPost);

        if (initTagIds.length > 0) setSelectedTags(initTagIds);
        setDescrption(initPost.description);
        setPostType(initPost.type);
        setIsPublic(initPost.is_public);
      };

      setInitPostData();
    }
  }, [
    getInitTagIds,
    initPost,
    setDescrption,
    setIsPublic,
    setPostType,
    setSelectedTags,
  ]);

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
