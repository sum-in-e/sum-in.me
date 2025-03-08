import { createClient } from '@/src/utils/supabase/server';
import PrivatePostsContainer from '@/src/features/private-posts/container/PrivatePostsContainer';

export const dynamic = 'force-dynamic';

export default async function PrivatePostsPage() {
  const supabase = createClient();
  const { data: user, error } = await supabase.auth.getUser();

  if (error?.status === 401) {
    // 관리자 외 접근 금지 페이지이므로 페이지를 인지하지 못하도록 404 표시
    return (
      <div className="flex h-full items-center justify-center gap-5 pt-10">
        <h4 className="text-2xl font-semibold">{`⚠️ Page Not Found ⚠️`}</h4>
      </div>
    );
  }

  return <PrivatePostsContainer />;
}
