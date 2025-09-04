import React from 'react';
import type { Book, Review } from '../types';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import ReviewList from './ReviewList';
import ReviewForm from './ReviewForm';

interface BookCardProps {
  book: Book;
  onBack: () => void;
  onSelectRecommended: (title: string) => void;
  onAddReview: (review: Omit<Review, 'id' | 'password'> & { password: string }) => void;
  onDeleteReview: (reviewId: string, passwordAttempt: string) => boolean;
}

const BookCard: React.FC<BookCardProps> = ({ book, onBack, onSelectRecommended, onAddReview, onDeleteReview }) => {
  return (
    <div className="bg-white rounded-2xl shadow-2xl shadow-purple-200/50 p-6 md:p-8 w-full max-w-4xl animate-fade-in relative">
      <button 
        onClick={onBack}
        className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-2 text-gray-500 hover:text-purple-600 transition-colors duration-300 z-10"
        aria-label="뒤로 가기"
      >
        <ArrowLeftIcon className="w-6 h-6" />
        <span className="hidden md:inline">목록으로 돌아가기</span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
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

      {book.otherBooksByAuthor && book.otherBooksByAuthor.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-purple-600 mb-4 border-b-2 border-purple-200 pb-2">이 작가의 다른 책</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {book.otherBooksByAuthor.map((otherBook, index) => (
              <button
                key={index}
                onClick={() => onSelectRecommended(otherBook.title)}
                className="flex flex-col text-center group focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-lg p-1"
                aria-label={`${otherBook.title} 상세 정보 보기`}
              >
                <div className="aspect-[2/3] w-full overflow-hidden rounded-lg shadow-md mb-2">
                  <img 
                    src={otherBook.coverImageUrl} 
                    alt={`Cover of ${otherBook.title}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className="font-semibold text-gray-800 text-sm leading-tight group-hover:text-purple-600 transition-colors duration-300">{otherBook.title}</h3>
              </button>
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-purple-600 mb-4 border-b-2 border-purple-200 pb-2">리뷰</h2>
        <ReviewList reviews={book.reviews || []} onDeleteReview={onDeleteReview} />
        <ReviewForm onAddReview={onAddReview} />
      </div>
    </div>
  );
};

export default BookCard;
