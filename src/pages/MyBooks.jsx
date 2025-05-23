import React, { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import AddBook from "../components/AddBook";
import geminiAI from "../../services/GeminiAPI";
import BookFilters from "../components/BookFilters";
import booksData from "../data/dummy";
import axiosInstance from "../utils/axios";
import { useBookContext } from "../bookContext";

function MyBooks() {
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");
  const [bookList, setBookList] = useState([]);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const { setBookTitles } = useBookContext();
  const handleAddBook = async (bookName) => {
    setLoadingAdd(true);
    // console.log("Book to add:", bookName);
    const prompt = `Given the name of a book, return the following information in JSON format:
    - title: Full title of the book
    - author: Name of the author
    - genre: "genre1, genre2, genre3"
    - summary: A brief but detailed summary that helps someone recall the key storyline, themes, and characters
    - rating: A number between 1 and 5 indicating the average reader rating (can be a float)

    
    Book Name: ${bookName}`;

    const AIresponse = await geminiAI(prompt);
    const cleanJSON = AIresponse.replace(/```json|```/g, "").trim();
    const parsedJSON = JSON.parse(cleanJSON);
    console.log("AIresponse", parsedJSON);

    addBooktoList(localStorage.getItem("uid"), parsedJSON);
  };

  const addBooktoList = async (uid, newBook) => {
    // console.log(newBook);
    try {
      const response = await axiosInstance.post("/user/add-book", {
        uid,
        newBook,
      });
      // console.log(response.data);
      setLoadingAdd(false);
      setBookList(response.data.bookList);
      // return response.data;
    } catch (error) {
      console.error("Failed to add book:", error);
      throw error;
    }
  };

  const getAllBooks = async () => {
    const uid = localStorage.getItem("uid");

    try {
      const res = await axiosInstance.get(`/user/${uid}`);
      // console.log("Books:", res.data);
      setBookList(res.data);
      const titles = res.data.map((book) => book.title);
      setBookTitles(titles);
    } catch (error) {
      console.error("Failed to fetch books", error);
    }
  };

  const handleResetFilters = () => {
    setAuthor("");
    setGenre("");
    setRating("");
  };

  const filteredBooks = bookList.filter((book) => {
    return (
      (!author || book.author === author) &&
      (!genre || book.genre.includes(genre)) &&
      (!rating || book.rating >= parseFloat(rating))
    );
  });

  const uniqueAuthors = [...new Set(bookList.map((b) => b.author))];
  const uniqueGenres = [
    ...new Set(
      bookList.flatMap((b) => b.genre.split(", ").map((g) => g.trim()))
    ),
  ];

  useEffect(() => {
    getAllBooks();
  }, []);

  return (
    <div className="py-8 bg-gradient-to-br from-indigo-100 to-yellow-100 dark:from-indigo-900 dark:to-yellow-900 min-h-screen">
      <h1 className="text-center text-2xl font-bold text-indigo-600 dark:text-yellow-400 mb-4">
        My Books
      </h1>
      <AddBook onAdd={handleAddBook} loading={loadingAdd} />
      <BookFilters
        authors={uniqueAuthors}
        genres={uniqueGenres}
        selectedAuthor={author}
        selectedGenre={genre}
        selectedRating={rating}
        onAuthorChange={setAuthor}
        onGenreChange={setGenre}
        onRatingChange={setRating}
        resetFilters={handleResetFilters}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:py-2">
        {[...filteredBooks].reverse().map((book, index) => (
          <BookCard key={index} {...book} />
        ))}
      </div>
    </div>
  );
}

export default MyBooks;
