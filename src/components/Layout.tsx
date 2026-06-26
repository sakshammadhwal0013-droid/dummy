import { Link, Outlet, useLocation } from "react-router-dom";
import { Plane, Menu, X, User, Phone, Mail, BookOpen, Settings, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "../lib/utils";
import PreferencesModal from "./PreferencesModal";
import { t } from "../lib/i18n";

export default function Layout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [lang, setLang] = useState(localStorage.getItem("userLanguage") || "en");
  const [curr, setCurr] = useState(localStorage.getItem("userCurrency") || "INR");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handlePrefsUpdated = () => {
      setLang(localStorage.getItem("userLanguage") || "en");
      setCurr(localStorage.getItem("userCurrency") || "INR");
    };
    window.addEventListener("preferencesUpdated", handlePrefsUpdated);
    return () => window.removeEventListener("preferencesUpdated", handlePrefsUpdated);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  const handleSignOut = () => {
    localStorage.removeItem("isAuthenticated");
    window.location.href = "/";
  };

  const navLinks = [
    { name: t("home", lang), path: "/" },
    { name: t("hotels", lang), path: "/hotels" },
    { name: t("tours", lang), path: "/tours" },
    { name: t("transport", lang), path: "/transport" },
    { name: t("about", lang), path: "/about" },
  ];

  return (
    <div className={cn("flex flex-col min-h-screen bg-slate-950 text-slate-100", lang === "hi" ? "font-hindi" : "font-sans")}>
      {/* Navigation */}
      <header
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300",
          isScrolled
            ? "bg-slate-950/90 shadow-lg border-b border-slate-800 backdrop-blur-md py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-gradient-to-br from-orange-500 to-rose-600 p-2 rounded-xl text-white shadow-lg shadow-orange-500/20 transition-transform group-hover:scale-105">
                <Plane className="w-6 h-6" />
              </div>
              <span className={cn("text-2xl font-hindi tracking-wide font-black", isScrolled ? "text-white" : "text-white drop-shadow-md")}>
                सफ़रनामा
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    "font-bold transition-colors hover:text-orange-400 uppercase text-sm tracking-wider",
                    location.pathname === link.path ? "text-orange-500 border-b-2 border-orange-500" : "text-slate-300 border-b-2 border-transparent"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex items-center gap-4 border-l border-slate-800 pl-4">
                <button
                  onClick={() => window.dispatchEvent(new Event("openLanguagePreferences"))}
                  className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-wider"
                >
                  <Globe className="w-4 h-4" />
                  <span>{lang.toUpperCase()}</span>
                </button>
                <button
                  onClick={() => window.dispatchEvent(new Event("openCurrencyPreferences"))}
                  className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-wider pr-4 border-r border-slate-800"
                >
                  <span>{curr.toUpperCase()}</span>
                </button>
                
                {isAuthenticated ? (
                  <div className="flex items-center gap-4">
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 text-white hover:text-orange-400 font-bold transition-colors"
                    >
                      <User className="w-4 h-4" />
                      <span>{t("profile", lang)}</span>
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white px-4 py-2 rounded-full font-bold transition-all shadow-lg"
                    >
                      <span>{t("signOut", lang)}</span>
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/auth"
                    className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white px-5 py-2.5 rounded-full font-bold transition-all shadow-lg hover:shadow-xl"
                  >
                    <User className="w-4 h-4" />
                    <span>{t("signIn", lang)}</span>
                  </Link>
                )}
              </div>
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-white bg-slate-800 rounded-lg shadow-sm border border-slate-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 shadow-xl border-t border-slate-800 py-4 px-4 flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "p-3 rounded-xl font-bold transition-colors",
                  location.pathname === link.path ? "bg-slate-800 text-orange-400" : "text-white hover:bg-slate-800"
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex gap-4 px-3 py-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.dispatchEvent(new Event("openLanguagePreferences"));
                }}
                className="flex flex-1 items-center justify-center gap-2 p-3 rounded-xl font-bold transition-colors text-white bg-slate-800 hover:bg-slate-700"
              >
                <Globe className="w-5 h-5" />
                {lang.toUpperCase()}
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.dispatchEvent(new Event("openCurrencyPreferences"));
                }}
                className="flex flex-1 items-center justify-center gap-2 p-3 rounded-xl font-bold transition-colors text-white bg-slate-800 hover:bg-slate-700"
              >
                {curr.toUpperCase()}
              </button>
            </div>
            <hr className="border-slate-800" />
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="flex justify-center items-center gap-2 bg-slate-800 text-white p-3 rounded-xl font-bold hover:bg-slate-700 transition-colors"
                >
                  <User className="w-5 h-5" />
                  {t("profile", lang)}
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex justify-center items-center gap-2 border border-slate-700 text-slate-300 p-3 rounded-xl font-bold"
                >
                  {t("signOut", lang)}
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="flex justify-center items-center gap-2 bg-orange-500 text-white p-3 rounded-xl font-bold"
              >
                <User className="w-5 h-5" />
                {t("signIn", lang)}
              </Link>
            )}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Preferences Modal */}
      <PreferencesModal />

      {/* Footer */}
      <footer className="bg-slate-950 text-white pt-16 pb-8 border-t border-slate-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-orange-500/10 p-2 rounded-xl text-orange-500">
                  <BookOpen className="w-6 h-6" />
                </div>
                <span className="text-2xl font-hindi tracking-wide font-bold text-white">
                  सफ़रनामा
                </span>
              </div>
              <p className="text-slate-400 leading-relaxed mb-6 max-w-sm">
                {t("everyJourney", lang)}
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-wider">{t("explore", lang)}</h4>
              <ul className="space-y-3 text-slate-400 font-medium">
                <li><Link to="/tours" className="hover:text-orange-400 transition-colors">{t("domestic", lang)}</Link></li>
                <li><Link to="/tours" className="hover:text-orange-400 transition-colors">{t("intlTrips", lang)}</Link></li>
                <li><Link to="/hotels" className="hover:text-orange-400 transition-colors">{t("luxuryHotels", lang)}</Link></li>
                <li><Link to="/transport" className="hover:text-orange-400 transition-colors">{t("flights", lang)} & {t("cabs", lang)}</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-3 text-slate-400 font-medium">
                <li><Link to="/about" className="hover:text-orange-400 transition-colors">{t("about", lang)}</Link></li>
                <li><Link to="/profile" className="hover:text-orange-400 transition-colors">{t("profile", lang)}</Link></li>
                <li><Link to="/auth" className="hover:text-orange-400 transition-colors">{t("signIn", lang)} / Register</Link></li>
                <li><Link to="/admin" className="hover:text-orange-400 transition-colors">Admin Dashboard</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-wider">{t("contactUs", lang)}</h4>
              <ul className="space-y-4 text-slate-400 font-medium">
                <li className="flex items-start gap-3">
                  <User className="w-5 h-5 text-orange-500 shrink-0" />
                  <span>{t("managedBy", lang)} Saksham Madhwal</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-orange-500 shrink-0" />
                  <span>+91 8396973313</span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-orange-500 shrink-0" />
                  <span>contact@safarnama.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-900 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between text-slate-500 text-sm font-medium">
            <p>&copy; {new Date().getFullYear()} <span className="font-hindi text-base">सफ़रनामा</span>. {t("allRights", lang)}</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link to="/admin" className="hover:text-orange-400 transition-colors">Admin Panel</Link>
              <a href="#" className="hover:text-white transition-colors">{t("privacy", lang)}</a>
              <a href="#" className="hover:text-white transition-colors">{t("terms", lang)}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
