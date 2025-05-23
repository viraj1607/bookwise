import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { updateProfile, updateEmail, updatePassword } from "firebase/auth";
import { Loader2, Pencil, MapPin, Mail, UserRound } from "lucide-react";
import axiosInstance from "../utils/axios";
import PostFeed from "../components/PostFeed";
import { dummyCommunityPosts } from "../data/feed";

const UserInfo = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [userData, setUserData] = useState({
    fullName: user?.displayName || "",
    email: user?.email || "",
    password: "",
  });
  const [userPosts, setUserPosts] = useState(dummyCommunityPosts);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (user) {
        if (userData.fullName !== user.displayName) {
          await updateProfile(user, { displayName: userData.fullName });
        }

        if (userData.email !== user.email) {
          await updateEmail(user, userData.email);
        }

        if (userData.password) {
          await updatePassword(user, userData.password);
        }

        setMessage("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Update error:", error);
      setMessage("Failed to update profile. Please re-authenticate.");
    }

    setLoading(false);
  };

  const fetchUserPosts = async () => {
    try {
      const res = await axiosInstance.get(
        `/user-posts/posts/${localStorage.getItem("uid")}`
      );
      console.log(res.data);
      setUserPosts(res.data);
    } catch (err) {
      console.error("Error fetching user posts:", err);
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, []);

  // useEffect(() => {
  //   if (user) {
  //     setUserData((prev) => ({ ...prev, email: user.email }));
  //     fetchUserPosts();
  //   }
  // }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-yellow-100 dark:from-gray-900 dark:to-gray-800 py-12 px-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {/* Left - User Info Form */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg col-span-1 max-w-md w-full">
          <h2 className="text-2xl font-bold text-indigo-600 dark:text-yellow-400 mb-6 flex items-center gap-2">
            <UserRound className="w-6 h-6" /> Your Profile
          </h2>
          <form onSubmit={handleUpdate} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                  <Pencil />
                </span>
                <input
                  type="text"
                  name="fullName"
                  value={userData.fullName}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                Email
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                  <Mail />
                </span>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                  <MapPin />
                </span>
                <input
                  type="password"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="Enter new password"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-xl flex items-center justify-center transition duration-200"
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

            {/* Success Message */}
            {message && (
              <p className="text-green-600 dark:text-green-400 text-sm text-center">
                {message}
              </p>
            )}
          </form>
        </div>

        {/* Right - User Posts */}
        <div className="col-span-2">
          <h3 className="text-2xl font-bold text-indigo-600 dark:text-yellow-400 mb-4">
            📚 Your Posts
          </h3>
          {userPosts.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-md">
              You haven't posted anything yet.
            </div>
          ) : (
            <div className="space-y-4 max-h-[500px] overflow-y-auto">
              {userPosts.map((post, i) => (
                <PostFeed key={i} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
