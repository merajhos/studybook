'use client';
import toast from 'react-hot-toast';

export default function DeleteRoomAlert({ roomId, isOpen, onClose, onSuccess }) {
  if (!isOpen) return null;

  const handleDelete = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms/${roomId}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    if (res.ok) {
      toast.success('Room deleted successfully');
      onSuccess();
    } else {
      toast.error('Failed to delete room');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-xl max-w-sm w-full text-center space-y-4">
        <h3 className="text-lg font-bold">Confirm Delete</h3>
        <p className="text-sm text-slate-600">Are you sure you want to delete this room?</p>
        <div className="flex justify-center gap-3">
          <button onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
          <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded">Delete</button>
        </div>
      </div>
    </div>
  );
}