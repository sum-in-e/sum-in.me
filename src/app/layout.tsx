import './globals.css';

import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/database.types';
import Footer from '@/src/common/containers/layouts/Footer';
import Header from '@/src/common/containers/layouts/Header';
import ThemeProviders from '@/src/common/containers/ThemeProviders';
import { ReactNode } from 'react';
import GoogleAnalytics from '@/src/common/containers/GoogleAnalytics';
import QueryProvider from '@/src/common/containers/QueryProvider';

export const dynamic = 'force-dynamic';

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const isProduction = process.env.NEXT_PUBLIC_MODE === 'production';

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en">
      {isProduction && <GoogleAnalytics />}
      <body className="bg-white dark:bg-zinc-900">
        <QueryProvider>
          <ThemeProviders>
            <Header user={user} />
            <div className="min-h-screen flex flex-col justify-between gap-10">
              <main className="flex justify-center">
                <div className="max-w-screen-md flex flex-col items-center px-4 py-4 w-full mt-20">
                  {children}
                </div>
              </main>
              <Footer />
            </div>
          </ThemeProviders>
        </QueryProvider>
      </body>
    </html>
  );
}

const title = 'sumDev';
const description = 'Front-end Developer, Becoming a solo engineer';
const coverUrl =
  'https://res.cloudinary.com/duinj0dld/image/upload/v1695111909/dev.sum-in.me/sumDev-cover.webp';

export const metadata = {
  title,
  description,
  keywords: 'sumDev, sum-in.me',
  metadataBase: new URL('https://dev.sum-in.me/'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title,
    description,
    url: 'https://dev.sum-in.me/',
    type: 'website',
    images: [
      {
        url: coverUrl,
        alt: 'sumDev site cover Image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [
      {
        url: coverUrl,
        alt: 'sumDev site cover Image',
      },
    ],
  },
};
