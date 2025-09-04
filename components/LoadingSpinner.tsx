import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-purple-500"></div>
      <p className="text-gray-600 text-lg">AI가 책을 찾고 있어요...</p>
    </div>
  );
};

export default LoadingSpinner;
