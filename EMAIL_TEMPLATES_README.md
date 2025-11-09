# 📧 Premium Email Templates for The Serving Church

Beautiful, professional email templates for Supabase authentication emails.

## ✨ What's Included

### 1. **Email Confirmation** (`email-template-enhanced.html`)
- For new member signups
- Use in: **Authentication → Email Templates → Confirm signup**
- Theme: Blue/Purple gradient

### 2. **Password Reset** (`email-template-password-reset.html`)
- For password recovery
- Use in: **Authentication → Email Templates → Reset Password**
- Theme: Red/Orange gradient

### 3. **Magic Link** (`email-template-magic-link.html`)
- For passwordless login
- Use in: **Authentication → Email Templates → Magic Link**
- Theme: Green/Emerald gradient

### 4. **Change Email Address** (`email-template-change-email.html`)
- For email address updates
- Use in: **Authentication → Email Templates → Change Email Address**
- Theme: Cyan/Teal gradient

### 5. **Invite User** (`email-template-invite-user.html`)
- For admin-invited members
- Use in: **Authentication → Email Templates → Invite User**
- Theme: Purple/Violet gradient

### 6. **Reauthentication** (`email-template-reauthentication.html`)
- For identity verification on sensitive actions
- Use in: **Authentication → Email Templates → Reauthentication**
- Theme: Amber/Yellow gradient

---

## 🎨 Design Enhancements

Your enhanced templates now feature:

### Visual Polish
- ✅ **Sophisticated gradients** with animated top/bottom borders
- ✅ **Premium shadows** with layered depth (0-60px multi-layer)
- ✅ **Enhanced icons** with frosted glass backgrounds and custom SVG designs
- ✅ **Better typography** with -0.5px letter spacing, 800 weight headings
- ✅ **Smooth color transitions** using 4-stop gradients instead of 2
- ✅ **Decorative patterns** with subtle SVG backgrounds at 3% opacity

### User Experience
- ✅ **Preheader text** (shows in inbox preview)
- ✅ **Badge indicators** (New Member, Security Alert, Passwordless Login)
- ✅ **Enhanced CTA buttons** with double borders, glow effects, and larger padding
- ✅ **Context boxes** with icons and professional formatting
- ✅ **Security notices** in highlighted boxes
- ✅ **Better spacing rhythm** (40-50px sections vs 30px)

### Professional Details
- ✅ **Contact information cards** with emoji icons and rounded backgrounds
- ✅ **Color-coded themes** (Blue for signup, Red for security, Green for magic link)
- ✅ **Social media links** with branded button colors
- ✅ **Expiration warnings** with inline emphasis
- ✅ **Mobile responsive** with max-width constraints
- ✅ **Fallback link boxes** with monospace font for URLs

### Email Client Compatibility
- ✅ **MSO/Outlook compatibility** comments
- ✅ **Table-based layout** (most compatible)
- ✅ **Inline CSS** (required for emails)
- ✅ **Gradient fallbacks** for older clients
- ✅ **No external dependencies** (all inline)

---

## 📋 How to Install

### Step 1: Go to Supabase Dashboard
1. Navigate to your project at [app.supabase.com](https://app.supabase.com)
2. Click **Authentication** in the left sidebar
3. Click **Email Templates**

### Step 2: Select Template Type
Choose which template you want to update:
- **Confirm signup** → Use `email-template-enhanced.html`
- **Reset Password** → Use `email-template-password-reset.html`
- **Magic Link** → Use `email-template-magic-link.html`
- **Change Email Address** → Use `email-template-change-email.html`
- **Invite User** → Use `email-template-invite-user.html`
- **Reauthentication** → Use `email-template-reauthentication.html`

### Step 3: Paste the HTML
1. Open the corresponding `.html` file from this directory
2. Copy the entire contents (Ctrl+A, Ctrl+C)
3. Paste into the Supabase template editor
4. Click **Save**

### Step 4: Test
Send a test email to verify:
- **Confirm signup**: Create a new test account
- **Reset Password**: Click "Forgot Password" on login
- **Magic Link**: Use the magic link login option
- **Change Email**: Update email in account settings
- **Invite User**: Invite a test email from admin panel
- **Reauthentication**: Attempt sensitive account action (if implemented)

---

## 🎯 Key Improvements Over Original

| Feature | Before | After |
|---------|--------|-------|
| **Header gradient** | 2-stop | 4-stop with pattern overlay |
| **Shadows** | Single layer | Multi-layer with depth |
| **Icon design** | Basic SVG | Frosted glass container with glow |
| **Button style** | Simple gradient | Double border with enhanced shadow |
| **Typography** | Standard | -0.5px tracking, 800 weight |
| **Badges** | None | Status badges with gradients |
| **Contact info** | Simple list | Grid cards with colored backgrounds |
| **Social links** | Text only | Branded buttons with hover states |
| **Borders** | Static | Animated gradient borders |
| **Spacing** | Standard | Enhanced rhythm (1.5x larger) |

---

## 🎨 Color Schemes

### 1. Confirmation Email (Blue/Purple)
- Primary: `#2563eb` (Blue 600)
- Secondary: `#7c3aed` (Purple 600)
- Accent: `#eff6ff` → `#f3e8ff` (Gradient backgrounds)
- Message: Welcome, exciting, new beginning

### 2. Password Reset (Red/Orange)
- Primary: `#dc2626` (Red 600)
- Secondary: `#ea580c` (Orange 600)
- Warning: `#fef2f2` (Red 50 background)
- Message: Account update, change needed

### 3. Magic Link (Green/Emerald)
- Primary: `#059669` (Emerald 600)
- Secondary: `#10b981` (Emerald 500)
- Success: `#ecfdf5` (Emerald 50 background)
- Message: Easy, magical, instant access

### 4. Change Email (Cyan/Teal)
- Primary: `#0891b2` (Cyan 600)
- Secondary: `#06b6d4` (Cyan 500)
- Info: `#ecfeff` (Cyan 50 background)
- Message: Account modification, update

### 5. Invite User (Purple/Violet)
- Primary: `#7c3aed` (Purple 600)
- Secondary: `#a855f7` (Purple 500)
- Accent: `#faf5ff` (Purple 50 background)
- Message: Welcome, invitation, special

### 6. Reauthentication (Amber/Yellow)
- Primary: `#f59e0b` (Amber 500)
- Secondary: `#eab308` (Yellow 500)
- Caution: `#fffbeb` (Amber 50 background)
- Message: Verification, security, attention

---

## 📱 Mobile Responsive

All templates are optimized for mobile with:
- Max-width: 650px (desktop)
- Padding: 20px (mobile)
- Touch-friendly buttons: 48px min height
- Readable font sizes: 16px+ body text
- Collapsible sections for small screens

---

## 🔧 Customization Tips

### Change Colors
Search and replace hex codes:
- Blue: `#2563eb` → your color
- Purple: `#7c3aed` → your color

### Update Contact Info
Lines 380-400 in each file:
```html
📍 222 Collins Rd, Sunnyvale, TX 75182
📞 (214) 738-6371
📧 team@servingchurchdallas.com
```

### Modify Social Links
Lines 410-430 in confirmation email:
```html
<a href="https://facebook.com/theservingchurch">
<a href="https://instagram.com/theservingchurch">
<a href="https://servingchurchdallas.com">
```

### Adjust Expiration Time
Default: "24 hours" (confirmation), "1 hour" (reset/magic)
Change in the template text as needed.

---

## ✅ Testing Checklist

Before going live, test in:
- [ ] Gmail (Desktop)
- [ ] Gmail (Mobile)
- [ ] Outlook (Desktop)
- [ ] Apple Mail (iOS)
- [ ] Apple Mail (macOS)

Check for:
- [ ] All images render correctly
- [ ] Buttons are clickable
- [ ] Links work properly
- [ ] Text is readable
- [ ] Layout isn't broken
- [ ] Colors look good

---

## 🚀 Advanced: A/B Testing

Track which template performs better:

1. **Metric Ideas**
   - Click-through rate on CTA button
   - Time to confirmation
   - Spam complaints
   - Unsubscribe rate

2. **Tools to Use**
   - Supabase Analytics
   - Google Analytics (UTM parameters)
   - Custom event tracking

---

## 📞 Support

Questions about these templates?

- **Technical Issues**: team@servingchurchdallas.com
- **Supabase Docs**: https://supabase.com/docs/guides/auth/auth-email-templates
- **HTML Email Guide**: https://htmlemail.io

---

## 📄 License

These templates are created for The Serving Church.
Feel free to modify and use as needed for your church.

---

**Made with 💙 for The Serving Church community**
