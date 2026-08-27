// import MyBookingsClient from '@/components/bookings/MyBookingsClient';
// import { auth } from '@/lib/auth';
// import { headers } from 'next/headers';
// import { redirect } from 'next/navigation';

// export default async function MyBookingsPage() {
//   const reqHeaders = await headers();

//   // 1. Session & Auth Check
//   const session = await auth.api.getSession({ headers: reqHeaders });
//   if (!session?.user) {
//     redirect('/login');
//   }

//   const tokenData = await auth.api.getToken({ headers: reqHeaders });
//   const token = tokenData?.token;

//   // 2. Server Side Fetch
//   let initialBookings = [];
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking/my-bookings`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       cache: 'no-store', // Real-time data
//     });

//     if (res.ok) {
//       const data = await res.json();
//       initialBookings = Array.isArray(data) ? data : data?.bookings || [];
//     }
//   } catch (error) {
//     console.error('Failed to fetch initial bookings:', error);
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10">
//       <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-6">
//         My Bookings
//       </h1>
//       <MyBookingsClient 
//         initialBookings={initialBookings} 
//         userProfile={session.user} 
//         token={token} 
//       />
//     </div>
//   );
// }