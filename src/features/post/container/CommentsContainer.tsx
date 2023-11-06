'use client';

import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

const CommentsContainer = () => {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { theme: currentTheme } = useTheme();

  const theme = currentTheme === 'light' ? 'light' : 'dark';

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return;

    const scriptElem = document.createElement('script');
    scriptElem.src = 'https://giscus.app/client.js';
    scriptElem.async = true;
    scriptElem.crossOrigin = 'anonymous';

    scriptElem.setAttribute('data-repo', 'sum-in-e/sumDev-comments');
    scriptElem.setAttribute('data-repo-id', 'R_kgDOKpwo8w');
    scriptElem.setAttribute('data-category', 'General');
    scriptElem.setAttribute('data-category-id', 'DIC_kwDOKpwo884CateJ');
    scriptElem.setAttribute('data-mapping', 'pathname');
    scriptElem.setAttribute('data-strict', '0');
    scriptElem.setAttribute('data-reactions-enabled', '1');
    scriptElem.setAttribute('data-emit-metadata', '0');
    scriptElem.setAttribute('data-input-position', 'bottom');
    scriptElem.setAttribute('data-theme', theme);
    scriptElem.setAttribute('data-lang', 'en');

    ref.current.appendChild(scriptElem);
  }, [theme]);

  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>(
      'iframe.giscus-frame'
    );
    iframe?.contentWindow?.postMessage(
      { giscus: { setConfig: { theme, term: pathname } } },
      'https://giscus.app'
    );
  }, [pathname, theme]);

  return <section ref={ref} className="w-full" />;
};

export default CommentsContainer;
