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
