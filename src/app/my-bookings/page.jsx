import MyBookingsClient from '@/components/bookings/MyBookingsClient';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function MyBookingsPage() {
  const reqHeaders = await headers();

  const session = await auth.api.getSession({ headers: reqHeaders });
  if (!session?.user) {
    redirect('/login');
  }

  const tokenData = await auth.api.getToken({ headers: reqHeaders });
  const token = tokenData?.token;

  let initialBookings = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/my-bookings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    if (res.ok) {
      const data = await res.json();
      initialBookings = Array.isArray(data) ? data : data?.bookings || [];
    }
  } catch (error) {
    console.error('Failed to fetch initial bookings:', error);
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          My Bookings
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          View your booked rooms and manage your reservations.
        </p>
      </div>

      {/* 👉 নিশ্চিত করুন এখানে MyBookingsClient রয়েছে, MyListingsClient নয় */}
      <MyBookingsClient 
        initialBookings={initialBookings} 
        token={token} 
        userProfile={session.user} 
      />
    </main>
  );
}