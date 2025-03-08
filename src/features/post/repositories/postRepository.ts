import { createClient } from '@/src/utils/supabase/client';
import { PostType } from '@/src/common/modules/types/postType';
import { Tables } from '@/src/types/supabase';

export interface CreatePostData {
  title: string;
  description: string;
  content: string;
  is_public: boolean;
  type: PostType;
}

export interface CreatePostWithTagsData extends CreatePostData {
  tag_ids: number[];
}

export interface UpdatePostData extends CreatePostData {
  id: number;
}

export interface UpdatePostWithTagsData extends CreatePostWithTagsData {
  id: number;
}

export async function createPost(
  data: CreatePostData
): Promise<Tables<'post'>> {
  const supabase = createClient();

  const { data: post, error } = await supabase
    .from('post')
    .insert([data])
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create post: ${error.message}`);
  }

  return post;
}

export async function createPostWithTags(
  data: CreatePostWithTagsData
): Promise<number> {
  const supabase = createClient();

  const { data: postId, error } = await supabase.rpc('insert_post_with_tag', {
    post_title: data.title,
    post_description: data.description,
    post_content: data.content,
    post_is_public: data.is_public,
    post_type: data.type,
    tag_ids: data.tag_ids,
  });

  if (error) {
    throw new Error(`Failed to create post with tags: ${error.message}`);
  }

  return postId;
}

export async function updatePost(
  data: UpdatePostData
): Promise<Tables<'post'>> {
  const supabase = createClient();

  const { data: post, error } = await supabase
    .from('post')
    .update({
      ...data,
      updated_at: new Date().toISOString(),
    })
    .eq('id', data.id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update post: ${error.message}`);
  }

  return post;
}

export async function updatePostWithTags(
  data: UpdatePostWithTagsData
): Promise<number> {
  const supabase = createClient();

  const { data: postId, error } = await supabase.rpc('update_post_with_tags', {
    exist_post_id: data.id,
    post_title: data.title,
    post_description: data.description,
    post_content: data.content,
    post_is_public: data.is_public,
    post_type: data.type,
    new_tags_ids: data.tag_ids,
  });

  if (error) {
    throw new Error(`Failed to update post with tags: ${error.message}`);
  }

  return postId;
}

export async function getPostTags(postId: number): Promise<number[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('post-tag')
    .select('tag_id')
    .eq('post_id', postId);

  if (error) {
    throw new Error(`Failed to fetch post tags: ${error.message}`);
  }

  return data ? data.map((item) => item.tag_id) : [];
}
