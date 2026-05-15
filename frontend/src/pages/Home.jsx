import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Phone, 
  Users, 
  CheckCircle, 
  Star, 
  ArrowRight,
  Truck,
  Bus,
  Shield,
  ArrowUpRight,
  MessageCircle,
  Car
} from 'lucide-react';

const Home = () => {
  const [categoryCounts, setCategoryCounts] = useState({});

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/stats`)
      .then(res => res.json())
      .then(data => setCategoryCounts(data.categoryCounts || {}))
      .catch(err => console.error('Error fetching stats:', err));
  }, []);

  const categories = [
    { name: 'CNG', icon: <ArrowUpRight className="w-5 h-5" />, count: categoryCounts?.CNG || 0, color: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' },
    { name: 'Auto Rickshaw', icon: <Truck className="w-5 h-5" />, count: categoryCounts?.['Auto Rickshaw'] || 0, color: 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' },
    { name: 'Train Blacker', icon: <Bus className="w-5 h-5" />, count: categoryCounts?.['Train Blacker'] || 0, color: 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400' },
    { name: 'Shuttle Bus', icon: <Bus className="w-5 h-5" />, count: categoryCounts?.['Shuttle Bus'] || 0, color: 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' },
    { name: 'Van Driver', icon: <Truck className="w-5 h-5" />, count: categoryCounts?.['Van Driver'] || 0, color: 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' },
  ];

  const steps = [
    { title: 'Search', desc: 'Find drivers near your location instantly.', icon: <Search className="w-7 h-7" /> },
    { title: 'Filter', desc: 'Choose the best service type for your needs.', icon: <MapPin className="w-7 h-7" /> },
    { title: 'Connect', desc: 'Call and get moving in minutes.', icon: <Phone className="w-7 h-7" /> },
  ];

  const testimonials = [
    { name: 'Rahat Islam', role: 'Daily Commuter', text: 'This app saved my life! Finding a CNG driver used to take 20 minutes, now it takes 20 seconds.', avatar: 'RI' },
    { name: 'Sarah Ahmed', role: 'Business Traveler', text: 'Verified driver list gives me peace of mind. Highly recommended for safety and speed.', avatar: 'SA' },
    { name: 'Tanvir Hossain', role: 'Student', text: 'Clean interface and very easy to use. The filter system works perfectly.', avatar: 'TH' },
  ];

  return (
    <div className="pt-20 bg-white dark:bg-slate-950 transition-colors duration-500">
      {/* Hero Section */}
      {/* Hero Section */}
      <section className="relative min-h-[90vh] sm:min-h-[85vh] flex items-center overflow-hidden bg-slate-900 dark:bg-slate-950">
        {/* Mobile Background Image (Prominent behind text) */}
        <div className="absolute inset-0 z-0 sm:hidden">
          <img 
            src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=2070" 
            alt="City Transit" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-slate-950"></div>
        </div>

        {/* Desktop Background Elements */}
        <div className="absolute inset-0 z-0 hidden sm:block">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-50/50 dark:bg-primary-900/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-50/50 dark:bg-blue-900/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="animate-fade-in text-center lg:text-left">
              <div className="inline-flex items-center space-x-3 py-2 px-4 rounded-full bg-white/10 dark:bg-slate-900/50 border border-white/20 dark:border-slate-800 text-white dark:text-slate-400 font-black text-[10px] sm:text-xs mb-6 sm:mb-8 mx-auto lg:mx-0 shadow-sm backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse"></span>
                <span className="uppercase tracking-widest">Global Transit Standard</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white sm:text-slate-900 dark:text-white leading-[1.1] mb-6 sm:mb-8 tracking-tighter">
                Movement <br className="hidden sm:block" />
                <span className="text-primary-400 sm:text-primary-600 dark:text-primary-400">Perfected.</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-200 sm:text-slate-500 dark:text-slate-400 mb-8 sm:mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed font-bold">
                The elite directory for verified drivers. Experience the new standard in community transit.
              </p>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                <Link to="/contact" className="w-full sm:w-auto bg-primary-600 sm:bg-slate-900 dark:bg-primary-600 text-white rounded-[20px] sm:rounded-2xl px-8 py-5 sm:py-4 flex items-center justify-center space-x-3 group font-black text-lg sm:text-base shadow-2xl shadow-primary-900/40 active:scale-95 transition-all">
                  <span>Find a Driver</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/help" className="w-full sm:w-auto bg-white/10 sm:bg-white dark:bg-slate-900 border border-white/20 sm:border-slate-200 dark:border-slate-800 text-white sm:text-slate-900 dark:text-white rounded-[20px] sm:rounded-2xl px-8 py-5 sm:py-4 flex items-center justify-center font-black text-lg sm:text-base hover:bg-white/20 transition-all active:scale-95 backdrop-blur-sm">
                  <span>Learn More</span>
                </Link>
              </div>
            </div>
            
            <div className="relative animate-slide-up hidden lg:block">
              <div className="relative z-10 p-4 bg-white dark:bg-slate-900 rounded-[48px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] border border-slate-50 dark:border-slate-800">
                <img 
                  src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=2069" 
                  alt="Driver" 
                  className="rounded-[36px] w-full h-[550px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 z-20 bg-slate-900 dark:bg-white p-6 rounded-[32px] shadow-2xl">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/10 dark:bg-primary-50 rounded-2xl flex items-center justify-center text-white dark:text-primary-600">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Active Fleet</p>
                    <p className="text-lg font-black text-white dark:text-slate-900 leading-tight">2,500+ Verified</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 sm:py-32 bg-slate-50 dark:bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-20">
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white mb-4 sm:mb-6 tracking-tighter">Elite Services.</h2>
            <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg font-bold max-w-2xl mx-auto leading-relaxed">
              Precision-crafted categories for every transit need in the city.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-8">
            {categories.map((cat, i) => (
              <div 
                key={i}
                className="bg-white dark:bg-slate-900 p-6 sm:p-10 rounded-[32px] sm:rounded-[48px] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-500 group text-center"
              >
                <div className="flex justify-center mb-4 sm:mb-8">
                  <div className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl ${cat.color} transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm`}>
                    {React.cloneElement(cat.icon, { className: "w-6 h-6 sm:w-8 sm:h-8" })}
                  </div>
                </div>
                <h3 className="text-base sm:text-xl font-black text-slate-900 dark:text-white mb-1 sm:mb-3 tracking-tight">{cat.name}</h3>
                <p className="text-[9px] sm:text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{cat.count} Operators</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 sm:py-32 bg-primary-50/30 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12 sm:gap-20">
            <div className="lg:col-span-1 text-center lg:text-left">
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">The Modern <br className="hidden lg:block" />Workflow.</h2>
              <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-bold leading-relaxed mb-8 sm:mb-10">
                A seamless 3-step process designed for the ultimate user experience.
              </p>
              <Link to="/contact" className="inline-flex items-center space-x-3 text-primary-600 font-black hover:translate-x-2 transition-transform text-lg group">
                <span>Get Started Now</span> 
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="lg:col-span-2 relative">
              {/* Connecting Line (Mobile Only) */}
              <div className="absolute left-[39px] top-10 bottom-10 w-0.5 bg-slate-100 dark:bg-slate-800 lg:hidden"></div>

              <div className="flex flex-col sm:grid sm:grid-cols-3 gap-8 sm:gap-8 relative z-10">
                {steps.map((step, i) => (
                  <div key={i} className="flex sm:flex-col items-start gap-6 sm:gap-0 bg-white dark:bg-slate-900 p-6 sm:p-10 rounded-[32px] sm:rounded-[48px] shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all duration-500 relative group overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-slate-900 dark:bg-primary-600 scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-500"></div>
                    
                    <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-slate-900 dark:bg-primary-600 text-white rounded-xl sm:rounded-3xl flex items-center justify-center mb-0 sm:mb-8 shadow-lg shadow-slate-900/20 relative z-10">
                      {React.cloneElement(step.icon, { className: "w-6 h-6 sm:w-8 sm:h-8" })}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2 sm:mb-4 tracking-tight">{step.title}</h3>
                      <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed font-bold">{step.desc}</p>
                      <div className="mt-4 sm:mt-8 flex items-center text-[9px] sm:text-[10px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-[0.3em]">
                        Step 0{i + 1}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 sm:py-32 bg-slate-950 dark:bg-slate-900 overflow-hidden relative">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/30 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/30 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {[
              { title: 'Elite Security', desc: 'Rigorous 5-step background verification.', icon: <Shield className="w-6 h-6 sm:w-8 sm:h-8" /> },
              { title: 'Rapid Response', desc: 'Average connection under 30 seconds.', icon: <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8" /> },
              { title: 'Fixed Pricing', desc: 'Transparent pricing, zero hidden fees.', icon: <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8" /> },
              { title: 'Premium Fleet', desc: 'Regularly audited luxury vehicles.', icon: <Star className="w-6 h-6 sm:w-8 sm:h-8" /> },
            ].map((value, i) => (
              <div key={i} className="group p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-slate-900/50 border border-white/5 hover:border-primary-500/30 transition-all duration-500">
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-slate-800 flex items-center justify-center text-primary-500 mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                  {value.icon}
                </div>
                <h3 className="text-sm sm:text-xl font-black text-white mb-2 sm:mb-3 tracking-tight">{value.title}</h3>
                <p className="text-slate-400 text-[10px] sm:text-sm leading-relaxed font-medium line-clamp-2 sm:line-clamp-none">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 sm:py-32 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          <div className="text-center mb-16 sm:mb-24">
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white mb-4 sm:mb-6 tracking-tighter">Community Voice.</h2>
            <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg font-bold">Hear from the people who keep the city moving.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-slate-50 dark:bg-slate-900/50 p-8 sm:p-12 rounded-[40px] sm:rounded-[56px] border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative">
                <MessageCircle className="absolute top-8 right-8 w-12 h-12 text-slate-200 dark:text-slate-800 opacity-50" />
                <div className="flex items-center space-x-1 text-amber-400 mb-8 sm:mb-10">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 italic mb-10 sm:mb-12 font-bold leading-relaxed relative z-10">"{t.text}"</p>
                <div className="flex items-center space-x-4 sm:space-x-5">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-slate-900 dark:bg-primary-600 text-white font-black flex items-center justify-center rounded-2xl shadow-lg">
                    {t.avatar}
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 dark:text-white text-base sm:text-lg tracking-tight">{t.name}</h4>
                    <p className="text-[10px] sm:text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-black text-slate-900 dark:text-white pt-16 pb-12 border-t border-slate-100 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12 border-b border-slate-50 dark:border-slate-800 pb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-slate-900 dark:bg-primary-600 rounded-xl">
                  <Car className="text-white w-5 h-5" />
                </div>
                <span className="text-xl font-black tracking-tighter uppercase">Drivers Hub</span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-bold max-w-sm">
                The global benchmark for community transit directories. Built for safety, speed, and absolute reliability.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 col-span-1 md:col-span-2">
              <div>
                <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Docs</h4>
                <ul className="space-y-3 text-slate-900 dark:text-white font-black text-[11px] uppercase tracking-widest">
                  <li><Link to="/" className="hover:text-primary-600 transition-colors">Overview</Link></li>
                  <li><Link to="/contact" className="hover:text-primary-600 transition-colors">Directory</Link></li>
                  <li><Link to="/help" className="hover:text-primary-600 transition-colors">Help</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Social</h4>
                <ul className="space-y-3 text-slate-900 dark:text-white font-black text-[11px] uppercase tracking-widest">
                  <li><a href="#" className="hover:text-primary-600 transition-colors">Privacy</a></li>
                  <li><a href="#" className="hover:text-primary-600 transition-colors">Terms</a></li>
                  <li><a href="#" className="hover:text-primary-600 transition-colors">Safety</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 text-slate-400 dark:text-slate-600 font-black text-[9px] uppercase tracking-[0.2em]">
            <p>© 2026 Drivers Hub. Developed by <span className="text-slate-900 dark:text-white">Mahmudul Hasan</span></p>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Platform</a>
              <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Status</a>
              <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Network</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
