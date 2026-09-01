import RoomCard from "@/components/home/RoomCard";


async function getRooms() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const res = await fetch(`${baseUrl}/rooms`, { cache: "no-store" });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return [];
  }
}

export default async function AllRoomsPage() {
  const rooms = await getRooms();

  return (
    <main className="max-w-7xl mx-auto px-5 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">All Study Rooms</h1>
        <p className="text-slate-600 mt-2">
          Browse through all available study spaces and pick what fits your needs.
        </p>
      </div>

      {rooms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>
      ) : (
        <div className="bg-white p-12 text-center rounded-xl border border-dashed text-slate-500">
          No study rooms found. Check back later!
        </div>
      )}
    </main>
  );
}