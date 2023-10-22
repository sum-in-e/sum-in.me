import { GetPostsParams } from '@/src/features/posts/modules/hooks/api/useGetPostsQuery';
import { GetTagsParams } from '@/src/features/posts/modules/hooks/api/useGetTagsForPostFilteringQuery';

const queryKeys = {
  post: {
    getPosts: (params?: GetPostsParams) =>
      params ? (['getPosts', params] as const) : (['getPosts'] as const),
  },
  tag: {
    getTagsForPostFilering: (params?: GetTagsParams) =>
      params
        ? (['getTagsForPostFiltering', params] as const)
        : (['getTagsForPostFiltering'] as const),
  },
  comment: {
    getComments: () => ['getComments'] as const,
  },
};

export default queryKeys;
