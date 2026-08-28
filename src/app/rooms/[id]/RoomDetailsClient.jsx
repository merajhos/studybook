'use client';

import BookingModal from '@/components/home/BookingModal';
import { useState } from 'react';


export default function RoomDetailsClient({ room }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">
      <div className="h-80 w-full relative bg-slate-100">
        <img
          src={room.image || '/placeholder.jpeg'}
          alt={room.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-8 space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{room.name}</h1>
            <p className="text-slate-500 mt-1">Floor: {room.floor || 'N/A'}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-indigo-600">${room.hourlyRate}/hr</p>
            <p className="text-sm text-slate-500">Capacity: {room.capacity} Persons</p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg text-slate-900 mb-2">Description</h3>
          <p className="text-slate-600 leading-relaxed">{room.description}</p>
        </div>

        {room.amenities && room.amenities.length > 0 && (
          <div>
            <h3 className="font-semibold text-lg text-slate-900 mb-2">Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {room.amenities.map((item, index) => (
                <span key={index} className="bg-slate-100 text-slate-700 text-sm px-3 py-1 rounded-full border">
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => setIsBookingOpen(true)}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition"
        >
          Booking This Room
        </button>
      </div>

      <BookingModal
        room={room}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
}