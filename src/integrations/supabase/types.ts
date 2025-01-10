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
      account_balances: {
        Row: {
          available_balance: number | null
          currency_code: string
          current_balance: number
          id: string
          last_updated: string | null
          plaid_account_id: string
        }
        Insert: {
          available_balance?: number | null
          currency_code?: string
          current_balance: number
          id?: string
          last_updated?: string | null
          plaid_account_id: string
        }
        Update: {
          available_balance?: number | null
          currency_code?: string
          current_balance?: number
          id?: string
          last_updated?: string | null
          plaid_account_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "account_balances_plaid_account_id_fkey"
            columns: ["plaid_account_id"]
            isOneToOne: false
            referencedRelation: "plaid_accounts"
            referencedColumns: ["plaid_account_id"]
          },
        ]
      }
      audio_samples: {
        Row: {
          actual_label: string | null
          audio_url: string
          confidence: number | null
          created_at: string | null
          id: string
          predicted_label: string | null
          user_confirmed: boolean | null
          waveform_data: Json | null
        }
        Insert: {
          actual_label?: string | null
          audio_url: string
          confidence?: number | null
          created_at?: string | null
          id?: string
          predicted_label?: string | null
          user_confirmed?: boolean | null
          waveform_data?: Json | null
        }
        Update: {
          actual_label?: string | null
          audio_url?: string
          confidence?: number | null
          created_at?: string | null
          id?: string
          predicted_label?: string | null
          user_confirmed?: boolean | null
          waveform_data?: Json | null
        }
        Relationships: []
      }
      currency_exchange_rates: {
        Row: {
          from_currency: string
          id: string
          last_updated: string | null
          rate: number
          to_currency: string
        }
        Insert: {
          from_currency: string
          id?: string
          last_updated?: string | null
          rate: number
          to_currency: string
        }
        Update: {
          from_currency?: string
          id?: string
          last_updated?: string | null
          rate?: number
          to_currency?: string
        }
        Relationships: []
      }
      exchange_transactions: {
        Row: {
          completed_at: string | null
          created_at: string | null
          from_amount: number
          from_currency: string
          id: string
          rate: number
          status: string
          to_amount: number
          to_currency: string
          user_address: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          from_amount: number
          from_currency: string
          id?: string
          rate: number
          status?: string
          to_amount: number
          to_currency: string
          user_address: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          from_amount?: number
          from_currency?: string
          id?: string
          rate?: number
          status?: string
          to_amount?: number
          to_currency?: string
          user_address?: string
        }
        Relationships: []
      }
      latam_payment_transactions: {
        Row: {
          amount: number
          completed_at: string | null
          created_at: string | null
          currency: string
          id: string
          metadata: Json | null
          payment_method: string
          provider_id: string
          provider_reference: string | null
          status: string
          user_address: string
        }
        Insert: {
          amount: number
          completed_at?: string | null
          created_at?: string | null
          currency: string
          id?: string
          metadata?: Json | null
          payment_method: string
          provider_id: string
          provider_reference?: string | null
          status?: string
          user_address: string
        }
        Update: {
          amount?: number
          completed_at?: string | null
          created_at?: string | null
          currency?: string
          id?: string
          metadata?: Json | null
          payment_method?: string
          provider_id?: string
          provider_reference?: string | null
          status?: string
          user_address?: string
        }
        Relationships: [
          {
            foreignKeyName: "latam_payment_transactions_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "payment_providers"
            referencedColumns: ["id"]
          },
        ]
      }
      menu_items: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          is_available: boolean | null
          name: string
          price: number
          restaurant_id: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_available?: boolean | null
          name: string
          price: number
          restaurant_id: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_available?: boolean | null
          name?: string
          price?: number
          restaurant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "menu_items_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      mercadopago_transactions: {
        Row: {
          amount: number
          completed_at: string | null
          created_at: string | null
          currency: string
          id: string
          mercadopago_payment_id: string | null
          metadata: Json | null
          payment_method_type: string
          status: string
          user_address: string
        }
        Insert: {
          amount: number
          completed_at?: string | null
          created_at?: string | null
          currency: string
          id?: string
          mercadopago_payment_id?: string | null
          metadata?: Json | null
          payment_method_type: string
          status?: string
          user_address: string
        }
        Update: {
          amount?: number
          completed_at?: string | null
          created_at?: string | null
          currency?: string
          id?: string
          mercadopago_payment_id?: string | null
          metadata?: Json | null
          payment_method_type?: string
          status?: string
          user_address?: string
        }
        Relationships: []
      }
      payment_methods: {
        Row: {
          card_brand: string
          created_at: string | null
          id: string
          is_default: boolean | null
          last_four: string
          stripe_payment_method_id: string
          user_address: string
        }
        Insert: {
          card_brand: string
          created_at?: string | null
          id?: string
          is_default?: boolean | null
          last_four: string
          stripe_payment_method_id: string
          user_address: string
        }
        Update: {
          card_brand?: string
          created_at?: string | null
          id?: string
          is_default?: boolean | null
          last_four?: string
          stripe_payment_method_id?: string
          user_address?: string
        }
        Relationships: []
      }
      payment_providers: {
        Row: {
          country_code: string
          created_at: string | null
          id: string
          is_active: boolean | null
          provider_code: string
          provider_config: Json | null
          provider_name: string
          provider_type: string
        }
        Insert: {
          country_code: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          provider_code: string
          provider_config?: Json | null
          provider_name: string
          provider_type: string
        }
        Update: {
          country_code?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          provider_code?: string
          provider_config?: Json | null
          provider_name?: string
          provider_type?: string
        }
        Relationships: []
      }
      payment_transactions: {
        Row: {
          amount: number
          completed_at: string | null
          created_at: string | null
          currency: string
          id: string
          metadata: Json | null
          payment_method_id: string | null
          status: string
          stripe_payment_intent_id: string | null
          user_address: string
        }
        Insert: {
          amount: number
          completed_at?: string | null
          created_at?: string | null
          currency?: string
          id?: string
          metadata?: Json | null
          payment_method_id?: string | null
          status?: string
          stripe_payment_intent_id?: string | null
          user_address: string
        }
        Update: {
          amount?: number
          completed_at?: string | null
          created_at?: string | null
          currency?: string
          id?: string
          metadata?: Json | null
          payment_method_id?: string | null
          status?: string
          stripe_payment_intent_id?: string | null
          user_address?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_transactions_payment_method_id_fkey"
            columns: ["payment_method_id"]
            isOneToOne: false
            referencedRelation: "payment_methods"
            referencedColumns: ["id"]
          },
        ]
      }
      plaid_accounts: {
        Row: {
          account_name: string
          account_subtype: string | null
          account_type: string
          created_at: string | null
          id: string
          institution_name: string | null
          mask: string | null
          plaid_account_id: string
          user_address: string
        }
        Insert: {
          account_name: string
          account_subtype?: string | null
          account_type: string
          created_at?: string | null
          id?: string
          institution_name?: string | null
          mask?: string | null
          plaid_account_id: string
          user_address: string
        }
        Update: {
          account_name?: string
          account_subtype?: string | null
          account_type?: string
          created_at?: string | null
          id?: string
          institution_name?: string | null
          mask?: string | null
          plaid_account_id?: string
          user_address?: string
        }
        Relationships: []
      }
      restaurants: {
        Row: {
          address: string | null
          created_at: string | null
          cuisine_type: string | null
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          menu_url: string | null
          name: string
          opening_hours: Json | null
          phone: string | null
          whatsapp: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          cuisine_type?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          menu_url?: string | null
          name: string
          opening_hours?: Json | null
          phone?: string | null
          whatsapp?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          cuisine_type?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          menu_url?: string | null
          name?: string
          opening_hours?: Json | null
          phone?: string | null
          whatsapp?: string | null
        }
        Relationships: []
      }
      sound_detections: {
        Row: {
          audio_url: string | null
          confidence: number
          created_at: string | null
          id: string
          label: string
          scientific_name: string | null
          timestamp: string | null
        }
        Insert: {
          audio_url?: string | null
          confidence: number
          created_at?: string | null
          id?: string
          label: string
          scientific_name?: string | null
          timestamp?: string | null
        }
        Update: {
          audio_url?: string | null
          confidence?: number
          created_at?: string | null
          id?: string
          label?: string
          scientific_name?: string | null
          timestamp?: string | null
        }
        Relationships: []
      }
      stripe_connect_accounts: {
        Row: {
          charges_enabled: boolean | null
          created_at: string | null
          id: string
          payouts_enabled: boolean | null
          stripe_account_id: string
          user_address: string
        }
        Insert: {
          charges_enabled?: boolean | null
          created_at?: string | null
          id?: string
          payouts_enabled?: boolean | null
          stripe_account_id: string
          user_address: string
        }
        Update: {
          charges_enabled?: boolean | null
          created_at?: string | null
          id?: string
          payouts_enabled?: boolean | null
          stripe_account_id?: string
          user_address?: string
        }
        Relationships: []
      }
      token_holders: {
        Row: {
          balance: number
          created_at: string | null
          holder_address: string
          id: string
          token_id: string | null
        }
        Insert: {
          balance?: number
          created_at?: string | null
          holder_address: string
          id?: string
          token_id?: string | null
        }
        Update: {
          balance?: number
          created_at?: string | null
          holder_address?: string
          id?: string
          token_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "token_holders_token_id_fkey"
            columns: ["token_id"]
            isOneToOne: false
            referencedRelation: "tokens"
            referencedColumns: ["id"]
          },
        ]
      }
      tokens: {
        Row: {
          contract_address: string | null
          created_at: string | null
          decimals: number
          id: string
          is_deployed: boolean | null
          owner_address: string
          token_name: string
          token_symbol: string
          total_supply: number
        }
        Insert: {
          contract_address?: string | null
          created_at?: string | null
          decimals?: number
          id?: string
          is_deployed?: boolean | null
          owner_address: string
          token_name: string
          token_symbol: string
          total_supply: number
        }
        Update: {
          contract_address?: string | null
          created_at?: string | null
          decimals?: number
          id?: string
          is_deployed?: boolean | null
          owner_address?: string
          token_name?: string
          token_symbol?: string
          total_supply?: number
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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
