import React, { useState, useEffect } from 'react';
import { useMoodTracking } from '../hooks';
import { MoodLevel } from '../types';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { format, subDays, startOfWeek, endOfWeek } from 'date-fns';
import toast from 'react-hot-toast';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MoodTrackerScreen: React.FC = () => {
  const { moodHistory, currentMood, loading, logMood, getMoodHistory, getMoodInsights } = useMoodTracking();
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [moodNotes, setMoodNotes] = useState('');
  const [triggers, setTriggers] = useState<string[]>([]);
  const [showInsights, setShowInsights] = useState(false);
  const [insights, setInsights] = useState<any>(null);

  const moods = [
    { emoji: '😢', label: 'Sad', color: 'text-blue-400', level: 1 },
    { emoji: '😐', label: 'Okay', color: 'text-gray-400', level: 2 },
    { emoji: '🙂', label: 'Good', color: 'text-green-400', level: 3 },
    { emoji: '😊', label: 'Happy', color: 'text-yellow-400', level: 4 },
    { emoji: '🤗', label: 'Joyful', color: 'text-pink-400', level: 5 }
  ];

  const commonTriggers = [
    'Work stress', 'Family issues', 'Health concerns', 'Financial worries',
    'Social situations', 'Sleep problems', 'Exercise', 'Weather',
    'Social media', 'News', 'Relationships', 'Achievements'
  ];

  useEffect(() => {
    getMoodHistory('week');
  }, [getMoodHistory]);

  const handleMoodSubmit = async () => {
    if (selectedMood === null) {
      toast.error('Please select a mood');
      return;
    }

    try {
      const moodData: Omit<MoodLevel, 'timestamp'> = {
        level: selectedMood,
        emotion: moods.find(m => m.level === selectedMood)?.label || '',
        notes: moodNotes,
        triggers: triggers
      };

      await logMood(moodData);
      toast.success('Mood logged successfully!');
      
      // Reset form
      setSelectedMood(null);
      setMoodNotes('');
      setTriggers([]);
    } catch (error) {
      toast.error('Failed to log mood');
    }
  };

  const handleTriggerToggle = (trigger: string) => {
    setTriggers(prev => 
      prev.includes(trigger) 
        ? prev.filter(t => t !== trigger)
        : [...prev, trigger]
    );
  };

  const loadInsights = async () => {
    try {
      const data = await getMoodInsights();
      setInsights(data);
      setShowInsights(true);
    } catch (error) {
      toast.error('Failed to load insights');
    }
  };

  // Prepare chart data
  const chartData = {
    labels: moodHistory.slice(0, 7).reverse().map(mood => 
      format(new Date(mood.timestamp), 'MMM dd')
    ),
    datasets: [
      {
        label: 'Mood Level',
        data: moodHistory.slice(0, 7).reverse().map(mood => mood.level),
        borderColor: 'rgb(147, 51, 234)',
        backgroundColor: 'rgba(147, 51, 234, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Your Mood Trend (Last 7 Days)'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
        ticks: {
          stepSize: 1,
          callback: function(value: any) {
            const mood = moods.find(m => m.level === value);
            return mood ? `${value} - ${mood.label}` : value;
          }
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-purple-50 px-6 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          How are you feeling today?
        </h2>
        <p className="text-gray-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
          Your emotions matter. Let's check in together.
        </p>
      </div>

      {/* Current Mood Display */}
      {currentMood && (
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Today's Mood
          </h3>
          <div className="flex items-center space-x-4">
            <div className="text-4xl">
              {moods.find(m => m.level === currentMood.level)?.emoji}
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-800">
                {currentMood.emotion} ({currentMood.level}/5)
              </p>
              <p className="text-sm text-gray-500">
                {format(new Date(currentMood.timestamp), 'h:mm a')}
              </p>
            </div>
          </div>
          {currentMood.notes && (
            <p className="mt-3 text-gray-600 italic">"{currentMood.notes}"</p>
          )}
          {currentMood.triggers && currentMood.triggers.length > 0 && (
            <div className="mt-3">
              <p className="text-sm text-gray-500 mb-2">Triggers:</p>
              <div className="flex flex-wrap gap-2">
                {currentMood.triggers.map((trigger, index) => (
                  <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                    {trigger}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mood Selector */}
      <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Log Your Current Mood
        </h3>
        
        <div className="flex justify-between mb-8 px-4">
          {moods.map((mood) => (
            <button
              key={mood.level}
              onClick={() => setSelectedMood(mood.level)}
              className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl transition-all duration-300 cursor-pointer ${
                selectedMood === mood.level
                  ? 'bg-white shadow-lg scale-110 border-2 border-purple-400'
                  : 'bg-white/50 hover:bg-white hover:shadow-md'
              }`}
            >
              {mood.emoji}
            </button>
          ))}
        </div>

        {/* Mood Notes */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
            How are you feeling? (Optional)
          </label>
          <textarea
            value={moodNotes}
            onChange={(e) => setMoodNotes(e.target.value)}
            placeholder="Describe what's on your mind..."
            className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 resize-none"
            style={{ fontFamily: 'Nunito, sans-serif' }}
            rows={3}
          />
        </div>

        {/* Triggers */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
            What's affecting your mood? (Select all that apply)
          </label>
          <div className="grid grid-cols-3 gap-2">
            {commonTriggers.map((trigger) => (
              <button
                key={trigger}
                onClick={() => handleTriggerToggle(trigger)}
                className={`px-3 py-2 rounded-lg text-xs transition-all duration-300 cursor-pointer ${
                  triggers.includes(trigger)
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={{ fontFamily: 'Nunito, sans-serif' }}
              >
                {trigger}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleMoodSubmit}
          disabled={selectedMood === null || loading}
          className="w-full py-4 bg-gradient-to-r from-purple-300 to-sky-300 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          {loading ? 'Logging...' : 'Log My Mood'}
        </button>
      </div>

      {/* Mood Chart */}
      {moodHistory.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Your Mood Trend
            </h3>
            <button
              onClick={loadInsights}
              className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200 transition-all duration-300"
            >
              Get Insights
            </button>
          </div>
          <div className="h-64">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      )}

      {/* Insights Modal */}
      {showInsights && insights && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Your Mood Insights
              </h3>
              <button
                onClick={() => setShowInsights(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3">
              {insights.patterns && (
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Patterns</h4>
                  <p className="text-sm text-gray-600">{insights.patterns}</p>
                </div>
              )}
              {insights.recommendations && (
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Recommendations</h4>
                  <p className="text-sm text-gray-600">{insights.recommendations}</p>
                </div>
              )}
              {insights.trends && (
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Trends</h4>
                  <p className="text-sm text-gray-600">{insights.trends}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => window.location.href = '/chat'}
          className="py-4 bg-gradient-to-r from-purple-300 to-sky-300 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Talk to MindMate
        </button>
        <button
          onClick={() => window.location.href = '/tools'}
          className="py-4 bg-gradient-to-r from-sky-300 to-purple-300 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Try Therapy Tools
        </button>
      </div>
    </div>
  );
};

export default MoodTrackerScreen;
