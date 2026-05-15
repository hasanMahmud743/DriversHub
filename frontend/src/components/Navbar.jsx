import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  Car, 
  LayoutDashboard,
  Sun,
  Moon,
  Monitor,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const { currentUser, logout, isAdmin } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact' },
    { name: 'Help', path: '/help' },
  ];

  const themes = [
    { id: 'light', icon: <Sun className="w-4 h-4" />, name: 'Light' },
    { id: 'dark', icon: <Moon className="w-4 h-4" />, name: 'Dark' },
    { id: 'system', icon: <Monitor className="w-4 h-4" />, name: 'System' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="p-2 bg-primary-600 rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-primary-500/30">
                <Car className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">Drivers Hub</span>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  location.pathname === link.path
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="h-6 w-px bg-slate-100 dark:bg-slate-800 mx-2"></div>

            {/* Theme Toggle */}
            <div className="relative">
              <button 
                onClick={() => setIsThemeOpen(!isThemeOpen)}
                className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all"
              >
                {theme === 'light' ? <Sun className="w-5 h-5" /> : theme === 'dark' ? <Moon className="w-5 h-5" /> : <Monitor className="w-5 h-5" />}
              </button>
              
              <AnimatePresence>
                {isThemeOpen && (
                  <>
                    <div className="fixed inset-0 z-0" onClick={() => setIsThemeOpen(false)}></div>
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-2xl p-2 z-10"
                    >
                      {themes.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => { setTheme(t.id); setIsThemeOpen(false); }}
                          className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${
                            theme === t.id 
                            ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600' 
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                          }`}
                        >
                          {t.icon}
                          <span>{t.name}</span>
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {currentUser ? (
              <div className="flex items-center space-x-2 ml-4">
                {isAdmin && (
                  <Link 
                    to="/admin" 
                    className="flex items-center space-x-2 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-sm font-black hover:scale-105 transition-all shadow-lg"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Admin</span>
                  </Link>
                )}
                
                <div className="relative">
                  <button 
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 p-1.5 pl-3 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-all"
                  >
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{currentUser.email.split('@')[0]}</span>
                    <div className="w-8 h-8 bg-primary-600 rounded-xl flex items-center justify-center text-white text-xs font-bold">
                      {currentUser.email.charAt(0).toUpperCase()}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <>
                        <div className="fixed inset-0 z-0" onClick={() => setIsProfileOpen(false)}></div>
                        <motion.div 
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10"
                        >
                          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Logged in as</p>
                            <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{currentUser.email}</p>
                          </div>
                          <div className="p-2">
                            <button 
                              onClick={handleLogout}
                              className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl font-bold transition-all"
                            >
                              <LogOut className="w-5 h-5" />
                              <span>Sign Out</span>
                            </button>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2 ml-4">
                <Link to="/login" className="px-6 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">Login</Link>
                <Link to="/register" className="px-6 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/20">Sign Up</Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Theme Toggle (Simple Switch) */}
            <button 
              onClick={() => {
                // If system, toggle to the opposite of current system theme
                if (theme === 'system') {
                  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  setTheme(isDark ? 'light' : 'dark');
                } else {
                  setTheme(theme === 'dark' ? 'light' : 'dark');
                }
              }}
              className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all"
            >
              {/* Resolve icon based on effective theme */}
              {(theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) 
                ? <Sun className="w-5 h-5" /> 
                : <Moon className="w-5 h-5" />
              }
            </button>

            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-600 dark:text-slate-300">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-base font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl"
                >
                  {link.name}
                </Link>
              ))}
              
              {currentUser && isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-2 px-4 py-3 text-base font-bold text-primary-600 bg-primary-50 dark:bg-primary-900/20 rounded-xl"
                >
                  <LayoutDashboard className="w-5 h-5" />
                  <span>Admin Dashboard</span>
                </Link>
              )}

              {currentUser ? (
                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center px-4 py-3 space-x-4">
                    <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white font-bold">
                      {currentUser.email.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{currentUser.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 font-bold"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col space-y-2">
                  <Link to="/login" onClick={() => setIsOpen(false)} className="px-4 py-3 text-center font-bold text-slate-600 dark:text-slate-400">Login</Link>
                  <Link to="/register" onClick={() => setIsOpen(false)} className="px-4 py-3 bg-primary-600 text-white rounded-xl text-center font-bold">Sign Up</Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
