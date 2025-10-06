// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [authMode, setAuthMode] = useState('signup'); // 'signup' or 'login'

  const WelcomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-purple-50 to-orange-50 flex flex-col items-center justify-center px-8 relative overflow-hidden">
      {/* Animated breathing circles */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-96 h-96 rounded-full bg-gradient-to-r from-sky-200/20 to-purple-200/20 animate-pulse"></div>
        <div className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-purple-200/30 to-orange-200/30 animate-pulse delay-1000"></div>
      </div>
      {/* Logo */}
      <div className="relative z-10 mb-8">
        <div className="w-24 h-24 mx-auto mb-6 relative">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-300 to-sky-300 flex items-center justify-center shadow-lg">
            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
              <i className="fas fa-heart text-2xl text-purple-400"></i>
            </div>
          </div>
          <div className="absolute inset-0 rounded-full bg-purple-300/30 animate-ping"></div>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
          MindMate AI
        </h1>
        <p className="text-lg text-gray-600 text-center leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif' }}>
          Your AI-powered emotional wellness companion
        </p>
      </div>
      {/* Buttons */}
      <div className="relative z-10 w-full max-w-sm space-y-4 mt-12">
        <button
          onClick={() => setCurrentScreen('onboarding')}
          className="w-full py-4 bg-gradient-to-r from-orange-200 to-pink-200 text-gray-800 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer !rounded-button"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Get Started
        </button>
        <button
          onClick={() => setCurrentScreen('auth')}
          className="w-full py-4 border-2 border-purple-200 text-purple-600 rounded-full font-semibold text-lg hover:bg-purple-50 transition-all duration-300 cursor-pointer !rounded-button"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Sign In
        </button>
      </div>
    </div>
  );

  const OnboardingScreen = () => {
    const slides = [
      {
        title: "Talk to your AI therapist anytime",
        description: "Get personalized emotional support whenever you need it, available 24/7",
        gradient: "from-pink-400 via-purple-500 to-indigo-600",
        mainImage: "https://readdy.ai/api/search-image?query=diverse%20young%20people%20having%20conversation%20with%20AI%20companion%2C%20gen%20z%20mental%20health%20support%2C%20vibrant%20colorful%20lifestyle%2C%20modern%20therapy%20session%2C%20emotional%20wellness%20technology%2C%20contemporary%20illustration%20style%2C%20bright%20gradient%20colors%2C%20high-definition%20digital%20art%2C%20optimistic%20atmosphere%2C%20minimalist%20composition&width=280&height=320&seq=main1&orientation=portrait"
      },
      {
        title: "Science-backed emotional support",
        description: "Evidence-based techniques designed specifically for your unique wellness needs",
        gradient: "from-orange-400 via-pink-500 to-purple-600",
        mainImage: "https://readdy.ai/api/search-image?query=young%20adults%20practicing%20evidence-based%20wellness%20techniques%2C%20generation%20z%20mental%20health%20innovation%2C%20colorful%20modern%20therapeutic%20activities%2C%20mindfulness%20and%20CBT%20practices%2C%20vibrant%20contemporary%20lifestyle%2C%20high-definition%20illustration%2C%20bright%20gradient%20atmosphere%2C%20emotional%20wellbeing%20concept%2C%20minimalist%20design&width=280&height=320&seq=main2&orientation=portrait"
      },
      {
        title: "Track your wellness journey",
        description: "Visualize your mental health progress and celebrate every milestone forward",
        gradient: "from-blue-400 via-teal-500 to-green-500",
        mainImage: "https://readdy.ai/api/search-image?query=generation%20z%20celebrating%20personal%20growth%20milestones%2C%20diverse%20young%20people%20achieving%20wellness%20goals%2C%20vibrant%20progress%20visualization%2C%20colorful%20success%20celebration%2C%20modern%20lifestyle%20photography%2C%20mental%20health%20journey%2C%20bright%20optimistic%20colors%2C%20high-definition%20digital%20art%2C%20contemporary%20illustration%20style&width=280&height=320&seq=main3&orientation=portrait"
      }
    ];

    return (
      <div className={`min-h-screen bg-gradient-to-br ${slides[onboardingStep].gradient} flex flex-col relative overflow-hidden`}>
        {/* Skip button */}
        <div className="absolute top-12 right-6 z-20">
          <button
            onClick={() => setCurrentScreen('auth')}
            className="text-white/80 text-sm font-medium px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Skip
          </button>
        </div>
        {/* Main content */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 py-20 relative z-10">
          {/* Main illustration */}
          <div className="relative mb-16">
            {/* Floating decorative elements */}
            <div className="absolute -top-8 -left-4 w-20 h-20 bg-white/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute -top-4 -right-8 w-16 h-16 bg-white/15 rounded-full blur-lg animate-pulse delay-1000"></div>
            <div className="absolute -bottom-6 left-8 w-12 h-12 bg-white/25 rounded-full blur-md animate-pulse delay-500"></div>
            {/* Main image container */}
            <div className="relative z-10 w-72 h-80 rounded-3xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <img
                src={slides[onboardingStep].mainImage}
                alt="Wellness illustration"
                className="w-full h-full object-cover object-center"
              />
              {/* Gradient overlay for better text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
            </div>
          </div>
          {/* Text content */}
          <div className="text-center text-white max-w-sm">
            <h2 className="text-3xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {slides[onboardingStep].title}
            </h2>
            <p className="text-white/90 text-lg leading-relaxed font-medium" style={{ fontFamily: 'Nunito, sans-serif' }}>
              {slides[onboardingStep].description}
            </p>
          </div>
        </div>
        {/* Bottom section */}
        <div className="px-8 pb-8">
          {/* Navigation dots */}
          <div className="flex justify-center space-x-3 mb-8">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === onboardingStep
                    ? 'bg-white w-8'
                    : 'bg-white/40 w-2'
                }`}
              />
            ))}
          </div>
          {/* Navigation buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => {
                if (onboardingStep > 0) {
                  setOnboardingStep(onboardingStep - 1);
                }
              }}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                onboardingStep > 0
                  ? 'text-white bg-white/20 backdrop-blur-sm hover:bg-white/30'
                  : 'text-transparent'
              }`}
              style={{ fontFamily: 'Poppins, sans-serif' }}
              disabled={onboardingStep === 0}
            >
              Previous
            </button>
            <button
              onClick={() => {
                if (onboardingStep < slides.length - 1) {
                  setOnboardingStep(onboardingStep + 1);
                } else {
                  setCurrentScreen('auth');
                }
              }}
              className="px-8 py-4 bg-white text-gray-800 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer !rounded-button"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {onboardingStep < slides.length - 1 ? 'Next' : 'Get Started'}
            </button>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-20 left-8 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-40 right-12 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/3 right-6 w-8 h-8 bg-white/20 rounded-full blur-md"></div>
      </div>
    );
  };

  const ChatScreen = () => {
    const [messages] = useState([
      { type: 'ai', text: 'Hello! I\'m MindMate, your AI wellness companion. How are you feeling today?' },
      { type: 'user', text: 'I\'ve been feeling a bit overwhelmed lately with work stress.' },
      { type: 'ai', text: 'I understand that work stress can feel overwhelming. It\'s completely normal to feel this way. Would you like to explore some techniques that might help you manage these feelings?' }
    ]);

    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-50 to-purple-50 flex flex-col">
        {/* Header */}
        <div className="fixed top-0 w-full bg-white/90 backdrop-blur-sm border-b border-purple-100 px-6 py-4 z-10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-300 to-sky-300 flex items-center justify-center shadow-md">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full ml-1"></div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>MindMate AI</h3>
              <p className="text-sm text-gray-500">Always here for you</p>
            </div>
          </div>
        </div>
        {/* Messages */}
        <div className="flex-1 px-6 py-20 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs px-4 py-3 rounded-2xl shadow-sm ${
                message.type === 'user'
                  ? 'bg-gradient-to-r from-orange-200 to-pink-200 text-gray-800'
                  : 'bg-white text-gray-700 border border-purple-100'
              }`}>
                <p className="text-sm leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  {message.text}
                </p>
              </div>
            </div>
          ))}
          {/* Typing indicator */}
          <div className="flex justify-start">
            <div className="bg-white px-4 py-3 rounded-2xl shadow-sm border border-purple-100">
              <p className="text-sm text-purple-400 italic" style={{ fontFamily: 'Nunito, sans-serif' }}>
                MindMate is thinking empathetically...
              </p>
            </div>
          </div>
        </div>
        {/* Input area */}
        <div className="fixed bottom-0 w-full bg-white/90 backdrop-blur-sm border-t border-purple-100 px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="flex-1 bg-gray-100 rounded-full px-4 py-3 flex items-center space-x-3">
              <input
                type="text"
                placeholder="Share what's on your mind..."
                className="flex-1 bg-transparent border-none outline-none text-sm"
                style={{ fontFamily: 'Nunito, sans-serif' }}
              />
              <button className="text-purple-400 cursor-pointer">
                <i className="fas fa-microphone"></i>
              </button>
            </div>
            <button className="w-10 h-10 bg-gradient-to-r from-purple-300 to-sky-300 rounded-full flex items-center justify-center shadow-md cursor-pointer">
              <i className="fas fa-heart text-white text-sm"></i>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const AuthScreen = () => {
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: ''
    });

    const handleInputChange = (field: string, value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
      // Handle authentication logic here
      setCurrentScreen('chat');
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-orange-400 flex flex-col relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-40 right-12 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute top-1/3 right-6 w-16 h-16 bg-white/15 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/4 left-12 w-20 h-20 bg-white/15 rounded-full blur-xl"></div>
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-6 relative z-10">
          <button
            onClick={() => setCurrentScreen('welcome')}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white cursor-pointer"
          >
            <i className="fas fa-arrow-left"></i>
          </button>
          <button
            onClick={() => setCurrentScreen('auth')}
            className="text-white/80 text-sm font-medium px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Skip
          </button>
        </div>
        {/* Main content */}
        <div className="flex-1 flex flex-col justify-center px-8 relative z-10">
          {/* Logo section */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 mx-auto mb-6 relative">
              <div className="w-full h-full rounded-full bg-white/90 flex items-center justify-center shadow-xl">
                <i className="fas fa-heart text-2xl text-purple-400"></i>
              </div>
              <div className="absolute inset-0 rounded-full bg-white/30 animate-ping"></div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {authMode === 'signup' ? 'Join MindMate' : 'Welcome Back'}
            </h1>
            <p className="text-white/90 text-lg" style={{ fontFamily: 'Nunito, sans-serif' }}>
              {authMode === 'signup' ? 'Start your wellness journey today' : 'Continue your wellness journey'}
            </p>
          </div>
          {/* Auth form */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="space-y-6">
              {/* Toggle buttons */}
              <div className="flex bg-gray-100 rounded-full p-1 mb-8">
                <button
                  onClick={() => setAuthMode('signup')}
                  className={`flex-1 px-4 py-3 rounded-full font-semibold text-sm transition-all duration-300 cursor-pointer !rounded-button ${
                    authMode === 'signup'
                      ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-lg'
                      : 'text-gray-600'
                  }`}
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Sign Up
                </button>
                <button
                  onClick={() => setAuthMode('login')}
                  className={`flex-1 px-4 py-3 rounded-full font-semibold text-sm transition-all duration-300 cursor-pointer !rounded-button ${
                    authMode === 'login'
                      ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-lg'
                      : 'text-gray-600'
                  }`}
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Sign In
                </button>
              </div>
              {/* Form fields */}
              {authMode === 'signup' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      First Name
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
                      placeholder="Enter first name"
                      style={{ fontFamily: 'Nunito, sans-serif' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
                      placeholder="Enter last name"
                      style={{ fontFamily: 'Nunito, sans-serif' }}
                    />
                  </div>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
                  placeholder="Enter your email"
                  style={{ fontFamily: 'Nunito, sans-serif' }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
                  placeholder="Enter your password"
                  style={{ fontFamily: 'Nunito, sans-serif' }}
                />
              </div>
              {authMode === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
                    placeholder="Confirm your password"
                    style={{ fontFamily: 'Nunito, sans-serif' }}
                  />
                </div>
              )}
              {authMode === 'login' && (
                <div className="flex justify-end">
                  <button className="text-sm text-purple-500 font-medium" style={{ fontFamily: 'Nunito, sans-serif' }}>
                    Forgot Password?
                  </button>
                </div>
              )}
              {/* Submit button */}
              <button
                onClick={handleSubmit}
                className="w-full py-4 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer !rounded-button"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {authMode === 'signup' ? 'Create Account' : 'Sign In'}
              </button>
              {/* Social auth */}
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  Or continue with
                </p>
                <div className="flex space-x-4">
                  <button className="flex-1 py-3 bg-gray-50 rounded-xl font-medium text-gray-700 text-sm flex items-center justify-center space-x-2 hover:bg-gray-100 transition-all duration-300 cursor-pointer !rounded-button">
                    <i className="fab fa-google text-red-500"></i>
                    <span style={{ fontFamily: 'Nunito, sans-serif' }}>Google</span>
                  </button>
                  <button className="flex-1 py-3 bg-gray-50 rounded-xl font-medium text-gray-700 text-sm flex items-center justify-center space-x-2 hover:bg-gray-100 transition-all duration-300 cursor-pointer !rounded-button">
                    <i className="fab fa-apple text-gray-800"></i>
                    <span style={{ fontFamily: 'Nunito, sans-serif' }}>Apple</span>
                  </button>
                </div>
              </div>
              {/* Terms */}
              {authMode === 'signup' && (
                <p className="text-xs text-gray-500 text-center leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  By creating an account, you agree to our{' '}
                  <span className="text-purple-500 font-medium">Terms of Service</span> and{' '}
                  <span className="text-purple-500 font-medium">Privacy Policy</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const MoodTrackingScreen = () => {
    const [selectedMood, setSelectedMood] = useState<number | null>(null);
    const [moodNotes, setMoodNotes] = useState('');
    const [moodHistory, setMoodHistory] = useState([
      { day: 'Mon', mood: 4, date: '2024-01-15' },
      { day: 'Tue', mood: 3, date: '2024-01-16' },
      { day: 'Wed', mood: 5, date: '2024-01-17' },
      { day: 'Thu', mood: 3, date: '2024-01-18' },
      { day: 'Fri', mood: 4, date: '2024-01-19' },
      { day: 'Sat', mood: 5, date: '2024-01-20' },
      { day: 'Sun', mood: 4, date: '2024-01-21' }
    ]);

    const moods = [
      { emoji: '😢', label: 'Sad', color: 'text-blue-400', level: 1 },
      { emoji: '😐', label: 'Okay', color: 'text-gray-400', level: 2 },
      { emoji: '🙂', label: 'Good', color: 'text-green-400', level: 3 },
      { emoji: '😊', label: 'Happy', color: 'text-yellow-400', level: 4 },
      { emoji: '🤗', label: 'Joyful', color: 'text-pink-400', level: 5 }
    ];

    const handleMoodSubmit = () => {
      if (selectedMood === null) {
        alert('Please select a mood');
        return;
      }
      
      // Add new mood entry
      const today = new Date().toLocaleDateString('en-US', { weekday: 'short' });
      const newEntry = { day: today, mood: selectedMood, date: new Date().toISOString().split('T')[0] };
      
      setMoodHistory(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = newEntry; // Update today's entry
        return updated;
      });
      
      // Reset form
      setSelectedMood(null);
      setMoodNotes('');
      
      // Show success message
      alert('Mood logged successfully!');
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

        {/* Mood Selector */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Select Your Current Mood
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

          {/* Submit Button */}
          <button
            onClick={handleMoodSubmit}
            disabled={selectedMood === null}
            className="w-full py-4 bg-gradient-to-r from-purple-300 to-sky-300 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Log My Mood
          </button>
        </div>

        {/* Weekly Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Your Week at a Glance
          </h3>
          <div className="h-32 bg-gradient-to-r from-sky-100 to-purple-100 rounded-xl flex items-end justify-between px-4 py-4">
            {moodHistory.map((entry, index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <div
                  className="w-4 bg-gradient-to-t from-purple-300 to-sky-300 rounded-full"
                  style={{ height: `${entry.mood * 20}px` }}
                ></div>
                <span className="text-xs text-gray-500">{entry.day}</span>
                <span className="text-xs text-gray-400">{entry.mood}/5</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mood Insights */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            This Week's Insights
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <p className="text-sm text-gray-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Your mood improved by 20% compared to last week
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <p className="text-sm text-gray-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Weekends tend to be your happiest days
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <p className="text-sm text-gray-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Consider trying breathing exercises on low mood days
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setCurrentScreen('chat')}
            className="py-4 bg-gradient-to-r from-purple-300 to-sky-300 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Talk to MindMate
          </button>
          <button
            onClick={() => setCurrentScreen('tools')}
            className="py-4 bg-gradient-to-r from-sky-300 to-purple-300 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Try Therapy Tools
          </button>
        </div>
      </div>
    );
  };

  const TherapyToolsScreen = () => {
    const [activeTool, setActiveTool] = useState<string | null>(null);
    const [breathingProgress, setBreathingProgress] = useState(0);
    const [journalEntry, setJournalEntry] = useState('');

    const tools = [
      {
        id: 'breathing',
        title: 'Guided Breathing',
        description: 'Calm your mind with breathing exercises',
        icon: 'fas fa-lungs',
        gradient: 'from-sky-200 to-blue-200',
        color: 'text-blue-600'
      },
      {
        id: 'journaling',
        title: 'CBT Journaling',
        description: 'Process thoughts with guided prompts',
        icon: 'fas fa-book-heart',
        gradient: 'from-purple-200 to-pink-200',
        color: 'text-pink-600'
      },
      {
        id: 'meditation',
        title: 'Mindfulness',
        description: 'Find peace in the present moment',
        icon: 'fas fa-leaf',
        gradient: 'from-green-200 to-teal-200',
        color: 'text-green-600'
      },
      {
        id: 'sleep',
        title: 'Sleep Reset',
        description: 'Prepare your mind for restful sleep',
        icon: 'fas fa-moon',
        gradient: 'from-indigo-200 to-purple-200',
        color: 'text-indigo-600'
      }
    ];

    const startBreathingExercise = () => {
      setBreathingProgress(0);
      const interval = setInterval(() => {
        setBreathingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            alert('Breathing exercise completed! Great job!');
            return 100;
          }
          return prev + 10;
        });
      }, 1000);
    };

    const saveJournalEntry = () => {
      if (journalEntry.trim()) {
        alert('Journal entry saved! Your thoughts are important.');
        setJournalEntry('');
      } else {
        alert('Please write something before saving.');
      }
    };

    const renderToolContent = () => {
      if (!activeTool) {
        return (
          <div className="text-center py-8">
            <i className="fas fa-toolbox text-4xl text-gray-400 mb-4"></i>
            <p className="text-gray-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Select a tool to get started with your wellness journey
            </p>
          </div>
        );
      }

      const tool = tools.find(t => t.id === activeTool);
      if (!tool) return null;

      switch (activeTool) {
        case 'breathing':
          return (
            <div className="text-center">
              <h3 className="text-2xl font-bold text-blue-600 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Guided Breathing Exercise
              </h3>
              <p className="text-gray-700 mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Follow the rhythm: Inhale for 4, Hold for 4, Exhale for 6
              </p>
              
              <div className="relative mb-8">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-200 to-sky-200 mx-auto flex items-center justify-center text-4xl text-blue-600 animate-pulse"
                     style={{ animationDuration: '8s', animationIterationCount: 'infinite' }}>
                  {breathingProgress < 100 ? `${breathingProgress}%` : '✓'}
                </div>
                <div className="absolute inset-0 rounded-full bg-blue-200/30 animate-ping"></div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={startBreathingExercise}
                  disabled={breathingProgress > 0 && breathingProgress < 100}
                  className="w-full py-3 bg-gradient-to-r from-blue-400 to-sky-400 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {breathingProgress === 0 ? 'Start Breathing' : breathingProgress < 100 ? 'In Progress...' : 'Start Again'}
                </button>
                
                {breathingProgress >= 100 && (
                  <p className="text-green-600 font-medium" style={{ fontFamily: 'Nunito, sans-serif' }}>
                    🎉 Well done! You've completed the breathing exercise.
                  </p>
                )}
              </div>
            </div>
          );

        case 'journaling':
          return (
            <div>
              <h3 className="text-2xl font-bold text-pink-600 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                CBT Journaling
              </h3>
              <p className="text-gray-700 mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Reflect on your thoughts and feelings. This helps identify patterns and promotes mental clarity.
              </p>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Journal Prompt: What's on your mind today?
                </label>
                <textarea
                  value={journalEntry}
                  onChange={(e) => setJournalEntry(e.target.value)}
                  placeholder="Write about your thoughts, feelings, or experiences..."
                  className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none"
                  style={{ fontFamily: 'Nunito, sans-serif' }}
                  rows={6}
                />
              </div>
              
              <button
                onClick={saveJournalEntry}
                className="w-full py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Save Entry
              </button>
            </div>
          );

        case 'meditation':
          return (
            <div className="text-center">
              <h3 className="text-2xl font-bold text-green-600 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Mindfulness Meditation
              </h3>
              <p className="text-gray-700 mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Find peace in the present moment with guided mindfulness
              </p>
              
              <div className="relative mb-8">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-200 to-teal-200 mx-auto flex items-center justify-center text-4xl text-green-600">
                  <i className="fas fa-leaf"></i>
                </div>
                <div className="absolute inset-0 rounded-full bg-green-200/30 animate-pulse"></div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => alert('Starting 5-minute mindfulness session...')}
                  className="w-full py-3 bg-gradient-to-r from-green-400 to-teal-400 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Start 5-Minute Session
                </button>
                <button
                  onClick={() => alert('Starting 10-minute mindfulness session...')}
                  className="w-full py-3 bg-gradient-to-r from-teal-400 to-green-400 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Start 10-Minute Session
                </button>
              </div>
            </div>
          );

        case 'sleep':
          return (
            <div className="text-center">
              <h3 className="text-2xl font-bold text-indigo-600 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Sleep Reset Routine
              </h3>
              <p className="text-gray-700 mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Prepare your mind and body for restful sleep
              </p>
              
              <div className="relative mb-8">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-200 to-purple-200 mx-auto flex items-center justify-center text-4xl text-indigo-600">
                  <i className="fas fa-moon"></i>
                </div>
                <div className="absolute inset-0 rounded-full bg-indigo-200/30 animate-pulse"></div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => alert('Starting bedtime breathing routine...')}
                  className="w-full py-3 bg-gradient-to-r from-indigo-400 to-purple-400 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Bedtime Breathing
                </button>
                <button
                  onClick={() => alert('Starting sleep story session...')}
                  className="w-full py-3 bg-gradient-to-r from-purple-400 to-indigo-400 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Sleep Story
                </button>
              </div>
            </div>
          );

        default:
          return null;
      }
    };

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

        {/* Tools Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {tools.map((tool) => (
            <div
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className={`bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden ${
                activeTool === tool.id ? 'border-2 border-purple-400' : ''
              }`}
            >
              <div className={`h-20 mb-4 rounded-xl overflow-hidden bg-gradient-to-br ${tool.gradient}`}>
                <div className="w-full h-full flex items-center justify-center text-4xl text-white">
                  <i className={tool.icon}></i>
                </div>
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

        {/* Active Tool Content */}
        {activeTool && (
          <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
            {renderToolContent()}
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setCurrentScreen('mood')}
            className="py-4 bg-gradient-to-r from-purple-300 to-sky-300 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Track Mood
          </button>
          <button
            onClick={() => setCurrentScreen('chat')}
            className="py-4 bg-gradient-to-r from-sky-300 to-purple-300 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Talk to MindMate
          </button>
        </div>
      </div>
    );
  };

  const ProfileScreen = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [settings, setSettings] = useState({
      notifications: {
        dailyReminders: true,
        moodCheckIns: true,
        therapyReminders: true,
        achievementAlerts: true,
        crisisAlerts: true
      },
      privacy: {
        dataSharing: false,
        analytics: true,
        personalizedInsights: true,
        communityParticipation: false
      },
      appearance: {
        darkMode: false,
        fontSize: 'medium',
        colorTheme: 'default'
      },
      ai: {
        communicationStyle: 'empathetic',
        sessionLength: 'medium',
        contentSuggestions: true,
        crisisDetection: true
      },
      account: {
        emailNotifications: true,
        pushNotifications: true,
        dataRetention: '1year',
        accountDeletion: false
      }
    });

    const handleSettingChange = (category: string, setting: string, value: any) => {
      setSettings(prev => ({
        ...prev,
        [category]: {
          ...prev[category as keyof typeof prev],
          [setting]: value
        }
      }));
    };

    const handleSaveSettings = () => {
      localStorage.setItem('mindmate-settings', JSON.stringify(settings));
      alert('Settings saved successfully!');
    };

    const handleExportData = () => {
      alert('Data export initiated. You will receive an email with your data within 24 hours.');
    };

    const handleDeleteAccount = () => {
      if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        alert('Account deletion request submitted. You will receive a confirmation email.');
      }
    };

    const ProfileTab = () => (
      <div>
        {/* Avatar section */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto mb-4 relative">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-300 to-sky-300 flex items-center justify-center shadow-lg">
              <i className="fas fa-user text-3xl text-white"></i>
            </div>
            <div className="absolute inset-0 rounded-full bg-purple-300/20 animate-pulse"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Sarah Johnson
          </h2>
          <p className="text-gray-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Wellness journey started 2 months ago
          </p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
            <div className="text-2xl font-bold text-purple-400 mb-1">47</div>
            <div className="text-sm text-gray-600">Days Active</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
            <div className="text-2xl font-bold text-sky-400 mb-1">128</div>
            <div className="text-sm text-gray-600">Sessions</div>
          </div>
        </div>

        {/* Progress chart */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Wellness Progress
          </h3>
          <div className="h-32 bg-gradient-to-r from-sky-100 to-purple-100 rounded-xl flex items-end justify-between px-4 py-4">
            {Array.from({ length: 7 }, (_, index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <div
                  className="w-4 bg-gradient-to-t from-purple-300 to-sky-300 rounded-full"
                  style={{ height: `${Math.random() * 60 + 30}px` }}
                ></div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievement badges */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Recent Achievements
          </h3>
          <div className="flex space-x-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-200 to-orange-200 flex items-center justify-center shadow-md">
              <i className="fas fa-star text-yellow-600"></i>
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-200 to-teal-200 flex items-center justify-center shadow-md">
              <i className="fas fa-heart text-green-600"></i>
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center shadow-md">
              <i className="fas fa-trophy text-purple-600"></i>
            </div>
          </div>
        </div>
      </div>
    );

    const SettingsTab = () => (
      <div>
        {/* Notifications Settings */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
            <i className="fas fa-bell text-purple-400 mr-3"></i>
            Notifications
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800" style={{ fontFamily: 'Nunito, sans-serif' }}>Daily Reminders</p>
                <p className="text-sm text-gray-600">Get reminded to check in with your wellness</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.dailyReminders}
                  onChange={(e) => handleSettingChange('notifications', 'dailyReminders', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-400"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800" style={{ fontFamily: 'Nunito, sans-serif' }}>Mood Check-ins</p>
                <p className="text-sm text-gray-600">Reminders to log your daily mood</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.moodCheckIns}
                  onChange={(e) => handleSettingChange('notifications', 'moodCheckIns', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-400"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800" style={{ fontFamily: 'Nunito, sans-serif' }}>Crisis Alerts</p>
                <p className="text-sm text-gray-600">Important safety notifications</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.crisisAlerts}
                  onChange={(e) => handleSettingChange('notifications', 'crisisAlerts', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-400"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
            <i className="fas fa-shield-alt text-blue-400 mr-3"></i>
            Privacy & Data
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800" style={{ fontFamily: 'Nunito, sans-serif' }}>Data Sharing</p>
                <p className="text-sm text-gray-600">Allow anonymized data for research</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.privacy.dataSharing}
                  onChange={(e) => handleSettingChange('privacy', 'dataSharing', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-400"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800" style={{ fontFamily: 'Nunito, sans-serif' }}>Analytics</p>
                <p className="text-sm text-gray-600">Help improve the app with usage data</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.privacy.analytics}
                  onChange={(e) => handleSettingChange('privacy', 'analytics', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-400"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800" style={{ fontFamily: 'Nunito, sans-serif' }}>Community Participation</p>
                <p className="text-sm text-gray-600">Join community discussions</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.privacy.communityParticipation}
                  onChange={(e) => handleSettingChange('privacy', 'communityParticipation', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-400"></div>
              </label>
            </div>
          </div>
        </div>

        {/* AI Settings */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
            <i className="fas fa-robot text-green-400 mr-3"></i>
            AI Personalization
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Communication Style
              </label>
              <select
                value={settings.ai.communicationStyle}
                onChange={(e) => handleSettingChange('ai', 'communicationStyle', e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
                style={{ fontFamily: 'Nunito, sans-serif' }}
              >
                <option value="empathetic">Empathetic & Supportive</option>
                <option value="direct">Direct & Practical</option>
                <option value="gentle">Gentle & Encouraging</option>
                <option value="motivational">Motivational & Energetic</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Session Length Preference
              </label>
              <select
                value={settings.ai.sessionLength}
                onChange={(e) => handleSettingChange('ai', 'sessionLength', e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
                style={{ fontFamily: 'Nunito, sans-serif' }}
              >
                <option value="short">Short (5-10 minutes)</option>
                <option value="medium">Medium (10-20 minutes)</option>
                <option value="long">Long (20-40 minutes)</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800" style={{ fontFamily: 'Nunito, sans-serif' }}>Content Suggestions</p>
                <p className="text-sm text-gray-600">Get personalized therapy recommendations</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.ai.contentSuggestions}
                  onChange={(e) => handleSettingChange('ai', 'contentSuggestions', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-400"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
            <i className="fas fa-palette text-pink-400 mr-3"></i>
            Appearance
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800" style={{ fontFamily: 'Nunito, sans-serif' }}>Dark Mode</p>
                <p className="text-sm text-gray-600">Switch to dark theme</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.appearance.darkMode}
                  onChange={(e) => handleSettingChange('appearance', 'darkMode', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-400"></div>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Font Size
              </label>
              <select
                value={settings.appearance.fontSize}
                onChange={(e) => handleSettingChange('appearance', 'fontSize', e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
                style={{ fontFamily: 'Nunito, sans-serif' }}
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
          </div>
        </div>

        {/* Account Management */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
            <i className="fas fa-user-cog text-orange-400 mr-3"></i>
            Account Management
          </h3>
          <div className="space-y-4">
            <button
              onClick={handleExportData}
              className="w-full py-3 bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Export My Data
            </button>
            
            <button
              onClick={() => alert('Password change feature coming soon!')}
              className="w-full py-3 bg-gradient-to-r from-green-400 to-teal-400 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Change Password
            </button>
            
            <button
              onClick={handleDeleteAccount}
              className="w-full py-3 bg-gradient-to-r from-red-400 to-pink-400 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Delete Account
            </button>
          </div>
        </div>

        {/* Save Settings Button */}
        <button
          onClick={handleSaveSettings}
          className="w-full py-4 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Save All Settings
        </button>
      </div>
    );

    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-50 to-purple-50 px-6 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Profile & Settings
          </h2>
          <p className="text-gray-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Manage your account and preferences
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-gray-100 rounded-full p-1 mb-8">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 px-4 py-3 rounded-full font-semibold text-sm transition-all duration-300 cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-lg'
                : 'text-gray-600'
            }`}
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 px-4 py-3 rounded-full font-semibold text-sm transition-all duration-300 cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-lg'
                : 'text-gray-600'
            }`}
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Settings
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'profile' ? <ProfileTab /> : <SettingsTab />}
      </div>
    );
  };


  const TabBar = () => {
    const tabs = [
      { id: 'chat', icon: 'fas fa-comments', label: 'Chat' },
      { id: 'mood', icon: 'fas fa-heart', label: 'Mood' },
      { id: 'tools', icon: 'fas fa-toolbox', label: 'Tools' },
      { id: 'profile', icon: 'fas fa-user', label: 'Profile' }
    ];
    return (
      <div className="fixed bottom-0 w-full bg-white/90 backdrop-blur-sm border-t border-purple-100 px-6 py-2">
        <div className="grid grid-cols-4 gap-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCurrentScreen(tab.id)}
              className={`flex flex-col items-center justify-center py-2 cursor-pointer transition-all duration-300 ${
                currentScreen === tab.id ? 'text-purple-400' : 'text-gray-400'
              }`}
            >
              <i className={`${tab.icon} text-sm mb-1`}></i>
              <span className="text-xs" style={{ fontFamily: 'Nunito, sans-serif' }}>
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen />;
      case 'onboarding':
        return <OnboardingScreen />;
      case 'chat':
        return <ChatScreen />;
      case 'mood':
        return <MoodTrackingScreen />;
      case 'tools':
        return <TherapyToolsScreen />;
      case 'auth':
        return <AuthScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <WelcomeScreen />;
    }
  };

  return (
    <div className="w-full min-h-screen bg-white relative overflow-hidden" style={{ maxWidth: '100vw' }}>
      <style>{`
        .!rounded-button {
          border-radius: 25px !important;
        }
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Nunito:wght@400;500;600&display=swap');
        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }
      `}</style>
      {renderScreen()}
      {currentScreen !== 'welcome' && currentScreen !== 'onboarding' && currentScreen !== 'auth' && <TabBar />}
      <Toaster position="top-center" />
    </div>
  );
};

export default App;