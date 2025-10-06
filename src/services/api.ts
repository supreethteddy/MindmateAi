import axios from 'axios';
import { 
  User, 
  MoodLevel, 
  ChatMessage, 
  TherapySession, 
  CBTJournalEntry,
  CommunityPost,
  AnalyticsData,
  PersonalizationData,
  WellnessGoal,
  Achievement,
  CrisisContact
} from '../types';

// Mock API base URL - replace with your actual backend
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API Services
export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    localStorage.setItem('authToken', response.data.token);
    return response.data;
  },
  
  register: async (userData: Partial<User>) => {
    const response = await api.post('/auth/register', userData);
    localStorage.setItem('authToken', response.data.token);
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem('authToken');
  },
  
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get('/auth/me');
    return response.data;
  }
};

export const moodService = {
  logMood: async (mood: Omit<MoodLevel, 'timestamp'>) => {
    const response = await api.post('/mood/log', mood);
    return response.data;
  },
  
  getMoodHistory: async (period: 'week' | 'month' | 'year' = 'month') => {
    const response = await api.get(`/mood/history?period=${period}`);
    return response.data;
  },
  
  getMoodInsights: async () => {
    const response = await api.get('/mood/insights');
    return response.data;
  }
};

export const chatService = {
  sendMessage: async (content: string): Promise<ChatMessage> => {
    const response = await api.post('/chat/send', { content });
    return response.data;
  },
  
  getChatHistory: async (limit: number = 50) => {
    const response = await api.get(`/chat/history?limit=${limit}`);
    return response.data;
  },
  
  analyzeEmotion: async (text: string) => {
    const response = await api.post('/chat/analyze-emotion', { text });
    return response.data;
  }
};

export const therapyService = {
  startSession: async (type: string) => {
    const response = await api.post('/therapy/start-session', { type });
    return response.data;
  },
  
  completeSession: async (sessionId: string, data: Partial<TherapySession>) => {
    const response = await api.post(`/therapy/complete-session/${sessionId}`, data);
    return response.data;
  },
  
  getBreathingExercises: async () => {
    const response = await api.get('/therapy/breathing-exercises');
    return response.data;
  },
  
  getMindfulnessSessions: async () => {
    const response = await api.get('/therapy/mindfulness-sessions');
    return response.data;
  },
  
  saveJournalEntry: async (entry: Omit<CBTJournalEntry, 'id' | 'createdAt'>) => {
    const response = await api.post('/therapy/journal', entry);
    return response.data;
  },
  
  getJournalEntries: async () => {
    const response = await api.get('/therapy/journal');
    return response.data;
  }
};

export const communityService = {
  getPosts: async (category?: string) => {
    const response = await api.get(`/community/posts${category ? `?category=${category}` : ''}`);
    return response.data;
  },
  
  createPost: async (post: Omit<CommunityPost, 'id' | 'createdAt' | 'likes' | 'comments'>) => {
    const response = await api.post('/community/posts', post);
    return response.data;
  },
  
  likePost: async (postId: string) => {
    const response = await api.post(`/community/posts/${postId}/like`);
    return response.data;
  },
  
  addComment: async (postId: string, content: string) => {
    const response = await api.post(`/community/posts/${postId}/comments`, { content });
    return response.data;
  }
};

export const analyticsService = {
  getAnalytics: async (period: 'week' | 'month' | 'quarter' | 'year' = 'month'): Promise<AnalyticsData> => {
    const response = await api.get(`/analytics?period=${period}`);
    return response.data;
  },
  
  getProgressReport: async () => {
    const response = await api.get('/analytics/progress-report');
    return response.data;
  },
  
  getInsights: async () => {
    const response = await api.get('/analytics/insights');
    return response.data;
  }
};

export const personalizationService = {
  updatePreferences: async (preferences: Partial<PersonalizationData>) => {
    const response = await api.put('/personalization/preferences', preferences);
    return response.data;
  },
  
  getRecommendations: async () => {
    const response = await api.get('/personalization/recommendations');
    return response.data;
  },
  
  trackInteraction: async (interaction: string, effectiveness: number) => {
    const response = await api.post('/personalization/track-interaction', { interaction, effectiveness });
    return response.data;
  }
};

export const goalService = {
  createGoal: async (goal: Omit<WellnessGoal, 'id'>) => {
    const response = await api.post('/goals', goal);
    return response.data;
  },
  
  updateGoalProgress: async (goalId: string, progress: number) => {
    const response = await api.put(`/goals/${goalId}/progress`, { progress });
    return response.data;
  },
  
  getGoals: async () => {
    const response = await api.get('/goals');
    return response.data;
  },
  
  completeGoal: async (goalId: string) => {
    const response = await api.put(`/goals/${goalId}/complete`);
    return response.data;
  }
};

export const crisisService = {
  getCrisisResources: async () => {
    const response = await api.get('/crisis/resources');
    return response.data;
  },
  
  addCrisisContact: async (contact: Omit<CrisisContact, 'id'>) => {
    const response = await api.post('/crisis/contacts', contact);
    return response.data;
  },
  
  getCrisisContacts: async () => {
    const response = await api.get('/crisis/contacts');
    return response.data;
  },
  
  triggerCrisisSupport: async (severity: 'low' | 'medium' | 'high') => {
    const response = await api.post('/crisis/support', { severity });
    return response.data;
  }
};

export const notificationService = {
  getNotifications: async () => {
    const response = await api.get('/notifications');
    return response.data;
  },
  
  markAsRead: async (notificationId: string) => {
    const response = await api.put(`/notifications/${notificationId}/read`);
    return response.data;
  },
  
  updateSettings: async (settings: any) => {
    const response = await api.put('/notifications/settings', settings);
    return response.data;
  }
};

export default api;
