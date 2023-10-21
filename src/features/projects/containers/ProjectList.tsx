'use client';

import ProjectItem from '@/src/features/projects/components/ProjectItem';

const ProjectList = () => {
  return (
    <ul className="flex flex-col gap-10">
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
    src: '/images/projects/linkloud/logo.png',
    alt: 'Linkloud logo',
    path: '/projects/linkloud',
    duration: '2023.08 - present',
  },
  {
    id: 1,
    name: 'sumDev',
    description: '개인 웹사이트',
    url: 'https://dev.sum-in.me',
    src: '/images/projects/sumDev/logo.png',
    alt: 'sumDev logo',
    path: '/projects/sumDev',
    duration: '2023.09 - present',
  },
];
