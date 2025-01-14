"use client";

import { useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import { useSelector, useDispatch } from 'react-redux';
import Image from "next/image";
import { AppDispatch, RootState } from '../../store/store';
import { setFacebookProfile, setGoogleProfile } from '../../store/slices/appSlice';

interface Profile {
  name: string;
  email?: string;
  picture: string;
}

interface LoginButtonProps {
  handleLogin: () => void;
  platform: string;
  profile: Profile | null;
}

interface FacebookAuthResponse {
  accessToken: string;
  expiresIn: number;
  signedRequest: string;
  userID: string;
}

interface FacebookLoginResponse {
  authResponse: FacebookAuthResponse | null;
  status: string;
}

interface FacebookUserInfo {
  id: string;
  name: string;
  email?: string;
  picture: {
    data: {
      url: string;
    };
  };
}

const UserProfile = ({ profile, platform }: {profile: Profile | null, platform: string}) => {
  return (<div className="flex items-center">
    <Image src={profile ? profile.picture : `/${platform}-logo.png`} alt={platform} className="rounded-full" width={32} height={32} />
    <div className="ml-4">
      <h1 className="text-lg font-semibold">{profile ? profile.name : `Login with ${platform}`}</h1>
    </div>
  </div>);
};

const LoginButton = ({ handleLogin, platform, profile }: LoginButtonProps) => {
  return <button className="border-stone-500 border px-2 py-1 rounded-lg h-12 cursor-pointer" onClick={handleLogin}>
    <UserProfile profile={profile} platform={platform}/>
  </button>;
}

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    googleProfile,
    facebookProfile,
  } = useSelector((state: RootState) => state.app);
  
  useEffect(() => {
    const loadFacebookSDK = () => {
      return new Promise<void>((resolve) => {
        if (window.FB) {
          resolve();
          return;
        }
        const script = document.createElement("script");
        script.src = "https://connect.facebook.net/en_US/sdk.js";
        script.async = true;
        script.defer = true;
        script.onload = () => {
          window.fbAsyncInit = () => {
            FB.init({
              appId: '9989369141080048',
              xfbml: true,
              version: 'v21.0',
            });
            resolve();
          };
        };
        document.body.appendChild(script);
      });
    };

    const loadGoogleSDK = () => {
      return new Promise<void>((resolve) => {
        if (window.google && window.google.accounts) {
          resolve();
          return;
        }
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        document.body.appendChild(script);
      });
    };

    loadFacebookSDK().catch((err) => console.error("Failed to load Facebook SDK:", err));
    loadGoogleSDK().catch((err) => console.error("Failed to load Google SDK:", err));
  }, []);

  const handleGoogleLogin = () => {
    if (googleProfile) {
      return;
    }
    if (window.google && window.google.accounts) {
      window.google.accounts.id.initialize({
        client_id: '173510625861-lh12808ot8j2icb85nuff5i7eb3kb6ob.apps.googleusercontent.com', // Replace with your Google OAuth client ID
        callback: handleGoogleResponse,
      });
    
      window.google.accounts.id.prompt();
    }
  };

  const handleFacebookLogin = () => {
    if (!window.FB) {
      console.error("Facebook SDK not loaded");
      return;
    }
    FB.login(
      (response: FacebookLoginResponse) => {
        if (response.authResponse) {
          FB.api(
            '/me',
            { fields: 'id,name,email,picture' },
            (userInfo: FacebookUserInfo) => {
              dispatch(
                setFacebookProfile({
                  name: userInfo.name,
                  picture: userInfo.picture.data.url,
                })
              );
            }
          );
        } else {
          console.error('User cancelled login or did not fully authorize.');
        }
      },
      { scope: 'public_profile,email' }
    );
  };

  const handleGoogleResponse = (response: { credential: string; }) => {
    const userInfo: Profile = jwtDecode(response.credential);
    dispatch(setGoogleProfile({
      name: userInfo.name,
      email: userInfo.email,
      picture: userInfo.picture,
    }));
  };

  return <div className="flex items-center justify-end p-2 gap-2 w-full">
    <LoginButton handleLogin={handleFacebookLogin} platform="FB" profile={facebookProfile}/>
    <LoginButton handleLogin={handleGoogleLogin} platform="Google" profile={googleProfile}/>
  </div>;
}

export default Header;
