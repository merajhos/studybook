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

  // Token safely extract করা
  const tokenData = await auth.api.getToken({ headers: reqHeaders });
  const rawToken = typeof tokenData === 'string' ? tokenData : tokenData?.token;
  const token = typeof rawToken === 'object' ? rawToken?.token || '' : rawToken || '';

  let initialBookings = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/my-bookings`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    if (res.ok) {
      const data = await res.json();
      initialBookings = Array.isArray(data) ? data : data?.bookings || [];
    } else {
      console.error('Fetch bookings returned status:', res.status);
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

      <MyBookingsClient 
        initialBookings={initialBookings} 
        token={token} 
        userProfile={session.user} 
      />
    </main>
  );
}