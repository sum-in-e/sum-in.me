const createClient = require('@supabase/supabase-js').createClient;
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

const { NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY } = process.env;

const supabase = createClient(
  NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const getPostIds = async () => {
  let { data: ids, error } = await supabase
    .from('post')
    .select('id')
    .eq('is_public', true);

  if (error) {
    return Promise.reject(error);
  }

  return ids;
};

const createSitemap = async () => {
  try {
    const postIds = await getPostIds();

    // 게시글 id를 가진 url 배열 생성
    const postUrls = postIds.map(
      (post: { id: number }) =>
        `<url><loc>https://dev.sum-in.me/post/${post.id}</loc></url>`
    );

    // sitemap에 게시글 페이지들 추가
    const sitemap =
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url><loc>https://dev.sum-in.me</loc></url>
        <url><loc>https://dev.sum-in.me/blog</loc></url>
        <url><loc>https://dev.sum-in.me/note</loc></url>
        <url><loc>https://dev.sum-in.me/projects</loc></url>
        <url><loc>https://dev.sum-in.me/projects/linkloud</loc></url>
        <url><loc>https://dev.sum-in.me/projects/sumDev</loc></url>
        ${postUrls.join('\n')}
        </urlset>`.replace(/\n|\t/g, ' ');

    // public 폴더에 sitemap.xml 파일 생성
    await fs.promises.writeFile('public/sitemap.xml', sitemap, {
      encoding: 'utf-8',
    });
  } catch (error) {
    console.error('Error fetching post IDs:', error);
  }
};

createSitemap();
