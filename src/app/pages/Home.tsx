import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  Heart,
  AlertCircle,
  Building2,
  Phone,
  Droplets,
  Navigation,
  Loader2
} from "lucide-react";
import { Link } from "react-router";
import { bloodGroups } from "../utils/mockData";
import { supabase } from "../../lib/supabase";

export default function Home() {
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");
  const [location, setLocation] = useState("");
  const [filteredDonors, setFilteredDonors] = useState<any[]>([]);
  const [isLocating, setIsLocating] = useState(false);

  // Updated to fetch "Best Match" based on city
  const loadDonors = async (searchCity?: string) => {
    let query = supabase.from("donors").select("*");

    // If we have a city, prioritize donors from that location
    if (searchCity) {
      query = query.ilike("city", `%${searchCity}%`);
    }

    // Limit to 6 to keep the UI clean
    query = query.limit(6);

    const { data, error } = await query;

    if (!error && data) {
      // If we filtered by city but found nobody, fallback to all recent donors so the page isn't empty
      if (searchCity && data.length === 0) {
        const { data: fallbackData } = await supabase.from("donors").select("*").limit(6);
        setFilteredDonors(fallbackData || []);
      } else {
        setFilteredDonors(data);
      }
    }
  };

  const fetchAutoLocation = () => {
    if (!navigator.geolocation) {
      console.warn("Geolocation is not supported by your browser");
      loadDonors(); // Load generic donors if no GPS
      return;
    }

    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();

          const townOrCity = data.address.city || data.address.town || data.address.village;
          const district = data.address.state_district || data.address.county;
          const state = data.address.state;
          const pincode = data.address.postcode;

          const addressParts = [townOrCity, district, state, pincode].filter(Boolean);

          if (addressParts.length > 0) {
            const fullAddress = addressParts.join(", ");
            setLocation(fullAddress);

            // Automatically fetch best match donors for this specific city!
            if (townOrCity) {
              loadDonors(townOrCity);
            } else {
              loadDonors();
            }
          }
        } catch (error) {
          console.error("Error reverse geocoding:", error);
          loadDonors();
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        console.error("Error getting location:", error.message);
        setIsLocating(false);
        loadDonors();
      }
    );
  };

  useEffect(() => {
    fetchAutoLocation();

    const channel = supabase
      .channel("donors-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "donors" },
        (payload) => {
          console.log("Change received:", payload);
          // Reload based on current location string if possible
          const currentCity = location.split(',')[0].trim();
          loadDonors(currentCity || undefined);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearch = async () => {
    let query = supabase.from("donors").select("*");

    if (selectedBloodGroup && selectedBloodGroup !== "Select Blood Group") {
      query = query.eq("bloodgroup", selectedBloodGroup);
    }

    if (location && location.trim() !== "") {
      const searchCity = location.split(',')[0].trim();
      query = query.ilike("city", `%${searchCity}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.log(error);
      return;
    }

    setFilteredDonors(data ?? []);
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Donate Blood, Save Lives
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-red-100">
              Connect with donors and help those in need
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/become-donor"
                className="group relative overflow-hidden inline-flex items-center justify-center px-8 py-4 bg-white text-red-600 rounded-lg font-semibold hover:scale-105 active:scale-110 transition-all duration-300"
              >
                {/* Sliding background effect */}
                <span className="absolute inset-0 w-full h-full bg-gray-100 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>

                {/* Text wrapper to stay on top */}
                <span className="relative z-10">Become a Donor</span>
              </Link>

              <Link
                to="/nearby-centres"
                className="group relative overflow-hidden inline-flex items-center justify-center px-8 py-4 bg-red-800 text-white rounded-lg font-semibold hover:scale-105 active:scale-110 transition-all duration-300"
              >
                {/* Sliding background effect */}
                <span className="absolute inset-0 w-full h-full bg-red-900 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>

                {/* Text wrapper to stay on top */}
                <span className="relative z-10">Find Blood Bank</span>
              </Link>
            </div>

          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-white shadow-md -mt-8 mx-4 md:mx-8 lg:mx-auto lg:max-w-5xl rounded-xl relative z-10">
        <div className="px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Find Blood Donors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blood Group
              </label>
              <select
                value={selectedBloodGroup}
                onChange={(e) => setSelectedBloodGroup(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">Select Blood Group</option>
                {bloodGroups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <div className="relative flex items-center">
                <MapPin className="absolute left-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder={isLocating ? "Locating you..." : "Enter city or state"}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                />
                <button
                  onClick={fetchAutoLocation}
                  disabled={isLocating}
                  className="absolute right-3 p-1 text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
                  title="Use my current location"
                >
                  {isLocating ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Navigation className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex items-end">
              {/* <button
                onClick={handleSearch}
                className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                Search
              </button> */}
              <button
                onClick={handleSearch}
                className="group relative overflow-hidden w-full px-6 py-3 bg-red-600 text-white rounded-lg active:scale-95 transition-all duration-300 font-medium flex items-center justify-center"
              >
                {/* Sliding background effect */}
                <span className="absolute inset-0 w-full h-full bg-red-800 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>

                {/* Button content (wrapped to stay above the sliding background) */}
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Search className="w-5 h-5" />
                  Search
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Action Cards */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link
              to="/become-donor"
              className="block p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Become a Donor
              </h3>
              <p className="text-gray-600">
                Register as a blood donor and help save lives in your community.
              </p>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link
              to="/nearby-centres"
              className="block p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Find Blood Bank
              </h3>
              <p className="text-gray-600">
                Locate nearby blood banks and donation centres in your area.
              </p>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link
              to="/auth"
              className="block p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Emergency Request
              </h3>
              <p className="text-gray-600">
                Make an urgent blood request and get immediate assistance.
              </p>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Available Donors Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Available Donors
            </h2>
            <p className="text-gray-600">
              Connect with verified blood donors in your area
            </p>
          </div>

          {filteredDonors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDonors.map((donor, index) => {

                // --- SAFE DATA MAPPING ---
                // This protects your UI from blank variables whether Supabase uses camelCase or snake_case
                const donorName = donor.name || donor.fullname || "Generous Donor";
                const donorAge = donor.age || "-";
                const donorGender = donor.gender || "-";
                const bloodGroup = donor.bloodGroup || donor.bloodgroup || "?";
                const city = donor.city || "Unknown City";
                const state = donor.state || "";

                const lastDonationRaw = donor.lastDonation || donor.last_donation;
                const lastDonationDate = lastDonationRaw
                  ? new Date(lastDonationRaw).toLocaleDateString()
                  : "Never / Unknown";

                const isEmergency = donor.availableForEmergency || donor.available_for_emergency || false;

                return (
                  <motion.div
                    key={donor.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {donorName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {donorAge} years • {donorGender}
                        </p>
                      </div>
                      <div className="bg-red-600 text-white px-3 py-1 rounded-lg font-bold">
                        {bloodGroup}
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        {city}{state ? `, ${state}` : ''}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Droplets className="w-4 h-4 text-gray-400" />
                        Last donated: {lastDonationDate}
                      </div>
                    </div>

                    {isEmergency && (
                      <div className="bg-green-100 text-green-800 px-3 py-2 rounded-lg text-sm font-medium mb-4">
                        ✓ Available for Emergency
                      </div>
                    )}

                    <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center gap-2">
                      <Phone className="w-4 h-4" />
                      Contact Donor
                    </button>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">
                No donors found. Try adjusting your search criteria.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-red-100">Registered Donors</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="text-4xl font-bold mb-2">5,000+</div>
              <div className="text-red-100">Lives Saved</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-red-100">Blood Banks</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-red-100">Cities Covered</div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}