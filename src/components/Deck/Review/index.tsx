import React, { useContext, useEffect, useState } from "react";
import Card from "./Card";
import { DeckContext } from "../index";
import { updateCard, discardCard } from "../../../api";

// Define the props for the DeckReview component
interface DeckReviewProps {
  deckInReview: number; // Replace with the appropriate type for deckInReview
}

function Review({ deckInReview }: DeckReviewProps) {
  // Get the cards and setCards from the context
  const { cards } = useContext(DeckContext);

  // Define the types for state variables
  const [cardInReview, setCardInReview] = React.useState<number>(0);
  const [reviewInProgress, setReviewInProgress] = React.useState<boolean>(true);

  const [showFront, setShowFront] = useState(true);

  async function correctCard() {
    // Increment the "deck" property for the current card
    const lastDeck: boolean = deckInReview === 4;
    const moveCardToNewDeck: number = lastDeck ? 0 : 1
    try {
      await updateCard(cards[cardInReview].id, moveCardToNewDeck);
      if (cardInReview < cards.length - 1) {
        setCardInReview((prev) => prev + 1);
        setShowFront(true)
      } else {
        setReviewInProgress(false);
      }
    } catch {
      console.error("error");
    }
  }

  async function wrongCard() {
    // Increment the "deck" property for the current card
    const firstDeck: boolean = deckInReview === 1;
    const moveCardToNewDeck: number = firstDeck ? 0 : -1
    try {
      await updateCard(cards[cardInReview].id, moveCardToNewDeck);
      if (cardInReview < cards.length - 1) {
        setCardInReview((prev) => prev + 1);
        setShowFront(true)
      } else {
        setReviewInProgress(false);
      }
    } catch {
      console.error("error");
    }
  }

  function skipCard() {
    if (cardInReview < cards.length - 1) {
      setCardInReview((prev) => prev + 1);
      setShowFront(true)
    } else {
      setReviewInProgress(false);
    }
  }

  async function deleteCard() {
    try {
      await discardCard(cards[cardInReview].id);
      if (cardInReview < cards.length - 1) {
        setCardInReview((prev) => prev + 1);
      } else {
        setReviewInProgress(false);
      }
    } catch {
      console.error("error");
    }
  }

  useEffect(() => {
    if (cards.length > 0) {
      if (cards.length === cardInReview) {
        setReviewInProgress(false);
      }
    }
  }, [cardInReview, cards.length]);

  return reviewInProgress && cards.length ? (
    <div>
      <h1>Deck {deckInReview} Review</h1>
      <Card card={cards[cardInReview].data} showFront={showFront} setShowFront={setShowFront} />
      <div style={{ margin: "1rem" }}>
        <button style={{ marginRight: "1rem" }} onClick={correctCard}>Correct</button>
        <button onClick={wrongCard}>Wrong</button>
      </div>
      <button style={{ marginBottom: "1rem", marginRight: "1rem" }} onClick={skipCard}>Skip</button>
      <button style={{ marginBottom: "1rem", backgroundColor: "red", color: "white" }} onClick={deleteCard}>Delete card</button>
    </div>
  ) : (
    <div>
      <h1>Finished</h1>
      <div style={{ marginBottom: "1rem"}}>
        <button onClick={() => window.location.reload()}>Review again</button>
      </div>
    </div>
  );
}

export default Review;
