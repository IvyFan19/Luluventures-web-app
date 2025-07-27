import { Amplify } from 'aws-amplify';

console.log('Environment variables:', {
  userPoolId: import.meta.env.VITE_AWS_USER_POOL_ID,
  clientId: import.meta.env.VITE_AWS_USER_POOL_CLIENT_ID,
  domain: import.meta.env.VITE_AWS_COGNITO_DOMAIN,
  redirectSignIn: import.meta.env.VITE_REDIRECT_SIGN_IN,
  redirectSignOut: import.meta.env.VITE_REDIRECT_SIGN_OUT,
});

// 检查必需的环境变量
if (!import.meta.env.VITE_AWS_USER_POOL_ID) {
  console.error('VITE_AWS_USER_POOL_ID is not defined');
}
if (!import.meta.env.VITE_AWS_USER_POOL_CLIENT_ID) {
  console.error('VITE_AWS_USER_POOL_CLIENT_ID is not defined');
}
if (!import.meta.env.VITE_AWS_COGNITO_DOMAIN) {
  console.error('VITE_AWS_COGNITO_DOMAIN is not defined');
}

const awsConfig = {
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_AWS_USER_POOL_ID || '',
      userPoolClientId: import.meta.env.VITE_AWS_USER_POOL_CLIENT_ID || '',
      loginWith: {
        oauth: {
          domain: import.meta.env.VITE_AWS_COGNITO_DOMAIN || '',
          scopes: ['openid', 'email', 'profile'],
          redirectSignIn: [import.meta.env.VITE_REDIRECT_SIGN_IN || 'http://localhost:5173/'],
          redirectSignOut: [import.meta.env.VITE_REDIRECT_SIGN_OUT || 'http://localhost:5173/'],
          responseType: 'code' as const,
          providers: ['Google' as const],
        },
        email: true,
      },
    },
  },
};

Amplify.configure(awsConfig);

export default awsConfig;