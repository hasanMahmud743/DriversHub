import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, AlertCircle, Loader2, Car, ArrowRight } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, googleSignIn } = useAuth();
  const navigate = useNavigate();

  async function handleGoogleSignIn() {
    try {
      setError('');
      setLoading(true);
      await googleSignIn();
      navigate('/');
    } catch (err) {
      setError('Failed to sign in with Google.');
      console.error(err);
    }
    setLoading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Failed to sign in. Please check your credentials.');
      console.error(err);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen pt-24 flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 transition-colors duration-500">
      <div className="max-w-xl w-full animate-fade-in">
        <div className="text-center mb-8 lg:mb-12">
          <div className="inline-flex p-4 sm:p-6 bg-slate-900 dark:bg-primary-600 rounded-[24px] sm:rounded-[32px] shadow-2xl shadow-slate-900/20 dark:shadow-primary-500/30 mb-6 sm:mb-8">
            <Car className="text-white w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">Welcome Back</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-3 text-base sm:text-lg font-medium px-4">Log in to manage your transit contributions.</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 sm:p-12 lg:p-16 rounded-[40px] sm:rounded-[60px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] dark:shadow-none border border-slate-100 dark:border-slate-800">
          {error && (
            <div className="mb-10 flex items-center space-x-4 p-6 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-[32px] border border-red-100 dark:border-red-900/30">
              <AlertCircle className="w-7 h-7 flex-shrink-0" />
              <p className="font-bold">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-3">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 dark:group-focus-within:text-primary-500 transition-colors w-6 h-6" />
                <input 
                  required
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-slate-900 dark:focus:border-primary-500 rounded-[28px] py-5 pl-16 pr-8 outline-none transition-all font-black text-slate-900 dark:text-white placeholder:text-slate-300"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-3">Security Key</label>
              <div className="relative group">
                <Lock className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 dark:group-focus-within:text-primary-500 transition-colors w-6 h-6" />
                <input 
                  required
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-slate-900 dark:focus:border-primary-500 rounded-[28px] py-5 pl-16 pr-8 outline-none transition-all font-black text-slate-900 dark:text-white placeholder:text-slate-300"
                />
              </div>
            </div>

            <button 
              disabled={loading}
              type="submit" 
              className="w-full bg-slate-900 dark:bg-primary-600 text-white rounded-[28px] py-6 flex items-center justify-center space-x-4 disabled:opacity-50 shadow-2xl shadow-slate-900/20 hover:bg-primary-600 dark:hover:bg-primary-700 transition-all font-black text-xl active:scale-95 group"
            >
              {loading ? <Loader2 className="w-8 h-8 animate-spin" /> : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 flex flex-col space-y-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100 dark:border-slate-800"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
                <span className="bg-white dark:bg-slate-900 px-6 text-slate-400 font-black">Secure Login</span>
              </div>
            </div>

            <button 
              onClick={handleGoogleSignIn}
              type="button"
              className="w-full flex items-center justify-center space-x-3 sm:space-x-4 py-4 sm:py-5 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl sm:rounded-[28px] hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 transition-all font-black text-slate-800 dark:text-slate-200 shadow-sm"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-base sm:text-lg">Continue with Google</span>
            </button>
          </div>

          <div className="mt-12 text-center pt-10 border-t border-slate-50 dark:border-slate-800">
            <p className="text-slate-500 dark:text-slate-400 font-bold">
              New to the Hub? {' '}
              <Link to="/register" className="text-primary-600 dark:text-primary-400 font-black hover:underline ml-2">Create Account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
