import React from "react";

const LoaderButton = ({ loading, children, ...props }) => {
  return (
    <button
      {...props}
      disabled={loading}
      className={`mt-4 flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition duration-300 shadow-md ${
        loading ? "opacity-80 cursor-not-allowed" : ""
      }`}
    >
      {loading ? (
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 00-8 8h4z"
          />
        </svg>
      ) : (
        children
      )}
    </button>
  );
};

export default LoaderButton;
