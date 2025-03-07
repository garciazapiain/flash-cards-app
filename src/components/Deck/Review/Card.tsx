import React, { useEffect, useState } from "react";
import { Button, Typography, Box, CircularProgress, IconButton } from "@mui/material";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { generateSentence } from "../../../api"; // Adjust the import path if needed

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
  const [frontSentence, setFrontSentence] = useState<string>('');
  const [backSentence, setBackSentence] = useState<string>('');
  const [generating, setGenerating] = useState<boolean>(false);

  useEffect(() => {
    if (card) {
      if (selectedSide === 'random') {
        setCurrentCard(Math.random() < 0.5 ? 'front' : 'back');
      } else {
        setCurrentCard(selectedSide);
      }
      setTimeout(() => { setLoading(false); }, 300);
    }
  }, [selectedSide, card]);

  const front = card?.front.toLowerCase();
  const back = card?.back.toLowerCase();

  const handleTurn = () => {
    setCurrentCard(currentCard === 'front' ? 'back' : 'front');
  };

  const handleGenerateSentence = async () => {
    if (!front) return;
    setGenerating(true);
    try {
      const { frontSentence, backSentence } = await generateSentence(front);
      setFrontSentence(frontSentence);
      setBackSentence(backSentence);
    } catch (error) {
      console.error("Error generating sentence:", error);
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box margin={2} textAlign="center">
      <Typography variant="h2" gutterBottom>
        {currentCard === "front" ? front : back}
      </Typography>
      <Typography variant="h5" gutterBottom>
        {currentCard === "front" ? frontSentence : backSentence}
      </Typography>
      <Box display="flex" justifyContent="center" gap={2} mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleTurn}
        >
          Turn
        </Button>
        <IconButton color="secondary" onClick={handleGenerateSentence} disabled={generating}>
          <AutoAwesomeIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Card;
