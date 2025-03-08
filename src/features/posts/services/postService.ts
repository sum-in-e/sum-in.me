import { Post } from '@/src/common/modules/types/post';
import { PostType } from '@/src/common/modules/types/postType';
import {
  getRecentPosts as getRecentPostsFromRepo,
  getPosts as getPostsFromRepo,
  getTags as getTagsFromRepo,
  GetPostsParams,
  Tag,
} from '../repositories/postRepository';

export async function getRecentPosts(type: PostType): Promise<Post[]> {
  return getRecentPostsFromRepo(type);
}

export async function getPosts(params: GetPostsParams): Promise<Post[]> {
  return getPostsFromRepo(params);
}

export async function getTags(type: PostType): Promise<Tag[]> {
  return getTagsFromRepo(type);
}
