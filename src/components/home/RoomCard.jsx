import Link from 'next/link';

export default function RoomCard({ room }) {
  const visibleAmenities = room.amenities?.slice(0, 3) || [];
  const extraCount = (room.amenities?.length || 0) - 3;

  return (
    <div className="bg-white rounded-xl shadow-md border overflow-hidden flex flex-col justify-between h-full">
      <div>
        <img
          src={room.image || 'https://via.placeholder.com/300'}
          alt={room.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg text-slate-900">{room.name}</h3>
            <span className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-2 py-1 rounded">
              {room.floor}
            </span>
          </div>
          <p className="text-slate-600 text-sm mb-3">
            {room.description?.slice(0, 100)}...
          </p>
          <div className="text-xs text-slate-500 mb-3 font-medium">
            Capacity: {room.capacity} people | Rate: <span className="text-indigo-600 font-bold">${room.hourlyRate}/hr</span>
          </div>
          <div className="flex flex-wrap gap-1 mb-4">
            {visibleAmenities.map((item, idx) => (
              <span key={idx} className="bg-slate-100 text-slate-700 text-xs px-2 py-0.5 rounded">
                {item}
              </span>
            ))}
            {extraCount > 0 && (
              <span className="bg-slate-200 text-slate-600 text-xs px-2 py-0.5 rounded">
                +{extraCount} more
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="p-4 pt-0">
        <Link
          href={`/rooms/${room._id}`}
          className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}