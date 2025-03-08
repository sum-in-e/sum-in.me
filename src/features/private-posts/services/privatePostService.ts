import { Post } from '@/src/common/modules/types/post';
import { getPrivatePosts as getPrivatePostsFromRepo } from '../repositories/privatePostRepository';

export async function getPrivatePosts(): Promise<Post[]> {
  return getPrivatePostsFromRepo();
}
