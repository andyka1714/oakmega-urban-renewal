"use client";
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Home = () => {
  return <MapContainer center={[25.032969, 121.565418]} zoom={16} style={{ height: '600px', width: '100%' }}>
  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
</MapContainer>;
}

export default Home;
