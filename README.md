# 🧠 MindMate AI - Your AI-Powered Emotional Wellness Companion

[![React](https://img.shields.io/badge/React-19.2.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.9-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.18-teal.svg)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue.svg)](https://www.typescriptlang.org/)

A comprehensive mental wellness application built with React Native, Vite, and modern web technologies. MindMate AI provides AI-powered emotional support, mood tracking, therapy tools, and personalized wellness insights.

## 🌟 Features

### 🤖 AI-Powered Chat Interface
- **Intelligent Conversations**: Engage with an empathetic AI companion
- **Contextual Responses**: AI understands your emotional state and responds appropriately
- **Conversation History**: Track your wellness journey through chat logs
- **Personalized Support**: AI adapts to your communication style and preferences

### 📊 Advanced Mood Tracking
- **Interactive Mood Selection**: Choose from 5 emotional states (Sad, Okay, Good, Happy, Joyful)
- **Visual Analytics**: Weekly mood charts with Chart.js integration
- **AI-Powered Insights**: Get personalized recommendations based on mood patterns
- **Progress Tracking**: Monitor your emotional wellness journey over time

### 🛠️ Comprehensive Therapy Tools
- **Guided Breathing Exercises**: Interactive breathing techniques for stress relief
- **CBT Journaling**: Cognitive Behavioral Therapy prompts for thought processing
- **Mindfulness Meditation**: Guided meditation sessions for mental clarity
- **Sleep Reset**: Bedtime routines for better sleep quality

### 👤 User Profile & Settings
- **Personal Dashboard**: View your wellness stats, progress charts, and achievements
- **Comprehensive Settings**: 
  - Notification preferences (daily reminders, mood check-ins, crisis alerts)
  - Privacy controls (data sharing, analytics, community participation)
  - AI personalization (communication style, session length, content suggestions)
  - Appearance settings (dark mode, font size)
  - Account management (data export, password change, account deletion)

### 🔐 Authentication System
- **Secure Sign Up/Sign In**: Complete user authentication flow
- **User Management**: Profile creation and account settings
- **Data Privacy**: GDPR-compliant privacy controls

## 🚀 Technology Stack

- **Frontend**: React 19.2.0 with TypeScript
- **Build Tool**: Vite 7.1.9 for fast development and building
- **Styling**: Tailwind CSS 3.4.18 for responsive design
- **Charts**: Chart.js with react-chartjs-2 for data visualization
- **Notifications**: react-hot-toast for user feedback
- **Forms**: react-hook-form with Yup validation
- **Routing**: react-router-dom for navigation
- **HTTP Client**: Axios for API communication
- **Utilities**: date-fns for date manipulation, uuid for unique IDs

## 📱 Mobile-First Design

- **Responsive Layout**: Optimized for mobile devices with desktop compatibility
- **Touch-Friendly Interface**: Large buttons and intuitive gestures
- **Bottom Navigation**: Easy access to all main features
- **Smooth Animations**: Engaging transitions and micro-interactions
- **Accessibility**: WCAG-compliant design with proper contrast and focus states

## 🎨 Design System

- **Color Palette**: Purple and sky gradients for a calming, professional look
- **Typography**: Poppins and Nunito fonts for readability
- **Components**: Consistent card-based design with shadows and rounded corners
- **Icons**: Font Awesome icons throughout the interface
- **Themes**: Support for light/dark mode switching

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/supreethteddy/MindmateAi.git
   cd MindmateAi
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
MindmateAi/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── AnalyticsScreen.tsx
│   │   ├── CommunityScreen.tsx
│   │   ├── MoodTrackerScreen.tsx
│   │   ├── NotificationsScreen.tsx
│   │   ├── PersonalizationScreen.tsx
│   │   └── TherapyToolsScreen.tsx
│   ├── hooks/              # Custom React hooks
│   │   └── index.ts
│   ├── services/           # API services and data management
│   │   └── api.ts
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles and Tailwind imports
├── public/                  # Static assets
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── tailwind.config.cjs     # Tailwind CSS configuration
├── postcss.config.cjs      # PostCSS configuration
└── README.md               # Project documentation
```

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS for styling with custom configuration:
- Custom font families (Poppins, Nunito)
- Responsive breakpoints
- Custom color palette

### TypeScript
Full TypeScript support with strict type checking:
- Interface definitions for all data structures
- Type-safe API calls
- Component prop validation

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Deploy automatically on every push to main branch
3. Environment variables can be set in Vercel dashboard

### Netlify
1. Build command: `npm run build`
2. Publish directory: `dist`
3. Deploy from GitHub integration

### Manual Deployment
1. Run `npm run build`
2. Upload the `dist` folder to your web server
3. Configure server for SPA routing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Vite Team** for the lightning-fast build tool
- **Tailwind CSS** for the utility-first CSS framework
- **Chart.js** for beautiful data visualization
- **Font Awesome** for comprehensive icon library

## 📞 Support

If you have any questions or need help with the project:

- **Issues**: [GitHub Issues](https://github.com/supreethteddy/MindmateAi/issues)
- **Discussions**: [GitHub Discussions](https://github.com/supreethteddy/MindmateAi/discussions)

## 🔮 Future Enhancements

- [ ] Real-time AI chat with OpenAI integration
- [ ] Push notifications for mobile devices
- [ ] Offline mode with data synchronization
- [ ] Social features and community support
- [ ] Professional therapist integration
- [ ] Advanced analytics and insights
- [ ] Multi-language support
- [ ] Voice interaction capabilities

---

**Made with ❤️ for mental wellness and emotional support**

*MindMate AI - Your journey to better mental health starts here.*
