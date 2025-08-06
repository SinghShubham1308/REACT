import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 mt-12">
      <div className="max-w-screen-xl mx-auto px-4 py-6 text-center text-sm text-slate-500 dark:text-slate-400">
        <p>
          &copy; {new Date().getFullYear()} CREX Clone. All Rights Reserved.
        </p>
        <p className="mt-1">For Educational Purposes Only.</p>
      </div>
    </footer>
  );
};
