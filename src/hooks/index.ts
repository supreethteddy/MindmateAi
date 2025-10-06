import { useState, useEffect, useCallback } from 'react';
import { 
  User, 
  MoodLevel, 
  ChatMessage, 
  TherapySession, 
  WellnessGoal,
  AnalyticsData,
  PersonalizationData,
  CrisisContact,
  CommunityPost
} from '../types';
import { 
  authService, 
  moodService, 
  chatService, 
  therapyService,
  goalService,
  analyticsService,
  personalizationService,
  crisisService,
  communityService
} from '../services/api';

// Auth Hook
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          const userData = await authService.getCurrentUser();
          setUser(userData);
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
        localStorage.removeItem('authToken');
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const result = await authService.login(email, password);
      setUser(result.user);
      return result;
    } catch (error) {
      throw error;
    }
  }, []);

  const register = useCallback(async (userData: Partial<User>) => {
    try {
      const result = await authService.register(userData);
      setUser(result.user);
      return result;
    } catch (error) {
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
  }, []);

  return { user, loading, login, register, logout };
};

// Mood Tracking Hook
export const useMoodTracking = () => {
  const [moodHistory, setMoodHistory] = useState<MoodLevel[]>([]);
  const [currentMood, setCurrentMood] = useState<MoodLevel | null>(null);
  const [loading, setLoading] = useState(false);

  const logMood = useCallback(async (mood: Omit<MoodLevel, 'timestamp'>) => {
    setLoading(true);
    try {
      const newMood = await moodService.logMood(mood);
      setMoodHistory(prev => [newMood, ...prev]);
      setCurrentMood(newMood);
      return newMood;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const getMoodHistory = useCallback(async (period: 'week' | 'month' | 'year' = 'month') => {
    setLoading(true);
    try {
      const history = await moodService.getMoodHistory(period);
      setMoodHistory(history);
      return history;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const getMoodInsights = useCallback(async () => {
    try {
      return await moodService.getMoodInsights();
    } catch (error) {
      throw error;
    }
  }, []);

  return {
    moodHistory,
    currentMood,
    loading,
    logMood,
    getMoodHistory,
    getMoodInsights
  };
};

// Chat Hook
export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    setLoading(true);
    setIsTyping(true);
    
    try {
      // Add user message immediately
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        userId: 'current-user',
        content,
        type: 'user',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      // Send to API and get AI response
      const aiResponse = await chatService.sendMessage(content);
      setMessages(prev => [...prev, aiResponse]);
      
      return aiResponse;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
      setIsTyping(false);
    }
  }, []);

  const getChatHistory = useCallback(async () => {
    setLoading(true);
    try {
      const history = await chatService.getChatHistory();
      setMessages(history);
      return history;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    messages,
    loading,
    isTyping,
    sendMessage,
    getChatHistory
  };
};

// Therapy Tools Hook
export const useTherapyTools = () => {
  const [activeSession, setActiveSession] = useState<TherapySession | null>(null);
  const [breathingExercises, setBreathingExercises] = useState([]);
  const [mindfulnessSessions, setMindfulnessSessions] = useState([]);
  const [loading, setLoading] = useState(false);

  const startSession = useCallback(async (type: string) => {
    setLoading(true);
    try {
      const session = await therapyService.startSession(type);
      setActiveSession(session);
      return session;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const completeSession = useCallback(async (sessionId: string, data: Partial<TherapySession>) => {
    setLoading(true);
    try {
      const completedSession = await therapyService.completeSession(sessionId, data);
      setActiveSession(null);
      return completedSession;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const loadBreathingExercises = useCallback(async () => {
    try {
      const exercises = await therapyService.getBreathingExercises();
      setBreathingExercises(exercises);
      return exercises;
    } catch (error) {
      throw error;
    }
  }, []);

  const loadMindfulnessSessions = useCallback(async () => {
    try {
      const sessions = await therapyService.getMindfulnessSessions();
      setMindfulnessSessions(sessions);
      return sessions;
    } catch (error) {
      throw error;
    }
  }, []);

  return {
    activeSession,
    breathingExercises,
    mindfulnessSessions,
    loading,
    startSession,
    completeSession,
    loadBreathingExercises,
    loadMindfulnessSessions
  };
};

// Goals Hook
export const useGoals = () => {
  const [goals, setGoals] = useState<WellnessGoal[]>([]);
  const [loading, setLoading] = useState(false);

  const createGoal = useCallback(async (goal: Omit<WellnessGoal, 'id'>) => {
    setLoading(true);
    try {
      const newGoal = await goalService.createGoal(goal);
      setGoals(prev => [...prev, newGoal]);
      return newGoal;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateGoalProgress = useCallback(async (goalId: string, progress: number) => {
    setLoading(true);
    try {
      const updatedGoal = await goalService.updateGoalProgress(goalId, progress);
      setGoals(prev => prev.map(goal => goal.id === goalId ? updatedGoal : goal));
      return updatedGoal;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const getGoals = useCallback(async () => {
    setLoading(true);
    try {
      const goalsData = await goalService.getGoals();
      setGoals(goalsData);
      return goalsData;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const completeGoal = useCallback(async (goalId: string) => {
    setLoading(true);
    try {
      const completedGoal = await goalService.completeGoal(goalId);
      setGoals(prev => prev.map(goal => goal.id === goalId ? completedGoal : goal));
      return completedGoal;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    goals,
    loading,
    createGoal,
    updateGoalProgress,
    getGoals,
    completeGoal
  };
};

// Analytics Hook
export const useAnalytics = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(false);

  const getAnalytics = useCallback(async (period: 'week' | 'month' | 'quarter' | 'year' = 'month') => {
    setLoading(true);
    try {
      const data = await analyticsService.getAnalytics(period);
      setAnalytics(data);
      return data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const getInsights = useCallback(async () => {
    try {
      return await analyticsService.getInsights();
    } catch (error) {
      throw error;
    }
  }, []);

  return {
    analytics,
    loading,
    getAnalytics,
    getInsights
  };
};

// Personalization Hook
export const usePersonalization = () => {
  const [preferences, setPreferences] = useState<PersonalizationData | null>(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const updatePreferences = useCallback(async (newPreferences: Partial<PersonalizationData>) => {
    setLoading(true);
    try {
      const updated = await personalizationService.updatePreferences(newPreferences);
      setPreferences(updated);
      return updated;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const getRecommendations = useCallback(async () => {
    setLoading(true);
    try {
      const recs = await personalizationService.getRecommendations();
      setRecommendations(recs);
      return recs;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const trackInteraction = useCallback(async (interaction: string, effectiveness: number) => {
    try {
      return await personalizationService.trackInteraction(interaction, effectiveness);
    } catch (error) {
      throw error;
    }
  }, []);

  return {
    preferences,
    recommendations,
    loading,
    updatePreferences,
    getRecommendations,
    trackInteraction
  };
};

// Crisis Support Hook
export const useCrisisSupport = () => {
  const [crisisContacts, setCrisisContacts] = useState<CrisisContact[]>([]);
  const [loading, setLoading] = useState(false);

  const addCrisisContact = useCallback(async (contact: Omit<CrisisContact, 'id'>) => {
    setLoading(true);
    try {
      const newContact = await crisisService.addCrisisContact(contact);
      setCrisisContacts(prev => [...prev, newContact]);
      return newContact;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const getCrisisContacts = useCallback(async () => {
    setLoading(true);
    try {
      const contacts = await crisisService.getCrisisContacts();
      setCrisisContacts(contacts);
      return contacts;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const triggerCrisisSupport = useCallback(async (severity: 'low' | 'medium' | 'high') => {
    try {
      return await crisisService.triggerCrisisSupport(severity);
    } catch (error) {
      throw error;
    }
  }, []);

  return {
    crisisContacts,
    loading,
    addCrisisContact,
    getCrisisContacts,
    triggerCrisisSupport
  };
};

// Community Hook
export const useCommunity = () => {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(false);

  const getPosts = useCallback(async (category?: string) => {
    setLoading(true);
    try {
      const postsData = await communityService.getPosts(category);
      setPosts(postsData);
      return postsData;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const createPost = useCallback(async (post: Omit<CommunityPost, 'id' | 'createdAt' | 'likes' | 'comments'>) => {
    setLoading(true);
    try {
      const newPost = await communityService.createPost(post);
      setPosts(prev => [newPost, ...prev]);
      return newPost;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const likePost = useCallback(async (postId: string) => {
    try {
      const updatedPost = await communityService.likePost(postId);
      setPosts(prev => prev.map(post => post.id === postId ? updatedPost : post));
      return updatedPost;
    } catch (error) {
      throw error;
    }
  }, []);

  return {
    posts,
    loading,
    getPosts,
    createPost,
    likePost
  };
};
