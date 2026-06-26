import { Map, Clock, Calendar as CalIcon, Users, Check, X, Star } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import BookingForm from "../components/BookingForm";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";
import { formatPrice, parsePriceString } from "../lib/currency";
import { t } from "../lib/i18n";
import { SEO } from "../components/SEO";

export default function Tours() {
  const [selectedTour, setSelectedTour] = useState<any>(null);
  const [bookingStatus, setBookingStatus] = useState<"idle" | "loading" | "success">("idle");
  const [categoryFilter, setCategoryFilter] = useState("All");
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

  const PACKAGES = [
    {
      id: 1,
      category: "Domestic",
      title: "Golden Triangle Tour",
      location: "Delhi - Agra - Jaipur",
      days: 6,
      nights: 5,
      price: "₹18,500",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg/960px-East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg",
      includes: ["Hotels", "Breakfast", "Transfers", "Sightseeing", "Guide"],
      description: "Experience the rich history and vibrant culture of India with our Golden Triangle Tour. This journey takes you through the heart of the country, exploring the magnificent forts, palaces, and iconic monuments of Delhi, Agra, and Jaipur.",
      itinerary: [
        { day: 1, title: "Arrival in Delhi", desc: "Welcome to Delhi! Transfer to your hotel. Evening free for leisure." },
        { day: 2, title: "Delhi Sightseeing", desc: "Visit Red Fort, Jama Masjid, India Gate, and Qutub Minar." },
        { day: 3, title: "Delhi to Agra", desc: "Drive to Agra. Visit the iconic Taj Mahal and Agra Fort." },
        { day: 4, title: "Agra to Jaipur", desc: "Drive to Jaipur via Fatehpur Sikri. Evening at Chokhi Dhani." },
        { day: 5, title: "Jaipur Sightseeing", desc: "Explore Amber Fort, Hawa Mahal, and City Palace." },
        { day: 6, title: "Departure", desc: "Drive back to Delhi for your onward journey." }
      ],
      gallery: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg/960px-East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Taj_Mahal_%28Edited%29.jpeg/960px-Taj_Mahal_%28Edited%29.jpeg",
        "https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1599661046289-e31897846e41?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: 2,
      category: "Domestic",
      title: "Kashmir Paradise",
      location: "Srinagar - Gulmarg - Pahalgam",
      days: 7,
      nights: 6,
      price: "₹24,000",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Dal_Lake_Hazratbal_Srinagar.jpg/960px-Dal_Lake_Hazratbal_Srinagar.jpg",
      includes: ["Houseboat", "Hotels", "Meals", "Shikara Ride", "Cabs"],
      description: "Discover the breathtaking beauty of 'Heaven on Earth' with our Kashmir Paradise tour. Glide on pristine lakes, walk through blossoming gardens, and gaze at snow-capped peaks in an unforgettable journey.",
      itinerary: [
        { day: 1, title: "Arrival in Srinagar", desc: "Transfer to Dal Lake Houseboat. Shikara ride at sunset." },
        { day: 2, title: "Srinagar Local", desc: "Visit Mughal Gardens, Nishat Bagh, and Shalimar Bagh." },
        { day: 3, title: "Excursion to Sonamarg", desc: "Day trip to the 'Meadow of Gold'. Optional pony ride to Thajiwas Glacier." },
        { day: 4, title: "Srinagar to Pahalgam", desc: "Drive to Pahalgam. Day at leisure to explore the Betaab Valley." },
        { day: 5, title: "Pahalgam to Gulmarg", desc: "Drive to the gorgeous meadow of Gulmarg." },
        { day: 6, title: "Gulmarg Explorations", desc: "Experience the Gondola ride. Enjoy snowy peaks." },
        { day: 7, title: "Departure", desc: "Transfer to Srinagar airport." }
      ],
      gallery: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Dal_Lake_Hazratbal_Srinagar.jpg/960px-Dal_Lake_Hazratbal_Srinagar.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/0/07/Kashmir-sat-nasa.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Ancient_Temple%2C_Gulmarg.jpg/960px-Ancient_Temple%2C_Gulmarg.jpg",
        "https://images.unsplash.com/photo-1598091383021-15ddea10925d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: 7,
      category: "Domestic",
      title: "Goa Beach Bash",
      location: "North & South Goa",
      days: 5,
      nights: 4,
      price: "₹14,500",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/BeachFun.jpg/960px-BeachFun.jpg",
      includes: ["Resort", "Breakfast", "Scooter", "Cruise", "Airport Transfers"],
      description: "Enjoy the perfect blend of sun, sand, and nightlife in Goa. From the serene beaches of South Goa to the vibrant shacks of North Goa.",
      itinerary: [
        { day: 1, title: "Arrival in Goa", desc: "Check in to resort. Relax on Calangute beach." },
        { day: 2, title: "North Goa Tour", desc: "Visit Aguada Fort, Baga Beach, and Anjuna." },
        { day: 3, title: "South Goa Tour", desc: "Explore old Goa churches, Mangueshi Temple, and Colva Beach." },
        { day: 4, title: "Dudhsagar Excursion", desc: "Trip to Dudhsagar waterfalls and spice plantation." },
        { day: 5, title: "Departure", desc: "Transfer to Dabolim or Mopa airport." }
      ],
      gallery: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/BeachFun.jpg/960px-BeachFun.jpg",
        "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1560179406-1c6c60e0dc26?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: 8,
      category: "Domestic",
      title: "Uttarakhand Hills",
      location: "Nainital - Mussoorie",
      days: 6,
      nights: 5,
      price: "₹19,000",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Mussoorie_Snow_Over_Dehradun_%2814831297545%29.jpg/960px-Mussoorie_Snow_Over_Dehradun_%2814831297545%29.jpg",
      includes: ["Hotels", "Breakfast & Dinner", "Cabs", "Boating"],
      description: "A serene getaway to the beautiful hill stations of Uttarakhand. Enjoy the pristine lakes of Nainital and the majestic views of Mussoorie.",
      itinerary: [
        { day: 1, title: "Delhi to Nainital", desc: "Drive to Nainital. Check-in and evening boat ride in Naini Lake." },
        { day: 2, title: "Nainital Sightseeing", desc: "Visit Naina Devi Temple, Snow View Point, and Mall Road." },
        { day: 3, title: "Nainital to Corbett", desc: "Drive to Jim Corbett. Afternoon Jungle Safari." },
        { day: 4, title: "Corbett to Mussoorie", desc: "Morning drive to the 'Queen of Hills', Mussoorie." },
        { day: 5, title: "Mussoorie Tour", desc: "Visit Kempty Falls, Gun Hill, and Camel's Back Road." },
        { day: 6, title: "Departure", desc: "Drive back to Delhi." }
      ],
      gallery: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Mussoorie_Snow_Over_Dehradun_%2814831297545%29.jpg/960px-Mussoorie_Snow_Over_Dehradun_%2814831297545%29.jpg",
        "https://images.unsplash.com/photo-1585644783305-64903ecec43c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Bengal-Tiger_Corbett_Uttarakhand_Dec-2013.jpg/960px-Bengal-Tiger_Corbett_Uttarakhand_Dec-2013.jpg",
        "https://images.unsplash.com/photo-1605649487212-4dcfd812f18f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: 9,
      category: "Domestic",
      title: "Kerala Backwaters",
      location: "Munnar - Thekkady - Alleppey",
      days: 6,
      nights: 5,
      price: "₹22,500",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/House_Boat_DSW.jpg/960px-House_Boat_DSW.jpg",
      includes: ["Houseboat Stay", "Hotels", "Meals", "Transfers", "Spice Tour"],
      description: "Experience God's Own Country. From the lush tea gardens of Munnar to a relaxing houseboat cruise in the Alleppey backwaters.",
      itinerary: [
        { day: 1, title: "Arrival in Kochi to Munnar", desc: "Drive to Munnar. View Cheeyappara waterfalls." },
        { day: 2, title: "Munnar Sightseeing", desc: "Visit Eravikulam National Park and Mattupetty Dam." },
        { day: 3, title: "Munnar to Thekkady", desc: "Drive to Thekkady. Enjoy a spice plantation tour." },
        { day: 4, title: "Thekkady to Alleppey", desc: "Transfer to Alleppey. Check-in to traditional Houseboat." },
        { day: 5, title: "Alleppey to Kochi", desc: "Check out and drive to Kochi for local sightseeing." },
        { day: 6, title: "Departure", desc: "Drop off at Kochi Airport." }
      ],
      gallery: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/House_Boat_DSW.jpg/960px-House_Boat_DSW.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Munnar_Overview.jpg/960px-Munnar_Overview.jpg",
        "https://images.unsplash.com/photo-1599839619722-39751411ea63?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1617154247071-af1edbe8999f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: 10,
      category: "Domestic",
      title: "Andaman Adventures",
      location: "Port Blair - Havelock",
      days: 6,
      nights: 5,
      price: "₹32,000",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Havelock%2C_Andaman_%26_Nicobar_Islands.JPG/960px-Havelock%2C_Andaman_%26_Nicobar_Islands.JPG",
      includes: ["Ferry Rides", "Hotels", "Scuba Diving", "Transfers"],
      description: "Explore the exotic Andaman Islands with stunning beaches, rich history, and vibrant marine life.",
      itinerary: [
        { day: 1, title: "Arrival in Port Blair", desc: "Cellular Jail visit and Light & Sound show." },
        { day: 2, title: "Port Blair to Havelock", desc: "Ferry to Havelock. Evening at Radhanagar Beach." },
        { day: 3, title: "Elephant Beach Scuba", desc: "Water sports and Scuba Diving at Elephant Beach." },
        { day: 4, title: "Havelock to Neil Island", desc: "Ferry to Neil Island. Visit Bharatpur and Laxmanpur beaches." },
        { day: 5, title: "Return to Port Blair", desc: "Morning ferry back to Port Blair. Shopping." },
        { day: 6, title: "Departure", desc: "Head to airport for onward journey." }
      ],
      gallery: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Havelock%2C_Andaman_%26_Nicobar_Islands.JPG/960px-Havelock%2C_Andaman_%26_Nicobar_Islands.JPG",
        "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1590740922880-97eb38fc17f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: 3,
      category: "International",
      title: "Magical Maldives",
      location: "Male Atoll",
      days: 4,
      nights: 3,
      price: "₹65,000",
      image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      includes: ["Water Villa", "All Meals", "Speedboat", "Flights", "Visa"],
      description: "Escape to the ultimate tropical paradise. Stay in overwater luxury villas, snorkel in crystal-clear waters, and enjoy spectacular sunsets on pristine white sand beaches.",
      itinerary: [
        { day: 1, title: "Arrival in Male", desc: "Speedboat transfer to your luxury resort. Check-in and relax." },
        { day: 2, title: "Water Sports & Leisure", desc: "Enjoy snorkeling or scuba diving. Evening beach dinner." },
        { day: 3, title: "Spa & Sunset Cruise", desc: "Indulge in a premium spa treatment followed by a sunset dolphin cruise." },
        { day: 4, title: "Departure", desc: "Speedboat transfer back to the airport." }
      ],
      gallery: [
        "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1512453979436-5a50ce0225db?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1551918120-9739cb430c6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: 4,
      category: "International",
      title: "Dubai Desert Safari",
      location: "Dubai",
      days: 5,
      nights: 4,
      price: "₹45,000",
      image: "https://images.unsplash.com/photo-1582672060624-cb814c737f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      includes: ["4-Star Hotel", "Safari", "Dhow Cruise", "City Tour"],
      description: "Experience the glittering skyline and golden dunes of Dubai. A perfect blend of extreme luxury, futuristic architecture, and traditional Arabian culture.",
      itinerary: [
        { day: 1, title: "Arrival & Dhow Cruise", desc: "Transfer to hotel. Evening Dhow Cruise with dinner on the Marina." },
        { day: 2, title: "City Tour & Burj Khalifa", desc: "Half-day city tour. Evening visit to the dizzying heights of the Burj Khalifa." },
        { day: 3, title: "Desert Safari", desc: "Afternoon dune bashing, camel riding, and a BBQ dinner under stars." },
        { day: 4, title: "Abu Dhabi Excursion", desc: "Day trip to Abu Dhabi including the Sheikh Zayed Grand Mosque." },
        { day: 5, title: "Departure", desc: "Drop-off at the airport with wonderful memories." }
      ],
      gallery: [
        "https://images.unsplash.com/photo-1582672060624-cb814c737f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1512453979436-5a50ce0225db?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1546412414-8035e1776c9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1528702748617-c64d49f918af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: 5,
      category: "International",
      title: "Bali Bliss",
      location: "Bali, Indonesia",
      days: 6,
      nights: 5,
      price: "₹55,000",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      includes: ["Resort Stay", "Breakfast", "Ubud Tour", "Transfers"],
      description: "Discover the Island of Gods. A magical blend of beautiful beaches, terraced rice fields, ancient temples, and vibrant culture.",
      itinerary: [
        { day: 1, title: "Arrival in Bali", desc: "Check in to resort. Relax on the beaches of Kuta/Seminyak." },
        { day: 2, title: "Ubud Cultural Tour", desc: "Visit Monkey Forest, Art Market, and Royal Palace." },
        { day: 3, title: "Uluwatu Temple & Sunset", desc: "Explore the clifftop temple and watch the traditional Kecak fire dance." },
        { day: 4, title: "Mount Batur Trip", desc: "Optional sunrise trek or rice terrace visit in Tegalalang." },
        { day: 5, title: "Leisure Day", desc: "Shopping, spa therapies or explore local beach clubs." },
        { day: 6, title: "Departure", desc: "Transfer to Denpasar Airport." }
      ],
      gallery: [
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1555400038-63f5ba517a47?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: 6,
      category: "International",
      title: "Alpine Switzerland",
      location: "Zurich - Lucerne - Interlaken",
      days: 8,
      nights: 7,
      price: "₹1,45,000",
      image: "https://images.unsplash.com/photo-1527668752968-14ce70a4929c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      includes: ["Swiss Travel Pass", "Hotels", "Mt Titlis", "Breakfast"],
      description: "Experience the mesmerizing Swiss Alps. Ride scenic trains, visit crystal clear lakes, and step onto the highest mountains of Europe.",
      itinerary: [
        { day: 1, title: "Arrival in Zurich", desc: "Welcome to Switzerland! Transfer to your hotel." },
        { day: 2, title: "Lucerne Explore", desc: "Train to Lucerne. Walk cross the Chapel Bridge." },
        { day: 3, title: "Mount Titlis", desc: "Excursion to Mount Titlis with ice flyer and snow park." },
        { day: 4, title: "Interlaken Journey", desc: "Scenic GoldenPass line to Interlaken." },
        { day: 5, title: "Jungfraujoch", desc: "Top of Europe! Visit Jungfraujoch ice palace. (Optional)" },
        { day: 6, title: "Geneva City", desc: "Train to Geneva. See the Jet d'Eau and UN building." },
        { day: 7, title: "Zurich City Tour", desc: "Return to Zurich for shopping and sightseeing." },
        { day: 8, title: "Departure", desc: "Board flight home with Alpine memories." }
      ],
      gallery: [
        "https://images.unsplash.com/photo-1527668752968-14ce70a4929c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1555307338-701a5d2ebdec?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1469522851410-b9968a983b68?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]
    }
  ];

  const filteredPackages = categoryFilter === "All" 
    ? PACKAGES 
    : PACKAGES.filter(p => p.category === categoryFilter);

  const [showBookingForm, setShowBookingForm] = useState(false);

  const handleBookingClick = () => {
    if (!localStorage.getItem("isAuthenticated")) {
      navigate("/auth");
      return;
    }
    setShowBookingForm(true);
  };

  return (
    <div className="pt-24 pb-20 w-full min-h-screen bg-slate-950">
      <SEO 
        title="Explore India & International Tour Packages | Safarnama"
        description="Explore curated domestic and international tour packages. From weekend getaways to week-long adventures."
        keywords="tour packages, holiday packages, travel itinerary, domestic tours, international trips"
      />
      <div className="bg-slate-900 border border-t-0 border-slate-800 text-white rounded-b-[3rem] px-4 pt-4 pb-20 -mt-24 mb-16 relative shadow-2xl overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
            <img src="https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="Taj Mahal pattern" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-slate-950/80"></div>
        </div>
        <div className="container mx-auto relative z-10 pt-20">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight drop-shadow-md">Explore India & International Tour Packages</h1>
            <p className="text-lg md:text-xl text-slate-400 font-light">{t("descHandcrafted", lang)}</p>
          </div>

          {/* Categories */}
          <div className="flex justify-center gap-3 flex-wrap">
            <button 
              onClick={() => setCategoryFilter("All")}
              className={cn("px-8 py-3 rounded-full font-bold transition-all", categoryFilter === "All" ? "bg-gradient-to-r from-orange-500 to-rose-600 shadow-lg shadow-orange-500/30 text-white hover:scale-105" : "bg-slate-800/80 border border-slate-700 hover:bg-slate-700 text-slate-300 backdrop-blur-md")}
            >
              {t("allPackages", lang)}
            </button>
            <button 
              onClick={() => setCategoryFilter("Domestic")}
              className={cn("px-8 py-3 rounded-full font-bold transition-all", categoryFilter === "Domestic" ? "bg-gradient-to-r from-orange-500 to-rose-600 shadow-lg shadow-orange-500/30 text-white hover:scale-105" : "bg-slate-800/80 border border-slate-700 hover:bg-slate-700 text-slate-300 backdrop-blur-md")}
            >
              {t("domestic", lang)}
            </button>
            <button 
              onClick={() => setCategoryFilter("International")}
              className={cn("px-8 py-3 rounded-full font-bold transition-all", categoryFilter === "International" ? "bg-gradient-to-r from-orange-500 to-rose-600 shadow-lg shadow-orange-500/30 text-white hover:scale-105" : "bg-slate-800/80 border border-slate-700 hover:bg-slate-700 text-slate-300 backdrop-blur-md")}
            >
              {t("intlTrips", lang)}
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        
        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto -mt-24 relative z-20">
          {filteredPackages.map((pkg) => (
            <div key={pkg.id} className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 hover:shadow-2xl hover:border-orange-500/50 transition-all duration-300 group flex flex-col">
              <div className="relative h-56 overflow-hidden">
                <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100" />
                <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl font-bold text-slate-200 border border-white/10 shadow-sm text-sm">
                  {pkg.days} Days / {pkg.nights} Nights
                </div>
                <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1.5 rounded-xl font-bold text-xs shadow-sm uppercase tracking-wider">
                  {pkg.category}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-rose-500 text-xs font-black mb-2 uppercase tracking-wider">
                  <Map className="w-4 h-4" /> {pkg.location}
                </div>
                <h2 className="text-xl font-black text-slate-100 mb-3 line-clamp-1">{pkg.title}</h2>
                
                <div className="flex flex-wrap gap-2 mb-6 border-y border-slate-800 py-3 mt-auto">
                  {pkg.includes.slice(0,3).map((inc: string) => (
                    <span key={inc} className="flex items-center gap-1 text-xs font-semibold text-slate-400 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
                      <Check className="w-3.5 h-3.5 text-emerald-500" /> {inc}
                    </span>
                  ))}
                  {pkg.includes.length > 3 && (
                    <span className="flex items-center gap-1 text-xs font-semibold text-slate-500 px-2 py-1">
                      +{pkg.includes.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex items-end justify-between mt-auto">
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">{t("startingFrom", lang)}</p>
                    <p className="text-2xl font-black text-orange-500">{formatPrice(parsePriceString(pkg.price), currency)}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedTour(pkg)}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-100 px-5 py-2.5 rounded-xl font-bold transition-all shadow-md active:scale-95 text-sm border border-slate-700 hover:border-slate-600"
                  >
                    {t("viewDetails", lang)}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Tour Detail Modal */}
      <AnimatePresence>
        {selectedTour && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
            onClick={() => setSelectedTour(null)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-slate-800 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden rounded-3xl shadow-2xl"
            >
              <div className="relative min-h-64 h-64 md:h-80 shrink-0">
                <img src={selectedTour.image} alt={selectedTour.title} className="w-full h-full object-cover" />
                <button 
                  onClick={() => setSelectedTour(null)}
                  className="absolute top-4 right-4 bg-slate-900/80 p-2 rounded-full text-slate-200 hover:bg-slate-800 hover:text-white border border-slate-700 transition backdrop-blur-sm shadow-md"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6 md:p-10 overflow-y-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
                  <div>
                    <div className="flex items-center gap-2 text-rose-500 font-black mb-2 uppercase tracking-wide text-xs">
                      <Map className="w-4 h-4" /> {selectedTour.location}
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-100 mb-2">{selectedTour.title}</h2>
                    <p className="text-slate-300 font-bold bg-slate-800 border border-slate-700 inline-block px-3 py-1 rounded-lg text-sm">{selectedTour.days} Days / {selectedTour.nights} Nights</p>
                  </div>
                  <div className="text-left md:text-right w-full md:w-auto p-4 md:p-0 bg-slate-800 rounded-xl md:bg-transparent md:rounded-none border border-slate-700 md:border-none">
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">{t("priceFrom", lang)}</p>
                    <p className="text-3xl font-black text-orange-500 mb-3">{formatPrice(parsePriceString(selectedTour.price), currency)}</p>
                    <button 
                      onClick={handleBookingClick}
                      className="w-full md:w-auto bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 text-white px-8 py-3 rounded-xl font-black transition-all shadow-lg shadow-orange-500/20"
                    >
                      {t("bookNow", lang)}
                    </button>
                  </div>
                </div>

                <div className="mb-10 text-slate-300 leading-relaxed text-lg border-y border-slate-800 py-8">
                  {selectedTour.description}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-xl font-black text-slate-100 mb-6 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-orange-500" />
                      Trip Itinerary
                    </h3>
                    <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-800 before:to-transparent">
                      {selectedTour.itinerary.map((item: any, idx: number) => (
                        <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-slate-900 bg-slate-800 text-slate-300 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-bold">
                            {item.day}
                          </div>
                          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-800 bg-slate-950 shadow-sm text-left hover:border-orange-500/50 transition-colors">
                            <div className="font-bold text-slate-200 mb-1">{item.title}</div>
                            <div className="text-slate-400 text-sm">{item.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-slate-100 mb-6 flex items-center gap-2">
                      <Star className="w-5 h-5 text-rose-500" />
                      Trip Gallery
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedTour.gallery.map((img: string, i: number) => (
                        <div key={i} className="rounded-xl overflow-hidden h-32 md:h-40 shadow-sm border border-slate-800">
                          <img src={img} alt="Gallery" className="w-full h-full object-cover hover:scale-110 transition duration-500" />
                        </div>
                      ))}
                    </div>
                    
                    <h3 className="text-xl font-black text-slate-100 mt-10 mb-4">
                      What's Included
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedTour.includes.map((inc: string, i: number) => (
                        <li key={i} className="flex items-center gap-2 text-slate-300 bg-slate-800/50 border border-slate-800 p-3 rounded-xl shadow-sm text-sm font-semibold">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0" /> {inc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showBookingForm && selectedTour && (
          <BookingForm 
            item={{...selectedTour, type: "Tour", title: selectedTour.title, price: formatPrice(parsePriceString(selectedTour.price), currency)}} 
            onClose={() => setShowBookingForm(false)}
            onSuccess={() => {
              setShowBookingForm(false);
              setSelectedTour(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
