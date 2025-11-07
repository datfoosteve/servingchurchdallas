// Database types for type safety
export type PrayerStatus = 'new' | 'praying' | 'answered' | 'ongoing' | 'archived';

export interface Prayer {
  id: string;
  name: string;
  email: string | null;
  request: string;
  is_public: boolean;
  status: PrayerStatus;
  prayer_count: number;
  member_id: string | null;
  show_name: boolean;
  created_at: string;
  updated_at: string;
  archived_at: string | null;
  member?: {
    id: string;
    full_name: string | null;
    email: string;
  };
}

export interface PrayerResponse {
  id: string;
  prayer_id: string;
  ip_address: string;
  created_at: string;
}

export interface CreatePrayerInput {
  name: string;
  email?: string;
  request: string;
  isPublic: boolean;
}

export interface UpdatePrayerInput {
  status?: PrayerStatus;
  archived_at?: string | null;
}
