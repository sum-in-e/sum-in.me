import Image from 'next/image';
import Link from 'next/link';
import { BsArrowRightShort } from 'react-icons/bs';
import cover from '/public/images/projects/linkloud/linkloud_main.webp';

export default async function ProjectLinkloudPage() {
  return (
    <section>
      <h2 className="text-4xl font-bold dark:text-white">Linkloud</h2>
      <p className="text-right text-xs italic">2023.08 - present</p>
      <Image
        src={cover}
        alt="Linkloud Cover Image"
        className="w-full h-auto object-contain rounded-lg overflow-hidden shadow-lg my-10"
      />
      <div className="flex justify-end">
        <Link
          href="https://linkloud.xyz"
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
      <article className="mt-10">
        <h4 className="text-xl font-semibold dark:text-white">소개</h4>
        <hr className="mt-2 mb-5 dark:border-zinc-700" />
        <div className="text-zinc-700 flex flex-col gap-3 dark:text-zinc-300">
          <p>Linkloud는 나중에 볼 링크들을 저장하고 관리하는 서비스입니다.</p>
          <p>
            출·퇴근길에 발견한 관심 있는 글을 나중에 확인하기 위해 임시로
            카카오톡 내게 보내기에 저장해 두거나, 브라우저의 자체 북마크 기능을
            이용해 저장하고 확인하지 않아 잊혀 가는 게 안타까웠습니다. 확인하면
            분명 나에게 도움이 될 정보들인데 왜 그렇게 쉽게 잊어버리고 마는
            건지. 이렇게 저장한 링크를 확인할 수 있도록 도와주는 서비스가 있다면
            좋겠다는 생각이 들어 Linkloud를 만들게 되었습니다.
          </p>
          <p>
            사실 링크를 저장하고 관리하는 올인원 북마크 서비스들(Pocket,
            Raindrop 등)은 이미 존재하고 있습니다. 심지어 많은 사용자를 보유하고
            있고 유료 서비스까지 제공하고 있는 이 프로덕트들은 모두 링크를
            저장하고 관리하는 데에 있어 강력한 기능들을 가지고 있습니다.
            Linkloud가 이 서비스들과 어떤 차별화를 둘 수 있을까 고민했고,
            결과적으로 이 서비스가 필요하게 된 계기에 집중해야겠다는 생각이
            들었습니다.
          </p>
          <strong className="mt-3">
            {`"사람들이 저장한 링크를 잊지 않고 확인하여 정보를 얻을 수 있도록
            도와주는 것"`}
          </strong>
          <p>
            단순한 링크 관리를 넘어서 사용자가 어떤 링크를 확인하지 않았는지,
            저장한 링크를 어떻게 확인하게 만들지를 고민합니다. 사용자가 링크를
            관리하는 데에 들여야하는 시간과 노력을 줄이고 필요한 정보를 습득할
            수 있도록 돕는 서비스를 목표로 하고 있습니다.
          </p>
        </div>
      </article>
      <article className="mt-16">
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
      </article>
    </section>
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
      'PWA',
      'Chrome Extensions',
    ],
  },
  { title: 'Server', stacks: ['NestJS', 'MySQL'] },
  { title: 'Deployment', stacks: ['Vercel', 'Cloudtype'] },
];

const title = 'Project | Linkloud';
const description = '나중에 볼 링크들을 저장하고 관리하는 서비스';
const coverUrl =
  'https://res.cloudinary.com/dqcgvbbv7/image/upload/f_auto,q_auto/v1/linkloud/emtygeehcgigfn9wlhw3';

export const metadata = {
  title,
  description,
  keywords: 'sumDev, sum-in.me, linkloud',
  metadataBase: new URL('https://dev.sum-in.me/projects/linkloud'),
  openGraph: {
    title,
    description,
    url: 'https://dev.sum-in.me/projects/linkloud',
    type: 'website',
    images: [
      {
        url: coverUrl,
        alt: 'Linkloud Cover Image',
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
        alt: 'Linkloud Cover Image',
      },
    ],
  },
};
