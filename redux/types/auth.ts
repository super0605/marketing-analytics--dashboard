export interface MsalUserData {
  exp: number;
  nbf: number;
  ver: string;
  iss: string;
  sub: string;
  aud: string;
  acr: string;
  nonce: string;
  iat: number;
  auth_time: number;
  name: string;
  idp: string;
}

export interface AuthState {
  userId: number;
  loading: boolean;
  token: string;
  isAuth: boolean;
  error: false;
  user: MsalUserData;
}