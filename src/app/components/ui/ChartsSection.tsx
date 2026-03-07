import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'motion/react';

const monthlyData = [
  { month: 'Jan', donations: 420 },
  { month: 'Feb', donations: 380 },
  { month: 'Mar', donations: 520 },
  { month: 'Apr', donations: 460 },
  { month: 'May', donations: 590 },
  { month: 'Jun', donations: 640 },
  { month: 'Jul', donations: 710 },
];

const bloodGroupData = [
  { name: 'A+', value: 890, color: '#c0392b' },
  { name: 'B+', value: 720, color: '#e74c3c' },
  { name: 'O+', value: 1240, color: '#27ae60' },
  { name: 'AB+', value: 420, color: '#f39c12' },
  { name: 'A-', value: 280, color: '#3498db' },
  { name: 'B-', value: 190, color: '#9b59b6' },
  { name: 'O-', value: 350, color: '#1abc9c' },
  { name: 'AB-', value: 140, color: '#34495e' },
];

export function ChartsSection() {
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
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" className="dark:stroke-gray-700" />
            <XAxis 
              dataKey="month" 
              stroke="#999" 
              style={{ fontSize: '12px' }}
              tick={{ fill: 'currentColor' }}
              className="text-gray-600 dark:text-gray-400"
            />
            <YAxis 
              stroke="#999" 
              style={{ fontSize: '12px' }}
              tick={{ fill: 'currentColor' }}
              className="text-gray-600 dark:text-gray-400"
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '12px',
                padding: '12px'
              }}
              cursor={{ fill: 'rgba(192, 57, 43, 0.1)' }}
            />
            <Bar 
              dataKey="donations" 
              fill="#c0392b" 
              radius={[8, 8, 0, 0]}
              maxBarSize={60}
            />
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
              data={bloodGroupData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={90}
              fill="#8884d8"
              dataKey="value"
            >
              {bloodGroupData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '12px',
                padding: '12px'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
