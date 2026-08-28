import Link from "next/link";
import { ArrowRight } from "lucide-react";
import RoomCard from "./RoomCard";

const AvailableRooms = async () => {
  let rooms = [];
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ;

  try {
   
    const res = await fetch(`${baseUrl}/rooms?limit=6`, {
      next: { revalidate: 0 },
    });

    if (res.ok) {
      const data = await res.json();
      rooms = Array.isArray(data) ? data : data.rooms || [];
    }
  } catch (error) {
    console.error("Failed to load rooms:", error);
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-cyan-500">
            Discover
          </p>

          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Available Study Rooms
          </h2>

          <p className="mt-3 max-w-2xl text-slate-500">
            Explore the latest study spaces and choose the room that fits your
            learning style.
          </p>
        </div>

        <Link
          href="/rooms"
          className="inline-flex items-center gap-2 font-semibold text-cyan-600 hover:text-cyan-700"
        >
          View all rooms
          <ArrowRight size={18} />
        </Link>
      </div>

      {rooms.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-dashed border-slate-300 px-6 py-16 text-center">
          <h3 className="text-xl font-semibold">
            Study rooms are coming soon
          </h3>

          <p className="mt-2 text-slate-500">
            No rooms are currently available. Check back soon for new study
            spaces.
          </p>

          <Link
            href="/add-room"
            className="mt-6 inline-flex rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
          >
            Add a Room
          </Link>
        </div>
      )}
    </section>
  );
};

export default AvailableRooms;