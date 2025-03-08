'use client';

interface Props {
  label: string;
  count?: number;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function Tag({ label, count, isSelected, onClick }: Props) {
  return (
    <li
      onClick={onClick}
      className={`h-fit shrink-0 cursor-pointer rounded-full border border-zinc-400 px-3 py-1 text-sm text-zinc-800 transition-colors dark:text-zinc-200 dark:hover:bg-opacity-20 md:hover:bg-opacity-50 ${
        isSelected ? 'bg-zinc-200 dark:bg-opacity-20' : ''
      }`}
    >
      {count !== undefined ? `${label} (${count})` : label}
    </li>
  );
}
