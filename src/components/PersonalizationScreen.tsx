import React, { useState, useEffect } from 'react';
import { usePersonalization } from '../hooks';
import { PersonalizationData } from '../types';
import toast from 'react-hot-toast';

const PersonalizationScreen: React.FC = () => {
  const { preferences, recommendations, loading, updatePreferences, getRecommendations, trackInteraction } = usePersonalization();
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [interactionFeedback, setInteractionFeedback] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    getRecommendations();
  }, [getRecommendations]);

  const communicationStyles = [
    { id: 'supportive', name: 'Supportive', description: 'Gentle, encouraging, and empathetic' },
    { id: 'direct', name: 'Direct', description: 'Clear, straightforward, and to the point' },
    { id: 'gentle', name: 'Gentle', description: 'Soft, caring, and nurturing' },
    { id: 'motivational', name: 'Motivational', description: 'Energetic, inspiring, and uplifting' }
  ];

  const contentTypes = [
    'breathing-exercises',
    'mindfulness-meditation',
    'cbt-techniques',
    'mood-tracking',
    'journaling-prompts',
    'sleep-hygiene',
    'stress-management',
    'anxiety-relief',
    'depression-support',
    'social-connection'
  ];

  const learningPreferences = [
    'visual-learning',
    'audio-guided',
    'interactive-exercises',
    'text-based',
    'step-by-step',
    'self-paced',
    'group-activities',
    'one-on-one'
  ];

  const culturalConsiderations = [
    'western-approach',
    'eastern-philosophy',
    'religious-integration',
    'secular-approach',
    'family-focused',
    'individual-focused',
    'community-oriented',
    'spiritual-wellness'
  ];

  const handlePreferenceUpdate = async (key: string, value: any) => {
    try {
      await updatePreferences({ [key]: value });
      toast.success('Preferences updated');
    } catch (error) {
      toast.error('Failed to update preferences');
    }
  };

  const handleInteractionFeedback = async (interaction: string, effectiveness: number) => {
    try {
      await trackInteraction(interaction, effectiveness);
      setInteractionFeedback(prev => ({ ...prev, [interaction]: effectiveness }));
      toast.success('Feedback recorded');
    } catch (error) {
      toast.error('Failed to record feedback');
    }
  };

  const mockRecommendations = [
    {
      type: 'content',
      title: 'Morning Mindfulness',
      description: 'Based on your preferences, try starting your day with a 5-minute breathing exercise',
      effectiveness: 0.85,
      category: 'breathing-exercises'
    },
    {
      type: 'timing',
      title: 'Optimal Session Time',
      description: 'Your data shows you respond best to therapy sessions in the morning (9-11 AM)',
      effectiveness: 0.78,
      category: 'timing'
    },
    {
      type: 'intervention',
      title: 'CBT Journaling',
      description: 'You\'ve shown great progress with CBT techniques. Try our advanced journaling prompts',
      effectiveness: 0.92,
      category: 'cbt-techniques'
    },
    {
      type: 'communication',
      title: 'Communication Style',
      description: 'We\'ll adjust our tone to be more supportive and gentle based on your preferences',
      effectiveness: 0.88,
      category: 'communication'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-purple-50 px-6 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          AI Personalization
        </h2>
        <p className="text-gray-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
          Customize your wellness experience with AI-powered insights
        </p>
      </div>

      {/* Communication Style */}
      <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Communication Style
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {communicationStyles.map((style) => (
            <button
              key={style.id}
              onClick={() => handlePreferenceUpdate('communicationStyle', style.id)}
              className={`p-4 rounded-xl text-left transition-all duration-300 ${
                preferences?.communicationStyle === style.id
                  ? 'bg-purple-100 border-2 border-purple-500'
                  : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
              }`}
            >
              <h4 className="font-semibold text-gray-800 mb-2">{style.name}</h4>
              <p className="text-sm text-gray-600">{style.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Content Preferences */}
      <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Preferred Content Types
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {contentTypes.map((type) => (
            <button
              key={type}
              onClick={() => {
                const currentTypes = preferences?.preferredContentTypes || [];
                const newTypes = currentTypes.includes(type)
                  ? currentTypes.filter(t => t !== type)
                  : [...currentTypes, type];
                handlePreferenceUpdate('preferredContentTypes', newTypes);
              }}
              className={`p-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                preferences?.preferredContentTypes?.includes(type)
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {type.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </button>
          ))}
        </div>
      </div>

      {/* Learning Preferences */}
      <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Learning Preferences
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {learningPreferences.map((preference) => (
            <button
              key={preference}
              onClick={() => {
                const currentPrefs = preferences?.learningPreferences || [];
                const newPrefs = currentPrefs.includes(preference)
                  ? currentPrefs.filter(p => p !== preference)
                  : [...currentPrefs, preference];
                handlePreferenceUpdate('learningPreferences', newPrefs);
              }}
              className={`p-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                preferences?.learningPreferences?.includes(preference)
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {preference.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </button>
          ))}
        </div>
      </div>

      {/* Cultural Considerations */}
      <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Cultural Considerations
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {culturalConsiderations.map((consideration) => (
            <button
              key={consideration}
              onClick={() => {
                const currentConsiderations = preferences?.culturalConsiderations || [];
                const newConsiderations = currentConsiderations.includes(consideration)
                  ? currentConsiderations.filter(c => c !== consideration)
                  : [...currentConsiderations, consideration];
                handlePreferenceUpdate('culturalConsiderations', newConsiderations);
              }}
              className={`p-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                preferences?.culturalConsiderations?.includes(consideration)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {consideration.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </button>
          ))}
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
            AI-Powered Recommendations
          </h3>
          <button
            onClick={() => setShowRecommendations(!showRecommendations)}
            className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200 transition-all duration-300"
          >
            {showRecommendations ? 'Hide' : 'Show'} Recommendations
          </button>
        </div>

        {showRecommendations && (
          <div className="space-y-4">
            {mockRecommendations.map((rec, index) => (
              <div key={index} className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border-l-4 border-purple-400">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-800">{rec.title}</h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Effectiveness:</span>
                    <span className="text-sm font-medium text-purple-600">
                      {Math.round(rec.effectiveness * 100)}%
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
                
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">How helpful was this?</span>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => handleInteractionFeedback(rec.title, rating)}
                        className={`w-6 h-6 rounded-full text-xs font-medium transition-all duration-300 ${
                          interactionFeedback[rec.title] === rating
                            ? 'bg-yellow-400 text-white'
                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                        }`}
                      >
                        {rating}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Personalization Insights */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Personalization Insights
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Optimal Session Times</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Morning (9-11 AM)</span>
                <span className="text-sm font-medium text-blue-600">85% effectiveness</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Afternoon (2-4 PM)</span>
                <span className="text-sm font-medium text-blue-600">72% effectiveness</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Evening (7-9 PM)</span>
                <span className="text-sm font-medium text-blue-600">68% effectiveness</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Most Effective Interventions</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Breathing Exercises</span>
                <span className="text-sm font-medium text-green-600">92% helpful</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">CBT Journaling</span>
                <span className="text-sm font-medium text-green-600">88% helpful</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Mindfulness</span>
                <span className="text-sm font-medium text-green-600">85% helpful</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-purple-50 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-2">AI Learning Progress</h4>
          <p className="text-sm text-gray-600 mb-3">
            Our AI has learned from your interactions and is continuously improving recommendations based on your preferences and responses.
          </p>
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '78%' }}></div>
            </div>
            <span className="text-sm font-medium text-purple-600">78% personalized</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalizationScreen;
