'use client';

import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Editor } from '@tiptap/react';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { PostType } from '@/src/common/modules/types/postType';
import { useTitleState } from '@/src/features/post/modules/postStore';
import TagArea from '@/src/features/post/container/AsideTab/PostInfoTab/Tags';
import { Tables } from '@/src/types/supabase';
import {
  createPost,
  createPostWithTags,
  updatePost,
  updatePostWithTags,
  getPostTags,
  checkTagIdArraysEqual,
} from '@/src/features/post/services/postService';
import queryKeys from '@/src/common/modules/queryKeys';

interface Props {
  editor: Editor;
  initPost?: Tables<'post'>;
}

export default function PostInfo({ editor, initPost }: Props) {
  const router = useRouter();
  const html = editor.getHTML();
  const { title } = useTitleState();

  const [description, setDescription] = useState(initPost?.description || '');
  const [postType, setPostType] = useState<PostType>(initPost?.type || 'blog');
  const [isPublic, setIsPublic] = useState(initPost?.is_public ?? true);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  const { data: initTags } = useSuspenseQuery({
    queryKey: queryKeys.post.tags(initPost?.id || 0),
    queryFn: () => getPostTags(initPost?.id || 0),
  });
  const createPostMutation = useMutation<
    { id: number } | number,
    Error,
    { withTags: boolean }
  >({
    mutationFn: (data: { withTags: boolean }) => {
      if (data.withTags) {
        return createPostWithTags({
          title,
          description,
          content: html,
          is_public: isPublic,
          type: postType,
          tag_ids: selectedTags,
        });
      }
      return createPost({
        title,
        description,
        content: html,
        is_public: isPublic,
        type: postType,
      });
    },
    onSuccess: (data) => {
      const postId = typeof data === 'number' ? data : data.id;
      router.push(`/post/${postId}`);
    },
    onError: (error) => {
      alert(`Error: ${error.message}`);
    },
  });

  const updatePostMutation = useMutation({
    mutationFn: async (data: { withTags: boolean }) => {
      if (!initPost) return;

      if (data.withTags) {
        return updatePostWithTags({
          id: initPost.id,
          title,
          description,
          content: html,
          is_public: isPublic,
          type: postType,
          tag_ids: selectedTags,
        });
      }
      return updatePost({
        id: initPost.id,
        title,
        description,
        content: html,
        is_public: isPublic,
        type: postType,
      });
    },
    onSuccess: (data) => {
      if (!data) return;

      const postId = typeof data === 'number' ? data : data.id;
      alert('Post Updated');
      router.push(`/post/${postId}`);
    },
    onError: (error) => {
      alert(`Error: ${error.message}`);
    },
  });

  const handleChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleChangePostType = (newType: PostType) => {
    setPostType(newType);
  };

  const handleClickTag = (id: number) => {
    setSelectedTags((prev) => {
      if (prev.includes(id)) {
        return prev.filter((tagId) => tagId !== id);
      }
      return [...prev, id];
    });
  };

  const handlePost = async () => {
    if (initPost) {
      const tagsEqual = checkTagIdArraysEqual(initTags || [], selectedTags);
      updatePostMutation.mutate({ withTags: !tagsEqual });
    } else {
      createPostMutation.mutate({ withTags: selectedTags.length > 0 });
    }
  };

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-2">
        <p className="text-xs text-zinc-400">Description</p>
        <input
          className="reset-input border-b border-zinc-700 bg-inherit text-black"
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
        disabled={
          description === '' ||
          createPostMutation.isPending ||
          updatePostMutation.isPending
        }
        className="reset-button w-full rounded-md bg-black px-4 py-2 text-sm"
      >
        {createPostMutation.isPending || updatePostMutation.isPending
          ? '처리 중...'
          : 'Publish'}
      </button>
    </div>
  );
}

interface ButtonProps {
  onClick: () => void;
  isActive: boolean;
  text: string;
}

const Button = ({ onClick, isActive, text }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex-grow rounded-md p-2 text-sm md:hover:bg-opacity-70 ${
        isActive ? 'bg-zinc-900 text-white' : 'bg-gray-100 text-zinc-700'
      }`}
    >
      {text}
    </button>
  );
};
