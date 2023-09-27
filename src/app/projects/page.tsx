import ProjectList from '@/src/features/projects/containers/ProjectList';

export default async function ProjectsPage() {
  return (
    <section className="w-full">
      <h2 className="text-4xl mb-10 font-bold dark:text-white">Projects</h2>
      <ProjectList />
    </section>
  );
}
