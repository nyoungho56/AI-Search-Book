import React, { useState, useCallback } from 'react';
import BookIcon from './components/icons/BookIcon';
import SearchIcon from './components/icons/SearchIcon';
import LoadingSpinner from './components/LoadingSpinner';
import BookCard from './components/BookCard';
import BookListItem from './components/BookListItem';
import { searchBooks } from './services/geminiService';
import type { Book } from './types';

const App: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitial, setIsInitial] = useState<boolean>(true);

  const handleSearch = useCallback(async () => {
    if (!query.trim()) {
      setError('검색할 책의 제목을 입력해주세요.');
      return;
    }
    
    setIsInitial(false);
    setIsLoading(true);
    setError(null);
    setBooks([]);
    setSelectedBook(null);

    try {
      const result = await searchBooks(query);
      setBooks(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSelectBook = (book: Book) => {
    setSelectedBook(book);
  };
  
  const handleGoBack = () => {
    setSelectedBook(null);
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }
    if (error) {
      return <p className="text-red-500 text-lg bg-red-100 p-4 rounded-lg animate-fade-in">{error}</p>;
    }
    if (selectedBook) {
      return <BookCard book={selectedBook} onBack={handleGoBack} />;
    }
    if (!isInitial && books.length > 0) {
      return (
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 animate-fade-in">
          {books.map((book) => (
            <BookListItem key={book.id} book={book} onSelect={handleSelectBook} />
          ))}
        </div>
      );
    }
    if (!isInitial && books.length === 0) {
        return (
            <div className="text-center text-gray-500 animate-fade-in">
                <p className="text-xl">"{query}"에 대한 검색 결과가 없습니다.</p>
            </div>
        )
    }
    if (isInitial) {
      return (
        <div className="text-center text-gray-500 animate-fade-in">
          <BookIcon className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-xl">알고 싶은 책을 검색해보세요.</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans flex flex-col items-center p-4 selection:bg-purple-200 selection:text-purple-800">
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
      `}</style>
      
      <div className="w-full max-w-6xl">
        <header className="flex items-center justify-center py-8">
          <BookIcon className="w-10 h-10 text-purple-600" />
          <h1 className="text-4xl font-bold ml-4 tracking-wider bg-gradient-to-r from-gray-800 to-purple-600 text-transparent bg-clip-text">
            AI 도서 검색
          </h1>
        </header>

        {!selectedBook && (
          <div className="w-full max-w-2xl mx-auto mb-8 animate-fade-in">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="예: 어린 왕자"
                className="w-full pl-5 pr-16 py-4 bg-white border-2 border-gray-300 rounded-full text-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 shadow-sm"
                disabled={isLoading}
              />
              <button
                onClick={handleSearch}
                disabled={isLoading}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-3 bg-purple-600 rounded-full text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300"
                aria-label="검색"
              >
                <SearchIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}

        <main className="w-full flex-grow flex items-start justify-center p-4">
          {renderContent()}
        </main>
      </div>
      
      <footer className="w-full text-center py-6 text-gray-500 mt-auto">
        <p>Powered by Gemini API</p>
      </footer>
    </div>
  );
};

export default App;
