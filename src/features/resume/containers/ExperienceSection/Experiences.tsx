import DiscLi from '@/src/features/resume/components/DiscLi';
import Link from 'next/link';
import { ReactNode } from 'react';

const BreakAndCompanyDetail = () => {
  return (
    <ul className="flex flex-col gap-7">
      <li>
        <Link
          href="https://market.break.co.kr/"
          target="_blank"
          className="hyperlink text-xl font-bold"
        >
          break market
        </Link>
        <ul className="mt-2">
          <DiscLi>
            유저간 트레이딩 카드 거래를 중개하는 플랫폼의 신규 개발
            <ul className="mt-1">
              <DiscLi>
                메인 페이지 / 판매자별 등록 상품 확인 페이지 / 장바구니 / 주문
                내역 페이지 개발 담당
              </DiscLi>
              <DiscLi>
                UI를 최소 단위로 나누어 컴포넌트화하고 해당 컴포넌트를 조립해 큰
                컴포넌트를 만드는 방식으로 재사용성을 높이고자 하였습니다.
              </DiscLi>
            </ul>
          </DiscLi>
        </ul>
      </li>
      <li>
        <span className="text-xl font-bold">brg</span>
        <ul className="mt-2">
          <DiscLi>
            vercel을 통해 호스팅하는 모노레포에서 특정 디렉토리에 수정사항 발생
            시 해당 도메인만 배포되도록 GitHub Actions를 이용하여 배포 자동화
            프로세스 개선
          </DiscLi>
          <DiscLi>
            <Link
              href="https://tw.brgcard.com/"
              target="_blank"
              className="hyperlink"
            >
              brg 대만 서비스
            </Link>
            의 어드민 기획 및 개발 담당
            <ul className="mt-1">
              <DiscLi>
                대만 주문의 입/출고를 자사 어드민에서 관리하고 프로세스를 진행할
                수 있도록 운영팀과 직접 커뮤니케이션하며 기획 진행
              </DiscLi>
              <DiscLi>
                직접 진행한 기획을 바탕으로 프론트엔드 파트 작업의 약 70% 기여
              </DiscLi>
            </ul>
          </DiscLi>
          <DiscLi>
            <Link
              href="https://jp.brgcard.com/"
              target="_blank"
              className="hyperlink mr-1"
            >
              brg 일본 사이트
            </Link>
            UI(반응형) 작업 전체 진행
          </DiscLi>
          <DiscLi>
            <Link
              href="https://break.co.kr/"
              target="_blank"
              className="hyperlink mr-1"
            >
              brg 한국 서비스
            </Link>
            {`기술 스택 React.js/RTK Query -> Next.js/React Query 마이그레이션에 참여`}
          </DiscLi>
        </ul>
      </li>
    </ul>
  );
};

const GuardianDetail = () => {
  return (
    <ul>
      <DiscLi>웹 가상 자산 거래소 Oasis 서비스 유지보수</DiscLi>
    </ul>
  );
};

export type ExperienceType = {
  name: string;
  description: string;
  skill: string;
  position: string;
  period: string;
  detail: ReactNode;
};

export const experiences: ExperienceType[] = [
  {
    name: '브레이크앤컴퍼니',
    description:
      '트레이딩 카드의 상태를 확인하여 카드에 등급을 부여하고, 케이싱을 통해 반영구적 보존이 가능하도록 하는 그레이딩 서비스를 제공하는 스타트업',
    skill:
      'React.js / Next.js / TypeScript / React Query(TanStack Query) / Recoil / Emotion / MUI / Vercel',
    position: 'Front-End Engineer',
    period: '2022.06~2023.04',
    detail: <BreakAndCompanyDetail />,
  },
  {
    name: '가디언홀딩스',
    description: '가상 자산 거래소 스타트업',
    skill: 'React.js / TypeScript',
    position: 'Front-End Engineer',
    period: '2022.05~2022.06',
    detail: <GuardianDetail />,
  },
];
