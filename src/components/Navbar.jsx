'use client';

import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';

export default function Navbar() {

  const { data: session, isPending } = authClient.useSession();

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      toast.success('Logged out successfully!');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  return (
    <nav className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          <Link href="/" className="text-2xl font-black text-indigo-600">
            StudyNook Home
          </Link>
           <Link href="/add-room" className="text-slate-800 hover:text-indigo-600 font-bold bg-cyan-100 rounded-lg text-sm px-3 py-1.5">
              Add Room
            </Link>

          <div className="flex items-center gap-6">
            <Link href="/rooms" className="text-slate-600 hover:text-indigo-600 font-medium text-sm">
              All Rooms
            </Link>

           

            {!isPending && (
              <>
                {session ? (
                  <>
                    <Link href="/my-listings" className="text-slate-600 hover:text-indigo-600 font-medium text-sm">
                      My Listings
                    </Link>
                    <Link href="/my-bookings" className="text-slate-600 hover:text-indigo-600 font-medium text-sm">
                      My Bookings
                    </Link>

                    <div className="flex items-center gap-3 ml-2">
                      {session.user?.image ? (
                        <img
                          src={session.user.image}
                          alt={session.user.name || 'User'}
                          className="w-8 h-8 rounded-full object-cover border border-slate-300"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
                          {session.user?.name?.charAt(0) || 'U'}
                        </div>
                      )}

                      <button
                        onClick={handleSignOut}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-sm font-semibold transition"
                      >
                        Logout
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center gap-3">
                    <Link
                      href="/login"
                      className="text-slate-700 hover:text-indigo-600 font-semibold text-sm px-3 py-1.5"
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-4 py-2 rounded-lg transition"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}