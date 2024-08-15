import type { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';
const dotenv = require('dotenv');
dotenv.config();

const { NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY } = process.env;

const supabase = createClient(
  NEXT_PUBLIC_SUPABASE_URL!,
  NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Supabase에서 데이터 가져오기
  let { data: posts, error } = await supabase
    .from('post')
    .select('id, updated_at')
    .eq('is_public', true);

  // 정적 페이지 URL
  const staticPages = ['', '/blog', '/note', '/guestbook'].map((route) => ({
    url: `https://sum-in.me${route}`,
    lastModified: new Date().toISOString(),
  }));

  if (error || !posts) {
    console.error('Error fetching posts:', error);
    return [...staticPages];
  }

  // 동적 포스트 URL
  const dynamicPages = posts.map((post) => ({
    url: `https://sum-in.me/post/${post.id}`,
    lastModified: new Date(post.updated_at).toISOString(),
  }));

  return [...staticPages, ...dynamicPages];
}
