'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client'; // 👉 Better Auth client Import

export default function BookingModal({ room, isOpen, onClose }) {
  const router = useRouter();
  const today = new Date().toISOString().split('T')[0];

  const [date, setDate] = useState(today);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('11:00');
  const [specialNote, setSpecialNote] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen || !room) return null;

  const startHour = parseInt(startTime.split(':')[0], 10);
  const endHour = parseInt(endTime.split(':')[0], 10);
  const totalHours = endHour > startHour ? endHour - startHour : 0;
  const hourlyRate = room.hourlyRate || room.price || 0;
  const totalCost = totalHours * hourlyRate;

  const handleBooking = async (e) => {
    e.preventDefault();

    if (endHour <= startHour) {
      return toast.error('End time must be strictly after start time!');
    }

    setLoading(true);

    try {
      
      const sessionRes = await authClient.getSession();
      const token = sessionRes?.data?.session?.token || sessionRes?.data?.session?.id;

      const baseUrl = process.env.NEXT_PUBLIC_API_URL ;
      
   
      const headers = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch(`${baseUrl}/bookings`, {
        method: 'POST',
        headers: headers,
        credentials: 'include', 
        body: JSON.stringify({
          roomId: room._id,
          roomName: room.name || room.title,
          date,
          startTime,
          endTime,
          totalCost,
          specialNote,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Room booked successfully!');
        onClose();
        router.push('/my-bookings');
        router.refresh();
      } else {
        toast.error(data.message || 'Booking failed!');
      }
    } catch (err) {
      console.error('Booking Error:', err);
      toast.error('Something went wrong. Please try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
        <h3 className="text-xl font-bold text-slate-900">
          Book {room.name || room.roomName || room.title}
        </h3>

        <form onSubmit={handleBooking} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Select Date</label>
            <input
              type="date"
              required
              min={today}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-slate-300 rounded-lg p-2.5 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Start Time</label>
              <select
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full border border-slate-300 rounded-lg p-2.5 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {Array.from({ length: 13 }, (_, i) => {
                  const hour = i + 8;
                  const formatted = hour < 10 ? `0${hour}:00` : `${hour}:00`;
                  return <option key={formatted} value={formatted}>{formatted}</option>;
                })}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">End Time</label>
              <select
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full border border-slate-300 rounded-lg p-2.5 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {Array.from({ length: 13 }, (_, i) => {
                  const hour = i + 9;
                  const formatted = hour < 10 ? `0${hour}:00` : `${hour}:00`;
                  return <option key={formatted} value={formatted}>{formatted}</option>;
                })}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Special Note (Optional)</label>
            <input
              type="text"
              placeholder="e.g. Need additional whiteboard markers"
              value={specialNote}
              onChange={(e) => setSpecialNote(e.target.value)}
              className="w-full border border-slate-300 rounded-lg p-2.5 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3 flex justify-between items-center text-indigo-950 font-bold text-sm">
            <span>Total Calculated Cost:</span>
            <span className="text-lg font-extrabold text-indigo-600">${totalCost}</span>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 rounded-lg font-medium text-slate-700 text-sm hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || totalHours <= 0}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-lg transition disabled:opacity-50"
            >
              {loading ? 'Confirming...' : 'Confirm Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}