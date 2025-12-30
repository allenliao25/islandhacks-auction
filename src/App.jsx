import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Laptop, Users, Gavel, ArrowRight, Sparkles, Menu, X, CreditCard, CheckCircle, AlertCircle, Loader2, Lock, Clock, Calendar, Instagram, Mail, History } from 'lucide-react';

/* --- AUCTION START & END DATES --- 
   Change these to set when the auction opens and closes.
   Format: new Date('YYYY-MM-DDTHH:MM:SS')
   Note: Times are in PST (UTC-8)
*/
const AUCTION_START_DATE = new Date('2026-02-14T09:00:00-08:00'); // Feb 14, 2026, 9:00 AM PST
const AUCTION_END_DATE = new Date('2026-03-14T21:00:00-08:00');   // Mar 14, 2026, 9:00 PM PST

// Helper function to check if auction has started
const hasAuctionStarted = () => {
  return new Date().getTime() >= AUCTION_START_DATE.getTime();
};

// Helper function to check if auction has ended
const hasAuctionEnded = () => {
  return new Date().getTime() >= AUCTION_END_DATE.getTime();
};

// Helper function to calculate seconds remaining (to start or end)
const getSecondsRemaining = () => {
  const now = new Date();
  const targetDate = hasAuctionStarted() ? AUCTION_END_DATE : AUCTION_START_DATE;
  const diff = targetDate.getTime() - now.getTime();
  return Math.max(0, Math.floor(diff / 1000));
};

// Format date as "Fri, Feb 14, 2026 · 9:00 AM PST"
const formatAuctionDate = (date) => {
  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'America/Los_Angeles'
  };
  const timeOptions = {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'America/Los_Angeles',
    timeZoneName: 'short'
  };
  
  const datePart = date.toLocaleDateString('en-US', options);
  const timePart = date.toLocaleTimeString('en-US', timeOptions);
  
  // Format: "Fri, Feb 14, 2026 · 9:00 AM PST"
  return `${datePart} · ${timePart}`.replace('PDT', 'PST');
};

/* --- EDIT THIS LIST TO UPDATE YOUR LIVE ITEMS --- 
   To add new items, copy one of the blocks below (from { to }), 
   paste it into the list, and change the details.
*/
const AUCTION_ITEMS = [
  {
    id: 1,
    title: "ASUS TUF Gaming GeForce RTX™ 4090 24GB OG",
    price: 1000,
    bidder: "No bids yet",
    img: "https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?auto=format&fit=crop&q=80&w=800",
    bidIncrements: [25, 50, 75, 100]
  },
  {
    id: 2,
    title: "PNY GeForce RTX™ 4090 24GB VERTO™ Triple Fan",
    price: 1000,
    bidder: "No bids yet",
    img: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=800",
    bidIncrements: [25, 50, 75, 100]
  },
  {
    id: 3,
    title: "ASUS ROG Ally X (2024) Handheld",
    price: 400,
    bidder: "No bids yet",
    img: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&q=80&w=800",
    bidIncrements: [10, 25, 50, 75]
  },
  {
    id: 4,
    title: "CORSAIR VENGEANCE RGB DDR5 64GB (6000MHz)",
    price: 300,
    bidder: "No bids yet",
    img: "https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?auto=format&fit=crop&q=80&w=800",
    bidIncrements: [10, 20, 35, 50]
  },
  {
    id: 5,
    title: "Limited Edition Hackathon Hoodie",
    price: 100,
    bidder: "No bids yet",
    img: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800",
    bidIncrements: [5, 10, 20, 50]
  },
  {
    id: 6,
    title: "Mystery Tech Box (Value $500+)",
    price: 150,
    bidder: "No bids yet",
    img: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=800",
    bidIncrements: [5, 15, 25, 50]
  },
  {
    id: 7,
    title: "The Ultimate iFixit Repair Business Toolkit",
    price: 150,
    bidder: "No bids yet",
    img: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=800",
    bidIncrements: [10, 20, 35, 50]
  }
];

/* --- COMPONENTS --- */

// The floating background orbs
const FloatingOrb = ({ color, size, top, left, delay }) => (
  <motion.div
    className={`absolute rounded-full mix-blend-multiply filter blur-3xl opacity-80 ${color}`}
    style={{ 
      width: size, 
      height: size, 
      top: top, 
      left: left,
      zIndex: 0 
    }}
    animate={{
      y: [0, 30, 0],
      x: [0, 20, 0],
      scale: [1, 1.05, 1],
    }}
    transition={{
      duration: 12,
      repeat: Infinity,
      delay: delay,
      ease: "easeInOut"
    }}
  />
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center backdrop-blur-md bg-white/30 border-b border-white/40 shadow-sm"
    >
      <div className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
        {/* LOGO REPLACEMENT HERE */}
        <img src="/sunsetlogo.png" alt="IslandHacks Logo" className="w-10 h-10 object-contain" />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600">IslandHacks</span>
      </div>
      
      <div className="hidden md:flex gap-8 text-slate-700 font-medium items-center">
        <a href="#auction" className="hover:text-orange-500 hover:scale-105 transition-all">Auction</a>
        <a href="#impact" className="hover:text-orange-500 hover:scale-105 transition-all">Our Impact</a>
        <a href="#donate" className="px-5 py-2 bg-orange-500 hover:bg-orange-600 rounded-full text-white transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 font-semibold">
          Donate
        </a>
      </div>

      <button className="md:hidden text-slate-800" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X /> : <Menu />}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-100 p-6 flex flex-col gap-4 md:hidden animate-in slide-in-from-top-5 shadow-xl">
           <a href="#auction" className="text-slate-800 text-lg" onClick={() => setIsOpen(false)}>Auction</a>
           <a href="#impact" className="text-slate-800 text-lg" onClick={() => setIsOpen(false)}>Our Impact</a>
           <a href="#donate" className="text-center py-3 bg-orange-500 rounded-xl text-white font-bold" onClick={() => setIsOpen(false)}>Donate</a>
        </div>
      )}
    </motion.nav>
  );
};

/* --- GLOBAL EVENT COUNTDOWN --- */
const EventCountdown = () => {
  const [timeLeft, setTimeLeft] = useState(getSecondsRemaining());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getSecondsRemaining());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    if (seconds <= 0) return { days: 0, hours: "00", mins: "00", secs: "00" };
    
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return {
      days,
      hours: hours < 10 ? `0${hours}` : `${hours}`,
      mins: mins < 10 ? `0${mins}` : `${mins}`,
      secs: secs < 10 ? `0${secs}` : `${secs}`
    };
  };

  const time = formatTime(timeLeft);

  return (
    <div className="flex items-center gap-3 my-6">
      {time.days > 0 && (
        <div className="flex flex-col items-center">
          <span className="text-4xl md:text-6xl font-black text-slate-800 tracking-tighter tabular-nums">{time.days}</span>
          <span className="text-xs text-slate-500 uppercase tracking-wider">days</span>
        </div>
      )}
      {time.days > 0 && <span className="text-3xl md:text-5xl font-light text-slate-300">:</span>}
      <div className="flex flex-col items-center">
        <span className="text-4xl md:text-6xl font-black text-slate-800 tracking-tighter tabular-nums">{time.hours}</span>
        <span className="text-xs text-slate-500 uppercase tracking-wider">hrs</span>
      </div>
      <span className="text-3xl md:text-5xl font-light text-slate-300">:</span>
      <div className="flex flex-col items-center">
        <span className="text-4xl md:text-6xl font-black text-slate-800 tracking-tighter tabular-nums">{time.mins}</span>
        <span className="text-xs text-slate-500 uppercase tracking-wider">min</span>
      </div>
      <span className="text-3xl md:text-5xl font-light text-slate-300">:</span>
      <div className="flex flex-col items-center">
        <span className="text-4xl md:text-6xl font-black text-slate-800 tracking-tighter tabular-nums">{time.secs}</span>
        <span className="text-xs text-slate-500 uppercase tracking-wider">sec</span>
      </div>
    </div>
  );
};

/* --- COMPACT COUNTDOWN FOR HERO --- */
const CompactCountdown = () => {
  const [timeLeft, setTimeLeft] = useState(getSecondsRemaining());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getSecondsRemaining());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    if (seconds <= 0) return { days: 0, hours: "00", mins: "00", secs: "00" };
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return {
      days,
      hours: hours < 10 ? `0${hours}` : `${hours}`,
      mins: mins < 10 ? `0${mins}` : `${mins}`,
      secs: secs < 10 ? `0${secs}` : `${secs}`
    };
  };

  const time = formatTime(timeLeft);

  return (
    <div className="flex items-center gap-3 text-4xl md:text-5xl font-black text-slate-800 bg-white/70 backdrop-blur-sm px-6 py-4 rounded-2xl border border-white/60 shadow-md">
      {time.days > 0 && <><span className="tabular-nums">{time.days}d</span><span className="text-slate-300 mx-1">:</span></>}
      <span className="tabular-nums">{time.hours}h</span>
      <span className="text-slate-300 mx-1">:</span>
      <span className="tabular-nums">{time.mins}m</span>
      <span className="text-slate-300 mx-1">:</span>
      <span className="tabular-nums">{time.secs}s</span>
    </div>
  );
};

/* --- BID HISTORY MODAL --- */
const BidHistoryModal = ({ isOpen, onClose, bids, itemTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden flex flex-col max-h-[80vh]"
      >
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
          <div>
            <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
              <History size={18} className="text-orange-500"/> Bid History
            </h3>
            <p className="text-xs text-slate-500 truncate max-w-[200px]">{itemTitle}</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-0 overflow-y-auto">
          {bids.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400 text-center px-6">
              <History size={48} className="mb-4 opacity-20" />
              <p className="font-medium text-slate-600">No bids yet</p>
              <p className="text-sm">Be the first to place a bid on this item!</p>
            </div>
          ) : (
            <ul className="divide-y divide-slate-50">
               {bids.map((bid, i) => (
                  <li key={i} className="flex justify-between items-center p-4 hover:bg-slate-50 transition-colors">
                     <div className="flex flex-col">
                       <span className="font-bold text-slate-700 text-sm">{bid.name}</span>
                       <span className="text-xs text-slate-400 flex items-center gap-1">
                         <Clock size={10} /> {bid.time}
                       </span>
                     </div>
                     <span className="text-orange-500 font-bold bg-orange-500/10 px-3 py-1 rounded-full text-sm border border-orange-100">
                       ${bid.amount}
                     </span>
                  </li>
               ))}
            </ul>
          )}
        </div>
        
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 shrink-0 text-center">
           <p className="text-xs text-slate-400">All times are local.</p>
        </div>
      </motion.div>
    </div>
  );
};

/* --- PAYMENT PROCESSING MODAL --- */
const PaymentModal = ({ isOpen, onClose, amount, itemTitle, onConfirm }) => {
  const [step, setStep] = useState('details'); // details, processing, success
  const [formData, setFormData] = useState({ name: '', email: '', card: '' });
  const [receiptId, setReceiptId] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);

  // Email validation function
  const validateEmail = (email) => {
    if (!email) return 'Email address is required';
    
    // Basic format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    
    // Check for common typos in popular domains
    const commonDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'aol.com'];
    const domain = email.split('@')[1]?.toLowerCase();
    
    // Check for obvious typos like 'gmial.com' or 'gmal.com'
    const typoPatterns = [
      { typo: /^gmai[^l]/, suggestion: 'gmail.com' },
      { typo: /^gmial/, suggestion: 'gmail.com' },
      { typo: /^gmal/, suggestion: 'gmail.com' },
      { typo: /^gamil/, suggestion: 'gmail.com' },
      { typo: /^yaho[^o]/, suggestion: 'yahoo.com' },
      { typo: /^yahooo/, suggestion: 'yahoo.com' },
      { typo: /^hotmal[^i]/, suggestion: 'hotmail.com' },
      { typo: /^outloo[^k]/, suggestion: 'outlook.com' },
    ];
    
    for (const pattern of typoPatterns) {
      if (pattern.typo.test(domain)) {
        return `Did you mean ${email.split('@')[0]}@${pattern.suggestion}?`;
      }
    }
    
    // Check if domain has at least one dot after @
    if (!domain || !domain.includes('.')) {
      return 'Email domain appears to be invalid';
    }
    
    // Check for minimum domain length (e.g., "a.co" is valid but "a.c" is not)
    const domainParts = domain.split('.');
    if (domainParts[domainParts.length - 1].length < 2) {
      return 'Email domain appears to be invalid';
    }
    
    return ''; // No error
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setFormData({ ...formData, email });
    if (emailTouched) {
      setEmailError(validateEmail(email));
    }
  };

  const handleEmailBlur = () => {
    setEmailTouched(true);
    setEmailError(validateEmail(formData.email));
  };

  useEffect(() => {
    if (isOpen) {
      setStep('details');
      setFormData({ name: '', email: '', card: '' });
      setEmailError('');
      setEmailTouched(false);
    }
  }, [isOpen]);

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleCardChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData({ ...formData, card: formatted });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate email before proceeding
    const emailValidationError = validateEmail(formData.email);
    if (emailValidationError) {
      setEmailError(emailValidationError);
      setEmailTouched(true);
      return;
    }
    
    setStep('processing');
    
    // SIMULATE PAYMENT NETWORK REQUEST
    setTimeout(() => {
      setStep('success');
      setReceiptId(`ISL-${Math.floor(Math.random() * 1000000)}`);
      setTimeout(() => {
        onConfirm(formData.name || 'Anonymous');
        onClose();
      }, 3500); // Gives user a moment to read the success message
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-bold text-lg text-slate-800">Secure Checkout</h3>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {step === 'details' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-orange-500/10 rounded-xl p-4 flex justify-between items-center mb-6 border border-orange-100">
                <div>
                  <p className="text-xs text-orange-500 font-bold uppercase tracking-wider">Total Bid Amount</p>
                  <p className="text-2xl font-bold text-slate-800">${amount}.00</p>
                </div>
                <div className="bg-white p-2 rounded-lg shadow-sm">
                   <Lock size={20} className="text-orange-500" />
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Full Name</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="Jane Doe"
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Email Address</label>
                  <div className="relative">
                    <input 
                      required 
                      type="email" 
                      placeholder="jane@example.com"
                      className={`w-full p-3 rounded-xl border bg-slate-50 focus:outline-none focus:ring-2 transition-all ${
                        emailError && emailTouched
                          ? 'border-red-400 focus:ring-red-200 focus:border-red-400'
                          : formData.email && !emailError
                          ? 'border-green-400 focus:ring-green-200 focus:border-green-400'
                          : 'border-slate-200 focus:ring-orange-200 focus:border-orange-400'
                      }`}
                      value={formData.email}
                      onChange={handleEmailChange}
                      onBlur={handleEmailBlur}
                    />
                    {formData.email && !emailError && emailTouched && (
                      <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" size={18} />
                    )}
                    {emailError && emailTouched && (
                      <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500" size={18} />
                    )}
                  </div>
                  {emailError && emailTouched && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      {emailError}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Card Details</label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      required 
                      type="text" 
                      placeholder="0000 0000 0000 0000"
                      maxLength="19"
                      className="w-full pl-10 pr-3 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-all font-mono text-sm"
                      value={formData.card}
                      onChange={handleCardChange}
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="w-full mt-6 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg flex justify-center items-center gap-2">
                Confirm Payment <ArrowRight size={18} />
              </button>
              
              <div className="flex justify-center items-center gap-2 text-xs text-slate-400 mt-4">
                <Lock size={12} /> SSL Secured Transaction
              </div>
            </form>
          )}

          {step === 'processing' && (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="mb-6 text-orange-500"
              >
                <Loader2 size={48} />
              </motion.div>
              <h4 className="text-xl font-bold text-slate-800 mb-2">Processing Payment...</h4>
              <p className="text-slate-500">Securely authorizing your bid for <br/> <span className="font-semibold text-slate-700">{itemTitle}</span></p>
            </div>
          )}

          {step === 'success' && (
            <div className="py-8 flex flex-col items-center justify-center text-center">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                type="spring"
                className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6"
              >
                <CheckCircle size={40} />
              </motion.div>
              <h4 className="text-2xl font-bold text-slate-800 mb-2">Bid Placed!</h4>
              <p className="text-slate-500 mb-2">You are now the highest bidder.</p>
              <div className="text-xs bg-slate-100 px-3 py-1 rounded text-slate-400 font-mono">
                Receipt: {receiptId}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};


const GlassCard = ({ children, className = "", delay = 0, tilt = false }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={tilt ? { rotate: 1 } : {}}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay: delay, type: "spring", stiffness: 50 }}
    className={`bg-white/40 backdrop-blur-xl border border-white/60 rounded-2xl p-6 shadow-xl shadow-orange-900/5 hover:bg-white/50 hover:border-white/80 transition-all duration-300 ${className}`}
  >
    {children}
  </motion.div>
);

const AuctionItem = ({ title, price, img, bidder, bidIncrements = [5, 10, 20, 50] }) => {
  const [currentPrice, setCurrentPrice] = useState(parseInt(price));
  const [currentBidder, setCurrentBidder] = useState(bidder);
  const [isBidding, setIsBidding] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [customBid, setCustomBid] = useState('');
  const [pendingBidAmount, setPendingBidAmount] = useState(0);
  
  // NEW STATES FOR BID HISTORY
  const [bids, setBids] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // LIVE TIMER LOGIC - uses global AUCTION dates
  const [timeLeft, setTimeLeft] = useState(getSecondsRemaining());
  const [auctionStarted, setAuctionStarted] = useState(hasAuctionStarted());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getSecondsRemaining());
      setAuctionStarted(hasAuctionStarted());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    if (seconds <= 0) return "Closed";
    const d = Math.floor(seconds / 86400);
    const h = Math.floor((seconds % 86400) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    
    // Add leading zeros if needed
    const hh = h < 10 ? `0${h}` : h;
    const mm = m < 10 ? `0${m}` : m;
    const ss = s < 10 ? `0${s}` : s;
    
    if (d > 0) return `${d}d ${hh}h ${mm}m`;
    if (h > 0) return `${hh}h ${mm}m ${ss}s`;
    return `${mm}m ${ss}s`;
  };

  const initiateBid = (amount) => {
    setPendingBidAmount(currentPrice + amount);
    setIsPaying(true);
    setIsBidding(false);
  };

  const initiateCustomBid = (e) => {
    e.preventDefault();
    const val = parseInt(customBid);
    if (val > currentPrice) {
      setPendingBidAmount(val);
      setIsPaying(true);
      setIsBidding(false);
      setCustomBid('');
    }
  };

  const handlePaymentConfirm = (bidderName) => {
    setCurrentPrice(pendingBidAmount);
    setCurrentBidder(bidderName);
    setIsPaying(false);
    
    // ADD NEW BID TO HISTORY
    setBids(prev => [{ 
      name: bidderName, 
      amount: pendingBidAmount, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    }, ...prev]);
  };

  return (
    <>
      <PaymentModal 
        isOpen={isPaying} 
        onClose={() => setIsPaying(false)} 
        amount={pendingBidAmount} 
        itemTitle={title}
        onConfirm={handlePaymentConfirm}
      />
      
      {/* SEPARATE BID HISTORY MODAL */}
      <AnimatePresence>
        {showHistory && (
           <BidHistoryModal 
             isOpen={showHistory} 
             onClose={() => setShowHistory(false)} 
             bids={bids}
             itemTitle={title}
           />
        )}
      </AnimatePresence>

      <GlassCard className="flex flex-col gap-4 group relative overflow-hidden">
        {/* Quick Bid Overlay */}
        {isBidding && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-xl z-20 flex flex-col justify-center items-center p-6 text-slate-800 animate-in fade-in zoom-in-95 duration-200">
              <h4 className="font-bold text-xl mb-1 text-slate-800">Select Bid Amount</h4>
              <p className="text-slate-500 text-sm mb-6">Current: <span className="font-bold text-orange-500">${currentPrice}</span></p>
              
              <div className="grid grid-cols-2 gap-3 w-full mb-4">
                  {bidIncrements.map(inc => (
                      <button 
                        key={inc} 
                        onClick={() => initiateBid(inc)} 
                        className="py-3 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-200 text-orange-500 rounded-xl font-bold transition-colors"
                      >
                          +${inc}
                      </button>
                  ))}
              </div>

              <form onSubmit={initiateCustomBid} className="w-full flex gap-2 mb-4">
                   <div className="relative w-full">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                      <input 
                        type="number" 
                        min={currentPrice + 1}
                        placeholder="Custom amount" 
                        value={customBid}
                        onChange={e => setCustomBid(e.target.value)}
                        className="w-full pl-7 pr-3 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                      />
                   </div>
                   <button 
                      type="submit" 
                      disabled={!customBid || parseInt(customBid) <= currentPrice}
                      className="px-4 py-2 bg-slate-800 disabled:bg-slate-300 text-white rounded-xl font-bold hover:bg-slate-700 transition-colors"
                   >
                     <ArrowRight size={20} />
                   </button>
              </form>

              <button onClick={() => setIsBidding(false)} className="text-sm text-slate-500 hover:text-slate-800 font-medium py-2 hover:underline">
                  Cancel
              </button>
          </div>
        )}

        <div className="h-56 w-full bg-orange-500/20 rounded-2xl overflow-hidden relative shadow-sm">
            <img 
              src={img} 
              alt={title} 
              className="w-full h-full object-cover opacity-95 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
            />
            <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-md text-orange-500 text-xs font-bold px-3 py-1.5 rounded-full border border-white/40 flex items-center gap-1 shadow-sm min-w-[100px] justify-center z-10">
              {timeLeft > 0 ? (
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              ) : (
                  <Clock size={12} />
              )}
              <span className="tabular-nums">{formatTime(timeLeft)}</span>
            </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-slate-800 leading-tight min-h-[56px] line-clamp-2">{title}</h3>
          <div className="flex justify-between items-end p-3 bg-white/40 rounded-xl border border-white/40">
            <div className="flex flex-col">
              <span className="text-slate-500 text-xs uppercase tracking-wider">Top Bidder</span>
              <span className={`text-sm font-medium flex items-center gap-1 ${currentBidder === 'You' || currentBidder.length > 15 ? 'text-orange-500 font-bold' : 'text-slate-700'}`}>
                 {currentBidder}
              </span>
            </div>
            <div className="text-right">
              <span className="text-slate-500 text-xs uppercase tracking-wider">Current</span>
              <div className="text-2xl font-bold text-orange-500 drop-shadow-sm">${currentPrice}</div>
            </div>
          </div>
          
          {/* BID HISTORY SECTION LINK */}
          <div className="flex items-center gap-2 text-sm px-1 pt-1">
              <button 
                onClick={() => setShowHistory(true)}
                className="text-slate-500 hover:text-orange-500 underline decoration-slate-300 hover:decoration-orange-500 underline-offset-4 transition-all font-medium"
              >
                Bid History
              </button>
              <span className="text-slate-300 text-xs">•</span>
              <span className="text-slate-400 text-xs">{bids.length} bids</span>
           </div>

        </div>
        <button 
          onClick={() => (auctionStarted && timeLeft > 0) ? setIsBidding(true) : null}
          disabled={!auctionStarted || timeLeft <= 0}
          className={`w-full py-3.5 mt-auto rounded-xl text-white font-bold shadow-lg transition-all flex items-center justify-center gap-2 ${
            !auctionStarted 
              ? 'bg-slate-400 cursor-not-allowed' 
              : timeLeft > 0 
                ? 'bg-sky-500 hover:bg-sky-500/90 shadow-sky-400/20 active:scale-95' 
                : 'bg-slate-400 cursor-not-allowed'
          }`}
        >
          {!auctionStarted ? (
            <><Lock size={18} /> Bidding Opens Soon</>
          ) : timeLeft > 0 ? (
            <><Gavel size={18} /> Place Bid</>
          ) : (
            "Auction Closed"
          )}
        </button>
      </GlassCard>
    </>
  );
};

/* --- MAIN APP COMPONENT --- */

export default function App() {
  // Sets the favicon dynamically
  useEffect(() => {
    const link = document.querySelector("link[rel~='icon']");
    if (!link) {
      const newLink = document.createElement('link');
      newLink.rel = 'icon';
      newLink.href = '/sunsetlogo.png';
      document.head.appendChild(newLink);
    } else {
      link.href = '/sunsetlogo.png';
    }
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden font-sans selection:bg-orange-200 selection:text-orange-900 text-slate-800 relative">
      
      {/* --- AMBIENT BACKGROUND LAYERS --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-white"></div>
        <div className="absolute inset-0 w-full h-full">
          <FloatingOrb color="bg-orange-100/50" size="50vw" top="-15%" left="-10%" delay={0} />
          <FloatingOrb color="bg-sky-100/50" size="45vw" top="40%" left="60%" delay={2} />
          <FloatingOrb color="bg-orange-50/30" size="40vw" top="80%" left="-10%" delay={4} />
          <FloatingOrb color="bg-sky-50/30" size="35vw" top="10%" left="70%" delay={1} />
        </div>
        <div className="absolute inset-0 opacity-[0.3] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
      </div>

      <Navbar />

      {/* --- HERO SECTION (Compact) --- */}
      <section className="relative pt-24 pb-8 px-6">
        <div className="max-w-5xl mx-auto text-center z-10">
          {/* Live badge + Title on same visual line */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full bg-white/40 border border-white/60 backdrop-blur-xl text-xs font-medium tracking-wide text-slate-600 shadow-sm"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            Live Auction Now Open
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-3 tracking-tighter text-slate-800 font-display"
          >
            <span className="text-slate-800">IslandHacks </span>
            <span className="text-orange-500">Auction</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-slate-600 mb-4 max-w-xl mx-auto relative"
          >
            <p className="relative inline-block">
              <span className="relative inline-block">
                <span className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-clip-text text-transparent animate-gradient-x">
                  100%
                </span>
                {/* Animated hand-drawn underline */}
                <motion.svg 
                  className="absolute -bottom-2 left-0 w-full h-5 pointer-events-none"
                  viewBox="0 0 140 14"
                  xmlns="http://www.w3.org/2000/svg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: 0.5,
                  }}
                >
                  {/* Hand-drawn style underline with natural imperfections */}
                  <motion.path
                    d="M 8 7 C 12 6.5, 15 8, 20 7.5 C 25 7, 28 5.5, 33 6 C 38 6.5, 42 8, 47 7.5 C 52 7, 56 5, 61 5.5 C 66 6, 70 7.5, 75 7 C 80 6.5, 84 5.5, 89 6 C 94 6.5, 98 7.5, 103 7 C 108 6.5, 112 6, 117 6.5 C 122 7, 126 7.5, 130 7"
                    stroke="#f97316"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: 0.7,
                      ease: "easeOut"
                    }}
                    style={{
                      filter: "url(#roughen)"
                    }}
                  />
                  {/* SVG filter for hand-drawn texture */}
                  <defs>
                    <filter id="roughen">
                      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" result="noise" seed="2" />
                      <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.8" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                  </defs>
                </motion.svg>
              </span>
              {" "}of proceeds fund future hackathons and scholarships<br/>for local Alameda students.
            </p>
            {/* Subtle glow background */}
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-orange-50/0 via-orange-100/30 to-orange-50/0 rounded-2xl blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.4, 0.3] }}
              transition={{
                duration: 2,
                delay: 1.2,
              }}
              style={{ zIndex: -1 }}
            />
          </motion.div>
          
          {/* Compact timer */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center gap-3"
          >
            <span className="text-xs font-bold text-orange-500 uppercase tracking-widest flex items-center gap-1.5">
              <Clock size={14} /> {hasAuctionStarted() ? 'Auction Ends In' : 'Auction Starts In'}
            </span>
            <CompactCountdown />
            <span className="text-sm text-slate-600 font-medium">
              {formatAuctionDate(hasAuctionStarted() ? AUCTION_END_DATE : AUCTION_START_DATE)}
            </span>
          </motion.div>
        </div>
      </section>

      {/* --- AUCTION SECTION --- */}
      <section id="auction" className="pt-4 pb-16 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-3">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 font-display flex items-center gap-2">
              Auction Items <span className="text-xl"></span>
            </h2>
            <motion.div 
              initial={{ rotate: 0 }}
              animate={{ rotate: [-1, 1, -1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="bg-orange-50 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg border border-dashed border-orange-200"
            >
              100% student-run 🙋
            </motion.div>
          </div>
          
          {/* Auction date info */}
          <div className="mb-6 text-center">
            <p className="text-sm text-slate-600 font-medium flex items-center justify-center gap-2">
              <Calendar size={16} className="text-orange-500" />
              {hasAuctionStarted() ? (
                <>All items close: {formatAuctionDate(AUCTION_END_DATE)}</>
              ) : (
                <>Bidding opens: {formatAuctionDate(AUCTION_START_DATE)}</>
              )}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* THIS MAPS THROUGH THE LIST AT THE TOP OF THE FILE */}
            {AUCTION_ITEMS.map((item) => (
              <AuctionItem 
                key={item.id}
                title={item.title} 
                price={item.price} 
                bidder={item.bidder}
                img={item.img}
                bidIncrements={item.bidIncrements}
              />
            ))}
          </div>
        </div>
      </section>

      {/* --- EMOTIONAL JOURNEY (IMPACT) --- */}
      <section id="impact" className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <GlassCard className="p-8 md:p-16 overflow-hidden relative border-white/60 bg-white/40">
            
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-2 text-pink-500 font-bold mb-4 uppercase tracking-widest text-sm">
                    <Heart size={16} fill="currentColor" /> Our Impact
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-slate-800 font-display">
                    Where Your <br/> Bid Goes 💸
                  </h2>
                  <p className="text-2xl font-bold text-slate-800 mb-4">
                    Students. Students. Students.
                  </p>
                  <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                    Last year, we hosted <span className="font-semibold text-slate-700">120+ students</span> and awarded a <span className="font-semibold text-orange-500">$3,000 PC scholarship</span>. This year, we're awarding <span className="font-semibold text-sky-600">$4,000+ in laptop scholarships</span> to three seniors. Your bids help fund our annual hackathon and scholarships for students in Alameda. Help us support more students!
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                    <div className="p-4 rounded-xl bg-white/50 border border-white/60 backdrop-blur-md shadow-sm">
                      <Laptop className="mb-2 text-sky-500" size={28} />
                      <div className="text-2xl font-bold text-slate-800 font-display">$7k+</div>
                      <div className="text-xs text-slate-500">In Laptop Scholarships</div>
                    </div>
                    <div className="p-4 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-md shadow-sm">
                      <Users className="mb-2 text-sky-500" size={28} />
                      <div className="text-2xl font-bold text-slate-800 font-display">300+</div>
                      <div className="text-xs text-slate-500">Student Attendees</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/50 border border-white/60 backdrop-blur-md shadow-sm col-span-2 md:col-span-1">
                      <Calendar className="mb-2 text-sky-500" size={28} />
                      <div className="text-2xl font-bold text-slate-800 font-display">3</div>
                      <div className="text-xs text-slate-500">Hackathons Hosted</div>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="grid grid-cols-2 gap-4 relative">
                {/* Tilted photo collage with real images */}
                <motion.div
                  initial={{ opacity: 0, y: 40, rotate: -2 }}
                  whileInView={{ opacity: 1, y: 0, rotate: -2 }}
                  whileHover={{ rotate: 0 }}
                  className="space-y-4 pt-8"
                >
                   <img 
                    src="/heart-hands.JPG" 
                    className="rounded-xl object-cover h-56 w-full border-4 border-white shadow-xl"
                    style={{ objectPosition: '25% top' }}
                    alt="Students making heart with hands"
                  />
                  <motion.div 
                    initial={{ rotate: 2 }}
                    whileHover={{ rotate: 0 }}
                    className="p-4 bg-yellow-50 rounded-xl border-2 border-dashed border-orange-300 text-sm text-slate-800 shadow-sm"
                  >
                    <span className="font-bold">"Best weekend of my life!"</span>
                    <br/>— actual attendee feedback 💛
                  </motion.div>
                </motion.div>
                
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 40, rotate: 3 }}
                    whileInView={{ opacity: 1, y: 0, rotate: 3 }}
                    whileHover={{ rotate: 0, scale: 1.02 }}
                  >
                    <img 
                      src="/mentoring.jpg" 
                      className="rounded-3xl object-cover h-48 w-full border-4 border-white shadow-xl"
                      alt="Mentor helping students code"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 30, rotate: -2 }}
                    whileInView={{ opacity: 1, y: 0, rotate: -2 }}
                    whileHover={{ rotate: 1, scale: 1.02 }}
                  >
                    <img 
                      src="/hacking-room.jpg" 
                      className="rounded-xl object-cover object-left h-40 w-full border-4 border-white shadow-xl"
                      alt="Room full of students hacking"
                    />
                  </motion.div>
                </div>
                
                {/* Big group photo spanning full width */}
                <motion.div
                  initial={{ opacity: 0, y: 20, rotate: -1 }}
                  whileInView={{ opacity: 1, y: 0, rotate: -1 }}
                  whileHover={{ rotate: 0 }}
                  className="col-span-2 -mt-2"
                >
                  <img 
                    src="/group-photo.jpg" 
                    className="rounded-2xl object-cover h-48 w-full border-4 border-white shadow-xl"
                    alt="Full IslandHacks group photo"
                  />
                  <p className="text-center text-sm text-slate-500 mt-2">IslandHacks 2025 @ Penumbra HQ</p>
                </motion.div>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* --- DONATION / FOOTER --- */}
      <section id="donate" className="py-20 px-6 relative z-10 pb-32">
        <div className="max-w-3xl mx-auto text-center">
          <GlassCard className="border-t-4 border-t-pink-300 bg-white/60">
            <motion.div 
              initial={{ rotate: -5 }}
              whileHover={{ rotate: 5 }}
              className="inline-flex p-4 rounded-xl bg-pink-400/20 mb-6 ring-2 ring-pink-200"
            >
              <Heart size={40} className="text-pink-400 fill-pink-400/30" />
            </motion.div>
            
            <h2 className="text-4xl font-bold mb-4 text-slate-800 font-display">Just Want to Donate?</h2>
              <p className="text-slate-600 mb-10 text-lg leading-relaxed">
               Support IslandHacks by donating directly!
               <br className="hidden md:block"/> Every dollar goes straight to funding future hackathons & scholarships.
               <br /><span className="text-sm text-slate-500">We're a 501(c)(3) nonprofit. Your donation is tax-deductible 🙂</span>
             </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
              {[
                { label: '$25', value: 2500 },
                { label: '$50', value: 5000 },
                { label: '$100', value: 10000 },
                { label: 'Custom', value: null }
              ].map((item) => (
                <a 
                  key={item.label} 
                  href={`https://hcb.hackclub.com/donations/start/islandhacks${item.value ? `?amount=${item.value}` : ''}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 rounded-2xl border-2 border-slate-200 bg-white hover:bg-pink-50 hover:border-pink-300 hover:text-pink-500 transition-all font-semibold text-lg text-slate-700 flex items-center justify-center shadow-sm"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <a 
              href="https://hcb.hackclub.com/donations/start/islandhacks" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-16 py-5 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 text-white rounded-2xl font-bold shadow-xl shadow-orange-500/20 transition-all hover:scale-105 flex items-center justify-center gap-3 mx-auto text-lg"
            >
              Donate Now <ArrowRight size={22} />
            </a>
          </GlassCard>
          
          <footer className="mt-20 text-slate-400 text-sm flex flex-col items-center gap-6">
            <div className="flex flex-col sm:flex-row gap-8 items-center">
              <a 
                href="https://www.instagram.com/islandhacks/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-orange-500 transition-colors font-medium"
              >
                <Instagram size={20} />
                @islandhacks
              </a>
              <a 
                href="mailto:team@island-hacks.org" 
                className="flex items-center gap-2 hover:text-orange-500 transition-colors font-medium"
              >
                <Mail size={20} />
                team@island-hacks.org
              </a>
            </div>
            
            <div className="text-center space-y-1 text-xs text-slate-400 max-w-lg">
              <p>IslandHacks is fiscally sponsored by The Hack Foundation, a 501(c)(3) nonprofit</p>
              <p>Nonprofit EIN: 81-2908499</p>
              <p>&copy; 2025 IslandHacks</p>
            </div>
          </footer>
        </div>
      </section>

    </div>
  );
}