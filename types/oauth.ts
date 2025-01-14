
export interface Profile {
  name: string;
  email?: string;
  picture: string;
}

export interface LoginButtonProps {
  handleLogin: () => void;
  platform: string;
  profile: Profile | null;
}

export interface FacebookAuthResponse {
  accessToken: string;
  expiresIn: number;
  signedRequest: string;
  userID: string;
}

export interface FacebookLoginResponse {
  authResponse: FacebookAuthResponse | null;
  status: string;
}

export interface FacebookUserInfo {
  id: string;
  name: string;
  email?: string;
  picture: {
    data: {
      url: string;
    };
  };
}
