import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserProfile {
  name: string;
  email?: string;
  picture: string;
}

interface UrbanRenewalSite {
  stop_name: string;
  distance: number;
  lat: number;
  lng: number;
}

interface PolygonData {
  positions: [number, number][];
}

interface AppState {
  googleProfile: UserProfile | null;
  facebookProfile: UserProfile | null;
  urbanRenewalSites: UrbanRenewalSite[];
  polygonData: PolygonData[];
}

const initialState: AppState = {
  googleProfile: null,
  facebookProfile: null,
  urbanRenewalSites: [],
  polygonData: [],
};

export const fetchUrbanRenewalSitesAsync = createAsyncThunk(
  'app/fetchUrbanRenewalSites',
  async (location: { lat: number; lng: number }) => {
    const response = await axios.post('https://enterprise.oakmega.ai/api/v1/server/xinbei/calc-distance', location);
    return response.data.result;
  }
);

export const fetchPolygonDataAsync = createAsyncThunk(
  'app/fetchPolygonData',
  async () => {
    const response = await axios.get('https://enterprise.oakmega.ai/api/v1/server/xinbei/geolocation-json', {
      params: { directory: 'tucheng.json' },
    });
    return response.data.result.features;
  }
);

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
  extraReducers: (builder) => {
    builder.addCase(fetchUrbanRenewalSitesAsync.fulfilled, (state, action) => {
      state.urbanRenewalSites = action.payload;
    });
    builder.addCase(fetchPolygonDataAsync.fulfilled, (state, action) => {
      state.polygonData = action.payload;
    });
  },
});

export const { setGoogleProfile, setFacebookProfile } = appSlice.actions;

export default appSlice.reducer;
