import { getPostTags as getPostTagsFromRepo } from '../repositories/tagRepository';

export async function getPostTags(postId: number): Promise<string[]> {
  return getPostTagsFromRepo(postId);
}
