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
import TitleArea from '@/src/features/post/container/TitleArea';
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
  // TODO: 저장중에는 publish 못 하도록 수정
  return (
    <>
      <section className="w-full pb-10 md:py-10 flex flex-col gap-5">
        <div>
          <TitleArea isAdmin={isAdmin} initTitle={initPost?.title} />
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
