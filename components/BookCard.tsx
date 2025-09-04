import React from 'react';
import type { Book } from '../types';
import ArrowLeftIcon from './icons/ArrowLeftIcon';

interface BookCardProps {
  book: Book;
  onBack: () => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onBack }) => {
  const previewImages = Array.from({ length: 4 }, (_, i) => `https://picsum.photos/seed/${book.id}${i}/400/300`);

  return (
    <div className="bg-white rounded-2xl shadow-2xl shadow-purple-200/50 p-6 md:p-8 w-full max-w-4xl animate-fade-in relative">
      <button 
        onClick={onBack}
        className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-2 text-gray-500 hover:text-purple-600 transition-colors duration-300"
        aria-label="뒤로 가기"
      >
        <ArrowLeftIcon className="w-6 h-6" />
        <span className="hidden md:inline">목록으로 돌아가기</span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 md:mt-0">
        <div className="md:col-span-1 flex justify-center items-start">
          <img 
            src={book.coverImageUrl} 
            alt={`Cover of ${book.title}`} 
            className="rounded-lg shadow-lg w-full max-w-xs md:max-w-full object-cover aspect-[2/3] transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="md:col-span-2 space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">{book.title}</h1>
          <div className="text-lg text-gray-600">
            <p><span className="font-semibold text-gray-800">저자:</span> {book.author}</p>
            <p><span className="font-semibold text-gray-800">출판년도:</span> {book.publicationYear}</p>
            <p><span className="font-semibold text-gray-800">출판사:</span> {book.publisher}</p>
            <p><span className="font-semibold text-gray-800">장르:</span> {book.genre}</p>
          </div>
          <div className="pt-4">
            <h2 className="text-2xl font-semibold text-purple-600 mb-2">줄거리</h2>
            <p className="text-gray-700 leading-relaxed text-justify">{book.summary}</p>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-purple-600 mb-4 border-b-2 border-purple-200 pb-2">미리보기</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {previewImages.map((src, index) => (
            <div key={index} className="overflow-hidden rounded-lg shadow-md">
              <img 
                src={src} 
                alt={`Preview image ${index + 1}`}
                className="w-full h-full object-cover aspect-video transition-transform duration-300 hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
