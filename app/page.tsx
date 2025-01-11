"use client";

import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchUrbanRenewalSitesAsync } from '../store/slices/appSlice';

import Header from "./components/Header";
import Map from "./components/Map";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { urbanRenewalSites } = useSelector((state: RootState) => state.app);

  const userLocation = { lat: 25.061691, lng: 121.4847221 };

  useEffect(() => {
    dispatch(fetchUrbanRenewalSitesAsync(userLocation));
  }, [dispatch]);

  return <div className="flex flex-col items-center">
    <Header />
    <Map userLocation={userLocation} />
  </div>;
}

export default Home;
