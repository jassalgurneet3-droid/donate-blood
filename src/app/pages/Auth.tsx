import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Phone, ArrowRight, Droplet } from "lucide-react";
import OTPVerification from "../components/OTPVerification";
import { supabase } from "@/lib/supabase";

export default function Auth() {
  const [authMethod, setAuthMethod] = useState<"email" | "phone">("email");
  const [contact, setContact] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (authMethod === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(contact)) {
        setError("Please enter a valid email address");
        return;
      }
    } else {
      const phoneRegex = /^[0-9]{10}$/;
      const cleanedPhone = contact.replace(/\D/g, "");
      if (!phoneRegex.test(cleanedPhone)) {
        setError("Please enter a valid 10-digit phone number");
        return;
      }
    }

    try {
      if (authMethod === "email") {
        const { error } = await supabase.auth.signInWithOtp({
          email: contact,
        });

        if (error) throw error;
      } else {
        const phone = "+91" + contact.replace(/\D/g, "");

        const { error } = await supabase.auth.signInWithOtp({
          phone: phone,
        });

        if (error) throw error;
      }

      setShowOTP(true);
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (showOTP) {
    return <OTPVerification contact={contact} authMethod={authMethod} />;
  }

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="bg-red-600 p-3 rounded-lg">
              <Droplet className="w-8 h-8 text-white fill-current" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to FindBlood
          </h1>
          <p className="text-gray-600">Register or Login to continue</p>
        </div>

        {/* Auth Form */}
        <div className="bg-white rounded-xl shadow-md p-8">
          {/* Method Selector */}
          <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setAuthMethod("email")}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${authMethod === "email"
                ? "bg-white text-red-600 shadow"
                : "text-gray-600 hover:text-gray-900"
                }`}
            >
              <Mail className="w-4 h-4 inline mr-2" />
              Email
            </button>
            <button
              onClick={() => setAuthMethod("phone")}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${authMethod === "phone"
                ? "bg-white text-red-600 shadow"
                : "text-gray-600 hover:text-gray-900"
                }`}
            >
              <Phone className="w-4 h-4 inline mr-2" />
              Phone
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {authMethod === "email" ? "Email Address" : "Phone Number"}
              </label>
              <div className="relative">
                {authMethod === "email" ? (
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                ) : (
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                )}
                <input
                  type={authMethod === "email" ? "email" : "tel"}
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder={
                    authMethod === "email"
                      ? "your@email.com"
                      : "+91 98765 43210"
                  }
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center gap-2"
            >
              Send OTP
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>

        {/* Info */}
        <div className="mt-6 bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg">
          <p className="text-sm text-blue-800">
            <strong>New here?</strong> After OTP verification, you'll be directed
            to complete your registration form.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
