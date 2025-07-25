import { Amplify } from 'aws-amplify';

const awsConfig = {
  Auth: {
    Cognito: {
      userPoolId: process.env.VITE_AWS_USER_POOL_ID || '',
      userPoolClientId: process.env.VITE_AWS_USER_POOL_CLIENT_ID || '',
      identityPoolId: process.env.VITE_AWS_IDENTITY_POOL_ID || '',
      loginWith: {
        oauth: {
          domain: process.env.VITE_AWS_COGNITO_DOMAIN || '',
          scopes: ['openid', 'email', 'profile'],
          redirectSignIn: [process.env.VITE_REDIRECT_SIGN_IN || 'http://localhost:5173/'],
          redirectSignOut: [process.env.VITE_REDIRECT_SIGN_OUT || 'http://localhost:5173/'],
          responseType: 'code',
        },
        email: true,
      },
    },
  },
};

Amplify.configure(awsConfig);

export default awsConfig;