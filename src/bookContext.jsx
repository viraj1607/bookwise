import React, { createContext, useContext, useState } from "react";

const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [bookTitles, setBookTitles] = useState([]);
  const [user, setUser] = useState("");

  return (
    <BookContext.Provider value={{ bookTitles, setBookTitles, user, setUser }}>
      {children}
    </BookContext.Provider>
  );
};

// Custom hook for easy use
export const useBookContext = () => useContext(BookContext);
