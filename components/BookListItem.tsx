import React from 'react';
import type { Book } from '../types';

interface BookListItemProps {
  book: Book;
  onSelect: (book: Book) => void;
}

const BookListItem: React.FC<BookListItemProps> = ({ book, onSelect }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col"
      onClick={() => onSelect(book)}
      onKeyPress={(e) => e.key === 'Enter' && onSelect(book)}
      tabIndex={0}
      role="button"
      aria-label={`${book.title} 상세 정보 보기`}
    >
      <div className="aspect-[2/3] overflow-hidden">
        <img
          src={book.coverImageUrl}
          alt={`Cover of ${book.title}`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 flex-grow">
        <h3 className="font-bold text-lg text-gray-800 truncate" title={book.title}>
          {book.title}
        </h3>
        <p className="text-gray-600 text-sm">{book.author}</p>
      </div>
    </div>
  );
};

export default BookListItem;
