import { MapPin, Calendar, Users, Search, Star, Plane, Building, Compass, Quote, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { cn } from "../lib/utils";
import { formatPrice, parsePriceString } from "../lib/currency";
import { t } from "../lib/i18n";
import { SEO } from "../components/SEO";

const DESTINATIONS = [
  {
    id: 1,
    title: "Taj Mahal, Agra",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Taj_Mahal_%28Edited%29.jpeg/960px-Taj_Mahal_%28Edited%29.jpeg",
    rating: 4.9,
    price: "₹18,500",
    duration: "6 Days"
  },
  {
    id: 2,
    title: "Goa Beaches",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/BeachFun.jpg/960px-BeachFun.jpg",
    rating: 4.8,
    price: "₹14,500",
    duration: "5 Days"
  },
  {
    id: 3,
    title: "Uttarakhand Hills",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Mussoorie_Snow_Over_Dehradun_%2814831297545%29.jpg/960px-Mussoorie_Snow_Over_Dehradun_%2814831297545%29.jpg",
    rating: 5.0,
    price: "₹19,000",
    duration: "6 Days"
  },
  {
    id: 4,
    title: "Kerala Backwaters",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/House_Boat_DSW.jpg/960px-House_Boat_DSW.jpg",
    rating: 4.7,
    price: "₹22,500",
    duration: "6 Days"
  }
];

const HERO_IMAGES = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Taj_Mahal_%28Edited%29.jpeg/960px-Taj_Mahal_%28Edited%29.jpeg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Mussoorie_Snow_Over_Dehradun_%2814831297545%29.jpg/960px-Mussoorie_Snow_Over_Dehradun_%2814831297545%29.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/BeachFun.jpg/960px-BeachFun.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/House_Boat_DSW.jpg/960px-House_Boat_DSW.jpg"
];

const TESTIMONIALS = [
  {
    name: "Rohan & Priya",
    role: "Honeymoon Couple",
    text: "Our trip to the Maldives organized by Safari was nothing short of magical. Every detail was meticulously planned, allowing us to just relax and soak in the beauty.",
    avatar: "https://images.unsplash.com/photo-1522075469751-ed96e22a4645?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
  },
  {
    name: "Amanda Chen",
    role: "Solo Traveler",
    text: "As a solo female traveler, safety and experience were my top priorities. The Golden Triangle tour exceeded my expectations on both fronts. Incredible!",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
  },
  {
    name: "The Sharma Family",
    role: "Family Vacation",
    text: "We booked the Kashmir package for our family of 6. The houseboat stay and the snow in Gulmarg created memories my kids will cherish forever.",
    avatar: "https://images.unsplash.com/photo-1506869640319-fea1a2ab8e40?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
  }
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<"flights" | "hotels" | "packages">("flights");
  const [heroIndex, setHeroIndex] = useState(0);
  const [currency, setCurrency] = useState(localStorage.getItem("userCurrency") || "INR");
  const [lang, setLang] = useState(localStorage.getItem("userLanguage") || "en");
  const navigate = useNavigate();

  useEffect(() => {
    const handlePrefs = () => {
      setCurrency(localStorage.getItem("userCurrency") || "INR");
      setLang(localStorage.getItem("userLanguage") || "en");
    };
    window.addEventListener("preferencesUpdated", handlePrefs);
    return () => window.removeEventListener("preferencesUpdated", handlePrefs);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    if (activeTab === "flights") navigate("/transport");
    if (activeTab === "hotels") navigate("/hotels");
    if (activeTab === "packages") navigate("/tours");
  };

  return (
    <div className="w-full bg-slate-950 font-sans text-slate-100 pb-20">
      <SEO 
        title="Safarnama: Best India Tours, Flights & Hotels Booking"
        description="Safarnama Travel Portal - Explore India's best destinations, book flights, luxury hotels, and curated tour packages."
        keywords="travel, india, tours, flights, hotels, booking"
      />
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="popLayout">
            <motion.img 
              key={heroIndex}
              src={HERO_IMAGES[heroIndex]}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.6, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              alt="Travel background" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-slate-950"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center max-w-5xl text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="inline-block bg-white/10 backdrop-blur-md px-6 py-2 rounded-full mb-6 border border-white/20 text-sm md:text-base font-bold tracking-widest uppercase text-slate-200"
          >
            Explore . Dream . Discover
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 drop-shadow-xl leading-none flex flex-col items-center justify-center gap-4 text-center"
          >
            <span className="block text-4xl md:text-5xl lg:text-6xl text-slate-300 font-bold tracking-tight mb-2">Safarnama</span>
            Book India Tours, Flights & Luxury Hotels
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-2xl text-slate-300 font-medium drop-shadow-md max-w-3xl mx-auto"
          >
            {t("indiaTrusted", lang)}
          </motion.p>
        </div>
      </section>

      {/* Floating Search Panel */}
      <section className="relative z-20 -mt-24 px-4 container mx-auto">
        <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="bg-slate-900/90 backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/50 p-4 max-w-5xl mx-auto border border-slate-700/50"
          >
            <div className="flex flex-wrap justify-center gap-6 mb-6 pt-4 border-b border-slate-800 pb-4">
               <button 
                 onClick={() => setActiveTab("flights")}
                 className={cn("flex items-center gap-2 font-bold border-b-2 pb-2 px-2 transition-all", activeTab === "flights" ? "text-orange-500 border-orange-500" : "text-slate-400 border-transparent hover:text-orange-400 hover:border-orange-500/50")}
               >
                 <Plane className="w-5 h-5" /> {t("flights", lang)}
               </button>
               <button 
                 onClick={() => setActiveTab("hotels")}
                 className={cn("flex items-center gap-2 font-bold border-b-2 pb-2 px-2 transition-all", activeTab === "hotels" ? "text-orange-500 border-orange-500" : "text-slate-400 border-transparent hover:text-orange-400 hover:border-orange-500/50")}
               >
                 <Building className="w-5 h-5" /> {t("hotels", lang)}
               </button>
               <button 
                 onClick={() => setActiveTab("packages")}
                 className={cn("flex items-center gap-2 font-bold border-b-2 pb-2 px-2 transition-all", activeTab === "packages" ? "text-orange-500 border-orange-500" : "text-slate-400 border-transparent hover:text-orange-400 hover:border-orange-500/50")}
               >
                 <Compass className="w-5 h-5" /> {t("tours", lang)}
               </button>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex-1 flex flex-col md:flex-row items-center gap-2 w-full p-2 bg-slate-800/80 rounded-2xl border border-slate-700">
                <div className="flex-1 flex items-center gap-3 px-4 w-full md:w-auto text-slate-200 hover:bg-slate-700/50 cursor-pointer rounded-xl py-3 transition-colors border-b md:border-b-0 md:border-r border-slate-700">
                  <MapPin className="text-orange-500 w-6 h-6" />
                  <div className="text-left w-full">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">{t("dest", lang)}</p>
                    <input type="text" placeholder={activeTab === "flights" ? t("flightPlaceholder", lang) : activeTab === "hotels" ? t("hotelPlaceholder", lang) : t("destPlaceholder", lang)} className="w-full bg-transparent outline-none font-bold text-lg text-white placeholder-slate-500" />
                  </div>
                </div>
                <div className="flex-1 flex items-center gap-3 px-4 w-full md:w-auto text-slate-200 hover:bg-slate-700/50 cursor-pointer rounded-xl py-3 transition-colors border-b md:border-b-0 md:border-r border-slate-700">
                  <Calendar className="text-orange-500 w-6 h-6" />
                  <div className="text-left">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">{t("date", lang)}</p>
                    <input type="text" placeholder={t("selDates", lang)} className="w-full bg-transparent outline-none font-bold text-lg text-white placeholder-slate-500" />
                  </div>
                </div>
                <div className="flex-1 flex items-center gap-3 px-4 w-full md:w-auto text-slate-200 hover:bg-slate-700/50 cursor-pointer rounded-xl py-3 transition-colors">
                  <Users className="text-orange-500 w-6 h-6" />
                  <div className="text-left">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">{t("guests", lang)}</p>
                    <input type="text" placeholder={t("oneAdult", lang)} className="w-full bg-transparent outline-none font-bold text-lg text-white placeholder-slate-500" />
                  </div>
                </div>
              </div>
              <button onClick={handleSearch} className="bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 text-white w-full md:w-auto md:h-full px-10 py-5 rounded-2xl font-bold flex text-xl items-center justify-center gap-2 transition-all shadow-lg shadow-orange-500/20 hover:scale-105 active:scale-95">
                <Search className="w-6 h-6" />
                <span>{t("search", lang)}</span>
              </button>
            </div>
          </motion.div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-slate-950 relative mt-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">Explore India Tour Packages & Beyond</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">{t("provComprehensive", lang)}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-slate-900 rounded-3xl p-8 hover:shadow-2xl transition-all border border-slate-800 hover:border-orange-500/50 group">
              <div className="w-16 h-16 bg-slate-800/80 rounded-2xl flex items-center justify-center text-orange-400 mb-6 shadow-sm group-hover:scale-110 transition-transform border border-slate-700">
                <Plane className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">Book Flight & Train Tickets</h3>
              <p className="text-slate-400 mb-8 leading-relaxed">{t("bookFlightsTrains", lang)}</p>
              <Link to="/transport" className="text-orange-400 font-bold hover:text-orange-300 flex items-center gap-2">
                {t("bookTrans", lang)} &rarr;
              </Link>
            </div>
            
            <div className="bg-slate-900 rounded-3xl p-8 hover:shadow-2xl transition-all border border-slate-800 hover:border-orange-500/50 group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <span className="bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Popular</span>
              </div>
              <div className="w-16 h-16 bg-slate-800/80 rounded-2xl flex items-center justify-center text-rose-400 mb-6 shadow-sm group-hover:scale-110 transition-transform border border-slate-700">
                <Compass className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">Curated India Tour Packages</h3>
              <p className="text-slate-400 mb-8 leading-relaxed">{t("discoverIncredible", lang)}</p>
              <Link to="/tours" className="text-rose-400 font-bold hover:text-rose-300 flex items-center gap-2">
                {t("exploreTours", lang)} &rarr;
              </Link>
            </div>
            
            <div className="bg-slate-900 rounded-3xl p-8 hover:shadow-2xl transition-all border border-slate-800 hover:border-orange-500/50 group">
              <div className="w-16 h-16 bg-slate-800/80 rounded-2xl flex items-center justify-center text-amber-400 mb-6 shadow-sm group-hover:scale-110 transition-transform border border-slate-700">
                <Building className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">Luxury Hotels & Resorts</h3>
              <p className="text-slate-400 mb-8 leading-relaxed">{t("accessExclusive", lang)}</p>
              <Link to="/hotels" className="text-amber-400 font-bold hover:text-amber-300 flex items-center gap-2">
                {t("expHotels", lang)} &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Destinations */}
      <section className="py-24 bg-slate-900 border-t border-slate-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">Trending India Travel Destinations</h2>
              <p className="text-slate-400 max-w-xl text-lg">Most booked packages this season across India. Limited seats available.</p>
            </div>
            <Link to="/tours" className="text-orange-500 font-semibold hover:text-orange-400 hidden md:flex items-center gap-2 bg-slate-800 px-6 py-3 rounded-xl border border-slate-700 hover:bg-slate-700 transition">
              View All Packages &rarr;
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DESTINATIONS.map((dest) => (
              <motion.div 
                key={dest.id} 
                whileHover={{ y: -8 }}
                className="bg-slate-950 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-slate-800 group"
              >
                <div className="relative h-64">
                  <img src={dest.image} alt={dest.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" />
                  <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md border border-slate-700 px-3 py-1.5 rounded-full flex items-center gap-1 font-bold text-sm text-amber-400">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span>{dest.rating.toFixed(1)}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white flex-1">{dest.title}</h3>
                  </div>
                  <div className="flex items-center text-slate-400 text-sm mb-6 gap-4 font-medium">
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-orange-500" /> {dest.duration}</span>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">{t("startingFrom", lang)}</p>
                      <p className="text-2xl font-black text-orange-500">{formatPrice(parsePriceString(dest.price), currency)}</p>
                    </div>
                    <Link to="/tours" className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors">
                      {t("explore", lang)}
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 text-center md:hidden">
            <Link to="/tours" className="text-orange-500 font-bold w-full bg-slate-800 py-4 rounded-xl border border-slate-700 inline-block shadow-sm">
              View All Packages
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-rose-500/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">Travelers' Tales & Reviews</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">Hear what our guests have to say about their Safarnama experience.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {TESTIMONIALS.map((testimonial, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-xl flex flex-col relative"
              >
                <div className="text-orange-500/20 absolute top-8 right-8">
                  <Quote className="w-16 h-16" />
                </div>
                <div className="flex items-center gap-2 mb-6">
                  {Array.from({length: 5}).map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 leading-relaxed mb-8 relative z-10 flex-1">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-4 border-t border-slate-800 pt-6 mt-auto">
                  <img src={testimonial.avatar} alt={testimonial.name} loading="lazy" className="w-12 h-12 rounded-full object-cover border-2 border-slate-700" />
                  <div>
                    <h4 className="text-white font-bold">{testimonial.name}</h4>
                    <p className="text-slate-400 text-sm font-medium">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
