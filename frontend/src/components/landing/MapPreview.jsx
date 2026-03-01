import { MapContainer, TileLayer } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';

const demoIncidents = [
  { lat: 13.0827, lng: 80.2707, intensity: 0.9 },
  { lat: 12.9716, lng: 77.5946, intensity: 0.7 },
  { lat: 17.385, lng: 78.4867, intensity: 0.5 },
  { lat: 19.076, lng: 72.8777, intensity: 0.4 },
];

const HeatmapLayer = ({ points, map }) => {
  useEffect(() => {
    if (!map) return;
    const heat = L.heatLayer(
      points.map(p => [p.lat, p.lng, p.intensity]),
      { radius: 35, blur: 25, maxZoom: 10, gradient: { 0.3: '#2E7D32', 0.6: '#FBC02D', 0.9: '#D32F2F' } }
    ).addTo(map);
    return () => map.removeLayer(heat);
  }, [map, points]);
  return null;
};

export const MapPreview = () => {
  const [map, setMap] = useState(null);
  return (
    <div className="h-80 w-full overflow-hidden rounded-lg border border-slate-200">
      <MapContainer
        center={[15.5, 79]}
        zoom={5}
        scrollWheelZoom={false}
        className="h-full w-full"
        attributionControl={false}
        ref={setMap}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {map && <HeatmapLayer points={demoIncidents} map={map} />}
      </MapContainer>
    </div>
  );
};

