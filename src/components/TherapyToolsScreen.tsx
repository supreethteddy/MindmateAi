import React, { useState, useEffect, useRef } from 'react';
import { useTherapyTools } from '../hooks';
import { BreathingExercise, MindfulnessSession } from '../types';
import toast from 'react-hot-toast';

const TherapyToolsScreen: React.FC = () => {
  const { 
    activeSession, 
    breathingExercises, 
    mindfulnessSessions, 
    loading, 
    startSession, 
    completeSession,
    loadBreathingExercises,
    loadMindfulnessSessions
  } = useTherapyTools();

  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale' | 'rest'>('inhale');
  const [breathingCount, setBreathingCount] = useState(0);
  const [breathingCycle, setBreathingCycle] = useState(0);
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathingTimer, setBreathingTimer] = useState(0);
  const [moodBefore, setMoodBefore] = useState<number>(5);
  const [moodAfter, setMoodAfter] = useState<number>(5);
  const [journalEntry, setJournalEntry] = useState({
    situation: '',
    thoughts: '',
    emotions: [],
    behaviors: '',
    alternativeThoughts: ''
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    loadBreathingExercises();
    loadMindfulnessSessions();
  }, [loadBreathingExercises, loadMindfulnessSessions]);

  useEffect(() => {
    if (isBreathingActive && selectedTool === 'breathing') {
      startBreathingExercise();
    } else {
      stopBreathingExercise();
    }
  }, [isBreathingActive, selectedTool]);

  const startBreathingExercise = () => {
    const exercise = breathingExercises[0]; // Use first exercise for demo
    if (!exercise) return;

    let phaseIndex = 0;
    const phases = ['inhale', 'hold', 'exhale', 'rest'];
    const durations = [exercise.inhaleDuration, exercise.holdDuration, exercise.exhaleDuration, 2];

    intervalRef.current = setInterval(() => {
      setBreathingPhase(phases[phaseIndex] as any);
      setBreathingTimer(durations[phaseIndex]);

      const timerInterval = setInterval(() => {
        setBreathingTimer(prev => {
          if (prev <= 1) {
            clearInterval(timerInterval);
            phaseIndex = (phaseIndex + 1) % phases.length;
            if (phaseIndex === 0) {
              setBreathingCycle(prev => prev + 1);
            }
            return durations[phaseIndex];
          }
          return prev - 1;
        });
      }, 1000);
    }, 1000);
  };

  const stopBreathingExercise = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsBreathingActive(false);
    setBreathingPhase('inhale');
    setBreathingCount(0);
    setBreathingCycle(0);
    setBreathingTimer(0);
  };

  const handleToolSelect = async (tool: string) => {
    setSelectedTool(tool);
    try {
      await startSession(tool);
      toast.success(`${tool.charAt(0).toUpperCase() + tool.slice(1)} session started`);
    } catch (error) {
      toast.error('Failed to start session');
    }
  };

  const handleSessionComplete = async () => {
    if (!activeSession) return;

    try {
      await completeSession(activeSession.id, {
        moodBefore,
        moodAfter,
        effectiveness: Math.abs(moodAfter - moodBefore) + 5
      });
      toast.success('Session completed successfully!');
      setSelectedTool(null);
      setMoodBefore(5);
      setMoodAfter(5);
    } catch (error) {
      toast.error('Failed to complete session');
    }
  };

  const handleJournalSubmit = async () => {
    try {
      // Save journal entry
      toast.success('Journal entry saved');
      setJournalEntry({
        situation: '',
        thoughts: '',
        emotions: [],
        behaviors: '',
        alternativeThoughts: ''
      });
    } catch (error) {
      toast.error('Failed to save journal entry');
    }
  };

  const tools = [
    {
      title: 'Guided Breathing',
      description: 'Calm your mind with breathing exercises',
      icon: 'fas fa-lungs',
      gradient: 'from-sky-200 to-blue-200',
      type: 'breathing',
      image: 'https://readdy.ai/api/search-image?query=animated%20breathing%20lungs%2C%20peaceful%20meditation%2C%20soft%20pastel%20colors%2C%20minimalist%20health%20illustration%2C%20calming%20atmosphere%2C%20gentle%20glow%20effects%2C%20wellness%20concept%2C%20isolated%20on%20light%20background%2C%20centered%20composition&width=150&height=100&seq=breath1&orientation=landscape'
    },
    {
      title: 'CBT Journaling',
      description: 'Process thoughts with guided prompts',
      icon: 'fas fa-book-heart',
      gradient: 'from-purple-200 to-pink-200',
      type: 'journaling',
      image: 'https://readdy.ai/api/search-image?query=minimalist%20journal%20with%20heart%20bookmark%2C%20writing%20therapy%2C%20soft%20colors%2C%20peaceful%20study%20concept%2C%20gentle%20lighting%2C%20wellness%20journaling%2C%20isolated%20on%20light%20background%2C%20centered%20composition&width=150&height=100&seq=journal1&orientation=landscape'
    },
    {
      title: 'Mindfulness',
      description: 'Find peace in the present moment',
      icon: 'fas fa-leaf',
      gradient: 'from-green-200 to-teal-200',
      type: 'mindfulness',
      image: 'https://readdy.ai/api/search-image?query=zen%20abstract%20shapes%2C%20mindfulness%20meditation%2C%20peaceful%20nature%20elements%2C%20soft%20gradients%2C%20minimalist%20spiritual%20concept%2C%20calming%20atmosphere%2C%20isolated%20on%20light%20background%2C%20centered%20composition&width=150&height=100&seq=mindful1&orientation=landscape'
    },
    {
      title: 'Sleep Reset',
      description: 'Prepare your mind for restful sleep',
      icon: 'fas fa-moon',
      gradient: 'from-indigo-200 to-purple-200',
      type: 'sleep',
      image: 'https://readdy.ai/api/search-image?query=crescent%20moon%20with%20soft%20stars%2C%20peaceful%20night%20sky%2C%20dreamy%20atmosphere%2C%20sleep%20wellness%20concept%2C%20gentle%20glow%2C%20minimalist%20design%2C%20isolated%20on%20light%20background%2C%20centered%20composition&width=150&height=100&seq=sleep1&orientation=landscape'
    }
  ];

  const emotions = ['Anxious', 'Sad', 'Angry', 'Frustrated', 'Overwhelmed', 'Lonely', 'Stressed', 'Confused'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-purple-50 px-6 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Therapy Tools
        </h2>
        <p className="text-gray-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
          Evidence-based techniques for your wellness journey
        </p>
      </div>

      {/* Breathing Exercise Tool */}
      {selectedTool === 'breathing' && (
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Guided Breathing Exercise
            </h3>
            <p className="text-gray-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Follow the breathing pattern to reduce stress and anxiety
            </p>
          </div>

          {/* Breathing Circle */}
          <div className="flex justify-center mb-8">
            <div className={`w-48 h-48 rounded-full flex items-center justify-center text-white text-2xl font-bold transition-all duration-1000 ${
              breathingPhase === 'inhale' ? 'bg-green-400 scale-110' :
              breathingPhase === 'hold' ? 'bg-blue-400 scale-105' :
              breathingPhase === 'exhale' ? 'bg-purple-400 scale-95' :
              'bg-gray-400 scale-100'
            }`}>
              <div className="text-center">
                <div className="text-4xl mb-2">
                  {breathingPhase === 'inhale' ? '🌬️' :
                   breathingPhase === 'hold' ? '⏸️' :
                   breathingPhase === 'exhale' ? '💨' : '😌'}
                </div>
                <div className="text-lg capitalize">{breathingPhase}</div>
                <div className="text-3xl">{breathingTimer}</div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="text-center space-y-4">
            <div className="text-lg text-gray-600">
              Cycle: {breathingCycle} / 5
            </div>
            
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setIsBreathingActive(!isBreathingActive)}
                className={`px-6 py-3 rounded-full font-semibold text-lg transition-all duration-300 ${
                  isBreathingActive 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                {isBreathingActive ? 'Pause' : 'Start'}
              </button>
              
              <button
                onClick={stopBreathingExercise}
                className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-full font-semibold text-lg transition-all duration-300"
              >
                Stop
              </button>
            </div>

            {/* Mood Rating */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How do you feel after this exercise? (1-10)
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={moodAfter}
                onChange={(e) => setMoodAfter(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1 (Very Low)</span>
                <span>10 (Very High)</span>
              </div>
            </div>

            <button
              onClick={handleSessionComplete}
              className="w-full py-3 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Complete Session
            </button>
          </div>
        </div>
      )}

      {/* CBT Journaling Tool */}
      {selectedTool === 'journaling' && (
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
              CBT Thought Journal
            </h3>
            <p className="text-gray-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Challenge negative thoughts and develop healthier thinking patterns
            </p>
          </div>

          <div className="space-y-6">
            {/* Situation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                What situation triggered these thoughts?
              </label>
              <textarea
                value={journalEntry.situation}
                onChange={(e) => setJournalEntry(prev => ({ ...prev, situation: e.target.value }))}
                placeholder="Describe the situation that led to your emotional response..."
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 resize-none"
                rows={3}
              />
            </div>

            {/* Thoughts */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                What thoughts went through your mind?
              </label>
              <textarea
                value={journalEntry.thoughts}
                onChange={(e) => setJournalEntry(prev => ({ ...prev, thoughts: e.target.value }))}
                placeholder="Write down the thoughts that came to mind..."
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 resize-none"
                rows={3}
              />
            </div>

            {/* Emotions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                What emotions did you feel?
              </label>
              <div className="grid grid-cols-4 gap-2">
                {emotions.map((emotion) => (
                  <button
                    key={emotion}
                    onClick={() => {
                      const newEmotions = journalEntry.emotions.includes(emotion)
                        ? journalEntry.emotions.filter(e => e !== emotion)
                        : [...journalEntry.emotions, emotion];
                      setJournalEntry(prev => ({ ...prev, emotions: newEmotions }));
                    }}
                    className={`px-3 py-2 rounded-lg text-xs transition-all duration-300 ${
                      journalEntry.emotions.includes(emotion)
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {emotion}
                  </button>
                ))}
              </div>
            </div>

            {/* Behaviors */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                How did you behave in response?
              </label>
              <textarea
                value={journalEntry.behaviors}
                onChange={(e) => setJournalEntry(prev => ({ ...prev, behaviors: e.target.value }))}
                placeholder="Describe your actions or behaviors..."
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 resize-none"
                rows={3}
              />
            </div>

            {/* Alternative Thoughts */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                What's a more balanced way to think about this?
              </label>
              <textarea
                value={journalEntry.alternativeThoughts}
                onChange={(e) => setJournalEntry(prev => ({ ...prev, alternativeThoughts: e.target.value }))}
                placeholder="Consider alternative perspectives or more realistic thoughts..."
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 resize-none"
                rows={3}
              />
            </div>

            <button
              onClick={handleJournalSubmit}
              className="w-full py-3 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Save Journal Entry
            </button>
          </div>
        </div>
      )}

      {/* Tools Grid */}
      {!selectedTool && (
        <div className="grid grid-cols-2 gap-4">
          {tools.map((tool, index) => (
            <div
              key={index}
              onClick={() => handleToolSelect(tool.type)}
              className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <div className="h-20 mb-4 rounded-xl overflow-hidden">
                <img
                  src={tool.image}
                  alt={tool.title}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {tool.title}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif' }}>
                {tool.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Back Button */}
      {selectedTool && (
        <div className="text-center mt-6">
          <button
            onClick={() => setSelectedTool(null)}
            className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-semibold text-lg transition-all duration-300"
          >
            Back to Tools
          </button>
        </div>
      )}
    </div>
  );
};

export default TherapyToolsScreen;
