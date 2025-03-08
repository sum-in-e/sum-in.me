import { Post } from '@/src/common/modules/types/post';
import {
  getPostDetail as getPostDetailFromRepo,
  getSuggestedPosts as getSuggestedPostsFromRepo,
} from '../repositories/postDetailRepository';

export async function getPostDetail(id: number): Promise<Post | null> {
  return getPostDetailFromRepo(id);
}

export async function getSuggestedPosts(): Promise<Post[]> {
  return getSuggestedPostsFromRepo();
}
