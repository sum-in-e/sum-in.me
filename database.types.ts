export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      guestbook: {
        Row: {
          comment: string | null
          created_at: string
          id: number
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: number
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      post: {
        Row: {
          content: string
          cover: string
          created_at: string
          deleted_at: string | null
          description: string
          id: number
          is_public: boolean
          title: string
          type: Database["public"]["Enums"]["post_type"]
          updated_at: string | null
        }
        Insert: {
          content: string
          cover?: string
          created_at?: string
          deleted_at?: string | null
          description: string
          id?: number
          is_public?: boolean
          title: string
          type: Database["public"]["Enums"]["post_type"]
          updated_at?: string | null
        }
        Update: {
          content?: string
          cover?: string
          created_at?: string
          deleted_at?: string | null
          description?: string
          id?: number
          is_public?: boolean
          title?: string
          type?: Database["public"]["Enums"]["post_type"]
          updated_at?: string | null
        }
        Relationships: []
      }
      "post-tag": {
        Row: {
          id: number
          post_id: number
          tag_id: number
        }
        Insert: {
          id?: number
          post_id: number
          tag_id: number
        }
        Update: {
          id?: number
          post_id?: number
          tag_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "post-tag_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "post"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post-tag_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tag"
            referencedColumns: ["id"]
          },
        ]
      }
      tag: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      fetch_posts_with_tags: {
        Args: {
          post_type_value: Database["public"]["Enums"]["post_type"]
          tag_id_value?: string
          year_value?: string
        }
        Returns: {
          id: number
          title: string
          description: string
          cover: string
          created_at: string
          tags: string[]
        }[]
      }
      get_tags_and_post_counts: {
        Args: {
          post_type_value: Database["public"]["Enums"]["post_type"]
        }
        Returns: {
          id: number
          name: string
          posts: number
        }[]
      }
      insert_post_with_tag: {
        Args: {
          post_title: string
          post_description: string
          post_content: string
          post_is_public: boolean
          post_type: Database["public"]["Enums"]["post_type"]
          tag_ids: number[]
        }
        Returns: number
      }
      update_post_with_tags: {
        Args: {
          exist_post_id: number
          post_title: string
          post_description: string
          post_content: string
          post_is_public: boolean
          post_type: Database["public"]["Enums"]["post_type"]
          new_tags_ids: number[]
        }
        Returns: number
      }
    }
    Enums: {
      post_type: "blog" | "note"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
