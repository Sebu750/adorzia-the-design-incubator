export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      collections: {
        Row: {
          cover_url: string | null
          created_at: string
          description: string | null
          designer_id: string
          display_order: number
          id: string
          title: string
          updated_at: string
          year: number | null
        }
        Insert: {
          cover_url?: string | null
          created_at?: string
          description?: string | null
          designer_id: string
          display_order?: number
          id?: string
          title: string
          updated_at?: string
          year?: number | null
        }
        Update: {
          cover_url?: string | null
          created_at?: string
          description?: string | null
          designer_id?: string
          display_order?: number
          id?: string
          title?: string
          updated_at?: string
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "collections_designer_id_fkey"
            columns: ["designer_id"]
            isOneToOne: false
            referencedRelation: "designers"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_inquiries: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          resolved: boolean
          subject: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          resolved?: boolean
          subject?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          resolved?: boolean
          subject?: string | null
        }
        Relationships: []
      }
      designers: {
        Row: {
          bio: string | null
          cover_url: string | null
          created_at: string
          display_order: number
          featured: boolean
          id: string
          instagram: string | null
          location: string | null
          name: string
          portrait_url: string | null
          published: boolean
          slug: string
          tagline: string | null
          updated_at: string
          website: string | null
        }
        Insert: {
          bio?: string | null
          cover_url?: string | null
          created_at?: string
          display_order?: number
          featured?: boolean
          id?: string
          instagram?: string | null
          location?: string | null
          name: string
          portrait_url?: string | null
          published?: boolean
          slug: string
          tagline?: string | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          bio?: string | null
          cover_url?: string | null
          created_at?: string
          display_order?: number
          featured?: boolean
          id?: string
          instagram?: string | null
          location?: string | null
          name?: string
          portrait_url?: string | null
          published?: boolean
          slug?: string
          tagline?: string | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      partner_inquiries: {
        Row: {
          company: string
          contact_name: string
          created_at: string
          email: string
          id: string
          interest_type: string | null
          message: string
          phone: string | null
          resolved: boolean
        }
        Insert: {
          company: string
          contact_name: string
          created_at?: string
          email: string
          id?: string
          interest_type?: string | null
          message: string
          phone?: string | null
          resolved?: boolean
        }
        Update: {
          company?: string
          contact_name?: string
          created_at?: string
          email?: string
          id?: string
          interest_type?: string | null
          message?: string
          phone?: string | null
          resolved?: boolean
        }
        Relationships: []
      }
      products: {
        Row: {
          collection_id: string
          created_at: string
          description: string | null
          display_order: number
          id: string
          images: string[]
          name: string
          price_display: string | null
          updated_at: string
        }
        Insert: {
          collection_id: string
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          images?: string[]
          name: string
          price_display?: string | null
          updated_at?: string
        }
        Update: {
          collection_id?: string
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          images?: string[]
          name?: string
          price_display?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["id"]
          },
        ]
      }
      site_settings: {
        Row: {
          hero_eyebrow: string | null
          hero_subtitle: string | null
          hero_title: string | null
          id: number
          spotlight_open: boolean
          updated_at: string
        }
        Insert: {
          hero_eyebrow?: string | null
          hero_subtitle?: string | null
          hero_title?: string | null
          id?: number
          spotlight_open?: boolean
          updated_at?: string
        }
        Update: {
          hero_eyebrow?: string | null
          hero_subtitle?: string | null
          hero_title?: string | null
          id?: number
          spotlight_open?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      spotlight_applications: {
        Row: {
          brand_name: string | null
          concept_statement: string
          created_at: string
          email: string
          id: string
          instagram: string | null
          location: string | null
          lookbook_urls: string[]
          name: string
          phone: string | null
          portfolio_url: string | null
          status: string
        }
        Insert: {
          brand_name?: string | null
          concept_statement: string
          created_at?: string
          email: string
          id?: string
          instagram?: string | null
          location?: string | null
          lookbook_urls?: string[]
          name: string
          phone?: string | null
          portfolio_url?: string | null
          status?: string
        }
        Update: {
          brand_name?: string | null
          concept_statement?: string
          created_at?: string
          email?: string
          id?: string
          instagram?: string | null
          location?: string | null
          lookbook_urls?: string[]
          name?: string
          phone?: string | null
          portfolio_url?: string | null
          status?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
