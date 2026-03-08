import { Search, Filter, Edit, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

type Donor = {
  id: number
  fullname: string
  city: string
  bloodgroup: string
  status?: "available" | "unavailable"
}

export function DonorTable({ donors }: { donors: Donor[] }) {

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const filteredDonors = donors?.filter((donor) => {

    const matchesSearch =
      (donor.fullname || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (donor.city || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (donor.bloodgroup || "").toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filterStatus === "All" ||
      donor.status?.toLowerCase() === filterStatus.toLowerCase();

    return matchesSearch && matchesFilter;

  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-white dark:bg-[#2f3640] rounded-3xl p-6 border border-gray-200 dark:border-gray-700"
    >

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">

        <div>
          <h2 className="text-xl font-bold text-[#2c3e50] dark:text-white mb-1">
            Donor Management
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage and monitor all registered donors
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">

          {/* Search */}
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-4 py-2.5 rounded-xl w-full sm:w-64">
            <Search className="w-5 h-5 text-gray-400" />

            <input
              type="text"
              placeholder="Search donors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-sm text-gray-700 dark:text-gray-200 placeholder:text-gray-400 w-full"
            />

          </div>

          {/* Filter */}
          <div className="relative">

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="appearance-none bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2.5 pr-10 rounded-xl text-sm font-medium outline-none cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors w-full sm:w-auto"
            >

              <option>All</option>
              <option>available</option>
              <option>unavailable</option>

            </select>

            <Filter className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />

          </div>

        </div>

      </div>

      {/* Table */}
      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b border-gray-200 dark:border-gray-700">

              <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                Name
              </th>

              <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                Blood Group
              </th>

              <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                City
              </th>

              <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                Status
              </th>

              <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredDonors.map((donor, index) => (

              <motion.tr
                key={donor.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >

                <td className="py-4 px-4">

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 bg-gradient-to-br from-[#c0392b] to-[#e74c3c] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {donor.fullname?.charAt(0)}
                    </div>

                    <span className="font-medium text-[#2c3e50] dark:text-white">
                      {donor.fullname}
                    </span>

                  </div>

                </td>

                <td className="py-4 px-4">

                  <span className="inline-flex items-center justify-center px-3 py-1 bg-gray-100 dark:bg-gray-700 text-[#2c3e50] dark:text-white rounded-lg text-sm font-semibold">
                    {donor.bloodgroup}
                  </span>

                </td>

                <td className="py-4 px-4 text-gray-600 dark:text-gray-300">
                  {donor.city}
                </td>

                <td className="py-4 px-4">

                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold
                    ${donor.status === "available"
                        ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                        : "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                      }`}
                  >

                    <span
                      className={`w-2 h-2 rounded-full mr-2 ${donor.status === "available"
                        ? "bg-green-500"
                        : "bg-red-500"
                        }`}
                    />

                    {donor.status}

                  </span>

                </td>

                <td className="py-4 px-4">

                  <div className="flex items-center gap-2">

                    <button className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors group">
                      <Edit className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                    </button>

                    <button className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors group">
                      <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-600" />
                    </button>

                  </div>

                </td>

              </motion.tr>

            ))}

          </tbody>

        </table>

      </div>

      {filteredDonors.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No donors found</p>
        </div>
      )}

    </motion.div>
  );
}