import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const StarRating = ({ rating, onRatingChange }) => {
  const handleRating = (index) => {
    onRatingChange(index + 1);
  };

  return (
    <div className="flex">
      {[...Array(5)].map((star, index) => (
        <FontAwesomeIcon
          key={index}
          icon={faStar}
          className={index < rating ? 'text-yellow-500' : 'text-gray-300'}
          onClick={() => handleRating(index)}
        />
      ))}
    </div>
  );
};

export default StarRating;