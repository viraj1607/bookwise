import React, { useState } from "react";

import geminiAI from "../../services/GeminiAPI";
import BookCard from "./BookCard";

const moodOptions = [
  "Happy",
  "Sad",
  "Adventurous",
  "Romantic",
  "Curious",
  "Motivated",
];

const MoodBased = () => {
  const [selectedMood, setSelectedMood] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRecommendations = async (mood) => {
    try {
      setLoading(true);
      setError("");
      setRecommendations([]);

      const prompt = `Suggest 4 books for someone who is feeling ${mood}. For each book, include the title, author, genre, rating and a short summary why it's a good fit. Format as JSON like this: [{"title": "Book Title", "author": "Author Name", "summary": "Why it's recommended","rating": A number between 1 and 5 indicating the average reader rating (can be a float)}]`;

      const aiResponse = await geminiAI(prompt);
      const cleanJSON = aiResponse.replace(/```json|```/g, "").trim();
      const parsedJSON = JSON.parse(cleanJSON);
      // console.log(parsedJSON);
      setRecommendations(parsedJSON);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch recommendations. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleMoodClick = (mood) => {
    setSelectedMood(mood);
    fetchRecommendations(mood);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-indigo-600 dark:text-yellow-400 mb-8">
        Mood-Based Recommendations
      </h2>

      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {moodOptions.map((mood) => (
          <button
            key={mood}
            onClick={() => handleMoodClick(mood)}
            className={`px-4 py-2 rounded-full border cursor-pointer transition ${
              selectedMood === mood
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-white text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white dark:bg-gray-800 dark:text-indigo-400 dark:border-indigo-400 dark:hover:bg-indigo-500 dark:hover:text-white"
            }`}
          >
            {mood}
          </button>
        ))}
      </div>

      {loading && (
        <div className="text-center text-indigo-600 dark:text-yellow-400 font-medium py-4 animate-pulse">
          Fetching your perfect book match based on your mood...
        </div>
      )}
      {error && (
        <p className="text-center text-red-500 dark:text-red-400">{error}</p>
      )}

      {recommendations.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            Books for feeling{" "}
            <span className="text-indigo-600 dark:text-yellow-400">
              {selectedMood}
            </span>
            :
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendations.map((book, index) => (
              <BookCard key={index} {...book} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodBased;
