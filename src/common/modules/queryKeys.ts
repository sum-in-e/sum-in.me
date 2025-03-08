import { PostType } from './types/postType';

const queryKeys = {
  post: {
    all: ['posts'] as const,
    recent: (type: PostType) => ['posts', type] as const,
    list: (type: PostType, tagId?: string | null) =>
      ['posts', type, 'list', tagId] as const,
    tags: (type: PostType | number) =>
      typeof type === 'number'
        ? (['posts', 'tags', type] as const)
        : (['posts', type, 'tags'] as const),
    private: () => ['posts', 'private'] as const,
    detail: (id: number) => ['posts', 'detail', id] as const,
    suggested: () => ['posts', 'suggested'] as const,
  },

  comment: {
    list: () => ['comments', 'list'] as const,
  },
} as const;

export default queryKeys;
