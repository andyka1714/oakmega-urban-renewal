"use client";
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const customMarkerIcon = () =>
  L.icon({
    iconUrl: 'marker.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
    className: 'custom-marker',
  });

const Home = ({ userLocation }: { userLocation: { lat: number; lng: number } }) => {
  return (
    <MapContainer
      center={[userLocation.lat, userLocation.lng]}
      zoom={16}
      style={{ height: '600px', width: '100%' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
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

export default Home;
