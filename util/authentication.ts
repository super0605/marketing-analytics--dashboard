import * as Msal from 'msal';
import jwtDecode from 'jwt-decode';
import { MsalUserData } from '../redux/types/auth';

export const applicationConfig = {
  redirectUri: process.env['10THMAN_PUBLIC_BASE_URL'],
  // redirectUri: 'http://localhost:3000/clients',
  clientID: process.env['10THMAN_PUBLIC_CLIENTID'],
  graphScopes: [
    process.env['10THMAN_PUBLIC_GRAPHSCOPE_1'],
    process.env['10THMAN_PUBLIC_GRAPHSCOPE_2'],
    process.env['10THMAN_PUBLIC_GRAPHSCOPE_3'],
  ],
  azureB2CUrl: process.env['10THMAN_PUBLIC_AUTH_URL'],
};

export const app = typeof window === 'undefined' ? null : new Msal.UserAgentApplication(
  applicationConfig.clientID,
  applicationConfig.azureB2CUrl,
  () => {
    // callback for login redirect
  },
  {
    redirectUri: applicationConfig.redirectUri,
    cacheLocation: 'localStorage',
    navigateToLoginRequestUrl: true
  }
);

export const login = async () => {
  try {
    await app.loginRedirect(applicationConfig.graphScopes);
  }
  catch (e) {
    return;
  }
}

export const logout = () => {
  app.logout();
};

export const getToken = async () => {
  try {
    const accessToken = await app.acquireTokenSilent(applicationConfig.graphScopes);
    return accessToken
  }
  catch (error) {
    try {
      const accessToken_1 = await app
        .loginRedirect(applicationConfig.graphScopes)
      return accessToken_1
    }
    catch (err) {
      console.error(err)
    }
  }
};

export const acquireUserTokenSilent = (user) => {
  const auth_token = app.acquireTokenSilent(applicationConfig.graphScopes, applicationConfig.azureB2CUrl, user).then((token) => {
    return { newIdToken: token, error: null }
  }).catch((error) => {
    return { newIdToken: null, error: error }
  });

  return auth_token;
}

export const getUser = () => {
  return app.getUser();
}

export const loggedIn = () => {
  const idToken: string = localStorage.getItem('msal.idtoken') ? localStorage.getItem('msal.idtoken') : null;

  if (idToken == null || undefined) {
    return false;
  } else {
    return isExpired(idToken);    
  }
}

export const isExpired = (idToken: string) => {
  const loggedin_user: MsalUserData = idToken ? jwtDecode(idToken) : null;
  if (Date.now() < loggedin_user.exp * 1000) {
    return true;
  } else {
    return false;
  }
}

