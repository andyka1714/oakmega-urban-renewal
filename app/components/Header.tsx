"use client";

import { useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { setFacebookProfile, setGoogleProfile } from '../../store/slices/appSlice';

const UserProfile = ({ profile }) => {
  return (<div className="flex items-center">
    <img src={profile.picture} alt={profile.name} className="w-8 h-8 rounded-full" />
    <div className="ml-4">
      <h1 className="text-lg font-semibold">{profile.name}</h1>
    </div>
  </div>);
};

const LoginButton = ({ handleLogin, platform, profile }) => {
  return <button className="border-stone-500 border px-2 py-1 rounded-lg h-12 cursor-pointer" onClick={handleLogin}>
    {profile ? 
    <UserProfile profile={profile}/> : `Login with ${platform}`}
  </button>;
}

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    googleProfile,
    facebookProfile,
  } = useSelector((state: RootState) => state.app);

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
    FB.login(
      (response) => {
        if (response.authResponse) {
          FB.api('/me', { fields: 'id,name,email,picture' }, (userInfo) => {
            dispatch(setFacebookProfile({
              name: userInfo.name,
              picture: userInfo.picture.data.url,
            }));
          });
        } else {
          console.error('User cancelled login or did not fully authorize.');
        }
      },
      { scope: 'public_profile,email' }
    );
  };

  const handleGoogleResponse = (response) => {
    const userInfo = jwtDecode(response.credential);
    dispatch(setGoogleProfile({
      name: userInfo.name,
      email: userInfo.email,
      picture: userInfo.picture,
    }));
  };

  useEffect(() => {
    window.fbAsyncInit = function() {
      FB.init({
        appId: '9989369141080048',
        xfbml: true,
        version: 'v21.0'
      })
    };
  }, []);

  return <div className="flex items-center justify-end p-2 gap-2 w-full">
    <LoginButton handleLogin={handleFacebookLogin} platform="FB" profile={facebookProfile}/>
    <LoginButton handleLogin={handleGoogleLogin} platform="Google" profile={googleProfile}/>
  </div>;
}

export default Header;
