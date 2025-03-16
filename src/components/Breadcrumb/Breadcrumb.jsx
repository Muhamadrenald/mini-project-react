import React from "react";
import { useNavigate } from "react-router-dom";

const Breadcrumb = ({ items }) => {
  const navigate = useNavigate();

  return (
    <nav className="flex mb-8" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index !== 0 && (
              <svg
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            )}
            {item.link ? (
              <a
                href={item.link}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.link);
                }}
                className="inline-flex items-center text-sm font-medium text-gray-700 no-underline hover:text-blue-600" // no-underline untuk menghilangkan garis bawah
              >
                {item.label}
              </a>
            ) : (
              <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
