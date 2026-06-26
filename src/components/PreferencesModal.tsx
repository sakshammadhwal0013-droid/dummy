import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Globe, DollarSign, Check, X } from "lucide-react";
import { t } from "../lib/i18n";

export const LANGUAGES = [
  { code: "en", name: "English", native: "English" },
  { code: "hi", name: "Hindi", native: "हिन्दी" },
  { code: "es", name: "Spanish", native: "Español" },
  { code: "fr", name: "French", native: "Français" },
  { code: "de", name: "German", native: "Deutsch" },
  { code: "zh", name: "Chinese", native: "中文" },
  { code: "ja", name: "Japanese", native: "日本語" },
  { code: "ar", name: "Arabic", native: "العربية" },
];

export const CURRENCIES_LIST = [
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "AED", name: "Emirati Dirham", symbol: "د.إ" },
];

export default function PreferencesModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [canClose, setCanClose] = useState(false);
  const [activeTab, setActiveTab] = useState<"both" | "language" | "currency">("both");
  const [language, setLanguage] = useState("en");
  const [currency, setCurrency] = useState("INR");

  useEffect(() => {
    const prefsSet = localStorage.getItem("prefsSet");
    const storedLang = localStorage.getItem("userLanguage");
    const storedCurr = localStorage.getItem("userCurrency");

    if (storedLang) setLanguage(storedLang);
    if (storedCurr) setCurrency(storedCurr);

    if (!prefsSet) {
      setIsOpen(true);
      setCanClose(false); 
      setActiveTab("both");
    }
  }, []);

  useEffect(() => {
    const handleOpenLanguage = () => {
      setIsOpen(true);
      setCanClose(true);
      setActiveTab("language");
      const storedLang = localStorage.getItem("userLanguage");
      if (storedLang) setLanguage(storedLang);
    };

    const handleOpenCurrency = () => {
      setIsOpen(true);
      setCanClose(true);
      setActiveTab("currency");
      const storedCurr = localStorage.getItem("userCurrency");
      if (storedCurr) setCurrency(storedCurr);
    };
    
    window.addEventListener("openLanguagePreferences", handleOpenLanguage);
    window.addEventListener("openCurrencyPreferences", handleOpenCurrency);
    
    return () => {
      window.removeEventListener("openLanguagePreferences", handleOpenLanguage);
      window.removeEventListener("openCurrencyPreferences", handleOpenCurrency);
    };
  }, []);

  const handleSave = () => {
    if (activeTab === "both" || activeTab === "language") localStorage.setItem("userLanguage", language);
    if (activeTab === "both" || activeTab === "currency") localStorage.setItem("userCurrency", currency);
    localStorage.setItem("prefsSet", "true");
    setIsOpen(false);
    
    window.dispatchEvent(new Event("preferencesUpdated"));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-[2rem] shadow-2xl flex flex-col relative overflow-hidden"
          >
            {canClose && (
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 bg-slate-800/80 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-700 transition z-10"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            <div className="p-8 pb-6 border-b border-slate-800 bg-slate-950/50">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
                {activeTab === 'both' ? t("welcome", language) : activeTab === 'language' ? 'Select Language' : 'Select Currency'}
              </h2>
              <p className="text-slate-400 font-medium">
                {activeTab === 'both' ? 'Please select your preferred language and currency to personalize your experience.' : 'Choose your preference to apply across the app.'}
              </p>
            </div>

            <div className="p-8 overflow-y-auto max-h-[60vh] space-y-8">
              {(activeTab === "both" || activeTab === "language") && (
                <div>
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Globe className="text-orange-500 w-5 h-5" />
                    Select Language
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {LANGUAGES.map(lang => (
                      <button
                        key={lang.code}
                        onClick={() => setLanguage(lang.code)}
                        className={`p-3 rounded-xl border text-left transition relative ${language === lang.code ? 'bg-orange-500/10 border-orange-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'}`}
                      >
                        <span className="block font-bold">{lang.native}</span>
                        <span className="block text-xs mt-1 opacity-70">{lang.name}</span>
                        {language === lang.code && (
                          <Check className="absolute top-3 right-3 w-4 h-4 text-orange-500" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {(activeTab === "both" || activeTab === "currency") && (
                <div>
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <DollarSign className="text-emerald-500 w-5 h-5" />
                    Select Currency
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {CURRENCIES_LIST.map(curr => (
                      <button
                        key={curr.code}
                        onClick={() => setCurrency(curr.code)}
                        className={`p-3 rounded-xl border transition relative flex items-center justify-between ${currency === curr.code ? 'bg-emerald-500/10 border-emerald-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'}`}
                      >
                        <div>
                          <span className="block font-bold text-xl">{curr.symbol}</span>
                          <span className="block text-xs mt-1 font-medium">{curr.code}</span>
                        </div>
                        <span className="text-[10px] uppercase tracking-wider text-right max-w-[50px] leading-tight opacity-70">{curr.name}</span>
                        {currency === curr.code && (
                          <Check className="absolute top-2 right-2 w-4 h-4 text-emerald-500" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 md:p-8 pt-4 border-t border-slate-800 bg-slate-950">
              <button
                onClick={handleSave}
                className="w-full bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 text-white font-black py-4 rounded-xl transition-all shadow-lg shadow-orange-500/20 text-lg"
              >
                {activeTab === 'both' ? 'Continue to Safarnama' : 'Save Preferences'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
