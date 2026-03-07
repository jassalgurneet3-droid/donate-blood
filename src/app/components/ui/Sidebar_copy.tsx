import { 
  LayoutDashboard, 
  Users, 
  AlertCircle, 
  Droplet, 
  FileText, 
  Settings 
} from 'lucide-react';
import { motion } from 'motion/react';

const navigationItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: Users, label: 'Donors', active: false },
  { icon: AlertCircle, label: 'Emergency Requests', active: false },
  { icon: Droplet, label: 'Donations', active: false },
  { icon: FileText, label: 'Reports', active: false },
  { icon: Settings, label: 'Settings', active: false },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : -240 }}
        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        className="fixed left-0 top-0 h-screen w-60 bg-white dark:bg-[#2f3640] border-r border-gray-200 dark:border-gray-700 z-50 lg:translate-x-0 lg:static"
      >
        {/* Logo */}
        <div className="h-20 flex items-center px-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#c0392b] to-[#e74c3c] rounded-xl flex items-center justify-center shadow-lg">
              <Droplet className="w-6 h-6 text-white" fill="white" />
            </div>
            <span className="text-xl font-bold text-[#2c3e50] dark:text-white">
              BloodLink
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navigationItems.map((item) => (
            <motion.button
              key={item.label}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                ${item.active 
                  ? 'bg-[#c0392b] text-white shadow-lg shadow-red-500/20' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                }
              `}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
              {item.active && (
                <div className="ml-auto w-2 h-2 bg-white rounded-full" />
              )}
            </motion.button>
          ))}
        </nav>

        {/* Bottom Card */}
        <div className="absolute bottom-6 left-4 right-4">
          <div className="bg-gradient-to-br from-[#c0392b]/10 to-[#e74c3c]/10 dark:from-[#c0392b]/20 dark:to-[#e74c3c]/20 rounded-xl p-4 border border-[#c0392b]/20">
            <h3 className="font-semibold text-[#2c3e50] dark:text-white mb-1">
              Need Help?
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
              Contact support team
            </p>
            <button className="w-full py-2 bg-[#c0392b] text-white rounded-lg text-sm font-medium hover:bg-[#a33226] transition-colors">
              Get Support
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
