import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Moon, Sun, User2 } from "lucide-react";

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // added here

  const handleUserClick = () => {
    navigate("/user-info");
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDark(savedTheme === "dark");
      document.documentElement.classList.add(savedTheme);
    } else {
      document.documentElement.classList.add("light");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);
    document.documentElement.classList.remove(isDark ? "dark" : "light");
    document.documentElement.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate("/");
      localStorage.removeItem("uid");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <>
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-md py-4 px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <div className="text-2xl font-bold text-indigo-600 dark:text-yellow-400">
            BookWise <span className="text-gray-800 dark:text-white">AI</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 text-gray-700 dark:text-gray-300 font-medium">
          {user && (
            <>
              <Link
                to="/community"
                className="hover:text-indigo-600 dark:hover:text-yellow-400 transition"
              >
                Community
              </Link>
              <Link
                to="/my-books"
                className="hover:text-indigo-600 dark:hover:text-yellow-400 transition"
              >
                My Books
              </Link>
              <Link
                to="/recommendation"
                className="hover:text-indigo-600 dark:hover:text-yellow-400 transition"
              >
                Recommendations
              </Link>
              <button
                onClick={handleLogout}
                className="hover:text-indigo-600 dark:hover:text-yellow-400 transition cursor-pointer"
              >
                Sign Out
              </button>
            </>
          )}
          <button
            onClick={toggleTheme}
            className="text-xl hover:text-indigo-600 dark:hover:text-yellow-400 transition"
            title="Toggle Theme"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          {currentUser && (
            <button
              onClick={handleUserClick}
              className="text-indigo-600 dark:text-yellow-400 hover:text-indigo-800 dark:hover:text-yellow-300 transition"
              title="User Info"
            >
              <User2 className="w-6 h-6" />
            </button>
          )}
        </nav>

        {/* Mobile Toggle Buttons */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="text-xl hover:text-indigo-600 dark:hover:text-yellow-400 dark:text-white transition"
            title="Toggle Theme"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          {user && (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="focus:outline-none"
            >
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          )}
        </div>
      </header>

      {/* Mobile Menu Outside Header */}
      {isMenuOpen && (
        <div className="fixed top-16 right-4 left-4 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded shadow-md py-4 px-6 space-y-4 z-50 md:hidden">
          <Link
            to="/community"
            onClick={() => setIsMenuOpen(false)}
            className="block text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-yellow-400"
          >
            Community
          </Link>
          <Link
            to="/my-books"
            onClick={() => setIsMenuOpen(false)}
            className="block text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-yellow-400"
          >
            My Books
          </Link>
          <Link
            to="/recommendation"
            onClick={() => setIsMenuOpen(false)}
            className="block text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-yellow-400"
          >
            Recommendation
          </Link>
          <Link
            to="/user-info"
            onClick={() => setIsMenuOpen(false)}
            className="block text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-yellow-400"
          >
            User
          </Link>
          <button
            onClick={() => {
              handleLogout();
              setIsMenuOpen(false);
            }}
            className="block text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-yellow-400"
          >
            Sign Out
          </button>
        </div>
      )}
    </>
  );
};

export default Header;
