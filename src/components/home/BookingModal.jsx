"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function BookingModal({ room, isOpen, onClose }) {
  const router = useRouter();

  const today = new Date().toISOString().split("T")[0];

  const [date, setDate] = useState(today);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("11:00");
  const [specialNote, setSpecialNote] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen || !room) return null;

  // -----------------------------
  // Time Calculation
  // -----------------------------
  const startHour = Number(startTime.split(":")[0]);
  const endHour = Number(endTime.split(":")[0]);

  const totalHours =
    endHour > startHour ? endHour - startHour : 0;

  const hourlyRate = Number(room.hourlyRate || room.price || 0);

  const totalCost = totalHours * hourlyRate;

  // -----------------------------
  // Booking Submit
  // -----------------------------
  const handleBooking = async (e) => {
    e.preventDefault();

    if (!date) {
      toast.error("Please select a date.");
      return;
    }

    if (endHour <= startHour) {
      toast.error("End time must be after start time!");
      return;
    }

    if (totalHours < 1) {
      toast.error("Minimum booking time is 1 hour.");
      return;
    }

    if (!room?._id) {
      toast.error("Room ID not found.");
      return;
    }

    setLoading(true);

    try {
      // -----------------------------
      // Get Better Auth Session
      // -----------------------------
      const sessionRes = await authClient.getSession();

      const user = sessionRes?.data?.user;
      const session = sessionRes?.data?.session;

      if (!user) {
        toast.error("Please login first!");
        setLoading(false);
        return;
      }

      const token =
        session?.token ||
        session?.id ||
        "";

      // -----------------------------
      // API URL
      // -----------------------------
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL ||
        "http://localhost:5000";

      // -----------------------------
      // Headers
      // -----------------------------
      const headers = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      // -----------------------------
      // Booking Data
      // -----------------------------
      const bookingData = {
        roomId: room._id,

        roomName:
          room.name ||
          room.roomName ||
          room.title ||
          "Study Room",

        // IMPORTANT:
        // Add Room form থেকে দেওয়া image এখানে যাবে
        roomImage: room.image || "",

        date,
        startTime,
        endTime,

        totalCost,

        specialNote: specialNote.trim(),
      };

      console.log("Booking Data:", bookingData);

      // -----------------------------
      // API Request
      // -----------------------------
      const res = await fetch(`${baseUrl}/bookings`, {
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify(bookingData),
      });

      const data = await res.json().catch(() => ({}));

      // -----------------------------
      // Success
      // -----------------------------
      if (res.ok) {
        toast.success("Room booked successfully!");

        onClose();

        router.push("/my-bookings");
        router.refresh();

        return;
      }

      // -----------------------------
      // Error
      // -----------------------------
      console.error("Booking API Error:", data);

      toast.error(
        data?.message ||
          "Booking failed. Please try again."
      );
    } catch (error) {
      console.error("Booking Error:", error);

      toast.error(
        "Something went wrong. Please check your internet connection."
      );
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // Time Options
  // -----------------------------
  const startTimeOptions = Array.from(
    { length: 13 },
    (_, i) => {
      const hour = i + 8;

      return `${String(hour).padStart(2, "0")}:00`;
    }
  );

  const endTimeOptions = Array.from(
    { length: 12 },
    (_, i) => {
      const hour = i + 9;

      return `${String(hour).padStart(2, "0")}:00`;
    }
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900">
            Book{" "}
            {room.name ||
              room.roomName ||
              room.title ||
              "Study Room"}
          </h3>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 disabled:opacity-50"
          >
            ✕
          </button>
        </div>

        {/* Room Image Preview */}
        {room.image && (
          <div className="mb-5 overflow-hidden rounded-xl">
            <img
              src={room.image}
              alt={
                room.name ||
                room.roomName ||
                "Study Room"
              }
              className="h-40 w-full object-cover"
            />
          </div>
        )}

        <form
          onSubmit={handleBooking}
          className="space-y-4"
        >

          {/* Date */}
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-600">
              Select Date
            </label>

            <input
              type="date"
              required
              min={today}
              value={date}
              onChange={(e) =>
                setDate(e.target.value)
              }
              className="w-full rounded-lg border border-slate-300 p-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Time */}
          <div className="grid grid-cols-2 gap-3">

            {/* Start Time */}
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-600">
                Start Time
              </label>

              <select
                value={startTime}
                onChange={(e) =>
                  setStartTime(e.target.value)
                }
                className="w-full rounded-lg border border-slate-300 p-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {startTimeOptions.map((time) => (
                  <option
                    key={time}
                    value={time}
                  >
                    {time}
                  </option>
                ))}
              </select>
            </div>

            {/* End Time */}
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-600">
                End Time
              </label>

              <select
                value={endTime}
                onChange={(e) =>
                  setEndTime(e.target.value)
                }
                className="w-full rounded-lg border border-slate-300 p-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {endTimeOptions.map((time) => (
                  <option
                    key={time}
                    value={time}
                  >
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Special Note */}
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-600">
              Special Note (Optional)
            </label>

            <input
              type="text"
              placeholder="e.g. Need additional whiteboard markers"
              value={specialNote}
              onChange={(e) =>
                setSpecialNote(e.target.value)
              }
              className="w-full rounded-lg border border-slate-300 p-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Booking Summary */}
          <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-4">

            <div className="mb-2 flex justify-between text-sm">
              <span className="text-slate-600">
                Hourly Rate
              </span>

              <span className="font-semibold text-slate-900">
                ${hourlyRate}/hr
              </span>
            </div>

            <div className="mb-2 flex justify-between text-sm">
              <span className="text-slate-600">
                Duration
              </span>

              <span className="font-semibold text-slate-900">
                {totalHours}{" "}
                {totalHours === 1
                  ? "hour"
                  : "hours"}
              </span>
            </div>

            <div className="flex items-center justify-between border-t border-indigo-100 pt-3">
              <span className="font-bold text-indigo-950">
                Total Cost
              </span>

              <span className="text-xl font-extrabold text-indigo-600">
                ${totalCost}
              </span>
            </div>

          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-2">

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                loading ||
                totalHours <= 0
              }
              className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Confirming..."
                : "Confirm Booking"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}