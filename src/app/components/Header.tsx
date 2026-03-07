import { Link, useLocation } from "react-router";
import { Droplet, Menu, X } from "lucide-react";
// import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  const navLinks = [
    { path: "/", label: "Find Blood" },
    { path: "/become-donor", label: "Become a Donor" },
    { path: "/nearby-centres", label: "Find Nearby Centre" },
    { path: "/blood-compatibility", label: "Blood Compatibility" },
    { path: "/education", label: "Education" }, 
    { path: "/admin", label: "Admin" }
  ];

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-red-600 p-2 rounded-lg group-hover:bg-red-700 transition-colors">
              <Droplet className="w-6 h-6 text-white fill-current" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              Find<span className="text-red-600">Blood</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors relative ${isActive(link.path)
                  ? "text-red-600"
                  : "text-gray-700 hover:text-red-600"
                  }`}
              >
                

                {link.label}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-red-600"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Register/Login button */}
          {!user && (
            <Link to="/auth">
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg">
                Register / Login
              </button>
            </Link>
          )}

          {/* Logout button */}
          {user && (
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                setUser(null);
              }}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-red-600 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-gray-200 bg-white overflow-hidden"
          >
            <nav className="flex flex-col px-4 py-4 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive(link.path)
                    ? "bg-red-50 text-red-600"
                    : "text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/auth"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-center"
              >
                Register / Login
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
