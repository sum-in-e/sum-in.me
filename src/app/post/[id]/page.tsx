import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/database.types';
import dayjs from 'dayjs';
import { Metadata } from 'next';
import PostItem from '@/src/features/postList/components/PostItem';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: { id: number };
}

export async function generateMetadata({
  params: { id },
}: PageProps): Promise<Metadata> {
  const getPost = async () => {
    const supabase = createServerComponentClient<Database>({ cookies });
    let { data: post } = await supabase.from('post').select('*').eq('id', id);

    if (!post || post?.length === 0) {
      return {
        title: 'sumDev',
        description: 'Front-end Developer, Becoming a solo engineer',
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
    metadataBase: new URL(`https://dev.sum-in.me/post/${id}`),
    openGraph: {
      title,
      description,
      url: `https://dev.sum-in.me/post/${id}`,
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

  let { data: post } = await supabase
    .from('post')
    .select('*')
    .eq('id', params.id);

  if (!post || post.length === 0) {
    let { data: suggestedPosts } = await supabase
      .from('post')
      .select('*')
      .order('views', { ascending: false })
      .limit(5);

    return (
      <div className="w-full">
        <div className="w-full flex justify-center items-center px-5 py-10 mb-10 bg-zinc-100 dark:bg-opacity-10 rounded-md">
          <h3 className="text-lg text-zinc-800 dark:text-zinc-200">
            존재하지 않는 게시글입니다.
          </h3>
        </div>
        {suggestedPosts && suggestedPosts?.length > 0 && (
          <>
            <h4 className="text-xl font-semibold mb-8">
              이런 글은 어떠세요?👀
            </h4>
            <ul className="flex flex-col gap-10">
              {suggestedPosts?.map((post) => (
                <PostItem key={post.id} {...post} />
              ))}
            </ul>
          </>
        )}
      </div>
    );
  }

  const { id, title, content, views, is_public, type, created_at } = post[0];

  // Increase views
  // TODO: 내가 확인한 경우는 카운트하지 않기
  await supabase.rpc('increment_views', {
    post_id: id,
  });

  //TODO: is_public false인 게시물이면 로그인된 사람만 볼 수 있게
  // TODO: 목차
  // TODO: 댓글

  const createdAt = dayjs(created_at).format('YYYY-MM-DD');

  return (
    <section className="w-full pb-10 md:py-10 flex flex-col gap-5">
      <div>
        <h1 className="text-4xl font-bold mb-2 dark:text-white">{title}</h1>
        <div className="flex items-center justify-between text-zinc-400 gap-4">
          <span className="text-sm">{createdAt}</span>
          <span className="text-sm ">{views} views</span>
        </div>
      </div>
      <div className="content">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </section>
  );
}
