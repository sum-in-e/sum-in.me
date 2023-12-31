export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      guestbook: {
        Row: {
          comment: string | null;
          created_at: string;
          id: number;
        };
        Insert: {
          comment?: string | null;
          created_at?: string;
          id?: number;
        };
        Update: {
          comment?: string | null;
          created_at?: string;
          id?: number;
        };
        Relationships: [];
      };
      post: {
        Row: {
          content: string;
          cover: string;
          created_at: string;
          deleted_at: string | null;
          description: string;
          id: number;
          is_public: boolean;
          title: string;
          type: Database['public']['Enums']['post_type'];
          updated_at: string | null;
        };
        Insert: {
          content: string;
          cover?: string;
          created_at?: string;
          deleted_at?: string | null;
          description: string;
          id?: number;
          is_public?: boolean;
          title: string;
          type: Database['public']['Enums']['post_type'];
          updated_at?: string | null;
        };
        Update: {
          content?: string;
          cover?: string;
          created_at?: string;
          deleted_at?: string | null;
          description?: string;
          id?: number;
          is_public?: boolean;
          title?: string;
          type?: Database['public']['Enums']['post_type'];
          updated_at?: string | null;
        };
        Relationships: [];
      };
      'post-tag': {
        Row: {
          id: number;
          post_id: number;
          tag_id: number;
        };
        Insert: {
          id?: number;
          post_id: number;
          tag_id: number;
        };
        Update: {
          id?: number;
          post_id?: number;
          tag_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'post-tag_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'post';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'post-tag_tag_id_fkey';
            columns: ['tag_id'];
            isOneToOne: false;
            referencedRelation: 'tag';
            referencedColumns: ['id'];
          }
        ];
      };
      tag: {
        Row: {
          id: number;
          name: string;
        };
        Insert: {
          id?: number;
          name: string;
        };
        Update: {
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      fetch_posts: {
        Args: {
          post_type_value: Database['public']['Enums']['post_type'];
          tag_id_value?: string;
          year_value?: string;
        };
        Returns: {
          id: number;
          title: string;
          description: string;
          created_at: string;
          tags: string[];
        }[];
      };
      get_tags_and_post_counts: {
        Args: {
          post_type_value: Database['public']['Enums']['post_type'];
        };
        Returns: {
          id: number;
          name: string;
          posts: number;
        }[];
      };
      insert_post_with_tag: {
        Args: {
          post_title: string;
          post_description: string;
          post_content: string;
          post_is_public: boolean;
          post_type: Database['public']['Enums']['post_type'];
          tag_ids: number[];
        };
        Returns: number;
      };
      update_post_with_tags: {
        Args: {
          exist_post_id: number;
          post_title: string;
          post_description: string;
          post_content: string;
          post_is_public: boolean;
          post_type: Database['public']['Enums']['post_type'];
          new_tags_ids: number[];
        };
        Returns: number;
      };
    };
    Enums: {
      post_type: 'blog' | 'note';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
