"use client";

import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchUrbanRenewalSitesAsync } from '../store/slices/appSlice';

import Header from "./components/Header";
import Map from "./components/Map";
import UrbanRenewalSiteList from "./components/UrbanRenewalSiteList";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { urbanRenewalSites } = useSelector((state: RootState) => state.app);

  const userLocation = { lat: 24.9726889, lng: 121.441625 };

  useEffect(() => {
    dispatch(fetchUrbanRenewalSitesAsync(userLocation));
  }, [dispatch, userLocation]);

  return <div className="flex flex-col items-center">
    <Header />
    <Map userLocation={userLocation} />
    <UrbanRenewalSiteList urbanRenewalSites={urbanRenewalSites} />
  </div>;
}

export default Home;
