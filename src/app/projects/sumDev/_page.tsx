import Image from 'next/image';
import Link from 'next/link';
import { BsArrowRightShort } from 'react-icons/bs';
import cover from '/public/images/projects/sumDev/sumDev_main.webp';

export default async function ProjectSumDevPage() {
  return (
    <article>
      <h2 className="text-4xl font-bold dark:text-white">sumDev</h2>
      <p className="text-right text-xs italic">2023.09 - present</p>
      <Image
        src={cover}
        alt="SumDev Cover Image"
        className="w-full h-auto object-contain rounded-lg overflow-hidden shadow-lg my-10"
      />
      <div className="flex justify-end">
        <Link
          href="https://sum-in.me"
          target="_blank"
          className="rounded-md group flex items-center"
        >
          <span className="text-zinc-600 md:group-hover:text-black dark:text-zinc-300 dark:md:group-hover:text-zinc-200">
            View Project
          </span>
          <BsArrowRightShort
            size={25}
            className="fill-zinc-600 md:group-hover:fill-black dark:fill-zinc-300 dark:md:group-hover:fill-zinc-200"
          />
        </Link>
      </div>
      <section className="mt-10">
        <h4 className="text-xl font-semibold dark:text-white">소개</h4>
        <hr className="mt-2 mb-5 dark:border-zinc-700" />
        <div className="text-zinc-700 flex flex-col gap-3 dark:text-zinc-300">
          <p>
            개발하며 알게 된 것들과 프로젝트를 기록하는 개인 웹사이트입니다.
          </p>
        </div>
      </section>
      <section className="mt-16">
        <h4 className="text-xl font-semibold dark:text-white">기술 스택</h4>
        <hr className="mt-2 mb-5 dark:border-zinc-700" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {techStacks.map((item, index) => (
            <div key={index}>
              <h5 className="text-lg font-semibold mb-3 dark:text-zinc-100">
                {item.title}
              </h5>
              <ul className="flex flex-col gap-1">
                {item.stacks.map((stack, index) => (
                  <li
                    key={index}
                    className="text-zinc-700 dark:text-zinc-300"
                  >{`· ${stack}`}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}

const techStacks = [
  {
    title: 'Client',
    stacks: [
      'NextJS',
      'TypeScript',
      'Tailwind CSS',
      'React Query(TanStack Query)',
      'Zustand',
    ],
  },
  { title: 'Server', stacks: ['Supabase'] },
  { title: 'Deployment', stacks: ['Vercel'] },
];

const title = 'Project | sumDev';
const description = `Sumin's 개인 웹사이트`;
const coverUrl =
  'https://res.cloudinary.com/duinj0dld/image/upload/v1695111909/dev.sum-in.me/sumDev-cover.webp';

export const metadata = {
  title,
  description,
  keywords: 'sumDev, sum-in.me',
  metadataBase: new URL('https://sum-in.me/projects/sumDev'),
  openGraph: {
    title,
    description,
    url: 'https://sum-in.me/projects/sumDev',
    type: 'website',
    images: [
      {
        url: coverUrl,
        alt: 'SumDev Cover Image',
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
        alt: 'SumDev Cover Image',
      },
    ],
  },
};
