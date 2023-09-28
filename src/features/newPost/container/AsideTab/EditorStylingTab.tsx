'use client';

import { ReactNode } from 'react';
import { Editor } from '@tiptap/react';
import {
  BsBlockquoteRight,
  BsListUl,
  BsListOl,
  BsTextIndentRight,
  BsTextIndentLeft,
  BsCodeSquare,
  BsCardImage,
  BsJustifyRight,
  BsJustify,
  BsJustifyLeft,
  BsTextCenter,
  BsTypeBold,
  BsTypeH1,
  BsTypeH2,
  BsTypeH3,
  BsCode,
  BsSlashLg,
  BsTypeItalic,
  BsTypeStrikethrough,
  BsTypeUnderline,
  BsLink45Deg,
  BsDashLg,
} from 'react-icons/bs';
import { Level } from '@tiptap/extension-heading';

interface Props {
  editor: Editor;
}

const HEADINGS = [
  { level: 1 as Level, icon: <BsTypeH1 size={16} className="fill-zinc-700" /> },
  { level: 2 as Level, icon: <BsTypeH2 size={16} className="fill-zinc-700" /> },
  { level: 3 as Level, icon: <BsTypeH3 size={16} className="fill-zinc-700" /> },
];
const HIGHLIGHT_COLORS = ['#3b82f6', '#5eead4', '#fde047', '#f87171'];
const TEXT_COLORS = [
  '#27272a',
  '#f4f4f5',
  '#000000',
  '#FFFFFF',
  '#ef4444',
  '#fde047',
  '#3b82f6',
  '#94FADB',
];

const EditorStylingTab = ({ editor }: Props) => {
  const addImage = () => {
    const url = window.prompt('URL');

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };
  return (
    <div className="flex flex-col gap-7">
      {/* Heading */}
      <div className="flex flex-col gap-2">
        <p className="text-xs text-zinc-400">Heading</p>
        <div className="flex gap-1">
          {HEADINGS.map((heading, index) => (
            <HeadingButton key={index} editor={editor} level={heading.level}>
              {heading.icon}
            </HeadingButton>
          ))}
        </div>
      </div>

      {/* Block Quote */}
      <div className="flex flex-col gap-2">
        <p className="text-xs text-zinc-400">Block</p>
        <BasicButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActiveClass={editor.isActive('blockquote') ? 'is-active' : ''}
        >
          <BsBlockquoteRight size={16} className="fill-zinc-700" />
        </BasicButton>
      </div>

      {/* Text Style */}
      <div className="flex flex-col gap-1">
        <div className="flex gap-1">
          <BasicButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActiveClass={editor.isActive('bold') ? 'is-active' : ''}
          >
            <BsTypeBold size={16} className="fill-zinc-700" />
          </BasicButton>
          <BasicButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActiveClass={editor.isActive('italic') ? 'is-active' : ''}
          >
            <BsTypeItalic size={16} className="fill-zinc-700" />
          </BasicButton>
          <BasicButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActiveClass={editor.isActive('strike') ? 'is-active' : ''}
          >
            <BsTypeStrikethrough size={16} className="fill-zinc-700" />
          </BasicButton>
          <BasicButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActiveClass={editor.isActive('underline') ? 'is-active' : ''}
          >
            <BsTypeUnderline size={16} className="fill-zinc-700" />
          </BasicButton>
        </div>
        <div className="flex gap-1">
          <BasicButton
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            isActiveClass={
              editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''
            }
          >
            <BsJustifyLeft size={16} className="fill-zinc-700" />
          </BasicButton>
          <BasicButton
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            isActiveClass={
              editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''
            }
          >
            <BsTextCenter size={16} className="fill-zinc-700" />
          </BasicButton>
          <BasicButton
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            isActiveClass={
              editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''
            }
          >
            <BsJustifyRight size={16} className="fill-zinc-700" />
          </BasicButton>
          <BasicButton
            onClick={() => editor.chain().focus().unsetTextAlign().run()}
          >
            <BsJustify size={16} className="fill-zinc-700" />
          </BasicButton>
        </div>
        <div className="flex gap-1">
          <BasicButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActiveClass={editor.isActive('bulletList') ? 'is-active' : ''}
          >
            <BsListUl size={16} className="fill-zinc-700" />
          </BasicButton>
          <BasicButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActiveClass={editor.isActive('orderedList') ? 'is-active' : ''}
          >
            <BsListOl size={16} className="fill-zinc-700" />
          </BasicButton>
          <BasicButton
            onClick={() =>
              editor.chain().focus().sinkListItem('listItem').run()
            }
            disabled={!editor.can().sinkListItem('listItem')}
          >
            <BsTextIndentLeft size={16} className="fill-zinc-700" />
          </BasicButton>
          <BasicButton
            onClick={() =>
              editor.chain().focus().liftListItem('listItem').run()
            }
            disabled={!editor.can().liftListItem('listItem')}
          >
            <BsTextIndentRight size={16} className="fill-zinc-700" />
          </BasicButton>
        </div>
        <div className="flex gap-1">
          <BasicButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            isActiveClass={editor.isActive('codeBlock') ? 'is-active' : ''}
          >
            <BsCodeSquare size={16} className="fill-zinc-700" />
          </BasicButton>
          <BasicButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            isActiveClass={editor.isActive('code') ? 'is-active' : ''}
          >
            <BsCode size={16} className="fill-zinc-700" />
          </BasicButton>
          <BasicButton
            onClick={setLink}
            isActiveClass={editor.isActive('link') ? 'is-active' : ''}
          >
            <BsLink45Deg size={16} className="fill-zinc-700" />
          </BasicButton>
          <BasicButton
            onClick={() => editor.chain().focus().unsetLink().run()}
            disabled={!editor.isActive('link')}
          >
            <BsSlashLg size={16} className="fill-zinc-700" />
          </BasicButton>
        </div>
      </div>

      <div className="flex gap-1">
        <BasicButton onClick={addImage}>
          <BsCardImage size={16} className="fill-zinc-700" />
        </BasicButton>
        <BasicButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <BsDashLg size={16} className="fill-zinc-700" />
        </BasicButton>
      </div>

      {/* HighLight */}
      <div className="flex flex-col gap-2">
        <p className="text-xs text-zinc-400">HighLight</p>
        <div className="flex gap-3">
          {HIGHLIGHT_COLORS.map((color, index) => (
            <HighLightButton key={index} editor={editor} color={color} />
          ))}
          <button
            onClick={() => editor.chain().focus().unsetHighlight().run()}
            disabled={!editor.isActive('highlight')}
            className="bg-gray-300 rounded-full w-6 h-6 flex justify-center items-center cursor-pointer md:hover:opacity-70"
          >
            <BsSlashLg size={16} />
          </button>
        </div>
      </div>

      {/* Text Color */}
      <div className="flex flex-col gap-2">
        <p className="text-xs text-zinc-400">Text Color</p>
        <div className="flex gap-3 flex-wrap">
          {TEXT_COLORS.map((color, index) => (
            <TextColorButton key={index} editor={editor} color={color} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditorStylingTab;

const BasicButton = ({
  children,
  onClick,
  isActiveClass,
  disabled = false,
}: {
  children: ReactNode;
  onClick: () => void;
  isActiveClass?: string;
  disabled?: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      className={`${isActiveClass} flex justify-center items-center md:hover:bg-opacity-70 flex-grow bg-gray-100 p-2 rounded-md w-full cursor-pointer  ${
        disabled ? 'cursor-not-allowed' : ''
      }`}
      disabled={disabled}
    >
      <div className={` ${disabled ? 'opacity-20' : ''}`}>{children}</div>
    </button>
  );
};

const HighLightButton = ({
  editor,
  color,
}: {
  editor: Editor;
  color: string;
}) => {
  return (
    <button
      onClick={() => editor.chain().focus().toggleHighlight({ color }).run()}
      className={`${
        editor.isActive('highlight', { color }) ? 'is-active' : ''
      } rounded-full overflow-hidden w-6 h-6 cursor-pointer md:hover:opacity-70`}
      style={{ backgroundColor: color }}
    />
  );
};

const TextColorButton = ({
  color,
  editor,
}: {
  color: string;
  editor: Editor;
}) => {
  return (
    <button
      onClick={() => editor.chain().focus().setColor(color).run()}
      className={`${
        editor.isActive('textStyle', { color }) ? 'is-active' : ''
      } rounded-full overflow-hidden w-6 h-6 cursor-pointer md:hover:opacity-70`}
      style={{ backgroundColor: color }}
    />
  );
};

const HeadingButton = ({
  children,
  editor,
  level,
}: {
  children: ReactNode;
  editor: Editor;
  level: Level;
}) => {
  return (
    <button
      onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
      className={`${
        editor.isActive('heading', { level }) ? 'is-active' : ''
      } md:hover:bg-opacity-70 flex-grow bg-gray-100 flex justify-center items-center p-2 rounded-md w-fit cursor-pointer `}
    >
      {children}
    </button>
  );
};
