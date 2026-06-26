import { useState, ChangeEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Check, CreditCard, ChevronRight, Map, Banknote, Smartphone } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BookingFormProps {
  item: {
    title: string;
    price: string;
    image: string;
    type: "Tour" | "Hotel";
    days?: number;
    nights?: number;
    gallery?: string[];
  };
  onClose: () => void;
  onSuccess: () => void;
}

export default function BookingForm({ item, onClose, onSuccess }: BookingFormProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    guests: "2",
    requests: "",
    paymentMethod: "card"
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (step < 3) setStep((s) => (s + 1) as 1 | 2 | 3);
  };

  const prevStep = () => {
    if (step > 1) setStep((s) => (s - 1) as 1 | 2 | 3);
  };

  const handleBook = () => {
    setIsProcessing(true);
    setTimeout(() => {
      // Save to local storage
      const existingBookings = JSON.parse(localStorage.getItem("userBookings") || "[]");
      const newBooking = {
        title: item.title,
        type: item.type === "Tour" ? "Tour Package" : "Hotel Stay",
        duration: item.type === "Tour" ? `${item.days} Days / ${item.nights} Nights` : "1 Night",
        price: item.price,
        image: item.image,
        dates: formData.date || "Flexible/TBD",
        guests: formData.guests
      };
      localStorage.setItem("userBookings", JSON.stringify([...existingBookings, newBooking]));
      
      setIsProcessing(false);
      onSuccess();
    }, 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900 border border-slate-700 w-full max-w-5xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden rounded-[2rem] shadow-2xl"
      >
        {/* Left Side: Summary & Gallery */}
        <div className="w-full md:w-1/3 bg-slate-950 p-6 md:p-8 flex flex-col border-b md:border-b-0 md:border-r border-slate-800 overflow-y-auto">
          <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
            <Check className="text-orange-500 w-5 h-5" />
            Booking Summary
          </h3>
          <div className="rounded-2xl overflow-hidden mb-6 border border-slate-800 shadow-lg">
            <img src={item.image} alt={item.title} className="w-full h-40 object-cover" />
          </div>
          <h2 className="text-2xl font-black text-white mb-2">{item.title}</h2>
          {item.type === "Tour" && (
            <p className="text-slate-400 font-bold mb-6">{item.days} Days / {item.nights} Nights</p>
          )}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-6">
            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Total Amount</p>
            <p className="text-3xl font-black text-orange-500">{item.price}</p>
          </div>
          
          {item.gallery && item.gallery.length > 0 && (
            <div className="mt-auto pt-6 border-t border-slate-800">
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-3">More Views</p>
              <div className="grid grid-cols-2 gap-2">
                {item.gallery.slice(0, 4).map((img, idx) => (
                  <div key={idx} className="h-16 rounded-lg overflow-hidden border border-slate-800">
                    <img src={img} alt="Gallery" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Form Steps */}
        <div className="w-full md:w-2/3 flex flex-col bg-slate-900 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-slate-800/80 p-2 rounded-full text-slate-300 hover:bg-slate-700 hover:text-white transition z-10"
          >
            <X className="w-5 h-5" />
          </button>
          
          {/* Stepper Header */}
          <div className="p-6 md:p-8 pb-0 flex items-center justify-between border-b border-slate-800">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex flex-col items-center flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mb-2 transition-colors ${step >= s ? "bg-orange-500 text-white" : "bg-slate-800 text-slate-400"}`}>
                  {s < step ? <Check className="w-4 h-4" /> : s}
                </div>
                <div className={`text-xs font-bold uppercase tracking-wider hidden sm:block ${step >= s ? "text-slate-200" : "text-slate-500"}`}>
                  {s === 1 ? "Details" : s === 2 ? "Review" : "Payment"}
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 md:p-8 overflow-y-auto flex-1">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-black text-white mb-6">Traveler Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-400 mb-2">Full Name</label>
                      <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition font-medium" placeholder="Enter your full name" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-400 mb-2">Email Address</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition font-medium" placeholder="your@email.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-400 mb-2">Phone Number</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition font-medium" placeholder="+91 XXXXX XXXXX" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-400 mb-2">Number of Guests</label>
                      <select name="guests" value={formData.guests} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition font-medium appearance-none">
                        {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n} {n===1?'Guest':'Guests'}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-400 mb-2">Travel Date</label>
                      <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition font-medium" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-400 mb-2">Special Requests (Optional)</label>
                    <textarea name="requests" value={formData.requests} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition font-medium h-24 resize-none" placeholder="Allergies, accessibility needs, etc." />
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-black text-white mb-6">Review Booking</h3>
                  <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 space-y-4">
                    <div className="flex justify-between border-b border-slate-800 pb-4">
                      <span className="text-slate-400 font-medium">Full Name</span>
                      <span className="text-white font-bold">{formData.name || "N/A"}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-4">
                      <span className="text-slate-400 font-medium">Travel Date</span>
                      <span className="text-white font-bold">{formData.date || "N/A"}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-4">
                      <span className="text-slate-400 font-medium">Guests</span>
                      <span className="text-white font-bold">{formData.guests}</span>
                    </div>
                    <div className="flex justify-between pt-2">
                      <span className="text-slate-400 font-medium text-lg">Total Amount</span>
                      <span className="text-orange-500 font-black text-2xl">{item.price}</span>
                    </div>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex gap-3">
                    <Check className="text-blue-400 shrink-0 w-5 h-5 mt-0.5" />
                    <p className="text-sm text-blue-200 font-medium">Your booking is protected by Safarnama's comprehensive travel guarantee. Free cancellation up to 48 hours before.</p>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-black text-white mb-6">Payment Method</h3>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <button 
                      onClick={() => setFormData({...formData, paymentMethod: "card"})}
                      className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition ${formData.paymentMethod === 'card' ? 'bg-orange-500/10 border-orange-500 text-orange-400' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600'}`}
                    >
                      <CreditCard className="w-6 h-6" />
                      <span className="text-sm font-bold">Credit Card</span>
                    </button>
                    <button 
                      onClick={() => setFormData({...formData, paymentMethod: "upi"})}
                      className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition ${formData.paymentMethod === 'upi' ? 'bg-orange-500/10 border-orange-500 text-orange-400' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600'}`}
                    >
                      <Smartphone className="w-6 h-6" />
                      <span className="text-sm font-bold">UPI Apps</span>
                    </button>
                    <button 
                      onClick={() => setFormData({...formData, paymentMethod: "netbanking"})}
                      className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition ${formData.paymentMethod === 'netbanking' ? 'bg-orange-500/10 border-orange-500 text-orange-400' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600'}`}
                    >
                      <Banknote className="w-6 h-6" />
                      <span className="text-sm font-bold">Net Banking</span>
                    </button>
                  </div>
                  
                  {formData.paymentMethod === "card" && (
                    <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-slate-400 mb-2">Card Number</label>
                        <input type="text" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition font-medium" placeholder="0000 0000 0000 0000" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-bold text-slate-400 mb-2">Expiry Date</label>
                          <input type="text" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition font-medium" placeholder="MM/YY" />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-400 mb-2">CVV</label>
                          <input type="text" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition font-medium" placeholder="123" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-400 mb-2">Name on Card</label>
                        <input type="text" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition font-medium" placeholder="Full Name" />
                      </div>
                    </div>
                  )}

                  {formData.paymentMethod === "upi" && (
                    <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-center">
                      <p className="text-slate-400 mb-4 font-medium">Enter your UPI ID to receive a payment request on your UPI app.</p>
                      <input type="text" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition font-medium text-center mb-4" placeholder="username@bank" />
                      <p className="text-xs text-slate-500">Google Pay, PhonePe, Paytm, BHIM</p>
                    </div>
                  )}

                  {formData.paymentMethod === "netbanking" && (
                    <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
                      <label className="block text-sm font-bold text-slate-400 mb-2">Select Bank</label>
                      <select className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition font-medium appearance-none">
                        <option>HDFC Bank</option>
                        <option>State Bank of India</option>
                        <option>ICICI Bank</option>
                        <option>Axis Bank</option>
                        <option>Kotak Mahindra</option>
                      </select>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer Actions */}
          <div className="p-6 md:p-8 pt-4 border-t border-slate-800 flex justify-between items-center bg-slate-900">
            {step > 1 ? (
              <button 
                onClick={prevStep}
                className="text-slate-400 font-bold hover:text-white transition px-4 py-2"
              >
                Back
              </button>
            ) : <div></div>}

            {step < 3 ? (
              <button 
                onClick={nextStep}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-xl flex items-center gap-2 transition"
              >
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button 
                onClick={handleBook}
                disabled={isProcessing}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-black py-3 px-10 rounded-xl flex items-center gap-2 transition shadow-lg shadow-emerald-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isProcessing ? "Processing..." : `Pay ${item.price}`}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
