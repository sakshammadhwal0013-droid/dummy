import { useState, FormEvent } from "react";
import { UserPlus, LogIn, Lock, Mail, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";
import { SEO } from "../components/SEO";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleAuth = (e: FormEvent) => {
    e.preventDefault();
    localStorage.setItem("isAuthenticated", "true");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row pt-20">
      <SEO 
        title="Login or Register to Your Safarnama Travel Account"
        description="Log in to your Safarnama account or create a new one to manage your travel bookings."
        keywords="login, register, travel account"
      />
      {/* Left side Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative z-10">
        <div className="w-full max-w-md bg-slate-900 rounded-[2rem] p-8 md:p-10 shadow-2xl border border-slate-800">
          
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-black text-white mb-2">
              {isLogin ? "Login to Safarnama Travel Account" : "Create Safarnama Travel Account"}
            </h1>
            <p className="text-slate-400 flex items-center justify-center gap-1 font-medium">
              {isLogin ? "Enter your details to access your bookings." : (
                <>Join <span className="font-hindi text-xl text-orange-500 font-bold mx-1">सफ़रनामा</span> for exclusive deals.</>
              )}
            </p>
          </div>

          <div className="flex bg-slate-950 p-1 mb-8 rounded-xl border border-slate-800">
            <button
              onClick={() => setIsLogin(true)}
              className={cn(
                "flex-1 py-2.5 text-sm font-bold rounded-lg transition-all",
                isLogin ? "bg-slate-800 text-orange-400 shadow-sm border border-slate-700" : "text-slate-500 hover:text-slate-300"
              )}
            >
              Log in
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={cn(
                "flex-1 py-2.5 text-sm font-bold rounded-lg transition-all",
                !isLogin ? "bg-slate-800 text-orange-400 shadow-sm border border-slate-700" : "text-slate-500 hover:text-slate-300"
              )}
            >
              Sign up
            </button>
          </div>

          <form className="space-y-5" onSubmit={handleAuth}>
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: "1.25rem" }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  className="space-y-2 overflow-hidden"
                >
                  <label className="text-sm font-bold text-slate-300 ml-1">Full Name</label>
                  <div className="relative">
                    <UserPlus className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input 
                      type="text" 
                      placeholder="Jane Doe"
                      className="w-full pl-11 pr-4 py-3.5 bg-slate-800/50 border border-slate-700 text-white rounded-xl focus:bg-slate-800 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all placeholder-slate-500 font-medium"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-300 ml-1">Email <span className="text-rose-500">*</span></label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input 
                  type="email" 
                  placeholder="name@email.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-800/50 border border-slate-700 text-white rounded-xl focus:bg-slate-800 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all placeholder-slate-500 font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-sm font-bold text-slate-300">Password <span className="text-rose-500">*</span></label>
                {isLogin && <a href="#" className="text-xs text-orange-400 font-bold hover:text-orange-300">Forgot?</a>}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-800/50 border border-slate-700 text-white rounded-xl focus:bg-slate-800 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all placeholder-slate-500 font-medium"
                />
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 text-white font-black py-4 rounded-xl mt-6 transition-all shadow-lg shadow-orange-500/20 flex justify-center items-center gap-2 group active:scale-[0.98]">
              {isLogin ? "Sign In" : "Create Account"}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 relative text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800"></div>
            </div>
            <span className="relative z-10 bg-slate-900 px-4 text-xs font-black text-slate-500 uppercase tracking-widest">
              Or continue with
            </span>
          </div>

          <div className="mt-6">
            <button className="w-full bg-slate-800 border border-slate-700 hover:bg-slate-700 hover:border-slate-600 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-3 active:scale-[0.98]">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google
            </button>
          </div>
          
        </div>
      </div>
      
      {/* Right side background */}
      <div className="hidden md:block flex-1 relative">
        <div className="absolute inset-0 bg-slate-900 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1542314831-c6a4d1409eae?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Travel Luxury" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="absolute inset-0 flex flex-col justify-end p-12 lg:p-20 text-white">
          <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 p-8 rounded-3xl max-w-lg shadow-2xl">
            <h2 className="text-3xl font-black mb-4">Your passport to the world.</h2>
            <p className="text-slate-300 leading-relaxed mb-6 text-lg font-medium">
              "Booking through <span className="font-hindi text-2xl text-orange-400 font-bold mx-1">सफ़रनामा</span> was the easiest part of our entire vacation. The hotel recommendations were flawless."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center font-black text-lg">AJ</div>
              <div>
                <p className="font-bold">Anita Jackson</p>
                <p className="text-orange-400 font-medium text-sm">Verified Traveler</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
