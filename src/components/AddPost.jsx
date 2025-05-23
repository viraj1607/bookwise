// components/ThoughtInput.js
import React, { useState } from "react";

const AddPost = ({ onPost }) => {
  const [thought, setThought] = useState("");

  const handlePost = () => {
    if (thought.trim()) {
      onPost(thought);
      setThought("");
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md mb-4 dark:bg-gray-800 dark:shadow-xl">
      <textarea
        value={thought}
        onChange={(e) => setThought(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
        placeholder="Share your thoughts about a book..."
        rows="3"
      />
      <button
        onClick={handlePost}
        className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition dark:bg-indigo-500 dark:hover:bg-indigo-600"
      >
        Post
      </button>
    </div>
  );
};

export default AddPost;
