import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  CheckCircle, 
  XCircle, 
  Trash2, 
  Edit3, 
  Search, 
  Filter,
  BarChart3,
  Clock,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  ChevronDown,
  LayoutDashboard,
  ShieldCheck,
  Settings,
  LogOut,
  RefreshCw,
  Loader2,
  Car
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard = () => {
  const { currentUser, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [operators, setOperators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, approved, rejected
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0 });

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
    } else {
      fetchOperators();
    }
  }, [isAdmin]);

  const fetchOperators = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/operators`);
      setOperators(res.data);
      calculateStats(res.data);
    } catch (err) {
      console.error('Error fetching operators:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    setStats({
      total: data.length,
      pending: data.filter(op => op.status === 'pending').length,
      approved: data.filter(op => op.status === 'approved').length,
    });
  };

  const handleAction = async (id, status) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/api/admin/operators/${id}`, { status });
      fetchOperators();
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this operator?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/operators/${id}`);
        fetchOperators();
      } catch (err) {
        console.error('Error deleting operator:', err);
      }
    }
  };

  const filteredOperators = operators.filter(op => {
    const matchesFilter = filter === 'all' || op.status === filter;
    const matchesSearch = op.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          op.phone.includes(searchTerm) || 
                          op.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 flex">
      {/* Sidebar - Desktop */}
      <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 hidden lg:block sticky top-20 h-[calc(100vh-80px)]">
        <div className="p-6">
          <div className="space-y-1">
            <button className="w-full flex items-center space-x-3 px-4 py-3 bg-primary-50 dark:bg-primary-900/20 text-primary-600 rounded-xl font-bold">
              <LayoutDashboard className="w-5 h-5" />
              <span>Overview</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl font-bold transition-all">
              <ShieldCheck className="w-5 h-5" />
              <span>Verifications</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl font-bold transition-all">
              <Users className="w-5 h-5" />
              <span>Users</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl font-bold transition-all">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10 overflow-x-hidden">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 lg:mb-10 gap-6">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Admin Dashboard</h1>
              <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium">Manage and monitor all transit operators.</p>
            </div>
            <button 
              onClick={fetchOperators}
              className="flex items-center justify-center space-x-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-6 py-4 sm:py-3 rounded-2xl font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-all shadow-sm w-full sm:w-auto"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Sync Data</span>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 lg:mb-10">
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="p-2 sm:p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-xl sm:rounded-2xl">
                  <Users className="w-5 h-5 sm:w-6 h-6" />
                </div>
                <span className="text-[9px] sm:text-xs font-black text-slate-400 uppercase tracking-widest">Total</span>
              </div>
              <p className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">{stats.total}</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1">Registered Operators</p>
            </div>
            
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm ring-2 ring-amber-500/20">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="p-2 sm:p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-600 rounded-xl sm:rounded-2xl">
                  <Clock className="w-5 h-5 sm:w-6 h-6" />
                </div>
                <span className="text-[9px] sm:text-xs font-black text-slate-400 uppercase tracking-widest">Pending</span>
              </div>
              <p className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">{stats.pending}</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1">Awaiting Approval</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm sm:col-span-2 lg:col-span-1">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="p-2 sm:p-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-xl sm:rounded-2xl">
                  <CheckCircle2 className="w-5 h-5 sm:w-6 h-6" />
                </div>
                <span className="text-[9px] sm:text-xs font-black text-slate-400 uppercase tracking-widest">Approved</span>
              </div>
              <p className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">{stats.approved}</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1">Live in Directory</p>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-[24px] sm:rounded-[28px] border border-slate-100 dark:border-slate-800 shadow-sm mb-6 lg:mb-8 flex flex-col lg:flex-row gap-3 sm:gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search by name, phone, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border-none rounded-xl sm:rounded-2xl py-4 pl-14 pr-6 focus:ring-2 focus:ring-primary-500 outline-none transition-all font-bold text-slate-800 dark:text-slate-200"
              />
            </div>
            <div className="grid grid-cols-2 sm:flex gap-2">
              {['all', 'pending', 'approved', 'rejected'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold capitalize transition-all text-sm sm:text-base ${
                    filter === f 
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md' 
                    : 'bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 hover:bg-slate-100'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="bg-white dark:bg-slate-900 rounded-[24px] sm:rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden mb-12">
            <div className="overflow-x-auto scrollbar-hide sm:scrollbar-default">
              <table className="w-full text-left min-w-[700px] sm:min-w-0">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800">
                    <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Operator</th>
                    <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Category</th>
                    <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Location</th>
                    <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                  <AnimatePresence>
                    {loading ? (
                      [...Array(5)].map((_, i) => (
                        <tr key={i} className="animate-pulse">
                          <td colSpan="5" className="px-8 py-6">
                            <div className="h-10 bg-slate-50 dark:bg-slate-950 rounded-xl w-full"></div>
                          </td>
                        </tr>
                      ))
                    ) : filteredOperators.length > 0 ? (
                      filteredOperators.map((op) => (
                        <motion.tr 
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          key={op._id} 
                          className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group"
                        >
                          <td className="px-8 py-6">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 dark:text-slate-500 font-black">
                                {op.name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-black text-slate-900 dark:text-white leading-tight">{op.name}</p>
                                <p className="text-sm text-slate-400 font-medium">{op.phone}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg text-[10px] font-black uppercase tracking-wider">
                              {op.category}
                            </span>
                          </td>
                          <td className="px-8 py-6">
                            <p className="text-sm font-bold text-slate-600 dark:text-slate-400">{op.location}</p>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex items-center space-x-2">
                              <div className={`w-2 h-2 rounded-full ${
                                op.status === 'approved' ? 'bg-emerald-500' : 
                                op.status === 'pending' ? 'bg-amber-500' : 'bg-red-500'
                              }`}></div>
                              <span className={`text-[10px] font-black uppercase tracking-wider ${
                                op.status === 'approved' ? 'text-emerald-600' : 
                                op.status === 'pending' ? 'text-amber-600' : 'text-red-600'
                              }`}>
                                {op.status}
                              </span>
                            </div>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <div className="flex items-center justify-end space-x-1 sm:space-x-2">
                              {op.status !== 'approved' && (
                                <button 
                                  onClick={() => handleAction(op._id, 'approved')}
                                  className="p-3 sm:p-2 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-xl transition-all active:scale-90"
                                  title="Approve"
                                >
                                  <CheckCircle className="w-5 h-5 sm:w-5 sm:h-5" />
                                </button>
                              )}
                              {op.status !== 'rejected' && (
                                <button 
                                  onClick={() => handleAction(op._id, 'rejected')}
                                  className="p-3 sm:p-2 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-xl transition-all active:scale-90"
                                  title="Reject"
                                >
                                  <XCircle className="w-5 h-5 sm:w-5 sm:h-5" />
                                </button>
                              )}
                              <button 
                                onClick={() => handleDelete(op._id)}
                                className="p-3 sm:p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all active:scale-90"
                                title="Delete"
                              >
                                <Trash2 className="w-5 h-5 sm:w-5 sm:h-5" />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-8 py-20 text-center">
                          <p className="text-slate-400 font-bold">No operators found matching your criteria.</p>
                        </td>
                      </tr>
                    )}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
