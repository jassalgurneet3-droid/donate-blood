import { useState, useEffect } from "react";
import { motion } from "motion/react"; // or "framer-motion" depending on your setup
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  Building2,
  Loader2,
} from "lucide-react";
import { mockBloodCentres, BloodCentre } from "../utils/mockData";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "0.75rem",
};

// Default center
const defaultCenter = {
  lat: 20.5937,
  lng: 78.9629,
};

export default function NearbyCentres() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "", 
  });

  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [centres, setCentres] = useState<BloodCentre[]>(mockBloodCentres);
  const [selectedCentre, setSelectedCentre] = useState<BloodCentre | null>(null);

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const getUserLocation = () => {
    setLoading(true);
    setError("");

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });

        const centresWithDistance = mockBloodCentres
          .map((centre) => ({
            ...centre,
            distance: calculateDistance(
              latitude,
              longitude,
              centre.latitude,
              centre.longitude
            ),
          }))
          .sort((a, b) => (a.distance || 0) - (b.distance || 0));

        setCentres(centresWithDistance);
        setLoading(false);
      },
      (err) => {
        setError("Unable to get your location. Showing all centres.");
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  if (loadError) return <div className="p-8 text-center text-red-600">Error loading maps. Please check your API key.</div>;
  if (!isLoaded) return <div className="p-8 text-center text-gray-600">Loading Maps...</div>;

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Building2 className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Nearby Blood Donation Centres
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Locate blood banks and hospitals near you
          </p>
        </motion.div>

        {/* Location Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-md p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-red-600" />
              <div>
                <h3 className="font-semibold text-gray-900">
                  {userLocation
                    ? "Location detected"
                    : "Enable location to find nearby centres"}
                </h3>
                <p className="text-sm text-gray-600">
                  {userLocation
                    ? `Lat: ${userLocation.latitude.toFixed(4)}, Long: ${userLocation.longitude.toFixed(4)}`
                    : "We'll show centres closest to you"}
                </p>
              </div>
            </div>
            <button
              onClick={getUserLocation}
              disabled={loading}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Getting Location...
                </>
              ) : (
                <>
                  <Navigation className="w-5 h-5" />
                  Get My Location
                </>
              )}
            </button>
          </div>
          {error && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-sm">
              {error}
            </div>
          )}
        </motion.div>

        {/* Google Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-md overflow-hidden mb-8"
        >
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={userLocation ? 12 : 5}
            center={
              userLocation
                ? { lat: userLocation.latitude, lng: userLocation.longitude }
                : defaultCenter
            }
          >
            {/* Show User's Exact Location */}
            {userLocation && (
              <Marker
                position={{ lat: userLocation.latitude, lng: userLocation.longitude }}
                icon={{
                  url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                }}
              />
            )}

            {/* Automatically Show Nearby Centres */}
            {centres.map((centre) => (
              <Marker
                key={centre.id}
                position={{ lat: centre.latitude, lng: centre.longitude }}
                onClick={() => setSelectedCentre(centre)}
                icon={{
                  url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                }}
              />
            ))}

            {/* Info Window when clicking a centre marker */}
            {selectedCentre && (
              <InfoWindow
                position={{
                  lat: selectedCentre.latitude,
                  lng: selectedCentre.longitude,
                }}
                onCloseClick={() => setSelectedCentre(null)}
              >
                <div className="p-2 min-w-[200px]">
                  <h3 className="font-bold text-gray-900 mb-1">{selectedCentre.name}</h3>
                  <p className="text-sm text-gray-600">{selectedCentre.address}</p>
                  <p className="text-sm font-medium text-red-600 mt-2">{selectedCentre.phone}</p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </motion.div>

        {/* Centres List */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {userLocation ? "Nearby Centres" : "All Centres"}
            <span className="text-gray-500 font-normal text-lg ml-2">
              ({centres.length} found)
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {centres.map((centre, index) => (
              <motion.div
                key={centre.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {centre.name}
                    </h3>
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        centre.type === "hospital"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {centre.type === "hospital" ? "Hospital" : "Blood Bank"}
                    </span>
                  </div>
                  {centre.distance && (
                    <div className="text-right">
                      <div className="text-sm font-semibold text-red-600">
                        {centre.distance.toFixed(1)} km
                      </div>
                      <div className="text-xs text-gray-500">away</div>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <span>{centre.address}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <a
                      href={`tel:${centre.phone}`}
                      className="hover:text-red-600 transition-colors"
                    >
                      {centre.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{centre.workingHours}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${centre.latitude},${centre.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm text-center flex items-center justify-center gap-2"
                  >
                    <Navigation className="w-4 h-4" />
                    Get Directions
                  </a>
                  <a
                    href={`tel:${centre.phone}`}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm flex items-center justify-center"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}