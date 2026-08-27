'use client';

import { useState } from 'react';
import EditRoomModal from './EditRoomModal';
import DeleteRoomAlert from './DeleteRoomAlert';


export default function MyRoomCard({ room, onRefresh }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <div className="border rounded-xl p-4 bg-white shadow-sm flex flex-col justify-between">
      <div>
        <h3 className="font-bold text-lg">{room.name}</h3>
        <p className="text-slate-500 text-sm">${room.hourlyRate}/hr</p>
      </div>

    
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => setIsEditOpen(true)}
          className="flex-1 bg-amber-50 text-amber-700 border border-amber-200 py-2 rounded-lg text-sm font-semibold hover:bg-amber-100"
        >
          Edit
        </button>
        <button
          onClick={() => setIsDeleteOpen(true)}
          className="flex-1 bg-red-50 text-red-700 border border-red-200 py-2 rounded-lg text-sm font-semibold hover:bg-red-100"
        >
          Delete
        </button>
      </div>

     
      <EditRoomModal
        room={room}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSuccess={onRefresh}
      />


      <DeleteRoomAlert
        roomId={room._id}
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onSuccess={onRefresh}
      />
    </div>
  );
}