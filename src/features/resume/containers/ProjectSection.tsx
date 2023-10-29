import DiscLi from '@/src/features/resume/components/DiscLi';
import SectionTitle from '@/src/features/resume/components/SectionTitle';
import Link from 'next/link';

const ProjectSection = () => {
  return (
    <section className="mb-14">
      <SectionTitle title="Project" />
      <ul>
        <li>
          <Link
            href="https://linkloud.xyz"
            target="_blank"
            className="font-bold text-2xl underline"
          >
            Linkloud
          </Link>
          <p className="text-sm text-zinc-400">2023.08 - present</p>
          <div className="dark:bg-zinc-700 bg-zinc-100 p-2 mt-3 rounded-sm text-sm">
            나중에 볼 링크를 간편하게 저장하고 관리할 수 있도록 도와주는 서비스
          </div>
          <div className="mt-5">
            <p className="text-lg mb-1 font-semibold">Tech Stack</p>
            <ul>
              <DiscLi>
                Client: Next.js / TypeScript / TailwindCSS / React Query /
                Zustand / PWA / Chrome Extensions
              </DiscLi>
              <DiscLi>Server: Nest.js / MySQL</DiscLi>
              <DiscLi>Deployment: Vercel / Cloudtype</DiscLi>
            </ul>
          </div>
          <div className="mt-5">
            <p className="text-lg mb-1 font-semibold">Description</p>
            <ul>
              <DiscLi>1인 개발 프로젝트</DiscLi>
              <DiscLi>
                서비스를 처음부터 끝까지 직접 만들어보고 싶어서 개발
              </DiscLi>
              <DiscLi>
                나중에 확인하려고 했던 링크를 잊어버리는 문제를 해결하는 것에
                초점을 맞춰 기획 진행
              </DiscLi>
              <DiscLi>
                링크를 저장하고 원하는 카테고리로 분류할 수 있는 테이블 설계 및
                CRUD 구현
              </DiscLi>
              <DiscLi>
                JWT를 이용한 인증 기능 구현 (이메일 / 카카오 로그인)
              </DiscLi>
              <DiscLi>
                링크를 더욱 간편하게 저장할 수 있도록 도움을 주는
                <Link
                  href="https://chrome.google.com/webstore/detail/linkloud/ccmcdofnhlnnhjihdlhnclbnpmimilkc"
                  target="_blank"
                  className="underline mx-1"
                >
                  Chrome-extenstion
                </Link>
                개발
              </DiscLi>
              <DiscLi>
                모바일에서 앱을 사용하는 것과 유사한 경험을 할 수 있도록 PWA로
                구현
              </DiscLi>
              <DiscLi>
                의미 있는 트래픽이 발생하는 서비스가 되지는 않았으나 필요에 의해
                직접 사용하며 개선할 예정
              </DiscLi>
            </ul>
          </div>
        </li>
        <li className="mt-10">
          <Link
            href="https://dev.sum-in.me"
            target="_blank"
            className="font-bold text-2xl underline"
          >
            sumDev
          </Link>
          <p className="text-sm text-zinc-400">2023.09 - present</p>
          <div className="dark:bg-zinc-700 bg-zinc-100 p-2 mt-3 rounded-sm text-sm">
            개발에 관련된 기록을 남기는 개인 웹 사이트
          </div>
          <div className="mt-5">
            <p className="text-lg mb-1 font-semibold">Tech Stack</p>
            <ul>
              <DiscLi>
                Client: Next.js / TypeScript / TailwindCSS / React Query /
                Zustand
              </DiscLi>
              <DiscLi>Server: Supabase</DiscLi>
              <DiscLi>Deployment: Vercel</DiscLi>
            </ul>
          </div>
          <div className="mt-5">
            <p className="text-lg mb-1 font-semibold">Description</p>
            <ul>
              <DiscLi>
                다른 블로그 플랫폼들이 기호에 맞지 않아서 기록을 위해 직접 개발
              </DiscLi>
            </ul>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default ProjectSection;
