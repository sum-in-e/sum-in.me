const SectionTitle = ({ title }: { title: string }) => {
  return (
    <h3 className="text-3xl mb-4 text-zinc-400 font-semibold dark:text-zinc-300">
      {title}
    </h3>
  );
};

export default SectionTitle;
