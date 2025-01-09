"use client";

import { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

const UserProfile = ({ profile }) => {
  return (<div className="flex items-center">
    <img src={profile.picture} alt={profile.name} className="w-8 h-8 rounded-full" />
    <div className="ml-4">
      <h1 className="text-lg font-semibold">{profile.name}</h1>
    </div>
  </div>);
};

const LoginButton = ({ handleLogin, platform, profile }) => {
  return <button className="border-stone-600 border p-2 rounded-lg h-12 cursor-pointer" onClick={handleLogin}>
    {profile ? 
    <UserProfile profile={profile}/> : `Login with ${platform}`}
  </button>;
}

const Home = () => {
  const [googleProfile, setGoogleProfile] = useState(null);

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

  const handleGoogleResponse = (response) => {
    const userInfo = jwtDecode(response.credential);
    setGoogleProfile({
      name: userInfo.name,
      email: userInfo.email,
      picture: userInfo.picture,
    });
  };

  useEffect(() => {
    console.log(googleProfile);
  }, [googleProfile]);

  return <div>
    <LoginButton handleLogin={handleGoogleLogin} platform="Google" profile={googleProfile}/>
  </div>;
}

export default Home;
