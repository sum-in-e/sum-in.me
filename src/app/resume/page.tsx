import ContactSection from '@/src/features/resume/containers/ContactSection';
import ExperienceSection from '@/src/features/resume/containers/ExperienceSection';
import IntroduceSection from '@/src/features/resume/containers/IntroduceSection';
import ProjectSection from '@/src/features/resume/containers/ProjectSection';
import SkillSection from '@/src/features/resume/containers/SkillSection';

export const metadata = {
  title: '김수민 | resume',
};

export default function GuestBookPage() {
  return (
    <article className="w-full text-zinc-900 dark:text-zinc-100">
      <header className="mb-2">
        <p className="text-xs text-zinc-400 text-end mb-4">
          Last Updated: 2023.10.27
        </p>
        <h2 className="text-5xl mb-2 font-semibold dark:text-white">김수민</h2>
        <p className="text-md text-zinc-400 dark:text-opacity-90">
          Front-End Engineer
        </p>
      </header>

      <ContactSection />
      <IntroduceSection />
      <ExperienceSection />
      <SkillSection />
      <ProjectSection />
    </article>
  );
}
