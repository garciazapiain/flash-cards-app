import React, { useEffect, useState } from "react";
import { Button, Typography, Box, CircularProgress } from "@mui/material";

// Define the props for the CardReview component
interface CardReviewProps {
  card: {
    front: string;
    back: string;
  } | null;
  selectedSide: 'front' | 'back' | 'random';
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

function Card({ card, selectedSide, loading, setLoading }: CardReviewProps) {
  const [currentCard, setCurrentCard] = useState<'front' | 'back' | null>(null);

  useEffect(() => {
    if (card) {
      if (selectedSide === 'random') {
        setCurrentCard(Math.random() < 0.5 ? 'front' : 'back');
      } else {
        setCurrentCard(selectedSide);
      }
      setTimeout(() => {setLoading(false)}, 300);
    }
  }, [selectedSide, card]);

  const front = card?.front.toLowerCase();
  const back = card?.back.toLowerCase();

  const handleTurn = () => {
    setCurrentCard(currentCard === 'front' ? 'back' : 'front');
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box margin={2}> {/* Adjust the margin value as needed */}
      <Typography variant="h2">
        {currentCard === "front" ? front : back}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleTurn}
      >
        Turn
      </Button>
    </Box>
  );
}

export default Card;