# The Serving Church Dallas - Website

A modern church website built with Next.js 14, TypeScript, Supabase, and Tailwind CSS.

## 🌟 Features

- **Public Website**: Homepage, About, Events, Prayer Wall
- **Member Portal**: Secure login, announcements, polls, member directory
- **Prayer System**: Public prayer wall with spam protection and community moderation
- **Admin Dashboard**: Manage members, events, announcements, prayers, and polls
- **Spam Protection**: AI-powered spam detection with Cloudflare Turnstile

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Supabase account (free tier)
- Cloudflare account (for Turnstile)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
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
   NEXT_PUBLIC_SUPABASE_PROJECT_REF=your_project_ref

   # Cloudflare Turnstile (for spam protection)
   NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_cloudflare_site_key

   # Email (Resend)
   RESEND_API_KEY=your_resend_api_key
   PRAYER_REQUEST_EMAIL=theservingchurchdallas@gmail.com
   RESEND_FROM_EMAIL=onboarding@resend.dev
   ```

4. **Set up the database**

   Run all migration files in `supabase/migrations/` in order (001 through 008) in your Supabase SQL Editor.

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

- **[Cloudflare Turnstile Setup](docs/CLOUDFLARE_TURNSTILE_SETUP.md)** - 5-minute guide to set up spam protection
- **[Spam Protection Setup](docs/SPAM_PROTECTION_SETUP.md)** - Backend setup for prayer wall spam detection
- **[Frontend Spam Protection Guide](docs/FRONTEND_SPAM_PROTECTION_GUIDE.md)** - Frontend integration for spam protection

### Quick Reference

| What do you need? | Which guide? |
|-------------------|--------------|
| First time setup | [Complete Member Portal Guide](docs/COMPLETE_MEMBER_PORTAL_GUIDE.md) |
| Understand the tech stack | [Website Technical Specification](docs/WEBSITE_TECHNICAL_SPECIFICATION.md) |
| Set up spam protection | [Cloudflare Turnstile Setup](docs/CLOUDFLARE_TURNSTILE_SETUP.md) → [Spam Protection Setup](docs/SPAM_PROTECTION_SETUP.md) → [Frontend Guide](docs/FRONTEND_SPAM_PROTECTION_GUIDE.md) |

## 🗂️ Project Structure

```
servingchurchdallas/
├── src/
│   ├── app/                    # Next.js 14 App Router pages
│   │   ├── (public)/          # Public pages (home, about, events, etc.)
│   │   ├── admin/             # Admin dashboard pages
│   │   ├── auth/              # Authentication pages
│   │   └── api/               # API routes
│   ├── components/            # Reusable React components
│   │   └── ui/               # shadcn/ui components
│   └── lib/                   # Utilities and configurations
│       └── supabase/         # Supabase client setup
├── supabase/
│   ├── migrations/           # Database migrations (run in order)
│   └── functions/            # Edge Functions (submitPrayer, reportPrayer)
├── docs/                     # All setup guides and documentation
└── public/                   # Static assets (images, fonts, etc.)
```

## 🔐 User Roles

The system supports three user roles:

1. **Pastor** - Full access to everything
2. **Admin** - Manage content, members (except role changes)
3. **Member** - Access member portal, view announcements, submit prayers

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Supabase (PostgreSQL, Authentication, Edge Functions)
- **Email**: Resend API
- **Security**: Cloudflare Turnstile, Row Level Security (RLS)
- **Deployment**: Vercel (recommended)

## 📊 Database Migrations

Run these in order in your Supabase SQL Editor:

1. `001_initial_schema.sql` - Base tables (events, announcements, polls)
2. `002_prayers_table.sql` - Prayer requests table
3. `003_member_portal_SAFE.sql` - Member accounts and authentication
4. `004_events_table.sql` - Events management
5. `005_link_prayers_to_members.sql` - Connect prayers to member accounts
6. `006_add_admin_member_management_policy.sql` - Admin role management
7. `007_secure_member_role_updates.sql` - Prevent privilege escalation
8. `008_prayer_autopublish_guardrails.sql` - Spam protection system

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Deploy Edge Functions to Supabase

```bash
# Login to Supabase CLI
supabase login

# Set secrets
supabase secrets set TURNSTILE_SECRET_KEY=your_key --project-ref your_ref
supabase secrets set IP_HASH_SALT=your_salt --project-ref your_ref

# Deploy functions
supabase functions deploy submitPrayer --project-ref your_ref
supabase functions deploy reportPrayer --project-ref your_ref
```

See [Spam Protection Setup](docs/SPAM_PROTECTION_SETUP.md) for detailed instructions.

## 🤝 Contributing

This is a private church project, but if you're working on it:

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Test thoroughly
4. Commit with clear messages
5. Push and create a pull request

## 📝 License

Private project for The Serving Church Dallas.

## 🆘 Support

For issues or questions:
- Check the [documentation](docs/) first
- Review the [Technical Specification](docs/WEBSITE_TECHNICAL_SPECIFICATION.md)
- Contact the development team

---

**Built with ❤️ for The Serving Church Dallas**
