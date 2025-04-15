import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { Loader2 } from "lucide-react";

const UserInfo = () => {
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    location: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const auth = getAuth();
  const user = auth.currentUser;

  const handleChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulated delay
    setTimeout(() => {
      setMessage("Profile updated successfully!");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-yellow-50 to-indigo-100">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-lg">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-indigo-600">
          Update Your Profile
        </h2>
        <form onSubmit={handleUpdate} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="text-sm text-gray-600 font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={userData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-600 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="text-sm text-gray-600 font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={userData.location}
              onChange={handleChange}
              placeholder="City, State"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm text-gray-600 font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={userData.phone}
              onChange={handleChange}
              placeholder="Your phone number"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-xl transition duration-200 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-4 h-4 mr-2" />
                Updating...
              </>
            ) : (
              "Update Info"
            )}
          </button>
        </form>

        {/* Message */}
        {message && (
          <div className="mt-6 text-center text-green-600 font-medium">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
