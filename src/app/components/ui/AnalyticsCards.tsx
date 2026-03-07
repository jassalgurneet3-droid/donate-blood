import { Users, UserCheck, AlertCircle, Droplet, TrendingUp, TrendingDown } from "lucide-react";
import { motion } from 'motion/react';
import { useEffect, useState } from "react";
import { supabase } from '@/lib/supabase';


export function AnalyticsCards() {

  const [totalDonors, setTotalDonors] = useState(0)
  const [availableDonors, setAvailableDonors] = useState(0)
  const [emergencyRequests, setEmergencyRequests] = useState(0)
  const [totalDonations, setTotalDonations] = useState(0)

  const analyticsData = [
    {
      title: 'Total Donors',
      value: totalDonors,
      change: '+12.5%',
      isPositive: true,
      icon: Users,
      gradient: 'from-blue-500/10 to-blue-600/10',
      iconBg: 'bg-blue-500',
      chartData: [20, 35, 25, 40, 30, 45, 38]
    },

    {
      title: 'Available Donors',
      value: availableDonors,
      change: '+8.2%',
      isPositive: true,
      icon: UserCheck,
      gradient: 'from-green-500/10 to-green-600/10',
      iconBg: 'bg-green-500',
      chartData: [30, 25, 40, 35, 50, 45, 55]
    },

    {
      title: 'Emergency Requests',
      value: 5,
      change: '-4.3%',
      isPositive: false,
      icon: AlertCircle,
      gradient: 'from-orange-500/10 to-orange-600/10',
      iconBg: 'bg-orange-500',
      chartData: [45, 40, 35, 30, 28, 25, 23]
    },

    {
      title: 'Total Donations',
      value: totalDonations,
      change: '+15.8%',
      isPositive: true,
      icon: Droplet,
      gradient: 'from-red-500/10 to-red-600/10',
      iconBg: 'bg-red-500',
      chartData: [25, 30, 35, 45, 50, 60, 70]
    }
  ];

  useEffect(() => {

    const loadStats = async () => {

      const { count: donations } = await supabase
        .from("donations")
        .select("*", { count: "exact", head: true })

      setTotalDonations(donations || 0)

      const { count: donors } = await supabase
        .from("donors")
        .select("*", { count: "exact", head: true })

      setTotalDonors(donors || 0)

      const { count: available } = await supabase
        .from("donors")
        .select("*", { count: "exact", head: true })
        .eq("status", "available")

      setAvailableDonors(available || 0)

    }

    loadStats()

  }, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {analyticsData.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`
            bg-white dark:bg-[#2f3640] rounded-3xl p-6 
            border border-gray-200 dark:border-gray-700
            hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-black/20
            transition-all duration-300 cursor-pointer
            bg-gradient-to-br ${card.gradient}
          `}
        >
          {/* Icon and Trend */}
          <div className="flex items-start justify-between mb-4">
            <div className={`${card.iconBg} p-3 rounded-xl shadow-lg`}>
              <card.icon className="w-6 h-6 text-white" />
            </div>
            <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold ${card.isPositive
              ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
              : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
              }`}>
              {card.isPositive ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {card.change}
            </div>
          </div>

          {/* Value */}
          <div className="mb-2">
            <h3 className="text-3xl font-bold text-[#2c3e50] dark:text-white mb-1">
              {card.value}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {card.title}
            </p>
          </div>

          {/* Mini Chart */}
          <div className="flex items-end gap-1 h-12 mt-4">
            {card.chartData.map((height, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ delay: 0.3 + (i * 0.05), duration: 0.4 }}
                className={`flex-1 ${card.iconBg} opacity-30 rounded-sm`}
              />
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
