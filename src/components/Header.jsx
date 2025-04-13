import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between">
      {/* Logo */}
      <Link to='/'>
        <div className="text-2xl font-bold text-indigo-600">
          BookWise <span className="text-gray-800">AI</span>
        </div>
      </Link>

      {/* Navigation */}
      <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
        <Link to="/my-books" className="hover:text-indigo-600 transition">
          My Books
        </Link>
        <Link className="hover:text-indigo-600 transition">Recommendation</Link>
      </nav>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <MobileMenu />
      </div>
    </header>
  );
};

const MobileMenu = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
        <svg
          className="w-6 h-6 text-gray-800"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
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

      {isOpen && (
        <div className="absolute right-6 mt-2 bg-white border rounded shadow-md py-2 px-4 space-y-2 z-50">
          <a href="#" className="block text-gray-700 hover:text-indigo-600">
            My Books
          </a>
          <a href="#" className="block text-gray-700 hover:text-indigo-600">
            Recommendation
          </a>
        </div>
      )}
    </div>
  );
};

export default Header;
