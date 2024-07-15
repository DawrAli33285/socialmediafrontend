
  import React from "react";
  const Star = ({ filled, onMouseEnter, onMouseLeave, onClick }) => (
    <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onClick={onClick}
  >
    <path
      d="M18.3126 3.39311L13.8634 12.4141L3.90892 13.8654C2.12379 14.1243 1.40837 16.3251 2.70293 17.5856L9.90477 24.6034L8.2014 34.5171C7.8948 36.309 9.78213 37.6512 11.3629 36.8132L20.2681 32.1323L29.1733 36.8132C30.754 37.6444 32.6413 36.309 32.3347 34.5171L30.6314 24.6034L37.8332 17.5856C39.1278 16.3251 38.4123 14.1243 36.6272 13.8654L26.6727 12.4141L22.2235 3.39311C21.4264 1.78513 19.1166 1.76469 18.3126 3.39311Z"
      fill={filled ? "#FFD101" : "none"}
      stroke={filled ? "none" : "#FFD101"}
    />
  </svg>
  
  );
  const Review = ({ totalStars = 5,setRatingtwo }) => {
    const [rating, setRating] = React.useState(0);
    const [hoverRating, setHoverRating] = React.useState(0);
  
    const handleMouseEnter = (index) => {
      setHoverRating(index);
    };
  
    const handleMouseLeave = () => {
      setHoverRating(0);
    };
  
    const handleClick = (index) => {
      setRatingtwo(index);
     setRating(index)
    };
  
    return (
      <div className="flex flex-row">
        {[...Array(totalStars)].map((_, index) => (
          <Star
            key={index}
            filled={index + 1 <= (hoverRating || rating)}
            onMouseEnter={() => handleMouseEnter(index + 1)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(index + 1)}
          />
        ))}
      </div>
    );
  };
  export default Review;