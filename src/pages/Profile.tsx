import { User, MapPin, Calendar, Clock, CreditCard, Star, Ticket } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { t } from "../lib/i18n";
import { SEO } from "../components/SEO";

export default function Profile() {
  const [bookings, setBookings] = useState<any[]>([]);
  const navigate = useNavigate();
  const [lang, setLang] = useState(localStorage.getItem("userLanguage") || "en");

  useEffect(() => {
    const handlePrefs = () => setLang(localStorage.getItem("userLanguage") || "en");
    window.addEventListener("preferencesUpdated", handlePrefs);
    return () => window.removeEventListener("preferencesUpdated", handlePrefs);
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("isAuthenticated")) {
      navigate("/auth");
      return;
    }
    
    // Load bookings from the backend API
    const fetchBookings = async () => {
      try {
        const response = await fetch("/api/user/bookings");
        if (response.ok) {
          const data = await response.json();
          setBookings(data);
        }
      } catch (err) {
        console.error("Failed to load user bookings:", err);
      }
    };
    
    fetchBookings();
  }, [navigate]);

  return (
    <div className="pt-24 pb-20 w-full min-h-screen bg-slate-950 text-slate-100">
      <SEO 
        title="My Profile & Booking History | Safarnama Travel Portal"
        description="Manage your Safarnama profile, view your bookings, and update preferences."
      />
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        
        {/* Profile Header */}
        <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-xl mb-10 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
          
          <div className="w-32 h-32 bg-slate-800 rounded-full flex items-center justify-center border-4 border-slate-700 shrink-0 relative z-10">
            <User className="w-16 h-16 text-slate-500" />
          </div>
          
          <div className="text-center md:text-left relative z-10">
            <h1 className="text-3xl md:text-4xl font-black text-white mb-2">My Profile & Travel Bookings</h1>
            <p className="text-slate-400 font-medium text-lg mb-4">{t("manageDetails", lang)}</p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <span className="bg-slate-800 text-slate-300 px-4 py-1.5 rounded-full text-sm font-bold border border-slate-700">{t("travelEnthusiast", lang)}</span>
              <span className="bg-slate-800 text-slate-300 px-4 py-1.5 rounded-full text-sm font-bold border border-slate-700">{t("memberSince", lang)}</span>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Personal Info */}
          <div className="space-y-8">
            <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-xl">
              <h2 className="text-xl font-bold text-white mb-6 border-b border-slate-800 pb-4">{t("personalDetails", lang)}</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">{t("fullName", lang)}</p>
                  <p className="text-white font-medium">Guest User</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">{t("emailAddr", lang)}</p>
                  <p className="text-white font-medium">guest@safarnama.com</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">{t("phoneNum", lang)}</p>
                  <p className="text-white font-medium">+91 0000000000</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booked Trips */}
          <div className="lg:col-span-2">
            <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-xl min-h-[400px]">
              <div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Ticket className="text-orange-500" />
                  {t("myBookings", lang)}
                </h2>
                <span className="bg-slate-800 text-orange-400 px-3 py-1 rounded-full text-sm font-bold">
                  {bookings.length} {bookings.length === 1 ? 'Trip' : 'Trips'}
                </span>
              </div>

              {bookings.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-slate-800 text-slate-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MapPin className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{t("noBookings", lang)}</h3>
                  <p className="text-slate-400 mb-8 max-w-sm mx-auto">{t("noBookingsDesc", lang)}</p>
                  <Link to="/tours" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg shadow-orange-500/20">
                    {t("explorePkgs", lang)}
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {bookings.map((booking, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row gap-6 relative overflow-hidden group hover:border-slate-700 transition-colors"
                    >
                      <div className="w-full md:w-40 h-32 bg-slate-800 rounded-xl overflow-hidden shrink-0">
                        {booking.image ? (
                          <img src={booking.image} alt={booking.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <MapPin className="text-slate-600 w-8 h-8" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold text-white">{booking.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${booking.status === 'Confirmed' ? 'bg-emerald-500/10 text-emerald-400' : booking.status === 'Pending' ? 'bg-amber-500/10 text-amber-400' : 'bg-rose-500/10 text-rose-400'}`}>{booking.status}</span>
                        </div>
                        <p className="text-slate-400 font-medium mb-4">{booking.type} - {booking.destination}</p>
                        
                        <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-300">
                          {booking.date && (
                            <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                              <Calendar className="w-4 h-4 text-orange-400" />
                              {booking.date}
                            </div>
                          )}
                          <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                            <CreditCard className="w-4 h-4 text-orange-400" />
                            {booking.amount || "Paid"}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
