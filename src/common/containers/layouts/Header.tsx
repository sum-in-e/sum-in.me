'use client';

import Link from 'next/link';
import { User } from '@supabase/auth-helpers-nextjs';
import { usePathname } from 'next/navigation';
import { CgDarkMode } from 'react-icons/cg';
import { useTheme } from 'next-themes';
import LogoutButton from '@/src/features/auth/components/LogoutButton';
import Menu from '@/src/common/components/header/MenuItem';

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
    <header className="w-full flex justify-center bg-inherit z-20 fixed h-20 items-center">
      <div className="max-w-screen-md w-full px-4">
        <nav className="w-full flex justify-between">
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
              <div className="hidden md:flex items-center gap-3">
                <Link
                  href="/post/new"
                  className={`md:hover:underline dark:text-white`}
                >
                  New
                </Link>
                <LogoutButton />
              </div>
            )}
            <button
              onClick={() => setMode()}
              className={`p-2 md:hover:bg-zinc-100 dark:md:hover:bg-opacity-10 rounded-lg`}
            >
              <CgDarkMode size={20} />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
