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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      candidates: {
        Row: {
          availability: Database["public"]["Enums"]["availability_type"]
          city_country: string
          consent_contact: boolean
          consent_privacy: boolean
          created_at: string
          cv_link: string | null
          education_level: Database["public"]["Enums"]["education_level_type"]
          email: string | null
          english_level: Database["public"]["Enums"]["english_level_type"]
          experience_years: number
          full_name: string
          graduation_year: number | null
          id: string
          license_status: Database["public"]["Enums"]["license_status_type"]
          pipeline_status: Database["public"]["Enums"]["pipeline_status_type"]
          profession: Database["public"]["Enums"]["profession_type"]
          specialty: Database["public"]["Enums"]["specialty_type"]
          target_countries: string[]
          whatsapp_number: string
        }
        Insert: {
          availability: Database["public"]["Enums"]["availability_type"]
          city_country: string
          consent_contact?: boolean
          consent_privacy?: boolean
          created_at?: string
          cv_link?: string | null
          education_level: Database["public"]["Enums"]["education_level_type"]
          email?: string | null
          english_level: Database["public"]["Enums"]["english_level_type"]
          experience_years: number
          full_name: string
          graduation_year?: number | null
          id?: string
          license_status: Database["public"]["Enums"]["license_status_type"]
          pipeline_status?: Database["public"]["Enums"]["pipeline_status_type"]
          profession: Database["public"]["Enums"]["profession_type"]
          specialty: Database["public"]["Enums"]["specialty_type"]
          target_countries?: string[]
          whatsapp_number: string
        }
        Update: {
          availability?: Database["public"]["Enums"]["availability_type"]
          city_country?: string
          consent_contact?: boolean
          consent_privacy?: boolean
          created_at?: string
          cv_link?: string | null
          education_level?: Database["public"]["Enums"]["education_level_type"]
          email?: string | null
          english_level?: Database["public"]["Enums"]["english_level_type"]
          experience_years?: number
          full_name?: string
          graduation_year?: number | null
          id?: string
          license_status?: Database["public"]["Enums"]["license_status_type"]
          pipeline_status?: Database["public"]["Enums"]["pipeline_status_type"]
          profession?: Database["public"]["Enums"]["profession_type"]
          specialty?: Database["public"]["Enums"]["specialty_type"]
          target_countries?: string[]
          whatsapp_number?: string
        }
        Relationships: []
      }
      content: {
        Row: {
          body: string
          category: Database["public"]["Enums"]["content_category_type"]
          created_at: string
          excerpt: string
          hero_image: string | null
          id: string
          is_published: boolean
          publish_date: string
          read_time_minutes: number
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          body: string
          category: Database["public"]["Enums"]["content_category_type"]
          created_at?: string
          excerpt: string
          hero_image?: string | null
          id?: string
          is_published?: boolean
          publish_date?: string
          read_time_minutes?: number
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          body?: string
          category?: Database["public"]["Enums"]["content_category_type"]
          created_at?: string
          excerpt?: string
          hero_image?: string | null
          id?: string
          is_published?: boolean
          publish_date?: string
          read_time_minutes?: number
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      pathways: {
        Row: {
          country: string
          created_at: string
          documents_checklist: Json
          faq: Json
          id: string
          is_active: boolean
          order_index: number
          requirements: Json
          short_summary: string
          slug: string
          timeline_steps: Json
          title: string
          updated_at: string
        }
        Insert: {
          country: string
          created_at?: string
          documents_checklist?: Json
          faq?: Json
          id?: string
          is_active?: boolean
          order_index?: number
          requirements?: Json
          short_summary: string
          slug: string
          timeline_steps?: Json
          title: string
          updated_at?: string
        }
        Update: {
          country?: string
          created_at?: string
          documents_checklist?: Json
          faq?: Json
          id?: string
          is_active?: boolean
          order_index?: number
          requirements?: Json
          short_summary?: string
          slug?: string
          timeline_steps?: Json
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      social_links: {
        Row: {
          created_at: string
          id: string
          instagram_url: string
          linkedin_url: string
          tiktok_url: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          instagram_url?: string
          linkedin_url?: string
          tiktok_url?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          instagram_url?: string
          linkedin_url?: string
          tiktok_url?: string
          updated_at?: string
        }
        Relationships: []
      }
      whatsapp_groups: {
        Row: {
          created_at: string
          description: string
          id: string
          is_active: boolean
          join_link: string
          order_index: number
          segment_name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          is_active?: boolean
          join_link?: string
          order_index?: number
          segment_name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          is_active?: boolean
          join_link?: string
          order_index?: number
          segment_name?: string
          updated_at?: string
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
      availability_type: "0-3 months" | "3-6 months" | "6-12 months"
      content_category_type:
        | "Career Abroad"
        | "Licensing"
        | "English"
        | "Interview"
        | "Mental Health"
        | "Professional Growth"
      education_level_type: "Diploma" | "Bachelor" | "Master" | "Other"
      english_level_type:
        | "IELTS"
        | "OET"
        | "Basic"
        | "Intermediate"
        | "Advanced"
        | "Not Yet"
      license_status_type: "STR/SIP Active" | "In Process" | "Not Available"
      pipeline_status_type:
        | "new"
        | "contacted"
        | "screened"
        | "qualified"
        | "in_process"
        | "placed"
        | "closed"
      profession_type: "Nurse" | "Midwife" | "Other"
      specialty_type:
        | "ICU"
        | "ER"
        | "Med-Surg"
        | "OR"
        | "Pediatrics"
        | "Geriatric"
        | "Mental Health"
        | "Community Health"
        | "Other"
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
      availability_type: ["0-3 months", "3-6 months", "6-12 months"],
      content_category_type: [
        "Career Abroad",
        "Licensing",
        "English",
        "Interview",
        "Mental Health",
        "Professional Growth",
      ],
      education_level_type: ["Diploma", "Bachelor", "Master", "Other"],
      english_level_type: [
        "IELTS",
        "OET",
        "Basic",
        "Intermediate",
        "Advanced",
        "Not Yet",
      ],
      license_status_type: ["STR/SIP Active", "In Process", "Not Available"],
      pipeline_status_type: [
        "new",
        "contacted",
        "screened",
        "qualified",
        "in_process",
        "placed",
        "closed",
      ],
      profession_type: ["Nurse", "Midwife", "Other"],
      specialty_type: [
        "ICU",
        "ER",
        "Med-Surg",
        "OR",
        "Pediatrics",
        "Geriatric",
        "Mental Health",
        "Community Health",
        "Other",
      ],
    },
  },
} as const
