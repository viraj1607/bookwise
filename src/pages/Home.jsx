import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-yellow-100 dark:from-indigo-900 dark:to-yellow-900 px-4">
      <h1 className="text-4xl sm:text-5xl font-bold text-indigo-600 dark:text-yellow-400 mb-4">
        📚 BookWise AI
      </h1>

      <motion.p
        className="text-center text-lg sm:text-xl text-gray-700 dark:text-gray-300 italic max-w-xl mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        “A reader lives a thousand lives before he dies . . . The man who never
        reads lives only one.” — George R.R. Martin
      </motion.p>

      {!localStorage.getItem("uid") ? (
        <div className="flex gap-4 flex-col sm:flex-row">
          <button
            onClick={() => navigate("/signin")}
            className="bg-indigo-600 text-white px-6 py-2 rounded-2xl shadow-md hover:bg-indigo-700 transition duration-300 cursor-pointer"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="bg-yellow-400 text-black dark:text-gray-900 px-6 py-2 rounded-2xl shadow-md hover:bg-yellow-500 transition duration-300 cursor-pointer"
          >
            Sign Up
          </button>
        </div>
      ):(
        <button
            onClick={() => navigate("/my-books")}
            className="bg-indigo-600 text-white px-6 py-2 rounded-2xl shadow-md hover:bg-indigo-700 transition duration-300 cursor-pointer"
          >
            Get Started
          </button>
      )}

      <p className="mt-10 text-gray-500 dark:text-gray-400 text-sm">
        Track your reads. Discover your next favorite book. 📖✨
      </p>
    </div>
  );
}

export default Home;
