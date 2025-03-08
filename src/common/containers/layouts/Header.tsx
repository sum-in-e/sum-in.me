'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CgDarkMode } from 'react-icons/cg';
import { useTheme } from 'next-themes';
import LogoutButton from '@/src/features/auth/components/LogoutButton';
import Menu from '@/src/common/components/header/MenuItem';
import { User } from '@supabase/supabase-js';

interface Props {
  user: User | null;
}

const Header = ({ user }: Props) => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const setMode = () => {
    const mode = theme === 'dark' ? 'light' : 'dark';
    setTheme(mode);
  };

  const menus = [
    { path: '/', name: 'Home', isActive: pathname === '/' },
    { path: '/blog', name: 'Blog', isActive: pathname === '/blog' },
    { path: '/note', name: 'Note', isActive: pathname === '/note' },
    {
      path: '/guestbook',
      name: 'GuestBook',
      isActive: pathname === '/guestbook',
    },
  ];

  return (
    <header className="fixed z-20 flex h-20 w-full items-center justify-center bg-inherit">
      <div className="w-full max-w-screen-md px-4">
        <nav className="flex w-full justify-between">
          <div className="flex items-center gap-4">
            {menus.map((menu) => (
              <Menu
                key={menu.name}
                path={menu.path}
                name={menu.name}
                isActive={menu.isActive}
              />
            ))}
          </div>
          <div className="flex gap-3">
            {user && (
              <div className="hidden items-center gap-3 md:flex">
                <Link
                  href="/post/new"
                  className={`dark:text-white md:hover:underline`}
                >
                  New
                </Link>
                <LogoutButton />
              </div>
            )}
            {/* <button
              onClick={() => setMode()}
              className={`rounded-lg p-2 md:hover:bg-zinc-100 dark:md:hover:bg-opacity-10`}
            >
              <CgDarkMode size={20} />
            </button> */}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
