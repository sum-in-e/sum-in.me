import SectionTitle from '@/src/features/resume/components/SectionTitle';
import ExperienceItem from '@/src/features/resume/containers/ExperienceSection/ExperienceItem';
import { experiences } from '@/src/features/resume/containers/ExperienceSection/Experiences';

const ExperienceSection = () => {
  return (
    <section className="mb-14">
      <SectionTitle title="Experience" />
      <ul className="flex flex-col gap-16">
        {experiences.map((experience, index) => (
          <ExperienceItem key={index} {...experience} />
        ))}
      </ul>
    </section>
  );
};

export default ExperienceSection;
