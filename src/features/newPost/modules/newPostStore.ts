import { PostType } from '@/src/common/modules/types/postType';
import { create } from 'zustand';

interface TitleStateType {
  title: string;
  setTitle: (newState: string) => void;
}

export const useTitleState = create<TitleStateType>((set) => ({
  title: '',
  setTitle: (newState) => set({ title: newState }),
}));

// ✂️✂️✂️✂️✂️✂️✂️✂️✂️

interface DescriptionStateType {
  description: string;
  setDescrption: (newState: string) => void;
}

export const useDescriptionState = create<DescriptionStateType>((set) => ({
  description: '',
  setDescrption: (newState) => set({ description: newState }),
}));

// ✂️✂️✂️✂️✂️✂️✂️✂️✂️

interface PostTypeStateType {
  postType: PostType;
  setPostType: (newState: PostType) => void;
}

export const usePostTypeState = create<PostTypeStateType>((set) => ({
  postType: 'blog',
  setPostType: (newState) => set({ postType: newState }),
}));

// ✂️✂️✂️✂️✂️✂️✂️✂️✂️

interface SelectedTagsStateType {
  selectedTags: number[];
  setSelectedTags: (newState: number[]) => void;
}

export const useSelectedTagsState = create<SelectedTagsStateType>((set) => ({
  selectedTags: [],
  setSelectedTags: (newState) => set({ selectedTags: newState }),
}));

// ✂️✂️✂️✂️✂️✂️✂️✂️✂️

interface PublishStateType {
  isPublic: boolean;
  setIsPublic: (newState: boolean) => void;
}

export const usePublishState = create<PublishStateType>((set) => ({
  isPublic: true,
  setIsPublic: (newState) => set({ isPublic: newState }),
}));
