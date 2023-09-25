import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="flex w-full items-center justify-center h-20 text-zinc-700">
      <div className="max-w-screen-md flex items-center md:flex-row flex-col md:justify-between w-full px-4">
        <div className="flex md:gap-4 items-center md:flex-row flex-col">
          <Link
            href="https://github.com/sum-in-e"
            target="_blank"
            className="cursor-pointer  md:hover:underline"
          >
            GitHub
          </Link>
          <p>✉️ suminkim.me@gmail.com</p>
        </div>
        <p className="text-md">© {new Date().getFullYear()} sum-in.me</p>
      </div>
    </footer>
  );
};

export default Footer;
