import React, { useState } from "react";
import geminiAI from "../../services/GeminiAPI";

const PersonalizedPicks = ({ userBooks }) => {
  const [loading, setLoading] = useState(false);
  const [picks, setPicks] = useState([]);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    setPicks([]);

    try {
      const booksList = userBooks.map((book) => book.title).join(", ");
      const prompt = `Based on the books I've read: ${booksList}, recommend 3 personalized book picks. For each, include the title, author, and why it's a good match. Format response as JSON like this: [{"title": "Book Title", "author": "Author Name", "reason": "Why it's a good match"}]`;

      const response = await geminiAI(prompt);
      const recommendations = JSON.parse(response);
      setPicks(recommendations);
    } catch (err) {
      console.error(err);
      setError("Could not fetch personalized picks.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-indigo-600 dark:text-indigo-400 mb-6">
        Personalized Picks
      </h2>

      <div className="text-center mb-6">
        <button
          onClick={handleGenerate}
          className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-full transition cursor-pointer dark:text-gray-900"
        >
          Generate Recommendations
        </button>
      </div>

      {loading && (
        <p className="text-center text-gray-600 dark:text-gray-300">
          Generating picks...
        </p>
      )}
      {error && (
        <p className="text-center text-red-500 dark:text-red-400">{error}</p>
      )}

      {picks.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {picks.map((book, idx) => (
            <div
              key={idx}
              className="p-5 border rounded-2xl shadow-sm bg-white hover:shadow-md transition dark:bg-gray-800 dark:border-gray-700"
            >
              <h4 className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                {book.title}
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 italic mb-1">
                by {book.author}
              </p>
              <p className="text-gray-600 dark:text-gray-400">{book.reason}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PersonalizedPicks;
