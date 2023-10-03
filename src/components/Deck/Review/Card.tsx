
// Define the props for the CardReview component
interface CardReviewProps {
  card: {
    front: string;
    back: string;
  } | null;
  showFront:boolean;
  setShowFront: React.Dispatch<React.SetStateAction<boolean>>;
}

function Card({ card, showFront, setShowFront }: CardReviewProps) {
  console.log(showFront)
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
