import React, { useContext, useEffect, useState } from "react";
import Card from "./Card";
import { DeckContext } from "../index";
import { updateCard, discardCard, updateCardTimestamp } from "../../../api";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

// Define the props for the DeckReview component
interface DeckReviewProps {
  deckInReview: number; // Replace with the appropriate type for deckInReview
  deckOfDayOnly: boolean;
}

function Review({ deckInReview, deckOfDayOnly }: DeckReviewProps) {
  // Get the cards and setCards from the context
  const { cards } = useContext(DeckContext);

  const filteredCards = deckOfDayOnly
  ? cards.filter(card => card.data.deckOfDay)
  : cards;

  // Define the types for state variables
  const [cardInReview, setCardInReview] = React.useState<number>(0);
  const [reviewInProgress, setReviewInProgress] = React.useState<boolean>(true);

  const [selectedSide, setSelectedSide] = useState<'front' | 'back' | 'random'>('front');

  const [loading, setLoading] = useState(true);


  // Add this function to handle the change of the radio buttons
  const handleCardSideChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value as 'front' | 'back' | 'random';
    setSelectedSide(value);
  };

  async function correctCard() {
    // Increment the "deck" property for the current card
    const lastDeck: boolean = deckInReview === 4;
    const moveCardToNewDeck: number = lastDeck ? 0 : 1;
    try {
      await updateCard(filteredCards[cardInReview].id, moveCardToNewDeck);
      if (cardInReview < filteredCards.length - 1) {
        setCardInReview((prev) => prev + 1);
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
    const moveCardToNewDeck: number = firstDeck ? 0 : -1;
    try {
      await updateCard(filteredCards[cardInReview].id, moveCardToNewDeck);
      if (cardInReview < filteredCards.length - 1) {
        setCardInReview((prev) => prev + 1);
      } else {
        setReviewInProgress(false);
      }
    } catch {
      console.error("error");
    }
  }

  async function skipCard() {
    if (filteredCards.length === 0) return; // Avoid errors if no cards exist

    const currentCardId = filteredCards[cardInReview]?.id;

    if (currentCardId) {
      await updateCardTimestamp(currentCardId); // Only update the timestamp
    }

    if (cardInReview < filteredCards.length - 1) {
      setCardInReview((prev) => prev + 1);
      setLoading(true);
    } else {
      setReviewInProgress(false);
    }
  }

  async function deleteCard() {
    try {
      await discardCard(filteredCards[cardInReview].id);
      if (cardInReview < filteredCards.length - 1) {
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
  }, [cardInReview, filteredCards.length]);

  return reviewInProgress && filteredCards.length ? (
    <div>
      <Typography variant="h4" gutterBottom>
        Deck {deckInReview} Review
      </Typography>
      <RadioGroup row value={selectedSide} onChange={handleCardSideChange}>
        <FormControlLabel value="front" control={<Radio />} label="Front first" />
        <FormControlLabel value="back" control={<Radio />} label="Back first" />
        <FormControlLabel value="random" control={<Radio />} label="Random" />
      </RadioGroup>
      <Card card={filteredCards[cardInReview].data} selectedSide={selectedSide} loading={loading} setLoading={setLoading} />
      <Grid container spacing={2}>
        <Grid margin={1} container spacing={2}>
          <Grid item xs={6}>
            <Button variant="contained" color="primary" onClick={correctCard} fullWidth>
              Correct
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" color="primary" onClick={wrongCard} fullWidth>
              Wrong
            </Button>
          </Grid>
        </Grid>
        <Grid margin={1} container spacing={2}>
          <Grid item xs={6}>
            <Button variant="contained" color="primary" onClick={skipCard} fullWidth>
              Skip
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" style={{ backgroundColor: "red", color: "white" }} onClick={deleteCard} fullWidth>
              Delete Card
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div >
  ) : (
    <div>
      <Typography variant="h4" gutterBottom>
        Finished
      </Typography>
      <Button variant="contained" color="primary" onClick={() => window.location.reload()}>
        Review again
      </Button>
    </div>
  );
}

export default Review;
