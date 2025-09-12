// EmailJS Configuration
// To set up EmailJS:
// 1. Create account at https://www.emailjs.com/
// 2. Add email service (Gmail, Outlook, etc.)
// 3. Create templates using the content from src/templates/email-templates.md
// 4. Replace these placeholder values with your actual EmailJS credentials

export const EMAILJS_CONFIG = {
  // Your EmailJS Public Key (found in Account > API Keys)
  PUBLIC_KEY: 'Be7H-p7JmZKGhzDOo',
  
  // Your EmailJS Service ID (found in Email Services)
  SERVICE_ID: 'service_3pt3x1f',
  
  // Template IDs (create these in Email Templates section)
  TEMPLATES: {
    // Template 1: Sends subscriber info to admin
    ADMIN_NOTIFICATION: 'template_p1p95ey',
    
    // Template 2: Sends welcome email to user
    USER_WELCOME: 'template_z3ezlls'
  }
};

// Template variables mapping (for reference)
export const TEMPLATE_VARIABLES = {
  ADMIN_NOTIFICATION: {
    user_email: 'string',
    subscription_date: 'string'
  },
  USER_WELCOME: {
    to_email: 'string',
    to_name: 'string'
  }
};