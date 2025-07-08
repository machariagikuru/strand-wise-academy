
# StrandNotes - Production Ready Educational Platform

A comprehensive educational platform built with React, TypeScript, and Supabase. Features role-based access control, gamification, premium content system, and integrated payments.

## 🚀 Features

### Core Functionality
- **User Management**: Admin, Teacher, and Learner roles with different permissions
- **Content Structure**: Subjects → Strands → Sub-strands → Notes/Quizzes
- **Gamification**: StrandPoints system, badges, progress tracking
- **Premium Content**: Paywall system with multiple unlock methods
- **Discussions**: Threaded comments on notes
- **Progress Tracking**: Detailed analytics and progress monitoring

### Payment System
- **Multiple Unlock Methods**: Payment, Points, Social Sharing
- **Teacher Earnings**: Revenue sharing for content creators
- **Withdrawal System**: Request and process payouts
- **M-Pesa Integration**: Ready for Kenyan mobile payments

### Admin Features
- **User Management**: Create, update, and manage user roles
- **Content Moderation**: Approve/reject notes and quizzes
- **Analytics Dashboard**: Platform usage and revenue insights
- **Badge Management**: Create and manage achievement system

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Shadcn/UI components
- **Backend**: Supabase (Database, Auth, Edge Functions)
- **Database**: PostgreSQL with Row Level Security
- **State Management**: React Query for server state
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js 18+ 
- Supabase account
- Git

## 🚀 Quick Start

### 1. Clone and Install
```bash
git clone <your-repo-url>
cd strandnotes
npm install
```

### 2. Environment Setup
```bash
cp .env.example .env.local
```

Add your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Database Setup
Run the migrations in your Supabase project:
1. Go to Supabase Dashboard → SQL Editor
2. Run `supabase/migrations/001_initial_schema.sql`
3. Run `supabase/migrations/002_rls_policies.sql`
4. Run `supabase/migrations/003_seed_data.sql`

### 4. Edge Functions (Optional)
Deploy edge functions for advanced features:
```bash
supabase functions deploy unlock-content
```

### 5. Start Development
```bash
npm run dev
```

## 🏗 Project Structure

```
src/
├── components/
│   ├── ui/              # Shadcn/UI components
│   ├── layout/          # Navigation, Footer
│   └── home/            # Homepage components
├── pages/               # Route components
├── hooks/               # Custom React hooks
├── services/            # API service layer
├── types/               # TypeScript definitions
├── data/                # Mock data and utilities
└── lib/                 # Utility functions

supabase/
├── migrations/          # Database schema
└── functions/           # Edge functions
```

## 🔐 Authentication & Authorization

### User Roles
- **Admin**: Full platform management
- **Teacher**: Content creation and earnings management
- **Learner**: Content consumption and progress tracking

### Security Features
- Row Level Security (RLS) policies
- JWT-based authentication
- Role-based access control
- Secure API endpoints

## 💰 Monetization Features

### Content Unlocking
1. **Payment**: Direct payment via M-Pesa/Stripe
2. **Points**: Use earned StrandPoints
3. **Social Sharing**: Share to unlock content

### Teacher Earnings
- 70-80% revenue share on content sales
- Real-time earnings tracking
- Withdrawal request system
- Admin approval workflow

## 🎯 Gamification System

### StrandPoints
- Earned through completing activities
- Used to unlock premium content
- Leaderboard rankings

### Badges
- Achievement system with 5 default badges
- Automatic awarding based on activity
- Custom badge creation for admins

## 🚀 Production Deployment

### Option 1: Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy automatically

### Option 2: Netlify
1. Build the project: `npm run build`
2. Upload `dist` folder to Netlify
3. Configure environment variables

### Environment Variables for Production
```env
VITE_SUPABASE_URL=your_production_supabase_url
VITE_SUPABASE_ANON_KEY=your_production_anon_key
```

## 📊 Database Schema

### Core Tables
- `user_profiles` - Extended user information
- `subjects` - Subject categories
- `strands` - Subject subdivisions
- `sub_strands` - Granular topic areas
- `notes` - Educational content
- `quizzes` - Interactive assessments
- `quiz_questions` - Individual quiz items
- `quiz_attempts` - Student quiz submissions

### Gamification Tables
- `badges` - Achievement definitions
- `user_badges` - Earned achievements
- `point_transactions` - Points activity log
- `user_progress` - Learning progress tracking

### Business Tables
- `content_unlocks` - Premium content access
- `payments` - Transaction records
- `withdrawals` - Payout requests
- `discussions` - Comments and replies

## 🔧 API Functions

### Core Functions
- `award_points()` - Add points to user account
- `spend_points()` - Deduct points for purchases
- `update_user_progress()` - Track learning progress
- `check_and_award_badges()` - Automatic badge awarding

### Edge Functions
- `unlock-content` - Handle premium content access
- `process-payment` - Payment processing logic
- `send-notifications` - User communication

## 🧪 Testing

### Test Users (Created via seed data)
- **Admin**: admin@strandnotes.com
- **Teacher**: teacher@strandnotes.com  
- **Learner**: learner@strandnotes.com

Password: Use any password (will be set during registration)

## 📱 Mobile Responsiveness

- Fully responsive design using Tailwind CSS
- Mobile-first approach
- Touch-friendly interfaces
- Optimized for tablets and phones

## 🔒 Security Considerations

### Data Protection
- All sensitive data encrypted
- Row Level Security enabled
- User input sanitization
- CORS properly configured

### Best Practices
- Environment variables for secrets
- Secure authentication flow
- Input validation on all forms
- SQL injection prevention

## 🚀 Performance Optimizations

- Code splitting with React lazy loading
- Image optimization
- Database query optimization
- Caching with React Query
- CDN for static assets

## 📞 Support & Contribution

For support or contributions:
1. Create an issue for bugs
2. Submit pull requests for features
3. Follow coding standards
4. Include tests for new features

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Ready for Production** ✅
- Comprehensive user management
- Secure payment processing
- Scalable database architecture
- Mobile-responsive design
- Admin management tools
- Content moderation system
- Performance optimized
- SEO ready structure
