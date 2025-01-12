"use client";

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, Polygon } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchPolygonDataAsync } from '../../store/slices/appSlice';

const customMarkerIcon = () =>
  L.icon({
    iconUrl: 'marker.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
    className: 'custom-marker',
  });

const Map = ({ userLocation }: { userLocation: { lat: number; lng: number } }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { polygonData } = useSelector((state: RootState) => state.app);

  useEffect(() => {
    dispatch(fetchPolygonDataAsync());
  }, [dispatch]);
  return (
    <MapContainer
      center={[userLocation.lat, userLocation.lng]}
      zoom={16}
      style={{ height: '600px', width: '100%' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {polygonData.map((feature, index) => {
        // Extract coordinates and convert to Leaflet format
        const positions = feature.geometry.coordinates[0].map((coord) => [coord[1], coord[0]]);
        return (
          <Polygon
            key={index}
            positions={positions}
            pathOptions={{
              color: "blue", // Polygon border color
              fillColor: "rgba(0, 123, 255, 0.4)", // Fill color
              fillOpacity: 0.4, // Opacity of the fill
            }}
          >
            <Tooltip>
              <div>
                <strong>區域: </strong> {feature.properties.分區}
                <br />
                <strong>描述: </strong> {feature.properties.TxtMemo}
                <br />
                <strong>面積: </strong> {feature.properties.SHAPE_Area.toFixed(2)} m²
              </div>
            </Tooltip>
          </Polygon>
        );
      })}

      <Marker
        position={[userLocation.lat, userLocation.lng]}
        icon={customMarkerIcon()}
      >
        <Tooltip direction="top" offset={[0, -30]}>
          <div>
            <strong>User Location</strong>
          </div>
        </Tooltip>
      </Marker>
    </MapContainer>
  );
}

export default Map;
