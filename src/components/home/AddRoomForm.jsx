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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckbox = (item) => {
    setAmenities((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item],
    );
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    // ১. ব্যাকএন্ডের সঠিক Base URL নিশ্চিত করুন (শেষে কোনো / থাকবে না)
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://study-server-eight.vercel.app";

    // ২. সেশন থেকে JWT টোকেন স্ট্রিং বের করা (অবজেক্ট যেন না হয়)
    const token = session?.session?.token || session?.token || session?.user?.id;

    if (!token) {
      toast.error("Authentication token not found. Please login again.");
      setLoading(false);
      return;
    }

    // ৩. ডাটা পাঠানোর জন্য পে লোড তৈরি
    const roomData = {
      name: formData.name,
      description: formData.description, // নিশ্চিত করুন এটি ব্যাকএন্ডের মেসেজ নয়, টেক্সট
      capacity: Number(formData.capacity),
      hourlyRate: Number(formData.hourlyRate),
      floor: formData.floor,
      image: formData.image,
      amenities: formData.amenities || [],
    };

    // ৪. API হিট করা
    const res = await fetch(`${baseUrl}/rooms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify(roomData),
    });

    // Vercel 404 বা HTML পেজ পাঠালে তা হ্যান্ডেল করার জন্য
    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (err) {
      console.error("Server returned non-JSON response:", text);
      throw new Error("Server URL endpoint not found (404). Check API base URL.");
    }

    if (res.ok && data.success) {
      toast.success("Room added successfully!");
      router.push("/rooms");
    } else {
      toast.error(data.message || "Failed to add room");
    }
  } catch (err) {
    console.error("Submit Error:", err);
    toast.error(err.message || "Something went wrong!");
  } finally {
    setLoading(false);
  }
};

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow border space-y-4"
    >
      <h2 className="text-2xl font-bold mb-4">Add New Study Room</h2>

      <input
        type="text"
        name="name"
        placeholder="Room Name"
        required
        value={formData.name}
        onChange={handleChange}
        className="w-full border p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <textarea
        name="description"
        placeholder="Description"
        required
        value={formData.description}
        onChange={handleChange}
        className="w-full border p-2.5 rounded-lg h-28 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <input
        type="url"
        name="image"
        placeholder="Image URL"
        required
        value={formData.image}
        onChange={handleChange}
        className="w-full border p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <input
          type="text"
          name="floor"
          placeholder="Floor (e.g. 3rd Floor)"
          required
          value={formData.floor}
          onChange={handleChange}
          className="border p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          required
          min="1"
          value={formData.capacity}
          onChange={handleChange}
          className="border p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="number"
          name="hourlyRate"
          placeholder="Hourly Rate ($)"
          required
          min="0"
          value={formData.hourlyRate}
          onChange={handleChange}
          className="border p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Amenities</label>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {AMENITY_OPTIONS.map((item) => (
            <label
              key={item}
              className="flex items-center gap-2 text-sm border p-2 rounded-lg cursor-pointer hover:bg-gray-50"
            >
              <input
                type="checkbox"
                checked={amenities.includes(item)}
                onChange={() => handleCheckbox(item)}
              />

              {item}
            </label>
          ))}
        </div>
      </div>

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
