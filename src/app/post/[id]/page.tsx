import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/database.types';
import { Metadata } from 'next';
import PostItem from '@/src/features/posts/components/PostItem';
import Post from '@/src/features/post/container';

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
          'https://res.cloudinary.com/duinj0dld/image/upload/v1695111909/dev.sum-in.me/sumDev-cover.webp',
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

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let { data: post } = await supabase
    .from('post')
    .select('*')
    .eq('id', params.id);

  if (!post || post.length === 0) {
    // 게시글 존재하지 않는 경우 최신 게시글 5개 추천
    let { data: suggestedPosts } = await supabase
      .from('post')
      .select('*')
      .order('created_at', { ascending: false })
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

  if (!post[0].is_public && !user) {
    // 비공개 글인데 방문자가 확인하는 경우

    return (
      <div className="w-full flex justify-center items-center px-5 py-10 mb-10 bg-zinc-100 dark:bg-opacity-10 rounded-md">
        <h3 className="text-lg text-zinc-800 dark:text-zinc-200">
          비공개 글입니다.
        </h3>
      </div>
    );
  }

  return <Post user={user} initPost={post[0]} />;
}
