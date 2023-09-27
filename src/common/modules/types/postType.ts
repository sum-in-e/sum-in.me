export type PostType = 'blog' | 'note';

export type Post = {
  content: string;
  cover: string;
  created_at: string;
  deleted_at: string | null;
  description: string;
  id: number;
  is_public: boolean;
  title: string;
  type: 'blog' | 'note';
  updated_at: string | null;
  views: number;
};
