import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private-post',
    },
    sitemap: 'https://sum-in.me/sitemap.xml',
  };
}
