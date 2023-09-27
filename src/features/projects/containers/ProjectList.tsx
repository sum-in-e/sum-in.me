import ProjectItem from '@/src/features/projects/components/ProjectItem';

const ProjectList = () => {
  return (
    <ul>
      {projects.map((project) => (
        <ProjectItem key={project.id} {...project} />
      ))}
    </ul>
  );
};

export default ProjectList;

const projects = [
  {
    id: 0,
    name: 'Linkloud',
    description:
      '나중에 볼 링크를 간편하게 저장하고 관리할 수 있도록 도와주는 서비스',
    url: 'https://linkloud.xyz',
    path: '/projects/linkloud',
    duration: '2023 - present',
  },
];
