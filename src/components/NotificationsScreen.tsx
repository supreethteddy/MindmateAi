import React, { useState, useEffect } from 'react';
import { useCrisisSupport } from '../hooks';
import { CrisisContact } from '../types';
import toast from 'react-hot-toast';

const NotificationsScreen: React.FC = () => {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'Daily Check-in Reminder',
      message: 'How are you feeling today? Take a moment to log your mood.',
      type: 'reminder',
      time: '9:00 AM',
      isRead: false,
      priority: 'medium'
    },
    {
      id: '2',
      title: 'Therapy Session Scheduled',
      message: 'Your breathing exercise session is ready. Take 5 minutes for yourself.',
      type: 'therapy',
      time: '2:00 PM',
      isRead: false,
      priority: 'high'
    },
    {
      id: '3',
      title: 'Goal Progress Update',
      message: 'Great job! You\'re 75% towards your weekly wellness goal.',
      type: 'achievement',
      time: '6:00 PM',
      isRead: true,
      priority: 'low'
    },
    {
      id: '4',
      title: 'Community Support',
      message: 'Someone in your support group shared a helpful tip.',
      type: 'community',
      time: 'Yesterday',
      isRead: true,
      priority: 'low'
    }
  ]);

  const [settings, setSettings] = useState({
    dailyCheckIn: true,
    moodReminder: true,
    therapySession: true,
    goalReminder: true,
    crisisSupport: true,
    communityUpdates: false
  });

  const [showSettings, setShowSettings] = useState(false);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    toast.success('Notification deleted');
  };

  const updateSettings = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast.success('Settings updated');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'reminder': return '⏰';
      case 'therapy': return '🧘';
      case 'achievement': return '🏆';
      case 'community': return '👥';
      case 'crisis': return '🚨';
      default: return '📢';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-purple-50 px-6 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Notifications & Reminders
        </h2>
        <p className="text-gray-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
          Stay connected with your wellness journey
        </p>
      </div>

      {/* Settings Button */}
      <div className="text-right mb-6">
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200 transition-all duration-300"
        >
          ⚙️ Settings
        </button>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Notification Preferences
          </h3>
          <div className="space-y-4">
            {Object.entries(settings).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-gray-800 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                  <div className="text-sm text-gray-500">
                    {key === 'dailyCheckIn' && 'Daily mood check-in reminders'}
                    {key === 'moodReminder' && 'Reminders to log your mood'}
                    {key === 'therapySession' && 'Therapy session notifications'}
                    {key === 'goalReminder' && 'Goal progress reminders'}
                    {key === 'crisisSupport' && 'Crisis support alerts'}
                    {key === 'communityUpdates' && 'Community activity updates'}
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => updateSettings(key, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white rounded-2xl p-4 shadow-lg border-l-4 ${getPriorityColor(notification.priority)} ${
              !notification.isRead ? 'ring-2 ring-purple-200' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className="text-2xl">{getTypeIcon(notification.type)}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className={`font-semibold ${!notification.isRead ? 'text-gray-800' : 'text-gray-600'}`}>
                      {notification.title}
                    </h3>
                    {!notification.isRead && (
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
                    {notification.message}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>{notification.time}</span>
                    <span className="capitalize">{notification.priority} priority</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {!notification.isRead && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-medium hover:bg-purple-200 transition-all duration-300"
                  >
                    Mark Read
                  </button>
                )}
                <button
                  onClick={() => deleteNotification(notification.id)}
                  className="text-gray-400 hover:text-red-500 transition-all duration-300"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-2 gap-4">
        <button
          onClick={() => toast.success('Test notification sent!')}
          className="py-3 bg-gradient-to-r from-purple-300 to-sky-300 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Test Notification
        </button>
        <button
          onClick={() => {
            setNotifications(prev => prev.map(notif => ({ ...notif, isRead: true })));
            toast.success('All notifications marked as read');
          }}
          className="py-3 bg-gradient-to-r from-sky-300 to-purple-300 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Mark All Read
        </button>
      </div>
    </div>
  );
};

const CrisisSupportScreen: React.FC = () => {
  const { crisisContacts, loading, addCrisisContact, getCrisisContacts, triggerCrisisSupport } = useCrisisSupport();
  const [showAddContact, setShowAddContact] = useState(false);
  const [newContact, setNewContact] = useState({
    name: '',
    phone: '',
    relationship: '',
    isEmergency: false
  });
  const [showCrisisModal, setShowCrisisModal] = useState(false);
  const [crisisLevel, setCrisisLevel] = useState<'low' | 'medium' | 'high'>('low');

  useEffect(() => {
    getCrisisContacts();
  }, [getCrisisContacts]);

  const handleAddContact = async () => {
    if (!newContact.name || !newContact.phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      await addCrisisContact(newContact);
      toast.success('Crisis contact added successfully');
      setNewContact({ name: '', phone: '', relationship: '', isEmergency: false });
      setShowAddContact(false);
    } catch (error) {
      toast.error('Failed to add crisis contact');
    }
  };

  const handleCrisisSupport = async () => {
    try {
      await triggerCrisisSupport(crisisLevel);
      toast.success('Crisis support activated');
      setShowCrisisModal(false);
    } catch (error) {
      toast.error('Failed to activate crisis support');
    }
  };

  const crisisResources = [
    {
      name: 'National Suicide Prevention Lifeline',
      phone: '988',
      description: '24/7 crisis support and suicide prevention',
      isEmergency: true
    },
    {
      name: 'Crisis Text Line',
      phone: 'Text HOME to 741741',
      description: 'Free 24/7 crisis support via text',
      isEmergency: true
    },
    {
      name: 'SAMHSA National Helpline',
      phone: '1-800-662-4357',
      description: 'Mental health and substance abuse support',
      isEmergency: false
    },
    {
      name: 'National Domestic Violence Hotline',
      phone: '1-800-799-7233',
      description: '24/7 support for domestic violence',
      isEmergency: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-purple-50 px-6 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Crisis Support & Safety
        </h2>
        <p className="text-gray-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
          You're not alone. Help is always available.
        </p>
      </div>

      {/* Emergency Button */}
      <div className="text-center mb-8">
        <button
          onClick={() => setShowCrisisModal(true)}
          className="px-8 py-4 bg-red-500 hover:bg-red-600 text-white rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          🚨 I Need Help Now
        </button>
      </div>

      {/* Crisis Resources */}
      <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Crisis Resources
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {crisisResources.map((resource, index) => (
            <div key={index} className={`p-4 rounded-xl border-l-4 ${
              resource.isEmergency ? 'border-l-red-500 bg-red-50' : 'border-l-blue-500 bg-blue-50'
            }`}>
              <h4 className="font-semibold text-gray-800 mb-2">{resource.name}</h4>
              <p className="text-lg font-bold text-gray-700 mb-2">{resource.phone}</p>
              <p className="text-sm text-gray-600">{resource.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Personal Crisis Contacts */}
      <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Your Crisis Contacts
          </h3>
          <button
            onClick={() => setShowAddContact(true)}
            className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200 transition-all duration-300"
          >
            + Add Contact
          </button>
        </div>

        {crisisContacts.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No crisis contacts added yet.</p>
        ) : (
          <div className="space-y-3">
            {crisisContacts.map((contact) => (
              <div key={contact.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-800">{contact.name}</h4>
                  <p className="text-sm text-gray-600">{contact.phone}</p>
                  <p className="text-xs text-gray-500">{contact.relationship}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {contact.isEmergency && (
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                      Emergency
                    </span>
                  )}
                  <button
                    onClick={() => window.open(`tel:${contact.phone}`)}
                    className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium hover:bg-green-200 transition-all duration-300"
                  >
                    Call
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Safety Planning */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Safety Planning
        </h3>
        <div className="space-y-4">
          <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
            <h4 className="font-medium text-gray-800 mb-2">Warning Signs</h4>
            <p className="text-sm text-gray-600">
              Know your personal warning signs and triggers. When you notice them, reach out for support immediately.
            </p>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
            <h4 className="font-medium text-gray-800 mb-2">Coping Strategies</h4>
            <p className="text-sm text-gray-600">
              Practice your coping strategies: deep breathing, calling a friend, going for a walk, or using therapy tools.
            </p>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
            <h4 className="font-medium text-gray-800 mb-2">Support Network</h4>
            <p className="text-sm text-gray-600">
              Keep your support network close. Don't hesitate to reach out when you need help.
            </p>
          </div>
        </div>
      </div>

      {/* Add Contact Modal */}
      {showAddContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Add Crisis Contact</h3>
              <button
                onClick={() => setShowAddContact(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={newContact.name}
                  onChange={(e) => setNewContact(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
                  placeholder="Enter contact name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={newContact.phone}
                  onChange={(e) => setNewContact(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
                  placeholder="Enter phone number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
                <input
                  type="text"
                  value={newContact.relationship}
                  onChange={(e) => setNewContact(prev => ({ ...prev, relationship: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
                  placeholder="e.g., Family, Friend, Therapist"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="emergency"
                  checked={newContact.isEmergency}
                  onChange={(e) => setNewContact(prev => ({ ...prev, isEmergency: e.target.checked }))}
                  className="w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="emergency" className="text-sm text-gray-700">
                  Emergency contact
                </label>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddContact(false)}
                className="flex-1 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-semibold transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddContact}
                className="flex-1 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-semibold transition-all duration-300"
              >
                Add Contact
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Crisis Support Modal */}
      {showCrisisModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Crisis Support</h3>
              <button
                onClick={() => setShowCrisisModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-600">
                How urgent is your need for support right now?
              </p>
              
              <div className="space-y-3">
                {(['low', 'medium', 'high'] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setCrisisLevel(level)}
                    className={`w-full p-3 rounded-lg text-left transition-all duration-300 ${
                      crisisLevel === level
                        ? level === 'high' ? 'bg-red-100 border-2 border-red-500' :
                          level === 'medium' ? 'bg-yellow-100 border-2 border-yellow-500' :
                          'bg-green-100 border-2 border-green-500'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="font-medium capitalize">{level} Priority</div>
                    <div className="text-sm text-gray-600">
                      {level === 'high' && 'Immediate support needed - crisis resources will be activated'}
                      {level === 'medium' && 'Support needed soon - we\'ll connect you with resources'}
                      {level === 'low' && 'General support - we\'ll provide guidance and resources'}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowCrisisModal(false)}
                className="flex-1 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-semibold transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleCrisisSupport}
                className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-all duration-300"
              >
                Get Support
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { NotificationsScreen, CrisisSupportScreen };
