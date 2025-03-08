import { Tables } from '@/src/types/supabase';
import { PostType } from '@/src/common/modules/types/postType';
import {
  createPost as createPostRepo,
  createPostWithTags as createPostWithTagsRepo,
  updatePost as updatePostRepo,
  updatePostWithTags as updatePostWithTagsRepo,
  getPostTags as getPostTagsRepo,
  CreatePostData,
  CreatePostWithTagsData,
  UpdatePostData,
  UpdatePostWithTagsData,
} from '../repositories/postRepository';

export type {
  CreatePostData,
  CreatePostWithTagsData,
  UpdatePostData,
  UpdatePostWithTagsData,
};

export async function createPost(
  data: CreatePostData
): Promise<Tables<'post'>> {
  return createPostRepo(data);
}

export async function createPostWithTags(
  data: CreatePostWithTagsData
): Promise<number> {
  return createPostWithTagsRepo(data);
}

export async function updatePost(
  data: UpdatePostData
): Promise<Tables<'post'>> {
  return updatePostRepo(data);
}

export async function updatePostWithTags(
  data: UpdatePostWithTagsData
): Promise<number> {
  return updatePostWithTagsRepo(data);
}

export async function getPostTags(postId: number): Promise<number[]> {
  return getPostTagsRepo(postId);
}

export function checkTagIdArraysEqual(
  array1: number[],
  array2: number[]
): boolean {
  if (array1.length !== array2.length) return false;

  const sortedArray1 = array1.slice().sort();
  const sortedArray2 = array2.slice().sort();

  for (let i = 0; i < sortedArray1.length; i++) {
    if (sortedArray1[i] !== sortedArray2[i]) return false;
  }

  return true;
}
