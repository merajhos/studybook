'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import Image from 'next/image';

export default function MyListingsClient({ initialRooms, token, userProfile }) {
  const [rooms, setRooms] = useState(initialRooms || []);
  const [editingRoom, setEditingRoom] = useState(null);
  const [deletingRoomId, setDeletingRoomId] = useState(null);
  const [viewingRoom, setViewingRoom] = useState(null);

  const [editFormData, setEditFormData] = useState({ name: '', description: '', price: '' });
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  // Edit 
  const handleOpenEdit = (room) => {
    setEditingRoom(room);
    setEditFormData({
      name: room.name || '',
      description: room.description || '',
      price: room.price || room.hourlyRate || '',
    });
  };


  const handleUpdateRoom = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${baseUrl}/rooms/${editingRoom._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editFormData),
      });

      if (res.ok) {
        toast.success('Room updated successfully!');
        setRooms((prev) =>
          prev.map((r) => (r._id === editingRoom._id ? { ...r, ...editFormData } : r))
        );
        setEditingRoom(null);
      } else {
        toast.error('Failed to update room');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error updating room');
    }
  };

  const handleDeleteRoom = async () => {
    try {
      const res = await fetch(`${baseUrl}/rooms/${deletingRoomId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        toast.success('Room deleted successfully!');
        setRooms((prev) => prev.filter((r) => r._id !== deletingRoomId));
        setDeletingRoomId(null);
      } else {
        toast.error('Failed to delete room');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error deleting room');
    }
  };

  if (!rooms || rooms.length === 0) {
    return (
      <div className="text-center py-16 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800">
        <p className="text-slate-500 font-medium">You haven't listed any rooms yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {rooms.map((room) => (
        <div
          key={room._id}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
        >
          <div>
            <div className="relative w-full h-48 bg-slate-100 dark:bg-slate-800">
              <Image
                src={room.image || 'https://images.unsplash.com/photo-1497366216548-37526070297c'}
                alt={room.name || 'Room Image'}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                {room.name}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                {room.description}
              </p>
            </div>
          </div>

          <div className="p-5 pt-0 flex flex-wrap justify-between items-center gap-2">
            <button
              onClick={() => setViewingRoom(room)}
              className="px-3.5 py-2 bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 text-indigo-600 dark:text-indigo-400 text-xs font-bold rounded-lg border border-indigo-200 dark:border-indigo-800 transition"
            >
              View Profile
            </button>
          
            <div className="flex gap-2">
              <button
                onClick={() => handleOpenEdit(room)}
                className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-lg transition"
              >
                Edit
              </button>
              <button
                onClick={() => setDeletingRoomId(room._id)}
                className="px-3.5 py-2 bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 text-rose-600 dark:text-rose-400 text-xs font-bold rounded-lg border border-rose-200 dark:border-rose-800 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}


      {viewingRoom && (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Listing & Profile View</h3>
              <button
                onClick={() => setViewingRoom(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-500 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="bg-indigo-50/60 dark:bg-indigo-950/40 p-4 rounded-2xl">
              <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase mb-2">Owner Profile</p>
              <div className="flex items-center gap-3">
                {userProfile?.image ? (
                  <Image src={userProfile.image} alt="User" width={44} height={44} className="rounded-full" />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                    {userProfile?.name ? userProfile.name[0] : 'U'}
                  </div>
                )}
                <div>
                  <p className="text-sm font-bold text-slate-800 dark:text-white">{userProfile?.name || 'Owner Name'}</p>
                  <p className="text-xs text-slate-500">{userProfile?.email || 'owner@example.com'}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex justify-between py-1 border-b">
                <span>Room Title:</span>
                <span className="font-semibold text-slate-800 dark:text-white">{viewingRoom.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span>Price Rate:</span>
                <span className="font-bold text-indigo-600">${viewingRoom.price || viewingRoom.hourlyRate || 'N/A'}/hr</span>
              </div>
            </div>

            <button
              onClick={() => setViewingRoom(null)}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl"
            >
              Exit / Close
            </button>
          </div>
        </div>
      )}

      
      {editingRoom && (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <form onSubmit={handleUpdateRoom} className="bg-white dark:bg-slate-900 p-6 rounded-2xl max-w-lg w-full space-y-4 shadow-2xl">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white border-b pb-3">Edit Room Listing</h3>
            
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Room Name</label>
                <input
                  type="text"
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  className="w-full mt-1 border border-slate-300 dark:border-slate-700 p-2.5 rounded-lg text-sm dark:bg-slate-800 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Description</label>
                <textarea
                  value={editFormData.description}
                  onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                  className="w-full mt-1 border border-slate-300 dark:border-slate-700 p-2.5 rounded-lg text-sm dark:bg-slate-800 dark:text-white"
                  rows={4}
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t">
              <button
                type="button"
                onClick={() => setEditingRoom(null)}
                className="px-4 py-2 border rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

     
      {deletingRoomId && (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl max-w-sm w-full text-center space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Confirm Deletion</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Are you sure you want to delete this room listing?</p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => setDeletingRoomId(null)}
                className="px-4 py-2 border rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteRoom}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}