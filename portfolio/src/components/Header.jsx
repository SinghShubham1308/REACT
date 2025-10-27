import React from "react";

export const Header = ({ onContactClick }) => {
  return (
    <div className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-2xl sm:text-2xl font-extrabold tracking-tight mb-3">
        {/* REPLACE WITH YOUR NAME */}
        Hi, I'm Shubham Singh
      </h1>
      <p className="text-xl sm:text-2xl text-gray-300 max-w-2xl mx-auto mb-6">
        A Java Software Developer specializing in Spring Boot, microservices,
        and building secure, enterprise-scale applications.
      </p>

      {/* Links */}
      <div className="flex justify-center space-x-4">
        <a
          href="https://www.linkedin.com/in/shubham-singh-a48b0721b/" // <-- TODO: Add your LinkedIn URL
          target="_blank"
          rel="noopener noreferrer"
          className="bg-indigo-600 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-500 transition-colors"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/SinghShubham1308" // <-- TODO: Add your GitHub URL
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-700 text-white font-medium py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
        >
          GitHub
        </a>

        {/* 2. Add the new "Contact Me" button */}
        <button
          onClick={onContactClick}
          className="bg-green-500 text-white font-medium py-2 px-4 rounded-md hover:bg-green-400 transition-colors"
        >
          Contact Me
        </button>
      </div>
    </div>
  );
};
