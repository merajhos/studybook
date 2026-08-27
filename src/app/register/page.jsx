'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { signUp } from '@/lib/auth-client';
import GoogleButton from '@/components/auth/GoogleButton';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', image: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'StudyNook – Register';
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Password Validation
    if (formData.password.length < 6) {
      return setError('Password must be at least 6 characters long.');
    }
    if (!/[A-Z]/.test(formData.password)) {
      return setError('Password must contain at least one uppercase letter.');
    }
    if (!/[a-z]/.test(formData.password)) {
      return setError('Password must contain at least one lowercase letter.');
    }

    setLoading(true);

    try {
      const res = await signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        image: formData.image,
      });

      if (res?.error) {
        setError(res.error.message || 'Registration failed');
      } else {
        toast.success('Registration successful! Please login.');
        router.push('/login');
      }
    } catch (err) {
      setError(err?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 p-8 bg-white rounded-2xl shadow-lg border border-slate-100">
      <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-6">Create Account</h2>

      {error && (
        <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
          <input
            type="text"
            required
            placeholder="John Doe"
            autoComplete="name"
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <input
            type="email"
            required
            placeholder="student@university.edu"
            autoComplete="email"
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Photo URL</label>
          <input
            type="url"
            required
            placeholder="https://example.com/photo.jpg"
            autoComplete="photo"
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
          <input
            type="password"
            required
            placeholder="••••••••"
            autoComplete="new-password"
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-200 disabled:bg-indigo-400"
        >
          {loading ? 'Creating Account...' : 'Register'}
        </button>
      </form>

      <div className="my-6 flex items-center justify-between">
        <span className="border-b w-1/5"></span>
        <span className="text-xs text-slate-400 uppercase font-bold">OR</span>
        <span className="border-b w-1/5"></span>
      </div>

      <GoogleButton label="Sign up with Google" />

      <p className="mt-6 text-center text-sm text-slate-600">
        Already have an account?{' '}
        <Link href="/login" className="text-indigo-600 font-bold hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}