import Header from '@/src/common/containers/layouts/Header';
import './globals.css';

import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/database.types';
import Footer from '@/src/common/containers/layouts/Footer';

export const dynamic = 'force-dynamic';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body>
        <Header user={user} />
        <div className="min-h-screen flex flex-col justify-between gap-10">
          <main className="flex justify-center">
            <div className="max-w-screen-md flex flex-col items-center px-4 py-4 w-full mt-20">
              {children}
            </div>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

const title = 'sumDev';
const description = 'Front-end Developer, Becoming a solo engineer';
const coverUrl =
  'https://res.cloudinary.com/duinj0dld/image/upload/v1695111909/sumDev-cover_c2ptxd.webp';

export const metadata = {
  title,
  description,
  keywords: 'sumDev, sum-in.me',
  metadataBase: new URL('https://linkloud.xyz'), // TODO: 수정
  alternates: {
    canonical: '/',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    viewportFit: 'contain',
  },
  openGraph: {
    title,
    description,
    url: 'https://linkloud.xyz', // TODO: 수정
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
