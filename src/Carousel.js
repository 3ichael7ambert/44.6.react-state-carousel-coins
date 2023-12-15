import { useState } from "react";
import "./Carousel.css";
import Card from "./Card";


/** Carousel: displays images and arrows to navigate through them
 * 
 * Props:
 * - photos: array of {src, caption} objects
 * - title: string describing the collection of images
 * 
 * State:
 * - currCardIdx: integer for current card index
 * 
 * App --> Carousel --> Card
 */

function Carousel({ photos, title }) {
  const [currCardIdx, setCurrCardIdx] = useState(0);

  const currCard = photos[currCardIdx];
  const total = photos.length;

  // Handle both forward and backward movements
  function goArrow(direction) {
    if (direction === "forward") {
      setCurrCardIdx((prevIdx) => (prevIdx + 1) % total);
    } else if (direction === "backward") {
      setCurrCardIdx((prevIdx) => (prevIdx - 1 + total) % total);
    }
  }

  return (
    <div className="Carousel">
      <h1>{title}</h1>
      <div className="Carousel-main">
        {/* Conditionally render the left arrow based on the current index */}
        {currCardIdx > 0 && (
        <i
          className="bi bi-arrow-left-circle"
          onClick={() => goArrow("backward")}
          data-testid="left-arrow"
        />
      )}
        <Card
          caption={currCard.caption}
          src={currCard.src}
          currNum={currCardIdx + 1}
          totalNum={total}
        />
        {/* Conditionally render the right arrow based on the current index */}
        {currCardIdx < total - 1 && (
          <i
          className="bi bi-arrow-right-circle"
          onClick={() => goArrow("forward")}
          data-testid="right-arrow"
        />
        )}
      </div>
    </div>
  );
}

export default Carousel;
