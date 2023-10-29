import SectionTitle from '@/src/features/resume/components/SectionTitle';

const SkillSection = () => {
  return (
    <section className="mb-14">
      <SectionTitle title="Skill" />
      <ul>
        <li className="list-disc ml-5 mb-1">
          Front-End: JavaScript, TypeScript, React.js, Next.js, HTML/CSS
        </li>
        <li className="list-disc ml-5 mb-1">Back-End: Node.js, Nest.js</li>
      </ul>
    </section>
  );
};

export default SkillSection;
