import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/database.types';
import dayjs from 'dayjs';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: { id: number };
}

export async function generateMetadata({
  params: { id },
}: PageProps): Promise<Metadata> {
  const getPost = async () => {
    const supabase = createServerComponentClient<Database>({ cookies });
    let { data: post, error } = await supabase
      .from('post')
      .select('*')
      .eq('id', id);

    if (!post) {
      return {
        title: 'sumDev',
        description: 'sumDev',
        image:
          'https://res.cloudinary.com/duinj0dld/image/upload/v1695111909/sumDev-cover_c2ptxd.webp',
      };
    }

    const { title, description, cover } = post[0];

    return {
      title,
      description,
      image: cover,
    };
  };

  const { title, description, image } = await getPost();

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: 'https://sum-in-me.vercel.app/',
      type: 'website',
      images: [
        {
          url: image,
          alt: 'sumDev site cover Image',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [
        {
          url: image,
          alt: 'sumDev site cover Image',
        },
      ],
    },
  };
}

export default async function PostDetailPage({ params }: PageProps) {
  const supabase = createServerComponentClient<Database>({ cookies });

  let { data: post, error } = await supabase
    .from('post')
    .select('*')
    .eq('id', params.id);

  if (!post) {
    // TODO: 게시글 없음 UI
    return;
  }

  const { id, title, content, views, is_public, type, created_at } = post[0];

  // Increase views
  await supabase.rpc('increment_views', {
    post_id: id,
  });

  //TODO: is_public false인 게시물이면 로그인된 사람만 볼 수 있게
  // TODO: 목차
  // TODO: 댓글
  // TODO: 게시글별 동적 메타태그 작업 -> 젠체 메타태그랑 같이 일괄 작업
  const createdAt = dayjs(created_at).format('YYYY-MM-DD');

  return (
    <section className="w-full pb-10 md:py-10 flex flex-col gap-5">
      <div>
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        <div className="flex items-center justify-between text-zinc-500 gap-4">
          <span className="text-sm">{createdAt}</span>
          <span className="text-sm">{views} views</span>
        </div>
      </div>
      <div className="content">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </section>
  );
}
