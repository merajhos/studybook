import { notFound } from "next/navigation";
import RoomDetailsClient from "./RoomDetailsClient"; // Dynamic Client Component for Modals

async function getRoomDetails(id) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  try {
    const res = await fetch(`${baseUrl}/rooms/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    return null;
  }
}

export default async function RoomDetailsPage({ params }) {
  const { id } = await params;
  const room = await getRoomDetails(id);

  if (!room) {
    notFound();
  }

  return (
    <main className="max-w-5xl mx-auto px-5 py-10">
      <RoomDetailsClient room={room} />
    </main>
  );
}