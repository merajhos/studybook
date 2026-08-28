'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { signIn } from '@/lib/auth-client';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'StudyNook – Login';
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await signIn.email({
        email: formData.email,
        password: formData.password,
        callbackURL: '/',
      });

      if (error) {
        toast.error(error.message || 'Invalid email or password');
      } else {
        toast.success('Logged in successfully!');
        router.push('/');
      }
    } catch (err) {
      toast.error('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signIn.social({
        provider: 'google',
        callbackURL: '/',
      });
    } catch (err) {
      toast.error('Google login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto my-16 p-8 bg-white rounded-2xl shadow-lg border border-slate-100">
      <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-6">Welcome Back</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <input
            type="email"
            required
            placeholder="student@university.edu"
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
          <input
            type="password"
            required
            placeholder="••••••••"
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-200"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div className="my-6 flex items-center justify-between">
        <span className="border-b w-1/5"></span>
        <span className="text-xs text-slate-400 uppercase font-bold">OR</span>
        <span className="border-b w-1/5"></span>
      </div>

      <button
        type="button"
        onClick={handleGoogleLogin}
        className="w-full border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
          <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24z"/>
          <path fill="#FBBC05" d="M5.28 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.62H1.29c-.8 1.6-1.29 3.41-1.29 5.38s.49 3.78 1.29 5.38l3.99-3.14z"/>
          <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96z"/>
        </svg>
        Sign in with Google
      </button>

      <p className="mt-6 text-center text-sm text-slate-600">
        Don’t have an account?{' '}
        <Link href="/register" className="text-indigo-600 font-bold hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}