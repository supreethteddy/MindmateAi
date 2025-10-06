// Types for MindMate AI Application
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  preferences: UserPreferences;
  wellnessProfile: WellnessProfile;
}

export interface UserPreferences {
  notifications: boolean;
  reminderTime: string;
  privacyLevel: 'private' | 'anonymous' | 'public';
  preferredTherapyMethods: string[];
  crisisContacts: CrisisContact[];
}

export interface WellnessProfile {
  currentMood: MoodLevel;
  stressLevel: number; // 1-10
  sleepQuality: number; // 1-10
  anxietyLevel: number; // 1-10
  depressionLevel: number; // 1-10
  goals: WellnessGoal[];
  achievements: Achievement[];
}

export interface MoodLevel {
  level: number; // 1-5 (sad to joyful)
  emotion: string;
  timestamp: Date;
  notes?: string;
  triggers?: string[];
}

export interface WellnessGoal {
  id: string;
  title: string;
  description: string;
  targetDate: Date;
  progress: number; // 0-100
  category: 'mood' | 'stress' | 'sleep' | 'anxiety' | 'depression' | 'general';
  isCompleted: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  earnedAt: Date;
  category: 'streak' | 'milestone' | 'tool' | 'community';
  icon: string;
}

export interface CrisisContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
  isEmergency: boolean;
}

export interface ChatMessage {
  id: string;
  userId: string;
  content: string;
  type: 'user' | 'ai';
  timestamp: Date;
  emotionalAnalysis?: EmotionalAnalysis;
  suggestedActions?: string[];
}

export interface EmotionalAnalysis {
  sentiment: 'positive' | 'negative' | 'neutral';
  emotions: string[];
  intensity: number; // 1-10
  riskLevel: 'low' | 'medium' | 'high';
  suggestedInterventions: string[];
}

export interface TherapySession {
  id: string;
  userId: string;
  type: 'breathing' | 'cbt' | 'mindfulness' | 'sleep' | 'journaling';
  duration: number; // in minutes
  completedAt: Date;
  effectiveness: number; // 1-10
  notes?: string;
  moodBefore: number;
  moodAfter: number;
}

export interface BreathingExercise {
  id: string;
  name: string;
  description: string;
  inhaleDuration: number;
  holdDuration: number;
  exhaleDuration: number;
  cycles: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface CBTJournalEntry {
  id: string;
  userId: string;
  situation: string;
  thoughts: string;
  emotions: string[];
  behaviors: string;
  alternativeThoughts: string;
  createdAt: Date;
}

export interface MindfulnessSession {
  id: string;
  name: string;
  description: string;
  duration: number;
  audioUrl?: string;
  guided: boolean;
  category: 'breathing' | 'body-scan' | 'loving-kindness' | 'walking';
}

export interface NotificationSettings {
  dailyCheckIn: boolean;
  moodReminder: boolean;
  therapySession: boolean;
  goalReminder: boolean;
  crisisSupport: boolean;
  communityUpdates: boolean;
}

export interface CommunityPost {
  id: string;
  userId: string;
  content: string;
  category: 'support' | 'celebration' | 'advice' | 'question';
  isAnonymous: boolean;
  likes: number;
  comments: CommunityComment[];
  createdAt: Date;
}

export interface CommunityComment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  isAnonymous: boolean;
  createdAt: Date;
}

export interface ProfessionalDashboard {
  therapistId: string;
  patients: PatientSummary[];
  sessionNotes: SessionNote[];
  treatmentPlans: TreatmentPlan[];
}

export interface PatientSummary {
  userId: string;
  name: string;
  lastSession: Date;
  moodTrend: number[];
  progressScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  nextAppointment?: Date;
}

export interface SessionNote {
  id: string;
  patientId: string;
  therapistId: string;
  sessionDate: Date;
  notes: string;
  moodRating: number;
  goals: string[];
  homework: string[];
}

export interface TreatmentPlan {
  id: string;
  patientId: string;
  therapistId: string;
  goals: string[];
  interventions: string[];
  timeline: string;
  progressMetrics: string[];
}

export interface AnalyticsData {
  userId: string;
  period: 'week' | 'month' | 'quarter' | 'year';
  moodTrend: number[];
  stressTrend: number[];
  sleepTrend: number[];
  therapySessionCount: number;
  goalProgress: number;
  insights: string[];
  recommendations: string[];
}

export interface PersonalizationData {
  userId: string;
  preferredContentTypes: string[];
  effectiveInterventions: string[];
  optimalSessionTimes: string[];
  communicationStyle: 'supportive' | 'direct' | 'gentle' | 'motivational';
  learningPreferences: string[];
  culturalConsiderations: string[];
}
