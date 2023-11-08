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
          className="underline text-xl font-bold"
        >
          break market
        </Link>
        <ul className="mt-2">
          <DiscLi>유저간 트레이딩 카드 거래를 중개하는 마켓 서비스</DiscLi>
          <DiscLi>서비스 신규 개발 및 오픈</DiscLi>
          <DiscLi>
            메인 페이지 / 판매자별 등록 상품 확인 페이지 / 장바구니 / 주문 내역
            페이지 개발을 맡아서 진행
            <ul className="mt-1">
              <DiscLi>
                UI를 최소 단위로 나누어 컴포넌트화하여 재사용성을 높이고자
                하였습니다.
              </DiscLi>
              <DiscLi>
                Context API를 활용하여 컴포넌트 내에서 상태를 공유할 수 있도록
                하였습니다.
              </DiscLi>
            </ul>
          </DiscLi>
        </ul>
      </li>
      <li>
        <span>
          <Link
            href="https://tw.brgcard.com/"
            target="_blank"
            className="underline text-xl font-bold mr-1"
          >
            brg taiwan
          </Link>
          (대만 서비스)
        </span>
        <ul className="mt-2">
          <DiscLi>
            brg 대만 서비스의 어드민 기획
            <ul className="mt-1">
              <DiscLi>
                운영팀과의 커뮤니케이션을 토대로 brg 대만 서비스를 통해 들어오는
                주문의 입/출고를 어드민에서 전체 관리할 수 있도록 기획을 진행
              </DiscLi>
            </ul>
          </DiscLi>
          <DiscLi>
            brg 대만 서비스의 어드민 개발
            <ul className="mt-1">
              <DiscLi>
                프론트 개발의 약 70%를 혼자 진행하였고 이후 나머지는 프론트 리드
                개발자와 함께 작업 진행
              </DiscLi>
            </ul>
          </DiscLi>
        </ul>
      </li>
      <li>
        <span>
          <Link
            href="https://brgcard.com/"
            target="_blank"
            className="underline text-xl font-bold mr-1"
          >
            brg global
          </Link>
          (영문 사이트)
        </span>
        <ul className="mt-2">
          <DiscLi>
            모노레포 프로젝트의 CI/CD 배포 자동화 작업 진행
            <ul className="mt-1">
              <DiscLi>
                global 디렉토리에 변경사항 발생 시 global 프로젝트만 global
                도메인에 배포 되도록 프로덕션 자동 배포 환경을 구축
              </DiscLi>
            </ul>
          </DiscLi>
        </ul>
      </li>
      <li>
        <span>
          <Link
            href="https://jp.brgcard.com/"
            target="_blank"
            className="underline text-xl font-bold mr-1"
          >
            brg Japan
          </Link>
          (일본 사이트)
        </span>
        <ul className="mt-2">
          <DiscLi>brg 일본 사이트 UI 작업 전체 진행 (반응형)</DiscLi>
        </ul>
      </li>
      <li>
        <span>
          <Link
            href="https://break.co.kr/"
            target="_blank"
            className="underline text-xl font-bold mr-1"
          >
            brg Korea
          </Link>
          (한국 서비스 - 메인)
        </span>
        <ul className="mt-2">
          <DiscLi>
            {`React.js/RTK Query -> Next.js/React Query 마이그레이션`}
            <ul className="mt-1">
              <DiscLi>
                프론트 리드 개발자 주도 하에 파트를 나눠 총 세 명의 프론트
                개발자가 점진적으로 진행
              </DiscLi>
            </ul>
          </DiscLi>
        </ul>
      </li>
    </ul>
  );
};

const GuardianDetail = () => {
  return (
    <ul>
      <DiscLi>웹 가상 자산 거래소 유지보수</DiscLi>
    </ul>
  );
};

export type ExperienceType = {
  name: string;
  description: string;
  skill: string;
  href: string;
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
    href: 'https://break.co.kr/',
    position: 'Front-End Engineer',
    period: '2022.06~2023.04',
    detail: <BreakAndCompanyDetail />,
  },
  {
    name: '가디언홀딩스',
    description: '가상 자산 거래소 스타트업',
    skill: 'React.js / TypeScript',
    href: 'https://oasisexc.com/',
    position: 'Front-End Engineer',
    period: '2022.05~2022.06',
    detail: <GuardianDetail />,
  },
];
