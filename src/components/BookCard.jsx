import React, { useState } from "react";
import StarRatings from "react-star-ratings";

const BookCard = ({ title, author, genre, summary, dateAdded, rating }) => {
  const [showFullSummary, setShowFullSummary] = useState(false);
  const maxLength = 180;

  const isLong = summary && summary.length > maxLength;
  const displayedSummary = showFullSummary || !isLong
    ? summary
    : `${summary.slice(0, maxLength)}...`;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5 w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
        {title}
      </h2>
      <p className="text-gray-700 dark:text-gray-300 text-sm mb-1">
        <span className="font-medium">Author:</span> {author}
      </p>
      <p className="text-gray-700 dark:text-gray-300 text-sm mb-1">
        <span className="font-medium">Genre:</span> {genre}
      </p>

      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Rating:
        </span>
        {rating && (
          <div>
            <StarRatings
              rating={rating}
              starRatedColor="#facc15"
              numberOfStars={5}
              starDimension="20px"
              starSpacing="2px"
              name="book-rating"
            />
            <span className="dark:text-white">({rating})</span>
          </div>
        )}
      </div>

      <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">
        <span className="font-medium">Summary:</span> {displayedSummary}
        {isLong && (
          <button
            onClick={() => setShowFullSummary(!showFullSummary)}
            className="text-indigo-600 dark:text-yellow-400 text-xs ml-2 hover:underline"
          >
            {showFullSummary ? "Read Less" : "Read More"}
          </button>
        )}
      </p>

      {dateAdded && (
        <div className="text-xs text-gray-400 dark:text-gray-500 text-right mt-2">
          Added on: {dateAdded}
        </div>
      )}
    </div>
  );
};

export default BookCard;
