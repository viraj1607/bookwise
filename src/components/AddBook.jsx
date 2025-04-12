import React, { useState } from "react";

function AddBook({onAdd}) {
  const [bookName, setBookName] = useState("");

  const handleAdd = () => {
    if (bookName.trim()) {
      onAdd(bookName);
      setBookName("");
    }
  };
  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 mb-6 w-full max-w-xl mx-auto px-4">
      <input
        type="text"
        placeholder="Enter book name"
        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm"
        value={bookName}
        onChange={(e) => setBookName(e.target.value)}
      />
      <button
        onClick={handleAdd}
        className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-2 rounded-xl text-sm hover:bg-indigo-700 transition"
      >
        Add
      </button>
    </div>
  );
}

export default AddBook;
