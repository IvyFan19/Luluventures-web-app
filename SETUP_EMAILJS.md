# EmailJS Setup Instructions

EmailJS has been integrated into the Newsletter component, but requires configuration to work properly.

## 🔧 Setup Steps

### 1. Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Add Email Service
1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions
5. Copy the **Service ID**

### 3. Create Email Templates
Create two templates using the content from `src/templates/email-templates.md`:

#### Template 1: Admin Notification
- **Template Name:** Admin Notification
- **Subject:** New Deep Value Club Subscriber
- **Content:** Copy from Template 1 in email-templates.md
- **Template ID:** Copy this ID (you'll need it)

#### Template 2: User Welcome
- **Template Name:** User Welcome  
- **Subject:** Welcome to Our Deep Value Club - Exclusive Access Confirmed!
- **Content:** Copy from Template 2 in email-templates.md
- **Template ID:** Copy this ID (you'll need it)

### 4. Get Public Key
1. Go to **Account** > **API Keys**
2. Copy your **Public Key**

### 5. Update Configuration
Edit `src/config/emailjs.ts` and replace:

```typescript
export const EMAILJS_CONFIG = {
  PUBLIC_KEY: 'YOUR_ACTUAL_PUBLIC_KEY',
  SERVICE_ID: 'YOUR_ACTUAL_SERVICE_ID',
  TEMPLATES: {
    ADMIN_NOTIFICATION: 'YOUR_ADMIN_TEMPLATE_ID',
    USER_WELCOME: 'YOUR_USER_TEMPLATE_ID'
  }
};
```

## 🧪 Testing

1. Start the development server: `npm run dev`
2. Navigate to the newsletter section
3. Enter a test email address
4. Click Subscribe
5. Check both your admin email and the test email address

## 🔍 Troubleshooting

- **Build succeeds ✅** - EmailJS integration is properly installed
- **Configuration needed** - Update `src/config/emailjs.ts` with your credentials
- **Free tier limit** - EmailJS free plan allows 200 emails/month

## 📧 Email Flow

1. User submits email → Triggers two emails:
   - Admin notification with subscriber details
   - Welcome email to user
2. Success message shows "Welcome to Deep Value Club (Beta)!"
3. Error handling for failed submissions

---

**Current Status:** ✅ Code integrated, ⚠️ Configuration required