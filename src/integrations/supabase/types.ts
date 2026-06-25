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
      orders: {
        Row: {
          created_at: string
          customer_name: string
          id: string
          line_items: Json
          notes: string | null
          order_number: number
          payment_method: Database["public"]["Enums"]["payment_method"]
          phone: string
          preview_url: string | null
          status: Database["public"]["Enums"]["order_status"]
          subtotal: number
          telegram_handle: string | null
          telegram_sent: boolean
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_name: string
          id?: string
          line_items: Json
          notes?: string | null
          order_number?: number
          payment_method: Database["public"]["Enums"]["payment_method"]
          phone: string
          preview_url?: string | null
          status?: Database["public"]["Enums"]["order_status"]
          subtotal: number
          telegram_handle?: string | null
          telegram_sent?: boolean
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_name?: string
          id?: string
          line_items?: Json
          notes?: string | null
          order_number?: number
          payment_method?: Database["public"]["Enums"]["payment_method"]
          phone?: string
          preview_url?: string | null
          status?: Database["public"]["Enums"]["order_status"]
          subtotal?: number
          telegram_handle?: string | null
          telegram_sent?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          active: boolean
          base_price: number
          blurb: string | null
          bulk_note: string | null
          created_at: string
          default_category: string | null
          id: string
          line: string
          mockup_url: string | null
          name: string
          name_km: string | null
          options: Json
          print_area: Json | null
          sizes: Json
          sort_order: number
          updated_at: string
        }
        Insert: {
          active?: boolean
          base_price?: number
          blurb?: string | null
          bulk_note?: string | null
          created_at?: string
          default_category?: string | null
          id: string
          line: string
          mockup_url?: string | null
          name: string
          name_km?: string | null
          options?: Json
          print_area?: Json | null
          sizes?: Json
          sort_order?: number
          updated_at?: string
        }
        Update: {
          active?: boolean
          base_price?: number
          blurb?: string | null
          bulk_note?: string | null
          created_at?: string
          default_category?: string | null
          id?: string
          line?: string
          mockup_url?: string | null
          name?: string
          name_km?: string | null
          options?: Json
          print_area?: Json | null
          sizes?: Json
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      styles: {
        Row: {
          active: boolean
          category: string
          created_at: string
          id: string
          image_url: string
          name: string
          name_km: string | null
          sort_order: number
          supported_sizes: string[]
          updated_at: string
        }
        Insert: {
          active?: boolean
          category: string
          created_at?: string
          id: string
          image_url: string
          name: string
          name_km?: string | null
          sort_order?: number
          supported_sizes?: string[]
          updated_at?: string
        }
        Update: {
          active?: boolean
          category?: string
          created_at?: string
          id?: string
          image_url?: string
          name?: string
          name_km?: string | null
          sort_order?: number
          supported_sizes?: string[]
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "staff" | "customer"
      order_status:
        | "new"
        | "confirmed"
        | "in_production"
        | "ready"
        | "delivered"
        | "cancelled"
      payment_method: "khqr" | "cod" | "bank"
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
    Enums: {
      app_role: ["admin", "staff", "customer"],
      order_status: [
        "new",
        "confirmed",
        "in_production",
        "ready",
        "delivered",
        "cancelled",
      ],
      payment_method: ["khqr", "cod", "bank"],
    },
  },
} as const
