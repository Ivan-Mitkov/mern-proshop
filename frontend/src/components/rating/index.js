import React from "react";
import './styles.scss'
const Rating = ({ value, text, color }) => {
  const stars = (value, length) => {
    const createArr = Array(length).fill(0);
    const ratingStars = createArr.map((place, index) => {
      return (
        <span key={index} style={{ color }}>
          <i
            className={
              value >= index + 1
                ? "fas fa-star"
                : value >= index + 0.5
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }
          ></i>
        </span>
      );
    });

    return ratingStars;
  };
  return (
    <div className="rating">
      {stars(value, 5)}
      <span>{text && text}</span>
    </div>
  );
};
Rating.defaultProps = {
  color: "#F8e825",
};
export default Rating;
