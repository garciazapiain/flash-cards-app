import { useState } from "react";

// Define the props for the CardReview component
interface CardReviewProps {
  card: {
    front: string;
    back: string;
  } | null; // Specify that card can be null
}

function Card({ card }: CardReviewProps) {
  const [showFront, setShowFront] = useState(true);

  // Ensure that card is not null before accessing its properties
  const front = card && card.front;
  const back = card && card.back;

  return (
    <div>
      <h1>{showFront ? front : back}</h1>
      <button onClick={() => setShowFront(!showFront)}>Turn</button>
    </div>
  );
}

export default Card;
