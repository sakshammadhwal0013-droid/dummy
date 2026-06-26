import { MapPin, Star, Filter, Coffee, Wifi, Car, Search, X } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import BookingForm from "../components/BookingForm";
import { cn } from "../lib/utils";
import { formatPrice } from "../lib/currency";
import { t } from "../lib/i18n";
import { SEO } from "../components/SEO";

export default function Hotels() {
  const [selectedHotel, setSelectedHotel] = useState<any>(null);
  const [bookingStatus, setBookingStatus] = useState<"idle" | "loading" | "success">("idle");
  const [searchQuery, setSearchQuery] = useState("");
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

  const [priceRanges, setPriceRanges] = useState([
    { id: "budget", label: "Under ₹5,000", min: 0, max: 5000, checked: true },
    { id: "medium", label: "₹5,000 - ₹10,000", min: 5000, max: 10000, checked: true },
    { id: "high", label: "₹10,000 - ₹20,000", min: 10000, max: 20000, checked: true },
    { id: "luxury", label: "Over ₹20,000", min: 20000, max: Infinity, checked: true }
  ]);

  const [starRatings, setStarRatings] = useState([
    { rating: 5, checked: true },
    { rating: 4, checked: true },
    { rating: 3, checked: true }
  ]);

  const togglePriceRange = (id: string) => {
    setPriceRanges(ranges => ranges.map(r => r.id === id ? { ...r, checked: !r.checked } : r));
  };

  const toggleStarRating = (rating: number) => {
    setStarRatings(stars => stars.map(s => s.rating === rating ? { ...s, checked: !s.checked } : s));
  };

  const [showBookingForm, setShowBookingForm] = useState(false);

  const handleBookingClick = () => {
    if (!localStorage.getItem("isAuthenticated")) {
      navigate("/auth");
      return;
    }
    setShowBookingForm(true);
  };

  const HOTELS = [
    {
      id: 1,
      name: "The Oberoi Amarvilas",
      location: "Agra, Uttar Pradesh",
      price: 35000,
      rating: 5.0,
      reviews: 1240,
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Taj_Mahal_%28Edited%29.jpeg/960px-Taj_Mahal_%28Edited%29.jpeg",
      amenities: ["Free WiFi", "Pool", "Spa", "Restaurant", "Room Service"],
      description: "Located just 600 meters from the Taj Mahal, The Oberoi Amarvilas offers breathtaking, uninterrupted views of the monument from all its rooms and suites.",
      gallery: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Taj_Mahal_%28Edited%29.jpeg/960px-Taj_Mahal_%28Edited%29.jpeg",
        "https://images.unsplash.com/photo-1542314831-c6a4d1409eae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: 2,
      name: "Taj Lake Palace",
      location: "Udaipur, Rajasthan",
      price: 42000,
      rating: 5.0,
      reviews: 980,
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Udaipur_Lake_Palace.jpg/960px-Udaipur_Lake_Palace.jpg",
      amenities: ["Free WiFi", "Boat Transport", "Spa", "Dining"],
      description: "Appearing like a jewel floating in the middle of Lake Pichola, the Taj Lake Palace is a heritage hotel straight out of a fairy tale.",
      gallery: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Udaipur_Lake_Palace.jpg/960px-Udaipur_Lake_Palace.jpg",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1551882547-ff40c0d129df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: 3,
      name: "ITC Grand Chola",
      location: "Chennai, Tamil Nadu",
      price: 18000,
      rating: 5.0,
      reviews: 2100,
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/ITC-Grand-Chola-Chennai-2.JPG/960px-ITC-Grand-Chola-Chennai-2.JPG",
      amenities: ["Free WiFi", "Gym", "Pool", "Bar"],
      description: "A palatial tribute to Southern India's greatest empires. The ITC Grand Chola in Chennai features majestic architecture.",
      gallery: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/ITC-Grand-Chola-Chennai-2.JPG/960px-ITC-Grand-Chola-Chennai-2.JPG",
        "https://images.unsplash.com/photo-1549294413-26f195200c16?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1584132967334-10e028b12204?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: 4,
      name: "Wildflower Hall",
      location: "Shimla, Himachal Pradesh",
      price: 28000,
      rating: 5.0,
      reviews: 650,
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Landscape_of_Shimla_%2C_Himachal_Pradesh.jpg/960px-Landscape_of_Shimla_%2C_Himachal_Pradesh.jpg",
      amenities: ["Spa", "Dining", "Trekking", "Free WiFi"],
      description: "Nestled in the Himalayas, Wildflower Hall offers tranquility and magnificent views of pine-clad mountains.",
      gallery: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Landscape_of_Shimla_%2C_Himachal_Pradesh.jpg/960px-Landscape_of_Shimla_%2C_Himachal_Pradesh.jpg",
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: 7,
      name: "Ganges Grand",
      location: "Varanasi, Uttar Pradesh",
      price: 8500,
      rating: 4.0,
      reviews: 890,
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Varanasi%2C_India%2C_Ghats%2C_Cremation_ceremony_in_progress.jpg/960px-Varanasi%2C_India%2C_Ghats%2C_Cremation_ceremony_in_progress.jpg",
      amenities: ["Free WiFi", "Restaurant", "Ghat View"],
      description: "A comfortable mid-range hotel overlooking the holy Ganges, providing a peaceful retreat in the heart of bustling Varanasi.",
      gallery: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Varanasi%2C_India%2C_Ghats%2C_Cremation_ceremony_in_progress.jpg/960px-Varanasi%2C_India%2C_Ghats%2C_Cremation_ceremony_in_progress.jpg",
        "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1542314831-c6a4d1409eae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: 8,
      name: "The Mussoorie Retreat",
      location: "Mussoorie, Uttarakhand",
      price: 6500,
      rating: 4.0,
      reviews: 430,
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Mussoorie_Snow_Over_Dehradun_%2814831297545%29.jpg/960px-Mussoorie_Snow_Over_Dehradun_%2814831297545%29.jpg",
      amenities: ["Free WiFi", "Restaurant", "Mountain View"],
      description: "A wonderful stay with panoramic views of the Doon Valley. Cozy rooms and excellent local cuisine.",
      gallery: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Mussoorie_Snow_Over_Dehradun_%2814831297545%29.jpg/960px-Mussoorie_Snow_Over_Dehradun_%2814831297545%29.jpg",
        "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: 9,
      name: "Backpacker's Haven",
      location: "Goa",
      price: 2500,
      rating: 3.0,
      reviews: 1540,
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/BeachFun.jpg/960px-BeachFun.jpg",
      amenities: ["Free WiFi", "Bar", "Pool"],
      description: "A lively and affordable hostel near Anjuna beach, perfect for solo travelers and budget backpackers.",
      gallery: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/BeachFun.jpg/960px-BeachFun.jpg",
        "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: 10,
      name: "Rishikesh Yoga Ashram",
      location: "Rishikesh, Uttarakhand",
      price: 1800,
      rating: 3.0,
      reviews: 820,
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Trayambakeshwar_Temple_VK.jpg/960px-Trayambakeshwar_Temple_VK.jpg",
      amenities: ["Yoga Classes", "Veg Meals", "Library"],
      description: "Find your inner peace in the yoga capital of the world. Budget-friendly accommodation with simple, clean rooms.",
      gallery: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Trayambakeshwar_Temple_VK.jpg/960px-Trayambakeshwar_Temple_VK.jpg",
        "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: 11,
      name: "Leela Palace",
      location: "New Delhi",
      price: 32000,
      rating: 5.0,
      reviews: 3100,
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Forecourt%2C_Rashtrapati_Bhavan_-_1.jpg/960px-Forecourt%2C_Rashtrapati_Bhavan_-_1.jpg",
      amenities: ["Free WiFi", "Infinity Pool", "Spa", "Dining"],
      description: "Experience the magnificent Leela Palace New Delhi. Stunning architecture and luxury right in the diplomatic enclave.",
      gallery: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Forecourt%2C_Rashtrapati_Bhavan_-_1.jpg/960px-Forecourt%2C_Rashtrapati_Bhavan_-_1.jpg",
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1584132967334-10e028b12204?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: 12,
      name: "Munnar Tea Estate Resort",
      location: "Munnar, Kerala",
      price: 12000,
      rating: 4.0,
      reviews: 1420,
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Munnar_Overview.jpg/960px-Munnar_Overview.jpg",
      amenities: ["Free WiFi", "Yoga", "Restaurant", "Tea Tour"],
      description: "Surrounded by lush green tea plantations, this resort offers a nature-filled luxurious escape with modern amenities.",
      gallery: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Munnar_Overview.jpg/960px-Munnar_Overview.jpg",
        "https://images.unsplash.com/photo-1593693397690-362cb9666cfb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1617154247071-af1edbe8999f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]
    }
  ];

  const filteredHotels = useMemo(() => {
    return HOTELS.filter(hotel => {
      // Search filter
      const matchesSearch = hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            hotel.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Price filter
      const matchesPrice = priceRanges.some(range => 
        range.checked && hotel.price >= range.min && hotel.price <= range.max
      );

      // Rating filter
      const matchesRating = starRatings.some(rating => 
        rating.checked && Math.floor(hotel.rating) === rating.rating
      );

      return matchesSearch && matchesPrice && matchesRating;
    });
  }, [searchQuery, priceRanges, starRatings]);

  return (
    <div className="pt-24 pb-20 w-full min-h-screen bg-slate-950">
      <SEO 
        title="Luxury Hotels & Resorts Booking in India | Safarnama"
        description="Discover and book the finest luxury hotels and resorts across India with Safarnama."
        keywords="hotels, luxury resorts, book hotels, india accommodations"
      />
      <div className="bg-slate-900 border border-t-0 border-slate-800 text-white rounded-b-[3rem] px-4 pt-4 pb-24 -mt-24 mb-16 relative shadow-2xl overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
            <img src="https://images.unsplash.com/photo-1542314831-c6a4d1409eae?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="Hotel pattern" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-slate-950/80"></div>
        </div>
        <div className="container mx-auto relative z-10 pt-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight drop-shadow-md">Book Luxury Hotels & Resorts in India</h1>
            <p className="text-lg md:text-xl text-slate-400 font-light">{t("findPerfectAcc", lang)}</p>
          </div>
          
          <div className="bg-slate-800/80 backdrop-blur-md p-2 rounded-2xl md:rounded-full shadow-lg border border-slate-700 flex flex-col md:flex-row max-w-4xl mx-auto">
            <div className="flex-1 flex items-center gap-3 px-4 py-3 border-b md:border-b-0 md:border-r border-slate-600 text-white">
              <MapPin className="text-orange-400 w-6 h-6" />
              <input 
                type="text" 
                placeholder={t("searchByCity", lang)} 
                className="w-full bg-transparent focus:outline-none font-bold text-lg placeholder-slate-400 text-white" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5"/>
                </button>
              )}
            </div>
            <button className="bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 text-white px-10 py-4 rounded-xl md:rounded-full font-bold text-lg transition-all mt-2 md:mt-0 flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30">
              <Search className="w-6 h-6" /> {t("search", lang)}
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6">

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-72 shrink-0 -mt-10 lg:mt-0 relative z-20">
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-2xl lg:sticky top-28">
              <div className="flex items-center gap-2 font-black text-slate-100 mb-6 text-xl border-b border-slate-800 pb-4">
                <Filter className="w-5 h-5 text-orange-500" /> {t("filter", lang)}
              </div>
              
              <div className="space-y-8">
                <div>
                  <h4 className="font-bold text-sm mb-4 uppercase tracking-wider text-slate-400">{t("priceRange", lang)}</h4>
                  <div className="space-y-3">
                    {priceRanges.map(range => (
                      <label key={range.id} className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          checked={range.checked}
                          onChange={() => togglePriceRange(range.id)}
                          className="accent-orange-500 w-5 h-5 rounded bg-slate-800 border-slate-700" 
                        />
                        <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">
                          {range.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-sm mb-4 uppercase tracking-wider text-slate-400">Star Rating</h4>
                  <div className="space-y-3">
                    {starRatings.map(star => (
                      <label key={star.rating} className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          checked={star.checked}
                          onChange={() => toggleStarRating(star.rating)}
                          className="accent-orange-500 w-5 h-5 rounded bg-slate-800 border-slate-700" 
                        />
                        <span className="flex items-center gap-1">
                          {Array.from({length: star.rating}).map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                          ))}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hotel List */}
          <div className="flex-1 space-y-6">
            {filteredHotels.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 p-12 rounded-3xl text-center flex flex-col items-center">
                <Search className="w-16 h-16 text-slate-700 mb-4" />
                <h2 className="text-2xl font-black text-white mb-2">No Hotels Found</h2>
                <p className="text-slate-400">Try adjusting your filters or search query.</p>
              </div>
            ) : (
              filteredHotels.map((hotel) => (
                <div key={hotel.id} className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 hover:shadow-2xl hover:border-orange-500/50 transition-all flex flex-col md:flex-row group">
                  <div className="w-full md:w-80 h-64 md:h-auto overflow-hidden">
                    <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" />
                  </div>
                  <div className="p-6 md:p-8 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-xl md:text-2xl font-bold text-slate-100">{hotel.name}</h2>
                      <div className="flex flex-col items-end shrink-0 ml-4">
                        <span className="bg-slate-800 border border-slate-700 text-amber-400 font-bold px-2 py-1 rounded-lg text-sm flex items-center gap-1">
                          {hotel.rating.toFixed(1)} <Star className="w-3 h-3 fill-amber-400" />
                        </span>
                        <span className="text-xs text-slate-500 mt-1">{hotel.reviews} reviews</span>
                      </div>
                    </div>
                    
                    <p className="text-rose-500 font-bold text-sm flex items-center gap-1 mb-6 uppercase tracking-wide">
                      <MapPin className="w-4 h-4 text-rose-500" /> {hotel.location}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {hotel.amenities.map(amenity => (
                        <span key={amenity} className="flex items-center gap-1 bg-slate-800 text-slate-300 text-xs font-semibold px-2.5 py-1 rounded-md border border-slate-700">
                          {amenity}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-end justify-between mt-auto">
                    <div>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">{t("perNight", lang)}</p>
                      <p className="text-3xl font-black text-orange-500">{formatPrice(hotel.price, currency)}</p>
                    </div>
                      <button 
                        onClick={() => setSelectedHotel(hotel)}
                        className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md active:scale-95 border border-slate-700 hover:border-slate-600"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* Hotel Detail Modal */}
      <AnimatePresence>
        {selectedHotel && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
            onClick={() => setSelectedHotel(null)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-slate-800 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden rounded-3xl shadow-2xl"
            >
              <div className="relative min-h-64 h-64 md:h-80 shrink-0">
                <img src={selectedHotel.image} alt={selectedHotel.name} className="w-full h-full object-cover" />
                <button 
                  onClick={() => setSelectedHotel(null)}
                  className="absolute top-4 right-4 bg-slate-900/80 p-2 rounded-full text-slate-200 hover:bg-slate-800 hover:text-white border border-slate-700 transition backdrop-blur-sm shadow-md"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6 md:p-10 overflow-y-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
                  <div>
                    <div className="flex items-center gap-2 text-rose-500 font-black mb-2 uppercase tracking-wide text-xs">
                      <MapPin className="w-4 h-4" /> {selectedHotel.location}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-100 mb-2">{selectedHotel.name}</h2>
                    <div className="flex items-center gap-3">
                      <span className="bg-slate-800 border border-slate-700 text-amber-400 font-bold px-2 py-1 rounded text-sm flex items-center gap-1">
                        {selectedHotel.rating.toFixed(1)} <Star className="w-3 h-3 fill-amber-400" />
                      </span>
                      <span className="text-slate-400 text-sm font-semibold">{selectedHotel.reviews} Verified Reviews</span>
                    </div>
                  </div>
                  <div className="text-left md:text-right w-full md:w-auto p-4 md:p-0 bg-slate-800 rounded-xl md:bg-transparent md:rounded-none border border-slate-700 md:border-none">
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">{t("perNight", lang)}</p>
                    <p className="text-3xl font-black text-orange-500 mb-3">{formatPrice(selectedHotel.price, currency)}</p>
                    <button 
                      onClick={handleBookingClick}
                      className="w-full md:w-auto bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 text-white px-8 py-3 rounded-xl font-black transition-all shadow-lg shadow-orange-500/20"
                    >
                      {t("bookNow", lang)}
                    </button>
                  </div>
                </div>

                <div className="mb-10 text-slate-300 leading-relaxed text-lg border-y border-slate-800 py-8">
                  {selectedHotel.description}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-xl font-black text-slate-100 mb-4">Gallery</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedHotel.gallery.map((img: string, i: number) => (
                        <div key={i} className="rounded-xl overflow-hidden h-32 shadow-sm border border-slate-800">
                          <img src={img} alt="Hotel view" className="w-full h-full object-cover hover:scale-110 transition duration-500" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-slate-100 mb-4">Amenities</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedHotel.amenities.map((amenity: string, i: number) => (
                        <span key={i} className="flex items-center gap-2 text-slate-300 bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-lg text-sm font-semibold shadow-sm">
                          {amenity}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-8 p-6 bg-slate-950 rounded-2xl border border-slate-800">
                      <h4 className="font-bold text-slate-100 mb-2 border-b border-slate-800 pb-2">Policy</h4>
                      <ul className="text-sm text-slate-400 space-y-2 mt-4 font-medium">
                        <li>• Check-in: 2:00 PM</li>
                        <li>• Check-out: 12:00 PM</li>
                        <li>• Free cancellation up to 48 hours</li>
                        <li>• Valid ID required upon arrival</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showBookingForm && selectedHotel && (
          <BookingForm 
            item={{...selectedHotel, type: "Hotel", title: selectedHotel.name, price: `${formatPrice(selectedHotel.price, currency)}/night`}} 
            onClose={() => setShowBookingForm(false)}
            onSuccess={() => {
              setShowBookingForm(false);
              setSelectedHotel(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
