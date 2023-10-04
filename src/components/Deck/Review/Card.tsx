import React from "react";
import { Button, Typography, Box } from "@mui/material";

// Define the props for the CardReview component
interface CardReviewProps {
  card: {
    front: string;
    back: string;
  } | null;
  showFront: boolean;
  setShowFront: React.Dispatch<React.SetStateAction<boolean>>;
}

function Card({ card, showFront, setShowFront }: CardReviewProps) {
  // Ensure that card is not null before accessing its properties
  const front = card?.front;
  const back = card?.back;

  return (
    <Box margin={2}> {/* Adjust the margin value as needed */}
      <Typography variant="h2">
        {showFront ? front : back}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowFront(!showFront)}
      >
        Turn
      </Button>
    </Box>
  );
}

export default Card;
