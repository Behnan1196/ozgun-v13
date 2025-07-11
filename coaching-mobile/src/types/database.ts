// Database types for TYT AYT Coaching System V3.0
export type UserRole = 'admin' | 'coach' | 'student'
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled'

// Add coaching_session as a new task type for video calls
export type TaskType = 'study' | 'practice' | 'exam' | 'review' | 'resource' | 'coaching_session'

export interface UserProfile {
  id: string
  full_name: string
  email: string
  phone?: string
  department?: string
  school?: string
  tutoring_center?: string
  target_university?: string
  target_department?: string
  yks_score?: number
  start_date?: string
  parent_name?: string
  parent_phone?: string
  address?: string
  notes?: string
  role: UserRole
  created_at: string
  updated_at: string
}

export interface CoachStudentAssignment {
  id: string
  coach_id: string
  student_id: string
  assigned_at: string
  is_active: boolean
}

export interface Subject {
  id: string
  name: string
  description?: string
  created_at: string
}

export interface Topic {
  id: string
  subject_id: string
  name: string
  description?: string
  created_at: string
}

export interface Resource {
  id: string
  name: string
  description?: string
  url: string
  created_at: string
}

export interface MockExam {
  id: string
  name: string
  description?: string
  created_at: string
}

export interface Task {
  id: string
  title: string
  description?: string
  subject_id?: string
  topic_id?: string
  task_type: TaskType
  assigned_by: string
  assigned_to: string
  status: TaskStatus
  due_date?: string
  scheduled_date?: string
  scheduled_start_time?: string
  scheduled_end_time?: string
  estimated_duration?: number
  completed_at?: string
  created_at: string
}

export interface Announcement {
  id: string
  title: string
  content: string
  created_by: string
  is_active: boolean
  created_at: string
}

export interface StreamToken {
  id: string
  user_id: string
  token: string
  expires_at: string
  created_at: string
}

// Extended types with relations
export interface UserProfileWithStats extends UserProfile {
  task_count?: number
  completed_tasks?: number
  active_assignments?: number
}

export interface SubjectWithTopics extends Subject {
  topics?: Topic[]
  resource_count?: number
}

export interface TaskWithRelations extends Task {
  subject?: Subject
  topic?: Topic
  assigned_by_user?: UserProfile
  assigned_to_user?: UserProfile
}

export interface MockExamWithRelations extends MockExam {
  subject?: Subject
  created_by_user?: UserProfile
}

// Database type for Supabase client
export type Database = {
  public: {
    Tables: {
      user_profiles: {
        Row: UserProfile
        Insert: Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>>
      }
      coach_student_assignments: {
        Row: CoachStudentAssignment
        Insert: Omit<CoachStudentAssignment, 'id' | 'assigned_at'>
        Update: Partial<Omit<CoachStudentAssignment, 'id' | 'assigned_at'>>
      }
      subjects: {
        Row: Subject
        Insert: Omit<Subject, 'id' | 'created_at'>
        Update: Partial<Omit<Subject, 'id' | 'created_at'>>
      }
      topics: {
        Row: Topic
        Insert: Omit<Topic, 'id' | 'created_at'>
        Update: Partial<Omit<Topic, 'id' | 'created_at'>>
      }
      resources: {
        Row: Resource
        Insert: Omit<Resource, 'id' | 'created_at'>
        Update: Partial<Omit<Resource, 'id' | 'created_at'>>
      }
      mock_exams: {
        Row: MockExam
        Insert: Omit<MockExam, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<MockExam, 'id' | 'created_at' | 'updated_at'>>
      }
      tasks: {
        Row: Task
        Insert: Omit<Task, 'id' | 'created_at'>
        Update: Partial<Omit<Task, 'id' | 'created_at'>>
      }
      announcements: {
        Row: Announcement
        Insert: Omit<Announcement, 'id' | 'created_at'>
        Update: Partial<Omit<Announcement, 'id' | 'created_at'>>
      }
      stream_tokens: {
        Row: StreamToken
        Insert: Omit<StreamToken, 'id' | 'created_at'>
        Update: Partial<Omit<StreamToken, 'id' | 'created_at'>>
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