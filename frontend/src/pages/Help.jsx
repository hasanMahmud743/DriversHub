import React, { useState } from 'react';
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  MessageCircle, 
  Mail, 
  Phone,
  HelpCircle,
  ShieldCheck,
  Zap,
  Info,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Help = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeId, setActiveId] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "How do I find a verified driver?",
      answer: "Navigate to the Contact tab, select your preferred vehicle category (CNG, Auto, etc.), and you will see a list of verified drivers with their contact information and location."
    },
    {
      id: 2,
      question: "Is there any cost to use this platform?",
      answer: "No, searching and connecting with drivers is completely free for all visitors. We aim to bridge the gap between commuters and transit operators without any middleman fees."
    },
    {
      id: 3,
      question: "How can I add my own vehicle to the directory?",
      answer: "You need to create an account or login first. Once authenticated, go to the Contact page and click 'Add New Operator'. Fill in the details and wait for admin approval."
    },
    {
      id: 4,
      question: "What does 'Verified' status mean?",
      answer: "A verified status indicates that the driver's identity and vehicle information have been reviewed and approved by our administrative team for safety and reliability."
    },
    {
      id: 5,
      question: "How do I report an issue with a driver?",
      answer: "If you encounter any issues, please contact our support team via email at support@drivershub.com or use the contact form below with the driver's name and details."
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-20 animate-fade-in">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-primary-600 dark:text-primary-400 rounded-[24px] sm:rounded-[32px] flex items-center justify-center mx-auto mb-6 sm:mb-10 shadow-sm">
            <HelpCircle className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-4 sm:mb-6 tracking-tight">Need a Hand?</h1>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-bold max-w-xl mx-auto tracking-tight px-4">
            Comprehensive resources for the community.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-12 lg:mb-16 group animate-slide-up">
          <Search className="absolute left-6 sm:left-7 top-1/2 -translate-y-1/2 text-slate-200 w-5 h-5 sm:w-7 sm:h-7 group-focus-within:text-slate-900 transition-colors" />
          <input 
            type="text" 
            placeholder="Search help topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 focus:border-slate-900 rounded-full sm:rounded-[40px] py-4 sm:py-6 pl-14 sm:pl-18 pr-6 sm:pr-8 outline-none transition-all shadow-sm font-bold text-base sm:text-lg text-slate-900 dark:text-white"
          />
        </div>

        {/* FAQ List */}
        <div className="space-y-6 mb-24">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => (
              <div 
                key={faq.id} 
                className="bg-white dark:bg-slate-900 rounded-[24px] sm:rounded-[32px] border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-500 hover:shadow-lg"
              >
                <button 
                  onClick={() => setActiveId(activeId === faq.id ? null : faq.id)}
                  className="w-full px-6 sm:px-8 py-5 sm:py-6 text-left flex justify-between items-center group"
                >
                  <span className="font-black text-lg sm:text-xl text-slate-900 dark:text-slate-200 group-hover:text-primary-600 transition-colors tracking-tight pr-4">{faq.question}</span>
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex-shrink-0 flex items-center justify-center transition-all ${activeId === faq.id ? 'bg-slate-900 text-white rotate-180' : 'bg-slate-50 text-slate-400'}`}>
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </button>
                <AnimatePresence>
                  {activeId === faq.id && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 sm:px-8 pb-6 sm:pb-8 text-slate-500 dark:text-slate-400 leading-relaxed font-medium text-base sm:text-lg"
                    >
                      <div className="pt-4 sm:pt-6 border-t border-slate-50 dark:border-slate-800">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100">
              <Search className="w-12 h-12 text-slate-100 mx-auto mb-6" />
              <p className="text-slate-300 font-black text-xl">No topics found.</p>
            </div>
          )}
        </div>

        {/* Support Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div className="bg-slate-950 dark:bg-primary-800 text-white p-8 sm:p-12 rounded-[40px] sm:rounded-[60px] relative overflow-hidden group shadow-xl">
            <div className="relative z-10">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-[16px] sm:rounded-[24px] flex items-center justify-center mb-6 sm:mb-8">
                <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black mb-3 sm:mb-4 tracking-tight">Live Support.</h3>
              <p className="text-slate-400 dark:text-primary-100 mb-8 sm:mb-10 text-base sm:text-lg font-medium">Direct interaction with our intelligence agents.</p>
              <button className="flex items-center space-x-3 font-black text-base hover:translate-x-2 transition-transform">
                <span>Start Session</span>
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 sm:p-12 rounded-[40px] sm:rounded-[60px] group shadow-sm hover:shadow-xl transition-all duration-500">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-[16px] sm:rounded-[24px] flex items-center justify-center mb-6 sm:mb-8 group-hover:bg-slate-950 group-hover:text-white transition-all">
              <Mail className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-3 sm:mb-4 tracking-tight">Correspondence.</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-8 sm:mb-10 text-base sm:text-lg font-medium">Reports and inquiries handled via email.</p>
            <a href="mailto:support@drivershub.com" className="flex flex-wrap items-center space-x-3 font-black text-sm sm:text-base text-primary-600 hover:underline group">
              <span className="truncate max-w-full">support@drivershub.com</span>
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
