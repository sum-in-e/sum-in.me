'use client';

import Link from 'next/link';

const Menu = ({
  path,
  name,
  isActive,
}: {
  path: string;
  name: string;
  isActive: boolean;
}) => {
  return (
    <Link
      href={path}
      className={`md:hover:underline ${
        isActive ? 'dark:text-white' : 'text-zinc-400 '
      }`}
    >
      {name}
    </Link>
  );
};
export default Menu;
