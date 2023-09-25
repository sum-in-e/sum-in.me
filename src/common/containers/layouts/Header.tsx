'use client';

import Link from 'next/link';
import { User } from '@supabase/auth-helpers-nextjs';
import LogoutButton from '@/src/features/auth/components/LogoutButton';
import Menu from '@/src/common/components/header/MenuItem';
import { usePathname } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface Props {
  user: User | null;
}

const Header = ({ user }: Props) => {
  const pathname = usePathname();

  return (
    <header className="w-full flex justify-center bg-white z-20 fixed h-20 items-center">
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

          {user && (
            <div className="hidden md:flex items-center gap-3">
              <Link href="/post/new" className={`md:hover:underline`}>
                New
              </Link>
              <LogoutButton />
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
