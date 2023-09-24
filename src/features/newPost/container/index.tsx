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
import TitleInput from '@/src/features/newPost/container/TitleInput';
import AsideTab from '@/src/features/newPost/container/AsideTab';

const lowlight = createLowlight();

lowlight.register({ xml });
lowlight.register({ css });
lowlight.register({ js });
lowlight.register({ ts });
lowlight.register({ sql });
lowlight.register({ bash });

const NewPost = () => {
  const editorContent = ``;

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
  });

  useEffect(() => {
    // 페이지 벗어나려는 시도 발생 시 확인받기
    const handleBeforeUnload = (event: {
      preventDefault: () => void;
      returnValue: string;
    }) => {
      event.preventDefault();
      event.returnValue =
        '변경사항이 저장되지 않았습니다. 페이지를 벗어나시겠습니까?';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  if (!editor) {
    return null;
  }

  return (
    <>
      <div className="max-w-screen-sm w-full py-10 flex flex-col gap-2">
        <TitleInput />
        <EditorContent editor={editor} className="content outline-none" />
        <div className="character-count flex justify-end text-xs">
          {editor.storage.characterCount.characters()} characters
        </div>
      </div>
      <AsideTab editor={editor} />
    </>
  );
};

export default NewPost;
