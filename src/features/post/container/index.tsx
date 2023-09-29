'use client';

import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import Placeholder from '@tiptap/extension-placeholder';
import StarterKit from '@tiptap/starter-kit';
import { Color } from '@tiptap/extension-color';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Typography from '@tiptap/extension-typography';
import Heading from '@tiptap/extension-heading';
import Image from '@tiptap/extension-image';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import CharacterCount from '@tiptap/extension-character-count';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { createLowlight } from 'lowlight';
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import sql from 'highlight.js/lib/languages/sql';
import bash from 'highlight.js/lib/languages/bash';
import TitleInput from '@/src/features/post/container/TitleInput';
import AsideTab from '@/src/features/post/container/AsideTab';
import { User } from '@supabase/supabase-js';
import { Post } from '@/src/common/modules/types/postType';
import dayjs from 'dayjs';

const lowlight = createLowlight();

lowlight.register({ xml });
lowlight.register({ css });
lowlight.register({ js });
lowlight.register({ ts });
lowlight.register({ sql });
lowlight.register({ bash });

const Post = ({ user, initPost }: { user: User | null; initPost?: Post }) => {
  const editorContent = initPost?.content || ``;
  const isAdmin = user !== null;

  const editor = useEditor({
    extensions: [
      StarterKit,
      Typography,
      TextStyle,
      Color,
      Image,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      CodeBlockLowlight.configure({
        defaultLanguage: 'typescript',
        lowlight,
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Highlight.configure({ multicolor: true }),
      Link.configure({
        openOnClick: true,
      }),
      CharacterCount.configure(),
      Placeholder.configure({
        placeholder: 'Write something …',
      }),
    ],
    content: editorContent,
    editable: isAdmin, // 어드민만 편집 가능
  });

  useEffect(() => {
    // TODO: 로그인한 경우 페이지에서 뒤로가기, 앞으로가기, 새로고침 시 확인 받기
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue =
        '변경사항이 저장되지 않았습니다. 페이지를 벗어나시겠습니까?';
    };

    isAdmin && window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      isAdmin && window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isAdmin]);

  if (!editor) {
    return null;
  }

  // 노션처럼 에디터 자체가 UI가 되고 어드민 유저는 별도 편집모드에 진입하지 않아도 같은 페이지에서 글을 수정하거나 읽을 수 있도록 만들기
  // 1. 어드민 유저는 새 글 작성 뿐만 아니라 기존 글 확인 시에도 편집이 가능해야한다. -> 모든 UI가 같은 상태에서 편집 가능 여부만 달라져야한다. (노션처럼)
  // 2. 어드민 유저가 아닌 경우 제목 인풋과 에디터는 readonly가 되어야한다. (편집에 관련된 기타 요소는 보이지 않아야한다. - 텍스트 스타일 변경 컴포넌트 등)
  // 3. 어드민 유저가 페이지에서 벗어날 때 에디터의 기존 컨텐츠에서 수정 사항이 발생한 경우에는 페이지 변경사항을 저장하라는 확인 이벤트를 발생시킨다.

  return (
    <>
      <section className="w-full pb-10 md:py-10 flex flex-col gap-5">
        <div>
          <TitleInput isAdmin={isAdmin} initTitle={initPost?.title} />
          {initPost && (
            <p className="text-zinc-400 text-sm">
              {dayjs(initPost.created_at).format('YYYY-MM-DD')}
            </p>
          )}
        </div>
        <EditorContent editor={editor} className="content outline-none" />
        {isAdmin && (
          <div className="character-count flex justify-end text-xs dark:text-zinc-100">
            {editor.storage.characterCount.characters()} characters
          </div>
        )}
      </section>

      {isAdmin && <AsideTab editor={editor} initPost={initPost} />}
    </>
  );
};

export default Post;
