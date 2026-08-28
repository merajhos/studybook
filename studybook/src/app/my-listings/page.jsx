
import MyListingsClient from '@/components/home/MyListingsClient';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function MyListingsPage() {
  const reqHeaders = await headers();

  const session = await auth.api.getSession({ headers: reqHeaders });
  if (!session?.user) {
    redirect('/login');
  }

  const tokenData = await auth.api.getToken({ headers: reqHeaders });
  const token = tokenData?.token;

  let initialRooms = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms/my-rooms`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    if (res.ok) {
      const data = await res.json();
      initialRooms = Array.isArray(data) ? data : data?.rooms || [];
    }
  } catch (error) {
    console.error('Failed to fetch user listings:', error);
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">My Listings</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Manage, edit, or remove the rooms you have listed.
        </p>
      </div>

      <MyListingsClient initialRooms={initialRooms} token={token} />
    </main>
  );
}