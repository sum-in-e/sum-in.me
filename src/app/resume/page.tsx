import ContactSection from '@/src/features/resume/containers/ContactSection';
import ExperienceSection from '@/src/features/resume/containers/ExperienceSection';
import IntroduceSection from '@/src/features/resume/containers/IntroduceSection';
import ProjectSection from '@/src/features/resume/containers/ProjectSection';
import SkillSection from '@/src/features/resume/containers/SkillSection';
import { redirect } from 'next/navigation';

export default function GuestBookPage() {
  redirect(
    'https://drive.google.com/file/d/1EeYRqXvIQgaqfGEV-opqeYw5mjXcz8_g/view?usp=sharing'
  );

  return (
    <article className="w-full text-zinc-900 dark:text-zinc-100">
      <header className="mb-2">
        <p className="text-xs text-zinc-400 text-end mb-4">
          Last Updated: 2023.11.15
        </p>
        <h2 className="text-5xl mb-2 font-semibold dark:text-white">김수민</h2>
        <p className="text-md text-zinc-400 dark:text-opacity-90">
          Front-End Engineer
        </p>
      </header>

      <ContactSection />
      <IntroduceSection />
      <ExperienceSection />
      <ProjectSection />
      <SkillSection />
    </article>
  );
}

const title = '김수민 | resume';
const description = 'Front-End Engineer';
const coverUrl =
  'https://res.cloudinary.com/duinj0dld/image/upload/v1698549670/dev.sum-in.me/resume-cover_mvjipa.webp';

export const metadata = {
  title,
  description,
  keywords: 'resume, sumDev, SuminKim',
  metadataBase: new URL('https://dev.sum-in.me/resume'),
  openGraph: {
    title,
    description,
    url: 'https://dev.sum-in.me/resume',
    type: 'website',
    images: [
      {
        url: coverUrl,
        alt: 'Resume Cover Image',
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
        alt: 'Resume Cover Image',
      },
    ],
  },
};
