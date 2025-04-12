import React from "react";
import BookCard from "../components/BookCard";
import AddBook from "../components/AddBook";
import geminiAI from "../../services/GeminiAPI";

function MyBooks() {
  const handleAddBook = async (bookName) => {
    console.log("Book to add:", bookName);
    const prompt = `Given the name of a book, return the following information in JSON format:

        - title: Full title of the book
        - author: Name of the author
        - genre: Genre or category of the book
        - summary: A short and clear summary of the book
        - rating: A number between 1 and 5 indicating the average reader rating (can be a float)

        Book Name: ${bookName}`;
    const AIresponse = await geminiAI(prompt);
    console.log("AIresponse", AIresponse);
  };

  return (
    <div className="py-8">
      <h1 className="text-center text-2xl font-bold text-indigo-600 mb-4">
        My Books
      </h1>
      <AddBook onAdd={handleAddBook} />
      <BookCard
        title="Atomic Habits"
        author="James Clear"
        genre="Self-help"
        summary="A guide to building good habits and breaking bad ones through small changes."
        dateAdded="April 12, 2025"
        rating={4.5}
      />
    </div>
  );
}

export default MyBooks;
