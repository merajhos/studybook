'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';

const AMENITY_OPTIONS = ['Whiteboard', 'Projector', 'Wi-Fi', 'Power Outlets', 'Quiet Zone', 'Air Conditioning'];

export default function AddRoomForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '', description: '', image: '', floor: '', capacity: '', hourlyRate: ''
  });
  const [amenities, setAmenities] = useState([]);

  const handleCheckbox = (item) => {
    setAmenities(prev => prev.includes(item) ? prev.filter(a => a !== item) : [...prev, item]);
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (loading) return;

  setLoading(true);

  try {
    // 1. Check logged-in user
    const { data: sessionData, error: sessionError } =
      await authClient.getSession();

    console.log("Session:", sessionData);

    if (sessionError || !sessionData?.user) {
      toast.error("Please login first!");
      return;
    }

    // 2. Get JWT token from Better Auth
    const { data: tokenData, error: tokenError } =
      await authClient.token();

    console.log("Token response:", tokenData);

    if (tokenError || !tokenData?.token) {
      console.error("JWT Token Error:", tokenError);

      toast.error("JWT token পাওয়া যায়নি। আবার login করুন।");
      return;
    }

    const token = tokenData.token;

    // 3. API URL
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      toast.error("API URL is not configured.");
      return;
    }

    // 4. Prepare room data
    const roomData = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      image: formData.image.trim(),
      floor: formData.floor.trim(),
      capacity: Number(formData.capacity),
      hourlyRate: Number(formData.hourlyRate),
      amenities,
    };

    console.log("Sending room:", roomData);

    // 5. Send request
    const res = await fetch(`${apiUrl}/rooms`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      credentials: "include",

      body: JSON.stringify(roomData),
    });

    const data = await res.json();

    console.log("Server response:", data);

    // 6. Handle response
    if (!res.ok) {
      toast.error(data?.message || "Failed to add room");
      return;
    }

    toast.success("Room added successfully!");

    router.push("/my-listings");
    router.refresh();

  } catch (error) {
    console.error("Submit Error:", error);

    toast.error(
      error?.message || "Something went wrong. Please try again."
    );
  } finally {
    setLoading(false);
  }
};
  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow border space-y-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New Study Room</h2>
      
      <input 
        type="text" 
        placeholder="Room Name" 
        required 
        value={formData.name}
        className="w-full border p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800" 
        onChange={e => setFormData({...formData, name: e.target.value})} 
      />
      
      <textarea 
        placeholder="Description" 
        required 
        value={formData.description}
        className="w-full border p-2.5 rounded-lg h-28 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800" 
        onChange={e => setFormData({...formData, description: e.target.value})} 
      />
      
      <input 
        type="url" 
        placeholder="Image URL" 
        required 
        value={formData.image}
        className="w-full border p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800" 
        onChange={e => setFormData({...formData, image: e.target.value})} 
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <input 
          type="text" 
          placeholder="Floor (e.g. 3rd Floor)" 
          required 
          value={formData.floor}
          className="border p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800" 
          onChange={e => setFormData({...formData, floor: e.target.value})} 
        />
        <input 
          type="number" 
          placeholder="Capacity" 
          required 
          value={formData.capacity}
          className="border p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800" 
          onChange={e => setFormData({...formData, capacity: e.target.value})} 
        />
        <input 
          type="number" 
          placeholder="Hourly Rate ($)" 
          required 
          value={formData.hourlyRate}
          className="border p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800" 
          onChange={e => setFormData({...formData, hourlyRate: e.target.value})} 
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700">Amenities</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {AMENITY_OPTIONS.map(item => (
            <label key={item} className="flex items-center gap-2 text-sm border p-2 rounded-lg cursor-pointer hover:bg-gray-50 text-gray-700">
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
        {loading ? 'Adding Room...' : 'Add Room'}
      </button>
    </form>
  );
}