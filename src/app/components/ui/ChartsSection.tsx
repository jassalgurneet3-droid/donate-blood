import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { motion } from 'motion/react'
import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'

const monthlyData = [
  { month: 'Jan', donations: 420 },
  { month: 'Feb', donations: 380 },
  { month: 'Mar', donations: 520 },
  { month: 'Apr', donations: 460 },
  { month: 'May', donations: 590 },
  { month: 'Jun', donations: 640 },
  { month: 'Jul', donations: 710 },
]

export function ChartsSection({ donors }: { donors: any[] }) {

  const [bloodData, setBloodData] = useState<any[]>([])
  const [monthlyData, setMonthlyData] = useState<any[]>([])

  useEffect(() => {

    if (!donors || donors.length === 0) return

    const groups: any = {}

    // MONTHLY DATA
    const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const months: any = {
      Jan: 0, Feb: 0, Mar: 0, Apr: 0,
      May: 0, Jun: 0, Jul: 0, Aug: 0,
      Sep: 0, Oct: 0, Nov: 0, Dec: 0
    }

    const currentYear = new Date().getFullYear()

    donors.forEach((d: any) => {

      if (!d.created_at) return

      const date = new Date(d.created_at)

      // ignore old records from previous years
      if (date.getFullYear() !== currentYear) return

      const monthIndex = date.getMonth()
      const month = monthOrder[monthIndex]

      months[month]++

    })

    const chartData = monthOrder.map((m) => ({
      month: m,
      donations: months[m]
    }))

    setMonthlyData(chartData)

    // BLOOD GROUP DATA
    donors.forEach((d: any) => {

      const group = d.bloodgroup
      if (!group) return

      groups[group] = (groups[group] || 0) + 1

    })

    const pieData: any[] = Object.keys(groups).map((g) => ({
      name: g,
      value: groups[g],
      color: getColor(g)
    }))

    setBloodData(pieData)

  }, [donors])

  const getColor = (group: any) => {
    const colors: any = {
      "A+": "#c0392b",
      "B+": "#e74c3c",
      "O+": "#27ae60",
      "AB+": "#f39c12",
      "A-": "#3498db",
      "B-": "#9b59b6",
      "O-": "#1abc9c",
      "AB-": "#34495e"
    }

    return colors[group] || "#8884d8"
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

      {/* Bar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-[#2f3640] rounded-3xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
      >

        <div className="mb-6">
          <h2 className="text-xl font-bold text-[#2c3e50] dark:text-white mb-1">
            Monthly Blood Donations
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Donation trends over the past 7 months
          </p>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="donations" fill="#c0392b" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>

      </motion.div>


      {/* Pie Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white dark:bg-[#2f3640] rounded-3xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
      >

        <div className="mb-6">
          <h2 className="text-xl font-bold text-[#2c3e50] dark:text-white mb-1">
            Blood Group Distribution
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Available donors by blood type
          </p>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>

            <Pie
              data={bloodData}
              cx="50%"
              cy="50%"
              outerRadius={90}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >

              {bloodData.map((entry: any, index: number) => (
                <Cell key={index} fill={entry.color} />
              ))}

            </Pie>

            <Tooltip />

          </PieChart>
        </ResponsiveContainer>

      </motion.div>

    </div>
  )
}