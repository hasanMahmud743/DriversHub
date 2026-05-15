import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { 
  Phone, 
  MapPin, 
  User, 
  Plus, 
  Filter, 
  Search,
  Loader2,
  X,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Truck,
  Bus,
  ArrowRight,
  ShieldCheck,
  Grid,
  Star,
  MessageSquare,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Contact = () => {
  const [operators, setOperators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') || 'All';
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [fetchingReviews, setFetchingReviews] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Add Operator Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    category: 'CNG',
    location: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Review Form State
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: ''
  });
  const [submittingReview, setSubmittingReview] = useState(false);

  const categories = [
    { id: 'All', name: 'All Drivers', icon: <Grid className="w-5 h-5" />, color: 'bg-slate-900 text-white' },
    { id: 'CNG', name: 'CNG Operators', icon: <TrendingUp className="w-5 h-5" />, color: 'bg-emerald-50 text-emerald-600' },
    { id: 'Auto Rickshaw', name: 'Auto Rickshaw', icon: <Truck className="w-5 h-5" />, color: 'bg-amber-50 text-amber-600' },
    { id: 'Train Blacker', name: 'Train Blacker', icon: <Bus className="w-5 h-5" />, color: 'bg-slate-50 text-slate-600' },
    { id: 'Shuttle Bus', name: 'Shuttle Bus', icon: <Bus className="w-5 h-5" />, color: 'bg-blue-50 text-blue-600' },
    { id: 'Van Driver', name: 'Van Driver', icon: <Truck className="w-5 h-5" />, color: 'bg-purple-50 text-purple-600' },
  ];

  const fetchOperators = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/api/operators/${selectedCategory}`);
      setOperators(res.data);
    } catch (err) {
      console.error('Error fetching operators:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async (operatorId) => {
    try {
      setFetchingReviews(true);
      const res = await axios.get(`http://localhost:5000/api/reviews/${operatorId}`);
      setReviews(res.data);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    } finally {
      setFetchingReviews(false);
    }
  };

  useEffect(() => {
    fetchOperators();
  }, [selectedCategory]);

  const handleCategoryClick = (id) => {
    setSearchParams({ category: id });
  };

  const handleOpenModal = () => {
    if (!currentUser) {
      navigate('/login');
    } else {
      setIsModalOpen(true);
    }
  };

  const handleOperatorClick = (operator) => {
    setSelectedOperator(operator);
    fetchReviews(operator._id);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const validatePhone = (phone) => {
    const regex = /^(?:\+88|01)[3-9]\d{8}$/;
    return regex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePhone(formData.phone)) {
      setError('Please enter a valid phone number (e.g., 017xxxxxxxx)');
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        ...formData,
        addedBy: currentUser.uid
      };
      await axios.post('http://localhost:5000/api/operators', payload);
      setSuccess('Operator added successfully! It will be visible after admin approval.');
      setTimeout(() => {
        setIsModalOpen(false);
        setSuccess('');
        setFormData({ name: '', phone: '', category: 'CNG', location: '' });
        fetchOperators();
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add operator');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return navigate('/login');

    try {
      setSubmittingReview(true);
      const payload = {
        operatorId: selectedOperator._id,
        userId: currentUser.uid,
        userName: currentUser.displayName || currentUser.email.split('@')[0],
        rating: reviewForm.rating,
        comment: reviewForm.comment
      };
      await axios.post('http://localhost:5000/api/reviews', payload);
      setReviewForm({ rating: 5, comment: '' });
      fetchReviews(selectedOperator._id);
    } catch (err) {
      console.error('Error posting review:', err);
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <div className="pt-28 pb-24 min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-6 lg:gap-8">
          <div className="animate-fade-in text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Drivers Directory</h1>
            <p className="text-slate-500 dark:text-slate-400 font-bold text-base sm:text-lg">
              Exploring <span className="text-primary-600 dark:text-primary-400">{selectedCategory}</span> drivers.
            </p>
          </div>
          <button 
            onClick={handleOpenModal}
            className="btn-primary flex items-center justify-center space-x-3 py-4 px-8 w-full md:w-auto shadow-xl"
          >
            <Plus className="w-5 h-5" />
            <span className="text-base">Add Operator</span>
          </button>
        </div>

        {/* Category Menu */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-12 lg:mb-16">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`p-4 sm:p-6 rounded-[24px] sm:rounded-[32px] border transition-all duration-500 flex flex-col items-center justify-center space-y-3 sm:space-y-4 group ${
                selectedCategory === cat.id 
                ? 'bg-white dark:bg-slate-900 border-primary-500 shadow-lg scale-[1.02] sm:scale-105' 
                : 'bg-white/50 dark:bg-slate-900/40 border-transparent hover:border-slate-200'
              }`}
            >
              <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-500 group-hover:scale-110 ${cat.color} dark:bg-slate-800 dark:text-primary-400`}>
                {cat.icon}
              </div>
              <span className={`font-black text-[9px] sm:text-[10px] uppercase tracking-widest text-center ${selectedCategory === cat.id ? 'text-primary-600 dark:text-primary-400' : 'text-slate-400'}`}>
                {cat.name}
              </span>
            </button>
          ))}
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center space-x-3">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{operators.length} Listings</span>
          </div>
          <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <div className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse"></div>
            <span>Live Directory</span>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[40px] animate-pulse h-80"></div>
            ))}
          </div>
        ) : operators.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {operators.map((op, i) => (
              <motion.div 
                layout
                key={op._id}
                onClick={() => handleOperatorClick(op)}
                className="card p-8 group hover:-translate-y-2 cursor-pointer"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all">
                    <User className="w-7 h-7" />
                  </div>
                  <span className="px-3 py-1 bg-slate-900 text-white rounded-full text-[9px] font-black uppercase tracking-widest">
                    {op.category}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                  {op.name}
                </h3>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center text-slate-500 text-sm font-medium">
                    <MapPin className="w-4 h-4 mr-3 text-primary-500" />
                    <span>{op.location}</span>
                  </div>
                  <div className="flex items-center text-slate-500 text-sm font-black tracking-wider">
                    <Phone className="w-4 h-4 mr-3 text-primary-500" />
                    <span>{op.phone}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-50 dark:border-slate-800">
                  <div className="flex items-center space-x-1 text-amber-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-xs font-black text-slate-900 dark:text-white">Review Portal</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-32 bg-white dark:bg-slate-900 rounded-[60px] border-2 border-dashed border-slate-100 dark:border-slate-800">
            <Search className="w-16 h-16 text-slate-100 mx-auto mb-6" />
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">No results.</h3>
            <p className="text-slate-400 font-bold mb-8">Be the first to add a driver here.</p>
            <button onClick={handleOpenModal} className="text-primary-600 font-black flex items-center mx-auto">
              Add Operator <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        )}
      </div>

      {/* Add Operator Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            ></motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-slate-950 rounded-[40px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] w-full max-w-2xl relative overflow-hidden border border-slate-100 dark:border-slate-800/50"
            >
              <div className="p-6 sm:p-8 border-b border-slate-50 dark:border-slate-900 flex justify-between items-center bg-slate-50/30 dark:bg-slate-900/30 backdrop-blur-xl">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">Register Operator</h2>
                  <p className="text-[9px] font-black text-primary-600 dark:text-primary-400 uppercase tracking-[0.2em] mt-1">Movement Network Access</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)} 
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all group"
                >
                  <X className="w-5 h-5 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6 sm:space-y-8 max-h-[70vh] overflow-y-auto">
                {error && (
                  <div className="flex items-center space-x-3 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-2xl border border-red-100 dark:border-red-900/20 text-sm font-bold">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}
                
                {success && (
                  <div className="flex items-center space-x-3 p-4 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-2xl border border-emerald-100 dark:border-emerald-900/20 text-sm font-bold">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                    <span>{success}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Identity</label>
                    <input 
                      required 
                      type="text" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleInputChange} 
                      placeholder="Full Name" 
                      className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-slate-900 dark:focus:border-primary-500 rounded-2xl px-6 py-4 outline-none transition-all font-bold text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Connection</label>
                    <input 
                      required 
                      type="text" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleInputChange} 
                      placeholder="017xxxxxxxx" 
                      className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-slate-900 dark:focus:border-primary-500 rounded-2xl px-6 py-4 outline-none transition-all font-bold text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600" 
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Selection Logic</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {categories.filter(c => c.id !== 'All').map(c => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, category: c.id })}
                        className={`p-4 rounded-2xl border-2 transition-all font-black text-[9px] flex flex-col items-center space-y-2 ${
                          formData.category === c.id 
                          ? 'bg-slate-900 dark:bg-primary-600 border-slate-900 dark:border-primary-600 text-white shadow-xl scale-105' 
                          : 'bg-slate-50 dark:bg-slate-900 border-transparent text-slate-400 dark:text-slate-500 hover:border-slate-200 dark:hover:border-slate-800'
                        }`}
                      >
                        <div className={`${c.color} p-2 rounded-lg dark:bg-slate-800 dark:text-primary-400`}>{c.icon}</div>
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Operational Zone</label>
                  <input 
                    required 
                    type="text" 
                    name="location" 
                    value={formData.location} 
                    onChange={handleInputChange} 
                    placeholder="Area, City" 
                    className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-slate-900 dark:focus:border-primary-500 rounded-2xl px-6 py-4 outline-none transition-all font-bold text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600" 
                  />
                </div>

                <button 
                  disabled={submitting} 
                  type="submit" 
                  className="w-full bg-slate-900 dark:bg-primary-600 text-white rounded-2xl py-5 font-black text-lg active:scale-95 transition-all shadow-xl hover:bg-primary-600 dark:hover:bg-primary-700"
                >
                  {submitting ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : <span>Deploy Entry</span>}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Operator Detail & Review Modal */}
      <AnimatePresence>
        {selectedOperator && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOperator(null)}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
            ></motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-slate-950 rounded-[40px] shadow-2xl w-full max-w-4xl max-h-[90vh] relative overflow-hidden border border-slate-100 dark:border-slate-800 flex flex-col"
            >
              <div className="p-6 sm:p-8 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center bg-slate-50/30 dark:bg-slate-900/30 backdrop-blur-xl sticky top-0 z-10">
                <div className="flex items-center space-x-4 sm:space-x-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-900 dark:bg-primary-600 text-white rounded-[16px] sm:rounded-[24px] flex items-center justify-center shadow-xl">
                    <User className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">{selectedOperator.name}</h2>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                      <span className="text-[9px] sm:text-[10px] font-black text-primary-600 dark:text-primary-400 uppercase tracking-widest">{selectedOperator.category}</span>
                      <span className="hidden sm:block w-1 h-1 bg-slate-300 rounded-full"></span>
                      <span className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">{selectedOperator.location}</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedOperator(null)} 
                  className="p-2 sm:p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl sm:rounded-2xl transition-all group"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 sm:p-10 custom-scrollbar">
                <div className="grid lg:grid-cols-2 gap-12">
                  {/* Left Column: Operator Info & Stats */}
                  <div className="space-y-10">
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] border border-slate-100 dark:border-slate-800">
                      <h4 className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Operator Metrics</h4>
                      <div className="grid grid-cols-2 gap-4 sm:gap-6">
                        <div className="space-y-1">
                          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">{reviews.length}</p>
                          <p className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider">Total Reviews</p>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-1">
                            <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                              {reviews.length > 0 
                                ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1)
                                : '0.0'
                              }
                            </p>
                            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 fill-current" />
                          </div>
                          <p className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider">Avg Rating</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h4 className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Direct Contact</h4>
                      <a href={`tel:${selectedOperator.phone}`} className="w-full flex items-center justify-between p-4 sm:p-6 bg-slate-900 text-white rounded-[20px] sm:rounded-[24px] shadow-xl group hover:bg-primary-600 transition-all">
                        <div className="flex items-center space-x-3 sm:space-x-4">
                          <div className="p-2 sm:p-3 bg-white/10 rounded-xl">
                            <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest">Call Now</p>
                            <p className="text-lg sm:text-xl font-black tracking-widest">{selectedOperator.phone}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform" />
                      </a>
                    </div>

                    {/* Review Form */}
                    <div className="pt-10 border-t border-slate-100 dark:border-slate-800">
                      <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">Post a Review</h4>
                      {currentUser ? (
                        <form onSubmit={handleReviewSubmit} className="space-y-6">
                          <div className="flex items-center space-x-4 mb-4">
                            <span className="text-sm font-bold text-slate-500">Rating:</span>
                            <div className="flex space-x-1 sm:space-x-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  type="button"
                                  onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                                  className={`p-1 transition-all ${reviewForm.rating >= star ? 'text-amber-400' : 'text-slate-200'}`}
                                >
                                  <Star className={`w-6 h-6 sm:w-8 sm:h-8 ${reviewForm.rating >= star ? 'fill-current' : ''}`} />
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="relative">
                            <textarea
                              required
                              rows="4"
                              value={reviewForm.comment}
                              onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                              placeholder="Write your experience..."
                              className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-slate-900 dark:focus:border-primary-500 rounded-[28px] p-6 outline-none transition-all font-medium text-slate-800 dark:text-white placeholder:text-slate-300 resize-none"
                            ></textarea>
                          </div>
                          <button 
                            disabled={submittingReview}
                            type="submit"
                            className="w-full bg-slate-900 dark:bg-primary-600 text-white rounded-2xl py-4 flex items-center justify-center space-x-3 font-black transition-all hover:bg-primary-600 shadow-lg"
                          >
                            {submittingReview ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                              <>
                                <span>Submit Review</span>
                                <Send className="w-5 h-5" />
                              </>
                            )}
                          </button>
                        </form>
                      ) : (
                        <div className="bg-slate-100 dark:bg-slate-900 p-8 rounded-[32px] text-center border-2 border-dashed border-slate-200 dark:border-slate-800">
                          <Lock className="w-10 h-10 text-slate-300 mx-auto mb-4" />
                          <p className="text-slate-500 font-bold mb-6">Login to share your feedback with the community.</p>
                          <Link to="/login" className="btn-primary inline-flex py-3 px-8 text-sm">Sign In Now</Link>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Reviews List */}
                  <div className="space-y-8">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Recent Feedback</h4>
                      <div className="flex items-center space-x-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <MessageSquare className="w-4 h-4" />
                        <span>{reviews.length} Comments</span>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {fetchingReviews ? (
                        <div className="flex justify-center py-20">
                          <Loader2 className="w-10 h-10 animate-spin text-primary-500" />
                        </div>
                      ) : reviews.length > 0 ? (
                        reviews.map((review, i) => (
                          <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            key={review._id} 
                            className="bg-white dark:bg-slate-900/80 p-8 rounded-[32px] border border-slate-50 dark:border-slate-800 shadow-sm group hover:shadow-md transition-all"
                          >
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4 sm:gap-0">
                                <div className="flex items-center space-x-4">
                                  <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center font-black text-slate-400 text-xs shadow-inner">
                                    {review.userName.charAt(0).toUpperCase()}
                                  </div>
                                  <div>
                                    <p className="font-black text-slate-900 dark:text-white text-sm">{review.userName}</p>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{new Date(review.createdAt).toLocaleDateString()}</p>
                                  </div>
                                </div>
                                <div className="flex text-amber-400">
                                  {[...Array(5)].map((_, star) => (
                                    <Star key={star} className={`w-3 h-3 ${review.rating > star ? 'fill-current' : 'text-slate-100'}`} />
                                  ))}
                                </div>
                              </div>
                            <p className="text-slate-600 dark:text-slate-400 text-base font-medium leading-relaxed italic">"{review.comment}"</p>
                          </motion.div>
                        ))
                      ) : (
                        <div className="text-center py-24 bg-slate-50 dark:bg-slate-900/30 rounded-[40px] border-2 border-dashed border-slate-100 dark:border-slate-800">
                          <Star className="w-12 h-12 text-slate-100 dark:text-slate-800 mx-auto mb-4" />
                          <p className="text-slate-300 dark:text-slate-700 font-black text-sm uppercase tracking-widest">No reviews yet.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Add this Lock icon since it was missing in the imports
const Lock = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

export default Contact;
