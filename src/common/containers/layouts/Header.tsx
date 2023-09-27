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

  return (
    <header className="w-full flex justify-center bg-inherit z-20 fixed h-20 items-center">
      <div className="max-w-screen-md w-full px-4">
        <nav className="w-full flex justify-between">
          <div className="flex items-center gap-4">
            <Menu path="/" name="Home" isActive={pathname === '/'} />
            <Menu path="/blog" name="Blog" isActive={pathname === '/blog'} />
            <Menu path="/note" name="Note" isActive={pathname === '/note'} />
            <Menu
              path="/products"
              name="Products"
              isActive={pathname.includes('/products')}
            />
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
              className={`rounded-md p-2 border-2 border-zinc-300`}
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
