import { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import { supabase } from "@/lib/supabase";

interface OTPVerificationProps {
  contact: string;
  authMethod: "email" | "phone";
}

export default function OTPVerification({
  contact,
  authMethod,
}: OTPVerificationProps) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async () => {
    setError("");

    if (otp.length !== 6) {
      setError("Please enter the complete 6-digit OTP");
      return;
    }

    setIsVerifying(true);

    let result;

    if (authMethod === "email") {
      result = await supabase.auth.verifyOtp({
        email: contact,
        token: otp,
        type: "email",
      });
    } else {
      result = await supabase.auth.verifyOtp({
        phone: "+91" + contact,
        token: otp,
        type: "sms",
      });
    }

    const { error } = result;

    if (error) {
      setError("Invalid OTP");
      setIsVerifying(false);
      return;
    }

    navigate("/signup", {
      state: {
        contact,
        authMethod,
      },
    });
  };

  const handleResend = async () => {
    setOtp("");
    setError("");

    if (authMethod === "email") {
      await supabase.auth.signInWithOtp({
        email: contact,
      });
    } else {
      await supabase.auth.signInWithOtp({
        phone: "+91" + contact,
      });
    }

    alert("OTP resent to " + contact);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="bg-white rounded-xl shadow-md p-8">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Verify OTP
            </h2>
            <p className="text-gray-600">
              We've sent a 6-digit code to
            </p>
            <p className="font-medium text-gray-900 mt-1">{contact}</p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
              Enter OTP
            </label>
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => {
                  setOtp(value);
                  setError("");
                }}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            {error && (
              <p className="mt-3 text-sm text-red-600 text-center">{error}</p>
            )}
          </div>

          <button
            onClick={handleVerify}
            disabled={otp.length !== 6 || isVerifying}
            className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed mb-4"
          >
            {isVerifying ? "Verifying..." : "Verify & Continue"}
          </button>

          <div className="text-center">
            <button
              onClick={handleResend}
              className="text-sm text-red-600 hover:text-red-700 font-medium"
            >
              Didn't receive the code? Resend OTP
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              For demo purposes, use any 6-digit code to proceed
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
