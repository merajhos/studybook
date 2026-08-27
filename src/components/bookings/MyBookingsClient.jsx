'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { VscTwitter } from 'react-icons/vsc';

export default function MyBookingsClient({ initialBookings, userProfile, token }) {
  const [bookings, setBookings] = useState(initialBookings || []);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [cancellingId, setCancellingId] = useState(null);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';


  const handleCancelBooking = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;

    setCancellingId(id);
    try {
      const res = await fetch(`${baseUrl}/bookings/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        toast.success('Booking cancelled successfully!');
        setBookings((prev) => prev.filter((b) => b._id !== id));
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || 'Failed to cancel booking');
      }
    } catch (err) {
      console.error('Error cancelling booking:', err);
      toast.error('Network error. Could not cancel booking.');
    } finally {
      setCancellingId(null);
    }
  };


  if (!bookings || bookings.length === 0) {
    return (
      <div className="text-center py-20 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800">
        <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
          📅
        </div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-1">No Bookings Found</h3>
        <p className="text-slate-500 text-sm">You haven't booked any study rooms yet.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {bookings.map((booking) => (
        <div
          key={booking._id}
          className="flex flex-col sm:flex-row bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
        >

          <div className="relative w-full sm:w-64 h-48 sm:h-auto bg-slate-100 dark:bg-slate-800 flex-shrink-0">
            <Image
              src={booking.roomImage || booking.room?.image || 'https://images.unsplash.com/photo-1497366216548-37526070297c'}
              alt={booking.roomName || 'Room'}
              fill
              className="object-cover"
            />
          </div>


          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                  {booking.roomName || 'Study Room'}
                </h3>
                <span className="px-3 py-1 text-xs font-bold rounded-full capitalize bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  {booking.status || 'Confirmed'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800">
                <div>
                  <span className="block text-xs font-bold text-slate-400 uppercase">Date</span>
                  <span className="font-semibold">{booking.date}</span>
                </div>
                <div>
                  <span className="block text-xs font-bold text-slate-400 uppercase">Time Slot</span>
                  <span className="font-semibold">
                    {booking.timeSlot || `${booking.startTime} - ${booking.endTime}`}
                  </span>
                </div>
                <div>
                  <span className="block text-xs font-bold text-slate-400 uppercase">Total Cost</span>
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400">${booking.totalCost}</span>
                </div>
              </div>
            </div>

     
            <div className="flex flex-wrap justify-end items-center gap-3 mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setSelectedBooking(booking)}
                className="px-4 py-2 bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-xs font-bold rounded-xl border border-indigo-200 dark:border-indigo-800 transition"
              >
                View Profile & Details
              </button>

              <button
                onClick={() => handleCancelBooking(booking._id)}
                disabled={cancellingId === booking._id}
                className="px-4 py-2 bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 dark:hover:bg-rose-900/50 text-rose-600 dark:text-rose-400 text-xs font-bold rounded-xl border border-rose-200 dark:border-rose-800 transition disabled:opacity-50"
              >
                {cancellingId === booking._id ? 'Cancelling...' : 'Cancel Booking'}
              </button>
            </div>
          </div>
        </div>
      ))}

  
      {selectedBooking && (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 border border-slate-200 dark:border-slate-800">
            
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Booking Profile & Info
              </h3>
              <button
                onClick={() => setSelectedBooking(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-300 font-bold transition"
                title="Exit"
              >
                <VscTwitter size={17} />

              </button>
            </div>

            <div className="bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 p-4 rounded-2xl space-y-1">
              <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">Booked By (User Profile)</p>
              <div className="flex items-center gap-3">
                {userProfile?.image ? (
                  <Image src={userProfile.image} alt="User Profile" width={44} height={44} className="rounded-full border border-indigo-200" />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-lg">
                    {userProfile?.name ? userProfile.name[0] : 'U'}
                  </div>
                )}
                <div>
                  <p className="text-sm font-bold text-slate-800 dark:text-white">{userProfile?.name || 'User'}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{userProfile?.email || selectedBooking.userEmail}</p>
                </div>
              </div>
            </div>

       
            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Room Name:</span>
                <span className="font-semibold text-slate-800 dark:text-white">{selectedBooking.roomName}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Booking ID:</span>
                <span className="font-mono text-xs font-semibold">{selectedBooking._id}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Date:</span>
                <span className="font-semibold">{selectedBooking.date}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Time Slot:</span>
                <span className="font-semibold">
                  {selectedBooking.timeSlot || `${selectedBooking.startTime} - ${selectedBooking.endTime}`}
                </span>
              </div>
              {selectedBooking.specialNote && (
                <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400">Special Note:</span>
                  <span className="font-semibold italic">{selectedBooking.specialNote}</span>
                </div>
              )}
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Total Price:</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">${selectedBooking.totalCost}</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedBooking(null)}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-semibold text-xs rounded-xl transition shadow-sm"
              >
                Exit / Close Profile View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}