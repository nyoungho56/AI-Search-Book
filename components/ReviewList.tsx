import React from 'react';
import type { Review } from '../types';
import TrashIcon from './icons/TrashIcon';

interface ReviewListProps {
  reviews: Review[];
  onDeleteReview: (reviewId: string, passwordAttempt: string) => boolean;
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews, onDeleteReview }) => {
  const handleDelete = (reviewId: string) => {
    const passwordAttempt = prompt('리뷰 삭제를 위해 비밀번호를 입력하세요:');
    if (passwordAttempt === null) { // User clicked cancel
      return;
    }
    const success = onDeleteReview(reviewId, passwordAttempt);
    if (!success) {
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <div className="mt-8 space-y-4">
      {reviews.length === 0 ? (
        <p className="text-gray-500 text-center py-4">아직 리뷰가 없습니다. 첫 리뷰를 남겨주세요!</p>
      ) : (
        reviews.map((review) => (
          <div key={review.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex justify-between items-start">
            <div>
              <p className="font-semibold text-gray-800">{review.author}</p>
              <p className="text-gray-600 mt-1 whitespace-pre-wrap">{review.content}</p>
            </div>
            <button
              onClick={() => handleDelete(review.id)}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-100 rounded-full transition-colors duration-200"
              aria-label="리뷰 삭제"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewList;
