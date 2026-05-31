import TopBanner from './components/TopBanner';
import MapSection from './components/MapSection';
import { useState } from 'react';

export default function App() {
  const [apiLocation, setAPILocation] = useState(null);
  return (
    <div className="relative h-screen">
      <TopBanner setAPILocation={setAPILocation} apiLocation={apiLocation} />
      <MapSection apiLocation={apiLocation} />
    </div>
  );
}
