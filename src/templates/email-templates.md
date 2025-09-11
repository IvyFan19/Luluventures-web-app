# Email Templates for EmailJS

## Template 1: Admin Notification (admin_template_id)

**Subject:** New Deep Value Club Subscriber

**Content:**
```
New Subscription Alert

A new user has subscribed to the Investment Club newsletter.

Email: {{user_email}}
Subscription Date: {{subscription_date}}
Source: Website Newsletter Form

---
LuLu Investment Platform
Automated Notification System
```

---

## Template 2: User Welcome Email (user_template_id)

**Subject:** Welcome to Our Deep Value Club - Exclusive Access Confirmed!

**Content:**
```
Dear Value Investor,

Welcome to our Deep Value Club (Beta)! 

You're now registered to receive:
✓ Early access to our new investment app
✓ Research reports and analysis  

We'll keep you posted!

Best regards,
LuLu Ventures Team
```

---

## EmailJS Configuration Notes:

### Template Variables:
- **Admin Template:** `{{user_email}}`, `{{subscription_date}}`
- **User Template:** `{{to_email}}`, `{{to_name}}`

### Service Configuration:
1. Create EmailJS account at https://www.emailjs.com/
2. Add email service (Gmail, Outlook, etc.)
3. Create both templates in EmailJS dashboard
4. Copy template IDs and service ID to your React component
5. Set up public key for client-side authentication

### Implementation Notes:
- Both emails sent simultaneously on form submission
- Admin email collects subscriber data
- User email provides immediate confirmation and sets expectations
- Templates use professional tone matching investment/finance industry