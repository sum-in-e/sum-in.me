'use client';

import Link from 'next/link';
import { useState } from 'react';

const ContactSection = () => {
  const [isCopied, setIsCopied] = useState(false);
  const email = 'suminkim.me@gmail.com';

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setIsCopied(true);

      // 복사 상태를 1초 후에 원래 상태로 되돌립니다.
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <section className="flex gap-1 mb-10">
      <button
        onClick={handleCopyClick}
        className="reset-button bg-black dark:bg-white dark:text-black text-white md:hover:opacity-80 px-2 py-1 rounded-md text-xs w-fit"
      >
        {`E-mail ${isCopied ? 'copied✅' : ''}`}
      </button>
      <ContactChannelButton href="https://dev.sum-in.me" text="Web" />
      <ContactChannelButton href="https://github.com/sum-in-e" text="GitHub" />
      <ContactChannelButton
        href="https://www.linkedin.com/in/sum-in-e/"
        text="LinkedIn"
      />
    </section>
  );
};

export default ContactSection;

const ContactChannelButton = ({
  href,
  text,
}: {
  href: string;
  text: string;
}) => {
  return (
    <Link
      href={href}
      target="_blank"
      className="reset-button bg-black dark:bg-white dark:text-black text-white md:hover:opacity-80 px-2 py-1 rounded-md text-xs w-fit"
    >
      {text}
    </Link>
  );
};
