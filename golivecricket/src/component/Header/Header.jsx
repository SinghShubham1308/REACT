// src/component/Header/Header.jsx
import { Link, NavLink } from "react-router-dom";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import { useEffect, useRef, useState } from "react";
import { SeriesDropdown } from "../SeriesDropdown/SeriesDropDown";

export const Header = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Create a ref for the dropdown container

  // This effect handles clicking outside of the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If the dropdown ref exists and the click was outside of it
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false); // Close the dropdown
      }
    };

    // Add event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);
    // Remove event listener on cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]); // Re-run effect if ref changes (it won't, but it's good practice)

  return (
    <header className="bg-white dark:bg-slate-800 text-slate-800 dark:text-white sticky top-0 z-50 shadow-md">
      <nav className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          {/* Using a generic cricket logo as a placeholder */}
          <span className="text-2xl">🏏</span>
          <span className="text-xl font-bold tracking-wide text-slate-800 dark:text-white">
            CREX
          </span>
        </Link>

        <ul className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600 dark:text-slate-300">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-orange-500" : "hover:text-orange-500"
              }
            >
              Home
            </NavLink>
          </li>
          <li className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!isDropdownOpen)} // Toggle dropdown on click
              className="hover:text-orange-500 flex items-center"
            >
              Series
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isDropdownOpen && <SeriesDropdown />}{" "}
          </li>
          <li>
            <NavLink
              to="/fixtures"
              className={({ isActive }) =>
                isActive ? "text-orange-500" : "hover:text-orange-500"
              }
            >
              Fixtures
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/stats"
              className={({ isActive }) =>
                isActive ? "text-orange-500" : "hover:text-orange-500"
              }
            >
              Stats
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/rankings"
              className={({ isActive }) =>
                isActive ? "text-orange-500" : "hover:text-orange-500"
              }
            >
              Rankings
            </NavLink>
          </li>
        </ul>
        <ThemeToggle />
      </nav>
    </header>
  );
};
