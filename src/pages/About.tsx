import { Mail, MapPin, Phone, User, Award, Shield, HeartHandshake } from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { t } from "../lib/i18n";
import { SEO } from "../components/SEO";

export default function About() {
  const [lang, setLang] = useState(localStorage.getItem("userLanguage") || "en");

  useEffect(() => {
    const handlePrefs = () => setLang(localStorage.getItem("userLanguage") || "en");
    window.addEventListener("preferencesUpdated", handlePrefs);
    return () => window.removeEventListener("preferencesUpdated", handlePrefs);
  }, []);

  return (
    <div className="pt-24 pb-20 w-full min-h-screen bg-slate-950">
      <SEO 
        title="About Safarnama: Your Trusted Travel Partner in India"
        description="Learn about Safarnama, our mission, values, and the team dedicated to providing you the best travel experiences."
        keywords="about safarnama, travel company, travel agency india"
      />
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header content */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight flex flex-wrap items-center justify-center gap-3"
          >
            About Safarnama: Trusted India Travel Agency
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-400 leading-relaxed font-medium"
          >
            {t("aboutDesc", lang)}
          </motion.p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center p-8 bg-slate-900 rounded-3xl border border-slate-800 shadow-xl"
          >
            <div className="w-16 h-16 bg-slate-800 text-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Premium Quality Travel Bookings</h3>
            <p className="text-slate-400">{t("premiumDesc", lang)}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center p-8 bg-slate-900 rounded-3xl border border-slate-800 shadow-xl"
          >
            <div className="w-16 h-16 bg-slate-800 text-rose-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Secure Flight & Hotel Reservations</h3>
            <p className="text-slate-400">{t("secRelDesc", lang)}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center p-8 bg-slate-900 rounded-3xl border border-slate-800 shadow-xl"
          >
            <div className="w-16 h-16 bg-slate-800 text-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <HeartHandshake className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Personalized India Tour Packages</h3>
            <p className="text-slate-400">{t("perDesc", lang)}</p>
          </motion.div>
        </div>

        {/* Contact/Owner Section */}
        <div className="bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl relative max-w-5xl mx-auto border border-slate-800">
          {/* Abstract bg element */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-12 md:p-16 relative z-10">
              <h2 className="text-3xl font-black text-white mb-2">Get In Touch for Custom Packages</h2>
              <p className="text-slate-400 mb-10 text-lg">{t("speakDirectly", lang)}</p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center shadow-inner">
                    <User className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">{t("owner", lang)}</p>
                    <p className="text-xl font-bold text-white">Saksham Madhwal</p>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center shadow-inner">
                    <User className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">{t("manager", lang)}</p>
                    <p className="text-xl font-bold text-white">Sujal Kamboj</p>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-rose-600 shadow-lg shadow-orange-500/20 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">{t("directLine", lang)}</p>
                    <p className="text-2xl font-black text-white">+91 8396973313</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center shadow-inner">
                    <Mail className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">{t("email", lang)}</p>
                    <p className="text-lg font-bold text-white text-wrap break-all">contact@safarnama.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center shadow-inner">
                    <MapPin className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">{t("hq", lang)}</p>
                    <p className="text-lg font-bold text-white">Yamunanagar, Haryana</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="h-64 lg:h-auto bg-[url('https://images.unsplash.com/photo-1626014903710-8583fbcfb20b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center border-l-0 lg:border-l border-t lg:border-t-0 border-slate-800">
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
