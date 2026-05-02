
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Mail, Lock, User, Loader2, ArrowRight } from "lucide-react";
import { useAuthStore } from "@/src/stores/authStore";

export default function AuthComponent() {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const {
    login,
    signup,
    loginWithGoogle,
    isLoading,
    error,
    showLogin,
    setShowLogin,
    isVerifying,
    verificationEmail,
    clearError,
  } = useAuthStore();

  if (!showLogin) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === "login") {
      await login(email, password);
    } else {
      await signup(email, password, name);
    }
  };

  const handleTabChange = (tab: "login" | "signup") => {
    setActiveTab(tab);
    clearError();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowLogin(false)}
          className="absolute inset-0 bg-navy/80 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-navy-light border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={() => setShowLogin(false)}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                GreenPenny
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight">
                {isVerifying ? "Check your email" : activeTab === "login" ? "Welcome back" : "Create an account"}
              </h2>
              <p className="text-slate-400 mt-2 text-sm">
                {isVerifying
                  ? `We sent a verification link to ${verificationEmail}`
                  : activeTab === "login"
                    ? "Enter your details to access your account"
                    : "Start managing your money with GreenPenny"}
              </p>
            </div>

            {isVerifying ? (
              <div className="flex flex-col items-center py-6">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                  <Mail className="w-8 h-8" />
                </div>
                <button
                  onClick={() => setShowLogin(false)}
                  className="w-full py-4 rounded-xl font-bold text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                {/* Tabs */}
                <div className="flex p-1 bg-navy rounded-xl mb-6 border border-white/5">
                  <button
                    onClick={() => handleTabChange("login")}
                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === "login"
                      ? "bg-white/10 text-white shadow-sm"
                      : "text-slate-400 hover:text-slate-300"
                      }`}
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => handleTabChange("signup")}
                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === "signup"
                      ? "bg-white/10 text-white shadow-sm"
                      : "text-slate-400 hover:text-slate-300"
                      }`}
                  >
                    Sign Up
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-medium text-center">
                      {error}
                    </div>
                  )}

                  {activeTab === "signup" && (
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="w-5 h-5 text-slate-500" />
                      </div>
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-navy border border-white/10 text-white rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-medium placeholder:text-slate-500"
                        required
                      />
                    </div>
                  )}

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="w-5 h-5 text-slate-500" />
                    </div>
                    <input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-navy border border-white/10 text-white rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-medium placeholder:text-slate-500"
                      required
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="w-5 h-5 text-slate-500" />
                    </div>
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-navy border border-white/10 text-white rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-medium placeholder:text-slate-500"
                      required
                      minLength={6}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-primary text-navy hover:bg-emerald-400 rounded-xl font-bold text-[15px] shadow-[0_4px_15px_rgba(16,185,129,0.2)] transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center gap-2 mt-2"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        {activeTab === "login" ? "Sign In" : "Create Account"}
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-8 relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-navy-light text-slate-500">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => loginWithGoogle()}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center py-3.5 border border-white/10 rounded-xl bg-navy hover:bg-white/5 text-white font-medium transition-colors disabled:opacity-70"
                  >
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
