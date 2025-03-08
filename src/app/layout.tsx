import './globals.css';

import Footer from '@/src/common/containers/layouts/Footer';
import Header from '@/src/common/containers/layouts/Header';
import ThemeProviders from '@/src/common/containers/ThemeProviders';
import { ReactNode } from 'react';
import GoogleAnalytics from '@/src/common/containers/GoogleAnalytics';
import QueryProvider from '@/src/common/containers/QueryProvider';
import GoogleAds from '@/src/common/containers/GoogleAds';
import { createClient } from '@/src/utils/supabase/server';
import { cn } from '@/src/common/modules/utils/cn';

export const dynamic = 'force-dynamic';

const isProduction = process.env.NEXT_PUBLIC_MODE === 'production';

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en" suppressHydrationWarning>
      {isProduction && (
        <>
          <GoogleAnalytics />
          <GoogleAds />
        </>
      )}
      <body className={cn('min-h-screen bg-background font-sans antialiased')}>
        <QueryProvider>
          <ThemeProviders>
            <Header user={user} />
            <div className="flex min-h-screen flex-col justify-between gap-10">
              <main className="flex justify-center">
                <div className="mt-20 flex w-full max-w-screen-md flex-col items-center px-4 py-4">
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
  metadataBase: new URL('https://sum-in.me/'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title,
    description,
    url: 'https://sum-in.me/',
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
