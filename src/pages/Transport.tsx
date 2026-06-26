import { PlaneTakeoff, TrainFront, Car, Bus, Ship, Search, MapPin, Calendar, Users, Briefcase, Info } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";
import { t } from "../lib/i18n";
import { SEO } from "../components/SEO";

export default function Transport() {
  const [activeTab, setActiveTab] = useState<"flight" | "train" | "cab" | "bus" | "cruise">("flight");
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [lang, setLang] = useState(localStorage.getItem("userLanguage") || "en");
  const navigate = useNavigate();

  useEffect(() => {
    const handlePrefs = () => {
      setLang(localStorage.getItem("userLanguage") || "en");
    };
    window.addEventListener("preferencesUpdated", handlePrefs);
    return () => window.removeEventListener("preferencesUpdated", handlePrefs);
  }, []);

  const handleSearch = () => {
    if (!localStorage.getItem("isAuthenticated")) {
      navigate("/auth");
      return;
    }
    setIsSearching(true);
    setHasSearched(false);
    setTimeout(() => {
      setIsSearching(false);
      setHasSearched(true);
    }, 1500);
  };

  return (
    <div className="pt-24 pb-20 w-full min-h-screen bg-slate-950 font-sans text-slate-100">
      <SEO 
        title="Book Flights, Trains, Cabs & Buses Online | Safarnama"
        description="Book flights, trains, cabs, buses, and cruises seamlessly with Safarnama."
        keywords="flight booking, train booking, irctc, cab booking, travel transport"
      />
      {/* Hero Banner */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 pb-32 pt-16 px-4 relative">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="Planes" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-slate-950/60"></div>
        </div>
        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <h1 className="text-3xl md:text-6xl font-black text-white mb-4 tracking-tight drop-shadow-md">Book Flights, Trains & Cabs Online</h1>
          <p className="text-slate-400 text-lg md:text-2xl font-medium">{t("compareBook", lang)}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 -mt-24 relative z-10">
        
        {/* Booking Widget */}
        <div className="bg-slate-900 rounded-[2rem] shadow-2xl p-2 md:p-6 border border-slate-800 max-w-5xl mx-auto mb-20 relative">
          
          {/* Tabs */}
          <div className="flex gap-2 mb-6 justify-center overflow-x-auto pb-2 border-b border-slate-800">
            <button 
              onClick={() => { setActiveTab("flight"); setHasSearched(false); }}
              className={cn("flex items-center gap-2 px-6 py-4 rounded-t-xl font-bold transition-all border-b-4", activeTab === "flight" ? "border-orange-500 text-orange-400 bg-orange-500/10" : "border-transparent text-slate-400 hover:text-orange-400 hover:bg-slate-800")}
            >
              <PlaneTakeoff className="w-5 h-5" /> {t("flights", lang)}
            </button>
            <button 
              onClick={() => { setActiveTab("train"); setHasSearched(false); }}
              className={cn("flex items-center gap-2 px-6 py-4 rounded-t-xl font-bold transition-all border-b-4", activeTab === "train" ? "border-orange-500 text-orange-400 bg-orange-500/10" : "border-transparent text-slate-400 hover:text-orange-400 hover:bg-slate-800")}
            >
              <TrainFront className="w-5 h-5" /> {t("trains", lang)}
            </button>
            <button 
              onClick={() => { setActiveTab("bus"); setHasSearched(false); }}
              className={cn("flex items-center gap-2 px-6 py-4 rounded-t-xl font-bold transition-all border-b-4", activeTab === "bus" ? "border-orange-500 text-orange-400 bg-orange-500/10" : "border-transparent text-slate-400 hover:text-orange-400 hover:bg-slate-800")}
            >
              <Bus className="w-5 h-5" /> {t("buses", lang)}
            </button>
            <button 
              onClick={() => { setActiveTab("cab"); setHasSearched(false); }}
              className={cn("flex items-center gap-2 px-6 py-4 rounded-t-xl font-bold transition-all border-b-4", activeTab === "cab" ? "border-orange-500 text-orange-400 bg-orange-500/10" : "border-transparent text-slate-400 hover:text-orange-400 hover:bg-slate-800")}
            >
              <Car className="w-5 h-5" /> {t("cabs", lang)}
            </button>
            <button 
              onClick={() => { setActiveTab("cruise"); setHasSearched(false); }}
              className={cn("flex items-center gap-2 px-6 py-4 rounded-t-xl font-bold transition-all border-b-4", activeTab === "cruise" ? "border-orange-500 text-orange-400 bg-orange-500/10" : "border-transparent text-slate-400 hover:text-orange-400 hover:bg-slate-800")}
            >
              <Ship className="w-5 h-5" /> {t("cruises", lang)}
            </button>
          </div>

          {/* Form Area */}
          <div className="bg-slate-950 p-2 md:p-3 rounded-2xl border border-slate-800">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
              
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 lg:col-span-1 hover:border-orange-500/50 transition-colors shadow-sm cursor-text group">
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-orange-500 transition-transform group-hover:scale-110" /> From
                </p>
                <input type="text" placeholder="Origin City" className="w-full text-xl font-black text-white bg-transparent outline-none placeholder-slate-600" defaultValue="New Delhi" />
                <p className="text-xs text-slate-500 truncate mt-1">DEL, Indira Gandhi International Airport</p>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 lg:col-span-1 hover:border-orange-500/50 transition-colors shadow-sm cursor-text group">
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-orange-500 transition-transform group-hover:scale-110" /> To
                </p>
                <input type="text" placeholder="Destination City" className="w-full text-xl font-black text-white bg-transparent outline-none placeholder-slate-600" defaultValue="Mumbai" />
                <p className="text-xs text-slate-500 truncate mt-1">BOM, Chhatrapati Shivaji Airport</p>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 lg:col-span-1 hover:border-orange-500/50 transition-colors shadow-sm cursor-text group">
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-orange-500 transition-transform group-hover:scale-110" /> Departure
                </p>
                <input type="date" className="w-full text-lg font-bold text-white bg-transparent outline-none uppercase cursor-pointer" />
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 lg:col-span-1 hover:border-orange-500/50 transition-colors shadow-sm cursor-text cursor-pointer group">
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-600 group-hover:text-orange-500 transition-colors" /> Return
                </p>
                <p className="text-sm font-semibold text-slate-500 mt-2 leading-tight">Tap to add a return date for bigger discounts</p>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 lg:col-span-1 hover:border-orange-500/50 transition-colors shadow-sm cursor-text group">
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Users className="w-3 h-3 text-orange-500 transition-transform group-hover:scale-110" /> Travellers
                </p>
                <p className="text-xl font-black text-white leading-tight"><span className="text-2xl">1</span> Adult</p>
                <p className="text-xs text-slate-500 font-semibold mt-1">Economy</p>
              </div>

            </div>
          </div>

          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-full max-w-[280px]">
            <button 
              onClick={handleSearch}
              disabled={isSearching}
              className="w-full bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 text-white font-black py-4 px-12 rounded-full text-xl shadow-xl shadow-orange-500/20 transform transition hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-80"
            >
              {isSearching ? t("searching", lang) : t("searchBtn", lang)}
            </button>
          </div>
        </div>

        {hasSearched && (
          <div className="max-w-5xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-2 uppercase tracking-wide">
              <PlaneTakeoff className="text-orange-500" /> 
              Search Results
            </h2>
            <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-xl flex flex-col items-center justify-center text-center space-y-4">
               <Info className="w-16 h-16 text-slate-700" />
               <p className="text-white text-xl font-black">This is a simulated demo environment.</p>
               <p className="text-slate-400 max-w-md">In a real application, accurate and live API results for {activeTab}s between the selected locations would appear here.</p>
            </div>
          </div>
        )}

        {/* Info modules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
           <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl hover:border-slate-700 transition">
             <div className="w-12 h-12 bg-slate-800 text-orange-400 rounded-xl flex items-center justify-center mb-4">
               <PlaneTakeoff className="w-6 h-6" />
             </div>
             <h3 className="text-lg font-bold text-white mb-2">{t("cheapFlights", lang)}</h3>
             <p className="text-slate-400 text-sm leading-relaxed">{t("compPrices", lang)}</p>
           </div>
           <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl hover:border-slate-700 transition">
             <div className="w-12 h-12 bg-slate-800 text-orange-400 rounded-xl flex items-center justify-center mb-4">
               <TrainFront className="w-6 h-6" />
             </div>
             <h3 className="text-lg font-bold text-white mb-2">{t("irctcAuth", lang)}</h3>
             <p className="text-slate-400 text-sm leading-relaxed">{t("bookShort", lang)}</p>
           </div>
           <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl hover:border-slate-700 transition">
             <div className="w-12 h-12 bg-slate-800 text-orange-400 rounded-xl flex items-center justify-center mb-4">
               <Car className="w-6 h-6" />
             </div>
             <h3 className="text-lg font-bold text-white mb-2">{t("outstationCabs", lang)}</h3>
             <p className="text-slate-400 text-sm leading-relaxed">{t("hassleFree", lang)}</p>
           </div>
        </div>

      </div>
    </div>
  );
}
