import { Amplify, Auth } from 'aws-amplify';

Amplify.configure({
  Auth: {
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
    userPoolWebClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID,
    oauth: {
      domain: process.env.NEXT_PUBLIC_COGNITO_DOMAIN,
      scope: ['email', 'openid', 'profile'],
      redirectSignIn: process.env.NEXT_PUBLIC_REDIRECT_SIGN_IN,
      redirectSignOut: process.env.NEXT_PUBLIC_REDIRECT_SIGN_OUT,
      responseType: 'code',
    },
  },
});

export const signInWithLine = async () => {
  try {
    await Auth.federatedSignIn({
      provider: 'LINE',
    });
    return { success: true };
  } catch (error) {
    console.error('Error signing in with LINE:', error);
    return { success: false, error };
  }
};

export const getCurrentUser = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    return { success: true, user };
  } catch (error) {
    return { success: false, error };
  }
};