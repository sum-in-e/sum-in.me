import { ExperienceType } from '@/src/features/resume/containers/ExperienceSection/Experiences';

const ExperienceItem = ({
  name,
  position,
  period,
  description,
  skill,
  detail,
}: ExperienceType) => {
  return (
    <li className="flex gap-2 flex-col md:flex-row">
      <div className="md:min-w-[30%] md:max-w-[30%]">
        <h4 className="font-bold text-2xl"> {name}</h4>
        <p className="text-zinc-400 dark:text-opacity-90">{position}</p>
        <p className="text-sm">{period}</p>
      </div>
      <div className="flex-grow">
        <div className="dark:bg-zinc-700 bg-zinc-100 p-2 mb-5 rounded-sm text-sm">
          {description}
          <hr className="my-2" />
          {skill}
        </div>
        {detail}
      </div>
    </li>
  );
};

export default ExperienceItem;
