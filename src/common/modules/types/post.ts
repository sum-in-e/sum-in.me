import { PostType } from '@/src/common/modules/types/postType';

export interface Post {
  id: number;
  title: string;
  content: string;
  description: string;
  cover: string;
  type: PostType;
  is_public: boolean;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
}
