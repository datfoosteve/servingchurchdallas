# The Serving Church Dallas - Website

A modern, full-featured church website built with Next.js 14, TypeScript, Supabase, and Tailwind CSS.

## 📊 Project Stats

- **~13,900 lines** of TypeScript/JavaScript code
- **Progressive Web App (PWA)** - Installable on mobile and desktop
- **Real-time notifications** - Push notifications for announcements
- **Mobile-first responsive** - Optimized for all devices

## 🌟 Features

### Public Website
- **Homepage** - Modern landing page with church information
- **About Us** - Church mission, vision, and leadership
- **Events** - Public event listings and calendar
- **Prayer Wall** - Community prayer requests with moderation
- **Sermons** - Access to sermon recordings and notes
- **Donate** - Secure giving integration
- **Location** - Interactive map and directions

### Member Portal
- **Secure Authentication** - Email/password login with Supabase Auth
- **Member Dashboard** - Personalized portal for members
- **Announcements** - Church-wide announcements with push notifications
- **Push Notifications** - Real-time updates for new announcements
- **Member Directory** - View and connect with other members
- **Prayer Submissions** - Submit private or public prayer requests

### Admin Dashboard
- **Member Management** - Add, edit, and manage member accounts and roles
- **Prayer Management** - Review, approve, and moderate prayer requests
- **Event Management** - Create and manage church events
- **Announcement System** - Send announcements with optional push notifications
- **Analytics Dashboard** - View member statistics and engagement
- **Role-Based Access** - Pastor and Admin roles with different permissions

### Progressive Web App (PWA)
- **Installable** - Add to home screen on iOS and Android
- **Offline Support** - Service worker for offline functionality
- **App Shortcuts** - Quick access to Prayer Wall, Events, and Donate
- **Mobile Optimized** - Full responsive design for mobile devices
- **Standalone Mode** - Runs like a native app when installed

### Security & Spam Protection
- **AI-Powered Spam Detection** - Cloudflare Turnstile integration
- **Row Level Security (RLS)** - Database-level access control
- **Rate Limiting** - IP-based submission limits
- **Content Moderation** - Admin review for prayer requests
- **Secure Authentication** - Supabase Auth with magic links and password reset

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Supabase account (free tier)
- Cloudflare account (for Turnstile spam protection)
- Resend account (for transactional emails)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/datfoosteve/servingchurchdallas.git
   cd servingchurchdallas
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create `.env.local` in the root directory:
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   NEXT_PUBLIC_SUPABASE_PROJECT_REF=your_project_ref

   # Cloudflare Turnstile (for spam protection)
   NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_cloudflare_site_key
   TURNSTILE_SECRET_KEY=your_turnstile_secret_key

   # Email (Resend)
   RESEND_API_KEY=your_resend_api_key
   PRAYER_REQUEST_EMAIL=theservingchurchdallas@gmail.com
   RESEND_FROM_EMAIL=onboarding@resend.dev

   # Push Notifications (VAPID keys)
   NEXT_PUBLIC_VAPID_PUBLIC_KEY=your_vapid_public_key
   VAPID_PRIVATE_KEY=your_vapid_private_key
   ```

4. **Set up the database**

   Run all migration files in `supabase/migrations/` in order in your Supabase SQL Editor:
   - `001_initial_schema.sql`
   - `002_prayers_table.sql`
   - `003_member_portal_SAFE.sql`
   - `004_events_table.sql`
   - `005_link_prayers_to_members.sql`
   - `006_add_admin_member_management_policy.sql`
   - `007_secure_member_role_updates.sql`
   - `008_prayer_autopublish_guardrails.sql`

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to see the website.

## 📚 Documentation

All setup guides are located in the `/docs` folder:

### Essential Reading

- **[Website Technical Specification](docs/WEBSITE_TECHNICAL_SPECIFICATION.md)** - Complete technical overview of the entire system
- **[Complete Member Portal Guide](docs/COMPLETE_MEMBER_PORTAL_GUIDE.md)** - Full setup guide for member portal and all features

### Setup Guides

- **[Announcement System Setup](docs/ANNOUNCEMENT_SYSTEM_SETUP.md)** - Push notifications and announcement system
- **[Email Templates README](docs/EMAIL_TEMPLATES_README.md)** - Supabase email template customization
- **[Cloudflare Turnstile Setup](docs/CLOUDFLARE_TURNSTILE_SETUP.md)** - 5-minute guide to set up spam protection
- **[Spam Protection Setup](docs/SPAM_PROTECTION_SETUP.md)** - Backend setup for prayer wall spam detection
- **[Frontend Spam Protection Guide](docs/FRONTEND_SPAM_PROTECTION_GUIDE.md)** - Frontend integration for spam protection

### Quick Reference

| What do you need? | Which guide? |
|-------------------|--------------|
| First time setup | [Complete Member Portal Guide](docs/COMPLETE_MEMBER_PORTAL_GUIDE.md) |
| Understand the tech stack | [Website Technical Specification](docs/WEBSITE_TECHNICAL_SPECIFICATION.md) |
| Set up spam protection | [Cloudflare Turnstile Setup](docs/CLOUDFLARE_TURNSTILE_SETUP.md) → [Spam Protection Setup](docs/SPAM_PROTECTION_SETUP.md) |
| Configure push notifications | [Announcement System Setup](docs/ANNOUNCEMENT_SYSTEM_SETUP.md) |
| Customize email templates | [Email Templates README](docs/EMAIL_TEMPLATES_README.md) |

## 🗂️ Project Structure

```
servingchurchdallas/
├── src/
│   ├── app/                    # Next.js 14 App Router pages
│   │   ├── (public)/          # Public pages (home, about, events, etc.)
│   │   ├── admin/             # Admin dashboard pages
│   │   │   ├── dashboard/    # Main admin dashboard
│   │   │   ├── members/      # Member management
│   │   │   ├── prayers/      # Prayer request management
│   │   │   ├── events/       # Event management
│   │   │   └── announcements/ # Announcement management
│   │   ├── member/            # Member portal pages
│   │   ├── auth/              # Authentication pages (login, signup)
│   │   └── api/               # API routes
│   │       ├── prayer-requests/  # Prayer submission API
│   │       ├── push-subscription/ # Push notification API
│   │       └── announcements/     # Announcement API
│   ├── components/            # Reusable React components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── component/        # Custom components (nav, footer, etc.)
│   │   └── prayer-badge.tsx  # Unread prayer count badge
│   └── lib/                   # Utilities and configurations
│       ├── supabase/         # Supabase client setup
│       └── utils.ts          # Utility functions
├── supabase/
│   ├── migrations/           # Database migrations (run in order)
│   ├── functions/            # Edge Functions (submitPrayer, reportPrayer)
│   └── sql_helpers/          # Helper SQL scripts for debugging
├── docs/                     # All setup guides and documentation
├── email-templates/          # Supabase Auth email templates
├── public/                   # Static assets
│   ├── icons/               # PWA icons and favicons
│   └── manifest.json        # PWA manifest
└── service-worker.js        # Service worker for PWA and push notifications
```

## 🔐 User Roles

The system supports three user roles with different permissions:

| Role | Permissions |
|------|------------|
| **Pastor** | Full access to all features, member management, role changes |
| **Admin** | Manage content (events, announcements, prayers), view members |
| **Member** | Access member portal, view announcements, submit prayers |

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI
- **Backend**: Supabase (PostgreSQL, Authentication, Row Level Security)
- **Real-time**: Supabase Realtime subscriptions
- **Email**: Resend API for transactional emails
- **Push Notifications**: Web Push API with VAPID
- **Security**: Cloudflare Turnstile, Supabase RLS policies
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)
- **PWA**: Next-PWA with custom service worker

## 📊 Database Schema

The database includes the following main tables:

- **members** - User accounts with role-based access control
- **announcements** - Church announcements with push notification support
- **events** - Event management with RSVP tracking
- **prayers** - Prayer requests with status tracking and moderation
- **prayer_reports** - Community-driven prayer request moderation
- **push_subscriptions** - Web push notification subscriptions

All tables use Row Level Security (RLS) for database-level access control.

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel dashboard
3. Add all environment variables from `.env.local`
4. Deploy!

### Deploy Edge Functions to Supabase

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref your_project_ref

# Set secrets
supabase secrets set TURNSTILE_SECRET_KEY=your_key --project-ref your_ref
supabase secrets set IP_HASH_SALT=your_salt --project-ref your_ref

# Deploy functions
supabase functions deploy submitPrayer --project-ref your_ref
supabase functions deploy reportPrayer --project-ref your_ref
```

### Set up Push Notifications

```bash
# Generate VAPID keys
npx web-push generate-vapid-keys

# Add to Vercel environment variables
NEXT_PUBLIC_VAPID_PUBLIC_KEY=your_public_key
VAPID_PRIVATE_KEY=your_private_key
```

See [Announcement System Setup](docs/ANNOUNCEMENT_SYSTEM_SETUP.md) for detailed instructions.

## 🧪 Testing the PWA

1. Build the production version: `npm run build`
2. Start production server: `npm start`
3. Open on mobile device or use Chrome DevTools Device Mode
4. Install to home screen
5. Test offline functionality and push notifications

## 🤝 Contributing

This is a private church project, but if you're working on it:

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes and test thoroughly
3. Ensure mobile responsiveness (test on real devices)
4. Commit with clear, descriptive messages
5. Push and create a pull request

### Development Guidelines

- Follow TypeScript best practices
- Use Tailwind CSS for styling (no custom CSS unless necessary)
- Ensure all pages are mobile-responsive
- Test PWA functionality before merging
- Add RLS policies for new database tables
- Document new features in `/docs`

## 📝 License

Private project for The Serving Church Dallas.

## 🆘 Support

For issues or questions:
1. Check the [documentation](docs/) first
2. Review the [Technical Specification](docs/WEBSITE_TECHNICAL_SPECIFICATION.md)
3. Check existing GitHub issues
4. Contact the development team

## 🙏 Acknowledgments

Built with modern web technologies to serve the church community:
- Next.js team for the amazing framework
- Supabase for the backend infrastructure
- shadcn for the beautiful UI components
- Vercel for seamless deployment

---

**Built with ❤️ for The Serving Church Dallas**

*Connecting our community through technology*
