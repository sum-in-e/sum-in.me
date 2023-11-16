import DiscLi from '@/src/features/resume/components/DiscLi';
import SectionTitle from '@/src/features/resume/components/SectionTitle';
import Link from 'next/link';

const ProjectSection = () => {
  return (
    <section className="mb-14">
      <SectionTitle title="Project" />
      <ul>
        <li className="mb-10">
          <Link
            href="https://dev.sum-in.me"
            target="_blank"
            className="font-bold text-2xl hyperlink"
          >
            sumDev
          </Link>
          <p className="text-sm text-zinc-400">운영 중(2023.09 - present)</p>
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
        <li>
          <Link
            href="https://linkloud.xyz"
            target="_blank"
            className="font-bold text-2xl hyperlink"
          >
            Linkloud
          </Link>
          <p className="text-sm text-zinc-400">운영 중(2023.08 - present)</p>
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
              <DiscLi>1인 개발</DiscLi>
              <DiscLi>
                나중에 확인하려고 저장했던 링크를 잊어버리는 문제를 해결함으로써
                필요한 정보를 얻을 수 있도록 하는 것에 목적을 두었습니다.
              </DiscLi>
              <DiscLi>
                링크를 저장하고 원하는 카테고리로 분류할 수 있는 테이블 설계 및
                CRUD 구현
              </DiscLi>
              <DiscLi>
                JWT를 이용한 인증 기능 구현 (이메일 /
                <Link
                  href="https://dev.sum-in.me/post/81"
                  target="_blank"
                  className="hyperlink mx-1"
                >
                  카카오 로그인
                </Link>
                )
              </DiscLi>
              <DiscLi>
                링크를 더욱 간편하게 저장할 수 있도록
                <Link
                  href="https://chrome.google.com/webstore/detail/linkloud/ccmcdofnhlnnhjihdlhnclbnpmimilkc"
                  target="_blank"
                  className="hyperlink ml-1"
                >
                  Chrome-extenstion
                </Link>
                개발
                <ul className="mt-1">
                  <DiscLi>
                    [트러블 슈팅]
                    <Link
                      href="https://dev.sum-in.me/post/80"
                      target="_blank"
                      className="hyperlink ml-1"
                    >
                      크롬 익스텐션 앱에서 서버로 액세스토큰이 담긴 쿠키가
                      전송되지 않는 이슈
                    </Link>
                  </DiscLi>
                </ul>
              </DiscLi>
              <DiscLi>
                앱 사용과 유사한 경험을 할 수 있도록 PWA 구현
                <ul className="mt-1">
                  <DiscLi>
                    [트러블 슈팅]
                    <Link
                      href="https://dev.sum-in.me/post/63"
                      target="_blank"
                      className="hyperlink ml-1"
                    >
                      PWA 앱을 닫으면 로그인이 유지되지 않는 이슈
                    </Link>
                  </DiscLi>
                </ul>
              </DiscLi>
              <DiscLi>디자인 및 기능 개선을 통해 계속 확장할 예정</DiscLi>
            </ul>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default ProjectSection;
