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
      applications: {
        Row: {
          additional_notes: string | null
          cover_letter: string | null
          created_at: string | null
          id: string
          opportunity_id: string | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          additional_notes?: string | null
          cover_letter?: string | null
          created_at?: string | null
          id?: string
          opportunity_id?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          additional_notes?: string | null
          cover_letter?: string | null
          created_at?: string | null
          id?: string
          opportunity_id?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "applications_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: false
            referencedRelation: "research_opportunities"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          bio: string | null
          created_at: string | null
          department: string | null
          email: string
          full_name: string | null
          id: string
          major: string | null
          university: string | null
          updated_at: string | null
          year_of_study: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          department?: string | null
          email: string
          full_name?: string | null
          id: string
          major?: string | null
          university?: string | null
          updated_at?: string | null
          year_of_study?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          department?: string | null
          email?: string
          full_name?: string | null
          id?: string
          major?: string | null
          university?: string | null
          updated_at?: string | null
          year_of_study?: string | null
        }
        Relationships: []
      }
      research_opportunities: {
        Row: {
          category: string
          created_at: string | null
          description: string
          duration: string
          email: string
          funding: string | null
          id: string
          is_active: boolean | null
          keywords: string[] | null
          lab: string
          professor: string
          requirements: string[] | null
          title: string
          updated_at: string | null
          website: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description: string
          duration: string
          email: string
          funding?: string | null
          id?: string
          is_active?: boolean | null
          keywords?: string[] | null
          lab: string
          professor: string
          requirements?: string[] | null
          title: string
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string
          duration?: string
          email?: string
          funding?: string | null
          id?: string
          is_active?: boolean | null
          keywords?: string[] | null
          lab?: string
          professor?: string
          requirements?: string[] | null
          title?: string
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      saved_opportunities: {
        Row: {
          created_at: string | null
          id: string
          opportunity_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          opportunity_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          opportunity_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "saved_opportunities_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: false
            referencedRelation: "research_opportunities"
            referencedColumns: ["id"]
          },
        ]
      },
      volunteer_studies: {
        Row: {
          id: string
          title: string
          department: string
          description?: string
          location?: string
          compensation_type?: string
          compensation_details?: string
          eligibility_criteria?: string
          duration?: string
          study_link?: string
          contact_email?: string
        }
        Insert: {
          id?: string
          title: string
          department: string
          description?: string
          location?: string
          compensation_type?: string
          compensation_details?: string
          eligibility_criteria?: string
          duration?: string
          study_link?: string
          contact_email?: string
        }
        Update: {
          id?: string
          title?: string
          department?: string
          description?: string
          location?: string
          compensation_type?: string
          compensation_details?: string
          eligibility_criteria?: string
          duration?: string
          study_link?: string
          contact_email?: string
        }
        Relationships: []
      },
      public_submissions: {
        Row: {
          id: string
          type: string
          title: string
          department?: string
          description: string | null
          location?: string | null
          compensation_type?: string | null
          compensation_details?: string | null
          eligibility_criteria?: string | null
          duration?: string | null
          study_link?: string | null
          contact_email: string | null
        }
        Insert: {
          id?: string
          type: string
          title: string
          department?: string
          description?: string | null
          location?: string | null
          compensation_type?: string | null
          compensation_details?: string | null
          eligibility_criteria?: string | null
          duration?: string | null
          study_link?: string | null
          contact_email?: string | null
        }
        Update: {
          id?: string
          type?: string
          title?: string
          department?: string
          description?: string | null
          location?: string | null
          compensation_type?: string | null
          compensation_details?: string | null
          eligibility_criteria?: string | null
          duration?: string | null
          study_link?: string | null
          contact_email?: string | null
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
