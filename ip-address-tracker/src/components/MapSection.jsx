import { MapContainer, TileLayer, Marker, useMap, Popup } from 'react-leaflet';
import L from 'leaflet';
import iconUrl from '../assets/svg/icon-location.svg';
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';

function ChangeView({ center }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 17);
  }, [center, map]);
  return null;
}

const icon = L.icon({
  iconUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function MapSection({ apiLocation }) {
  return (
    <div className="relative z-0 h-2/3">
      <MapContainer
        center={[apiLocation?.location?.lat || 0, apiLocation?.location?.lng || 0]}
        zoom={17}
        zoomControl={true}
        className="h-full w-full"
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />

        {apiLocation && (
          <Marker position={[apiLocation.location.lat, apiLocation.location.lng]} icon={icon}>
            <Popup className="text-center font-medium">
              <div className="flex min-w-30 flex-col items-center justify-center">
                <span className="text-base font-semibold text-gray-800">
                  {apiLocation?.location?.city}
                </span>
                <span className="text-xs text-gray-500">{apiLocation?.location?.country}</span>
              </div>
            </Popup>
          </Marker>
        )}
        {apiLocation && (
          <ChangeView center={[apiLocation.location.lat, apiLocation.location.lng]} />
        )}
      </MapContainer>
    </div>
  );
}
