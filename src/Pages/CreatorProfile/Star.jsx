import React from "react";

const Star = ({ filled, onMouseEnter, onMouseLeave, onClick }) => (
    <svg width="20"
    height="20"
      fill={filled ? "#FFD700" : "#ffffff"} // Yellow if filled, white otherwise
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#ffffff"
      style={{ cursor: 'pointer' }} // Change cursor to pointer on hover
    >
      <polygon points="8 11.43 3.67 14 4.84 9.19 1 5.97 6.05 5.57 8 1 9.95 5.57 15 5.97 11.15 9.19 12.33 14 8 11.43" />
    </svg>
  );

  const StarRating = ({ totalStars = 5 ,value}) => {
    const [rating, setRating] = React.useState(0);
    const [hoverRating, setHoverRating] = React.useState(0);
  
    const handleMouseEnter = (index) => {
      setHoverRating(index);
    };
  
    const handleMouseLeave = () => {
      setHoverRating(0);
    };
  
    const handleClick = (index) => {
      setRating(index);
    };
    const getStarType = (index) => {
        if (index + 1 <= value) {
          return 'filled'; // Full star
        } else if (index + 0.5 <= value) {
          return 'half'; // Half star
        }
        return 'empty'; // Empty star
      };
    return (
        <div className="flex flex-row">
        {[...Array(totalStars)].map((_, index) => (
          <Star
            key={index}
            filled={getStarType(index) === 'filled'}
            half={getStarType(index) === 'half'}
          />
        ))}
      </div>
    );
  };
  export default StarRating;