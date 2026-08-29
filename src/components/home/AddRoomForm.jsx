"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const AMENITY_OPTIONS = [
  "Whiteboard",
  "Projector",
  "Wi-Fi",
  "Power Outlets",
  "Quiet Zone",
  "Air Conditioning",
];

export default function AddRoomForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    floor: "",
    capacity: "",
    hourlyRate: "",
  });

  const [amenities, setAmenities] = useState([]);

  // -----------------------------
  // Input Change
  // -----------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // -----------------------------
  // Checkbox
  // -----------------------------
  const handleCheckbox = (item) => {
    setAmenities((prev) =>
      prev.includes(item)
        ? prev.filter((amenity) => amenity !== item)
        : [...prev, item]
    );
  };

  // -----------------------------
  // Submit
  // -----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Remove quotation marks if user accidentally adds them
    const cleanImageUrl = formData.image
      .trim()
      .replace(/^["']|["']$/g, "");

    // Basic validation
    if (!formData.name.trim()) {
      toast.error("Room name is required");
      return;
    }

    if (!formData.description.trim()) {
      toast.error("Description is required");
      return;
    }

    if (!cleanImageUrl) {
      toast.error("Image URL is required");
      return;
    }

    // Validate URL
    try {
      new URL(cleanImageUrl);
    } catch {
      toast.error("Please enter a valid image URL");
      return;
    }

    if (Number(formData.capacity) <= 0) {
      toast.error("Capacity must be greater than 0");
      return;
    }

    if (Number(formData.hourlyRate) < 0) {
      toast.error("Hourly rate cannot be negative");
      return;
    }

    setLoading(true);

    try {
      // -----------------------------
      // Better Auth Session
      // -----------------------------
      const sessionRes = await authClient.getSession();

      const user = sessionRes?.data?.user;

      const token =
        sessionRes?.data?.session?.token ||
        sessionRes?.data?.session?.id;

      if (!user) {
        toast.error("Please login first!");
        return;
      }

      // -----------------------------
      // API URL
      // -----------------------------
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL ||
        "http://localhost:5000";

      // -----------------------------
      // Create Room
      // -----------------------------
      const res = await fetch(`${baseUrl}/rooms`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          ...(token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {}),
        },

        credentials: "include",

        body: JSON.stringify({
          name: formData.name.trim(),

          description: formData.description.trim(),

          image: cleanImageUrl,

          floor: formData.floor.trim(),

          capacity: Number(formData.capacity),

          hourlyRate: Number(formData.hourlyRate),

          amenities,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        toast.error(data?.message || "Failed to add room");
        return;
      }

      toast.success("Room added successfully!");

      // Reset form
      setFormData({
        name: "",
        description: "",
        image: "",
        floor: "",
        capacity: "",
        hourlyRate: "",
      });

      setAmenities([]);

      router.push("/my-listings");
      router.refresh();
    } catch (error) {
      console.error("Add Room Error:", error);

      toast.error(
        "Something went wrong. Please check your connection."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow border space-y-5"
    >
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Add New Study Room
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Add your study room details and make it available for booking.
        </p>
      </div>

      {/* Room Name */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">
          Room Name
        </label>

        <input
          type="text"
          name="name"
          placeholder="e.g. Quiet Study Room"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">
          Description
        </label>

        <textarea
          name="description"
          placeholder="Describe your study room..."
          required
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Image URL */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">
          Room Image URL
        </label>

        <input
          type="url"
          name="image"
          placeholder="https://example.com/room-image.jpg"
          required
          value={formData.image}
          onChange={handleChange}
          className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <p className="text-xs text-slate-500 mt-1">
          Enter any valid image URL. Do not worry if you accidentally add
          quotation marks.
        </p>
      </div>

      {/* Floor / Capacity / Rate */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Floor */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Floor
          </label>

          <input
            type="text"
            name="floor"
            placeholder="3rd Floor"
            required
            value={formData.floor}
            onChange={handleChange}
            className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Capacity */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Capacity
          </label>

          <input
            type="number"
            name="capacity"
            placeholder="10"
            min="1"
            required
            value={formData.capacity}
            onChange={handleChange}
            className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Hourly Rate */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Hourly Rate ($)
          </label>

          <input
            type="number"
            name="hourlyRate"
            placeholder="5"
            min="0"
            step="0.01"
            required
            value={formData.hourlyRate}
            onChange={handleChange}
            className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Amenities */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Amenities
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {AMENITY_OPTIONS.map((item) => (
            <label
              key={item}
              className="flex items-center gap-2 text-sm border border-slate-300 p-2.5 rounded-lg cursor-pointer hover:bg-slate-50"
            >
              <input
                type="checkbox"
                checked={amenities.includes(item)}
                onChange={() => handleCheckbox(item)}
              />

              <span>{item}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-indigo-400 transition"
      >
        {loading ? "Adding Room..." : "Add Room"}
      </button>
    </form>
  );
}