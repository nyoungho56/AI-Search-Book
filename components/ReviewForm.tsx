import React, { useState } from 'react';

interface ReviewFormProps {
  onAddReview: (review: { author: string; content: string; password: string }) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onAddReview }) => {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !content.trim() || !password.trim()) {
      setError('모든 필드를 입력해주세요.');
      return;
    }
    if (password.length < 4) {
      setError('비밀번호는 4자리 이상이어야 합니다.');
      return;
    }
    setError('');
    onAddReview({ author, content, password });
    setAuthor('');
    setContent('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 p-6 bg-purple-50 rounded-lg shadow-inner">
      <h3 className="text-xl font-semibold text-purple-700 mb-4">리뷰 남기기</h3>
      {error && <p className="text-red-500 mb-4 bg-red-100 p-2 rounded">{error}</p>}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="이름"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          maxLength={20}
        />
        <textarea
          placeholder="리뷰 내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          rows={4}
          maxLength={500}
        />
        <input
          type="password"
          placeholder="삭제용 비밀번호 (4자리 이상)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          minLength={4}
        />
        <button
          type="submit"
          className="w-full px-4 py-3 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-300"
        >
          리뷰 등록
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
