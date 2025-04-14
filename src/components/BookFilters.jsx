import React from "react";

const BookFilters = ({
  authors,
  genres,
  selectedAuthor,
  selectedGenre,
  selectedRating,
  onAuthorChange,
  onGenreChange,
  onRatingChange,
  resetFilters,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center p-4 bg-white rounded-xl shadow-md mb-6 w-full max-w-4xl mx-auto">
      {/* Author Filter */}
      <select
        value={selectedAuthor}
        onChange={(e) => onAuthorChange(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 w-full sm:w-auto"
      >
        <option value="">All Authors</option>
        {authors.map((author) => (
          <option key={author} value={author}>
            {author}
          </option>
        ))}
      </select>

      {/* Genre Filter */}
      <select
        value={selectedGenre}
        onChange={(e) => onGenreChange(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 w-full sm:w-auto"
      >
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>

      {/* Rating Filter */}
      <select
        value={selectedRating}
        onChange={(e) => onRatingChange(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full sm:w-auto"
      >
        <option value="">All Ratings</option>
        {[5, 4, 3, 2, 1].map((r) => (
          <option key={r} value={r}>
            {r} ★ & up
          </option>
        ))}
      </select>
      <button
        onClick={resetFilters}
        className="px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition text-sm font-medium w-full sm:w-auto"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default BookFilters;
