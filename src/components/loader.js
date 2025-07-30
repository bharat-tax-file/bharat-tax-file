import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-white/80 dark:bg-black/70 z-[9999] flex flex-col items-center justify-center">
      <div className="w-16 h-16 border-4 border-indigo-500 border-dashed rounded-full animate-spin"></div>
      <p className="mt-4 text-indigo-600 dark:text-indigo-400 text-lg font-medium">
        Please wait...
      </p>
    </div>
  );
};

export default Loader;
