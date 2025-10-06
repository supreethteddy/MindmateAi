import React, { useState, useEffect } from 'react';
import { useAnalytics } from '../hooks';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { format, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';
import toast from 'react-hot-toast';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const AnalyticsScreen: React.FC = () => {
  const { analytics, loading, getAnalytics, getInsights } = useAnalytics();
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const [insights, setInsights] = useState<any>(null);
  const [showInsights, setShowInsights] = useState(false);

  useEffect(() => {
    loadAnalytics();
  }, [selectedPeriod]);

  const loadAnalytics = async () => {
    try {
      await getAnalytics(selectedPeriod);
    } catch (error) {
      toast.error('Failed to load analytics');
    }
  };

  const loadInsights = async () => {
    try {
      const data = await getInsights();
      setInsights(data);
      setShowInsights(true);
    } catch (error) {
      toast.error('Failed to load insights');
    }
  };

  // Mock data for demonstration - replace with real analytics data
  const mockAnalytics = {
    moodTrend: [3, 4, 3, 5, 4, 3, 4, 5, 4, 3, 4, 5, 4, 3, 4, 5, 4, 3, 4, 5, 4, 3, 4, 5, 4, 3, 4, 5, 4, 3],
    stressTrend: [7, 6, 8, 5, 6, 7, 6, 5, 6, 7, 6, 5, 6, 7, 6, 5, 6, 7, 6, 5, 6, 7, 6, 5, 6, 7, 6, 5, 6, 7],
    sleepTrend: [6, 7, 6, 8, 7, 6, 7, 8, 7, 6, 7, 8, 7, 6, 7, 8, 7, 6, 7, 8, 7, 6, 7, 8, 7, 6, 7, 8, 7, 6],
    therapySessionCount: 12,
    goalProgress: 75,
    insights: [
      "Your mood tends to improve on weekends",
      "Stress levels are highest on Mondays",
      "Sleep quality correlates with mood",
      "Therapy sessions are helping reduce anxiety"
    ],
    recommendations: [
      "Try morning meditation on Mondays",
      "Consider adjusting your sleep schedule",
      "Continue with weekly therapy sessions",
      "Practice breathing exercises during high-stress periods"
    ]
  };

  const currentData = analytics || mockAnalytics;

  // Generate labels based on selected period
  const generateLabels = () => {
    const days = selectedPeriod === 'week' ? 7 : selectedPeriod === 'month' ? 30 : selectedPeriod === 'quarter' ? 90 : 365;
    return Array.from({ length: days }, (_, i) => {
      const date = subDays(new Date(), days - 1 - i);
      return format(date, selectedPeriod === 'week' ? 'EEE' : selectedPeriod === 'month' ? 'MMM dd' : 'MMM');
    });
  };

  const moodChartData = {
    labels: generateLabels(),
    datasets: [
      {
        label: 'Mood Level',
        data: currentData.moodTrend,
        borderColor: 'rgb(147, 51, 234)',
        backgroundColor: 'rgba(147, 51, 234, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const stressChartData = {
    labels: generateLabels(),
    datasets: [
      {
        label: 'Stress Level',
        data: currentData.stressTrend,
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const sleepChartData = {
    labels: generateLabels(),
    datasets: [
      {
        label: 'Sleep Quality',
        data: currentData.sleepTrend,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const wellnessDistributionData = {
    labels: ['Mood', 'Stress', 'Sleep', 'Anxiety', 'Depression'],
    datasets: [
      {
        data: [4.2, 6.1, 7.3, 5.8, 4.9],
        backgroundColor: [
          'rgba(147, 51, 234, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(16, 185, 129, 0.8)'
        ],
        borderWidth: 2,
        borderColor: '#fff'
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-purple-50 px-6 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Your Wellness Analytics
        </h2>
        <p className="text-gray-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
          Track your progress and discover patterns in your mental health journey
        </p>
      </div>

      {/* Period Selector */}
      <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Time Period
          </h3>
          <button
            onClick={loadInsights}
            className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200 transition-all duration-300"
          >
            Get AI Insights
          </button>
        </div>
        
        <div className="flex space-x-2">
          {(['week', 'month', 'quarter', 'year'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                selectedPeriod === period
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
          <div className="text-2xl font-bold text-purple-400 mb-1">
            {currentData.moodTrend[currentData.moodTrend.length - 1]?.toFixed(1) || '4.2'}
          </div>
          <div className="text-sm text-gray-600">Current Mood</div>
        </div>
        
        <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
          <div className="text-2xl font-bold text-red-400 mb-1">
            {currentData.stressTrend[currentData.stressTrend.length - 1]?.toFixed(1) || '6.1'}
          </div>
          <div className="text-sm text-gray-600">Stress Level</div>
        </div>
        
        <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
          <div className="text-2xl font-bold text-blue-400 mb-1">
            {currentData.sleepTrend[currentData.sleepTrend.length - 1]?.toFixed(1) || '7.3'}
          </div>
          <div className="text-sm text-gray-600">Sleep Quality</div>
        </div>
        
        <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
          <div className="text-2xl font-bold text-green-400 mb-1">
            {currentData.goalProgress}%
          </div>
          <div className="text-sm text-gray-600">Goal Progress</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Mood Trend Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Mood Trend
          </h3>
          <div className="h-64">
            <Line data={moodChartData} options={chartOptions} />
          </div>
        </div>

        {/* Stress Trend Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Stress Level Trend
          </h3>
          <div className="h-64">
            <Line data={stressChartData} options={chartOptions} />
          </div>
        </div>

        {/* Sleep Quality Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Sleep Quality Trend
          </h3>
          <div className="h-64">
            <Line data={sleepChartData} options={chartOptions} />
          </div>
        </div>

        {/* Wellness Distribution */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Wellness Distribution
          </h3>
          <div className="h-64">
            <Doughnut data={wellnessDistributionData} options={doughnutOptions} />
          </div>
        </div>
      </div>

      {/* Insights and Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Insights */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Key Insights
          </h3>
          <div className="space-y-3">
            {currentData.insights.map((insight: string, index: number) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-gray-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  {insight}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Personalized Recommendations
          </h3>
          <div className="space-y-3">
            {currentData.recommendations.map((recommendation: string, index: number) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-gray-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  {recommendation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Therapy Session Stats */}
      <div className="bg-white rounded-2xl p-6 shadow-lg mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Therapy Session Statistics
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400 mb-1">{currentData.therapySessionCount}</div>
            <div className="text-sm text-gray-600">Sessions This Month</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400 mb-1">85%</div>
            <div className="text-sm text-gray-600">Completion Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">7.2</div>
            <div className="text-sm text-gray-600">Avg. Effectiveness</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400 mb-1">12</div>
            <div className="text-sm text-gray-600">Day Streak</div>
          </div>
        </div>
      </div>

      {/* AI Insights Modal */}
      {showInsights && insights && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
                AI-Powered Insights
              </h3>
              <button
                onClick={() => setShowInsights(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              {insights.patterns && (
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Patterns Detected</h4>
                  <p className="text-sm text-gray-600">{insights.patterns}</p>
                </div>
              )}
              {insights.predictions && (
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Predictions</h4>
                  <p className="text-sm text-gray-600">{insights.predictions}</p>
                </div>
              )}
              {insights.recommendations && (
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">AI Recommendations</h4>
                  <p className="text-sm text-gray-600">{insights.recommendations}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsScreen;
