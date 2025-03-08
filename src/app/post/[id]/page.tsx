import { Metadata } from 'next';
import { createClient } from '@/src/utils/supabase/server';
import PostDetailContainer from '@/src/features/post-detail/container/PostDetailContainer';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: { id: number };
}

export async function generateMetadata({
  params: { id },
}: PageProps): Promise<Metadata> {
  const getPost = async () => {
    const supabase = createClient();
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
    metadataBase: new URL(`https://sum-in.me/post/${id}`),
    openGraph: {
      title,
      description,
      url: `https://sum-in.me/post/${id}`,
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
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <PostDetailContainer id={params.id} user={user} />;
}
