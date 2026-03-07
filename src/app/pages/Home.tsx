import { useState } from "react";
import { motion } from "motion/react";
import {
  Search,
  MapPin,
  Heart,
  AlertCircle,
  Building2,
  Phone,
  Droplets,
} from "lucide-react";
import { Link } from "react-router";
import { mockDonors, bloodGroups } from "../utils/mockData";
import { supabase } from "../../lib/supabase";

export default function Home() {
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");
  const [location, setLocation] = useState("");
  const [filteredDonors, setFilteredDonors] = useState(mockDonors.slice(0, 6));

  const handleSearch = async () => {
    let query = supabase
      .from("users")
      .select("*")
      .eq("userType", "donor");

    if (selectedBloodGroup) {
      query = query.eq("bloodGroup", selectedBloodGroup);
    }

    if (location) {
      query = query.ilike("city", `%${location}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.log(error);
      return;
    }

    setFilteredDonors(data.slice(0, 6));
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
                className="px-8 py-4 bg-white text-red-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Become a Donor
              </Link>
              <Link
                to="/nearby-centres"
                className="px-8 py-4 bg-red-800 text-white rounded-lg font-semibold hover:bg-red-900 transition-colors"
              >
                Find Blood Bank
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-white shadow-md -mt-8 mx-4 md:mx-8 lg:mx-auto lg:max-w-5xl rounded-xl">
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
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter city or state"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                Search
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
              {filteredDonors.map((donor, index) => (
                <motion.div
                  key={donor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {donor.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {donor.age} years • {donor.gender}
                      </p>
                    </div>
                    <div className="bg-red-600 text-white px-3 py-1 rounded-lg font-bold">
                      {donor.bloodGroup}
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      {donor.city}, {donor.state}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Droplets className="w-4 h-4 text-gray-400" />
                      Last donated: {new Date(donor.lastDonation).toLocaleDateString()}
                    </div>
                  </div>

                  {donor.availableForEmergency && (
                    <div className="bg-green-100 text-green-800 px-3 py-2 rounded-lg text-sm font-medium mb-4">
                      ✓ Available for Emergency
                    </div>
                  )}

                  <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" />
                    Contact Donor
                  </button>
                </motion.div>
              ))}
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
