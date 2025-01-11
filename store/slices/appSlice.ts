import { createSlice } from '@reduxjs/toolkit';

interface UserProfile {
  name: string;
  email?: string;
  picture: string;
}

interface AppState {
  googleProfile: UserProfile | null;
  facebookProfile: UserProfile | null;
}

const initialState: AppState = {
  googleProfile: null,
  facebookProfile: null,
};

// Slice
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setGoogleProfile(state, action) {
      state.googleProfile = action.payload;
    },
    setFacebookProfile(state, action) {
      state.facebookProfile = action.payload;
    },
  },
});

export const { setGoogleProfile, setFacebookProfile } = appSlice.actions;

export default appSlice.reducer;
