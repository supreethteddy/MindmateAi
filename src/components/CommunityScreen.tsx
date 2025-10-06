import React, { useState, useEffect } from 'react';
import { useCommunity } from '../hooks';
import { CommunityPost, CommunityComment } from '../types';
import toast from 'react-hot-toast';

const CommunityScreen: React.FC = () => {
  const { posts, loading, getPosts, createPost, likePost } = useCommunity();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPost, setNewPost] = useState({
    content: '',
    category: 'support' as 'support' | 'celebration' | 'advice' | 'question',
    isAnonymous: false
  });
  const [selectedPost, setSelectedPost] = useState<CommunityPost | null>(null);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const categories = [
    { id: 'all', name: 'All Posts', icon: '📝' },
    { id: 'support', name: 'Support', icon: '🤗' },
    { id: 'celebration', name: 'Celebration', icon: '🎉' },
    { id: 'advice', name: 'Advice', icon: '💡' },
    { id: 'question', name: 'Questions', icon: '❓' }
  ];

  const handleCreatePost = async () => {
    if (!newPost.content.trim()) {
      toast.error('Please write something before posting');
      return;
    }

    try {
      await createPost(newPost);
      toast.success('Post created successfully');
      setNewPost({ content: '', category: 'support', isAnonymous: false });
      setShowCreatePost(false);
    } catch (error) {
      toast.error('Failed to create post');
    }
  };

  const handleLikePost = async (postId: string) => {
    try {
      await likePost(postId);
    } catch (error) {
      toast.error('Failed to like post');
    }
  };

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-purple-50 px-6 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Community Support
        </h2>
        <p className="text-gray-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
          Connect with others on their wellness journey
        </p>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-2xl p-4 shadow-lg mb-6">
        <div className="flex space-x-2 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Create Post Button */}
      <div className="text-center mb-6">
        <button
          onClick={() => setShowCreatePost(true)}
          className="px-6 py-3 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          ✍️ Share Your Story
        </button>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No posts yet</h3>
            <p className="text-gray-600">Be the first to share your wellness journey!</p>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-300 to-sky-300 flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {post.isAnonymous ? '?' : post.userId.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {post.isAnonymous ? 'Anonymous' : `User ${post.userId.slice(-4)}`}
                    </h4>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span className="capitalize">{post.category}</span>
                      <span>•</span>
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  post.category === 'support' ? 'bg-blue-100 text-blue-700' :
                  post.category === 'celebration' ? 'bg-yellow-100 text-yellow-700' :
                  post.category === 'advice' ? 'bg-green-100 text-green-700' :
                  'bg-purple-100 text-purple-700'
                }`}>
                  {post.category}
                </span>
              </div>

              <p className="text-gray-700 mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
                {post.content}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleLikePost(post.id)}
                    className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-all duration-300"
                  >
                    <span>❤️</span>
                    <span className="text-sm">{post.likes}</span>
                  </button>
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-all duration-300"
                  >
                    <span>💬</span>
                    <span className="text-sm">{post.comments.length}</span>
                  </button>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  🔗
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create Post Modal */}
      {showCreatePost && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Create Post</h3>
              <button
                onClick={() => setShowCreatePost(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={newPost.category}
                  onChange={(e) => setNewPost(prev => ({ ...prev, category: e.target.value as any }))}
                  className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
                >
                  <option value="support">🤗 Support</option>
                  <option value="celebration">🎉 Celebration</option>
                  <option value="advice">💡 Advice</option>
                  <option value="question">❓ Question</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Share your story</label>
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="What's on your mind? Share your wellness journey..."
                  className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 resize-none"
                  rows={4}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={newPost.isAnonymous}
                  onChange={(e) => setNewPost(prev => ({ ...prev, isAnonymous: e.target.checked }))}
                  className="w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="anonymous" className="text-sm text-gray-700">
                  Post anonymously
                </label>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowCreatePost(false)}
                className="flex-1 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-semibold transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePost}
                className="flex-1 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-semibold transition-all duration-300"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Post Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Post Details</h3>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-300 to-sky-300 flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {selectedPost.isAnonymous ? '?' : selectedPost.userId.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">
                    {selectedPost.isAnonymous ? 'Anonymous' : `User ${selectedPost.userId.slice(-4)}`}
                  </h4>
                  <div className="text-sm text-gray-500">
                    {new Date(selectedPost.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700">{selectedPost.content}</p>
              
              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-800 mb-3">Comments</h4>
                {selectedPost.comments.length === 0 ? (
                  <p className="text-gray-500 text-sm">No comments yet.</p>
                ) : (
                  <div className="space-y-3">
                    {selectedPost.comments.map((comment) => (
                      <div key={comment.id} className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-600 text-sm">
                            {comment.isAnonymous ? '?' : comment.userId.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-sm text-gray-700">{comment.content}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(comment.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ProfessionalIntegrationScreen: React.FC = () => {
  const [patients, setPatients] = useState([
    {
      id: '1',
      name: 'Sarah Johnson',
      lastSession: '2024-01-15',
      moodTrend: [3, 4, 3, 5, 4, 3, 4],
      progressScore: 78,
      riskLevel: 'low' as 'low' | 'medium' | 'high',
      nextAppointment: '2024-01-22'
    },
    {
      id: '2',
      name: 'Michael Chen',
      lastSession: '2024-01-14',
      moodTrend: [6, 7, 6, 5, 6, 7, 6],
      progressScore: 65,
      riskLevel: 'medium' as 'low' | 'medium' | 'high',
      nextAppointment: '2024-01-21'
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      lastSession: '2024-01-13',
      moodTrend: [4, 5, 4, 6, 5, 4, 5],
      progressScore: 82,
      riskLevel: 'low' as 'low' | 'medium' | 'high',
      nextAppointment: '2024-01-20'
    }
  ]);

  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [sessionNotes, setSessionNotes] = useState('');
  const [showNotesModal, setShowNotesModal] = useState(false);

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high': return 'text-red-500 bg-red-100';
      case 'medium': return 'text-yellow-500 bg-yellow-100';
      case 'low': return 'text-green-500 bg-green-100';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-purple-50 px-6 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Professional Dashboard
        </h2>
        <p className="text-gray-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
          Monitor patient progress and coordinate care
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
          <div className="text-2xl font-bold text-blue-400 mb-1">{patients.length}</div>
          <div className="text-sm text-gray-600">Active Patients</div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
          <div className="text-2xl font-bold text-green-400 mb-1">12</div>
          <div className="text-sm text-gray-600">Sessions This Week</div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
          <div className="text-2xl font-bold text-purple-400 mb-1">75%</div>
          <div className="text-sm text-gray-600">Avg. Progress</div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
          <div className="text-2xl font-bold text-yellow-400 mb-1">3</div>
          <div className="text-sm text-gray-600">High Risk Alerts</div>
        </div>
      </div>

      {/* Patients List */}
      <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Patient Overview
        </h3>
        
        <div className="space-y-4">
          {patients.map((patient) => (
            <div key={patient.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-300 to-sky-300 flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {patient.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{patient.name}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Last session: {new Date(patient.lastSession).toLocaleDateString()}</span>
                    <span>Next: {new Date(patient.nextAppointment).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className={`text-lg font-bold ${getProgressColor(patient.progressScore)}`}>
                    {patient.progressScore}%
                  </div>
                  <div className="text-xs text-gray-500">Progress</div>
                </div>
                
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskColor(patient.riskLevel)}`}>
                  {patient.riskLevel} risk
                </span>
                
                <button
                  onClick={() => {
                    setSelectedPatient(patient);
                    setShowNotesModal(true);
                  }}
                  className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200 transition-all duration-300"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Treatment Plans */}
      <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Treatment Plans
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
            <h4 className="font-semibold text-gray-800 mb-2">Anxiety Management</h4>
            <p className="text-sm text-gray-600 mb-3">
              CBT techniques, breathing exercises, and mindfulness practices
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">3 patients</span>
              <span className="text-sm font-medium text-blue-600">Active</span>
            </div>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
            <h4 className="font-semibold text-gray-800 mb-2">Depression Support</h4>
            <p className="text-sm text-gray-600 mb-3">
              Behavioral activation, mood tracking, and social connection
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">2 patients</span>
              <span className="text-sm font-medium text-green-600">Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Session Notes Modal */}
      {showNotesModal && selectedPatient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Session Notes - {selectedPatient.name}
              </h3>
              <button
                onClick={() => setShowNotesModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Progress Score</label>
                  <div className={`text-2xl font-bold ${getProgressColor(selectedPatient.progressScore)}`}>
                    {selectedPatient.progressScore}%
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Risk Level</label>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(selectedPatient.riskLevel)}`}>
                    {selectedPatient.riskLevel} risk
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mood Trend (Last 7 Days)</label>
                <div className="flex items-end space-x-1 h-16">
                  {selectedPatient.moodTrend.map((mood: number, index: number) => (
                    <div
                      key={index}
                      className="bg-purple-400 rounded-t"
                      style={{ height: `${mood * 10}%`, width: '20px' }}
                    ></div>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Session Notes</label>
                <textarea
                  value={sessionNotes}
                  onChange={(e) => setSessionNotes(e.target.value)}
                  placeholder="Enter session notes..."
                  className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 resize-none"
                  rows={4}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Goals for Next Session</label>
                <textarea
                  placeholder="Enter goals for next session..."
                  className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 resize-none"
                  rows={3}
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowNotesModal(false)}
                className="flex-1 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-semibold transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  toast.success('Session notes saved');
                  setShowNotesModal(false);
                }}
                className="flex-1 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-semibold transition-all duration-300"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { CommunityScreen, ProfessionalIntegrationScreen };
