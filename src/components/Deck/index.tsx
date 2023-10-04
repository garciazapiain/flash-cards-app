import React, { useEffect, useState, createContext } from "react";
import View from "./View/index";
import Review from "./Review/index";
import { useParams } from "react-router-dom";
import { getDeckCards } from "../../api";
import { CardData } from "../types";
import Header from "../Header";
import { Box, Button, CircularProgress, Container, Paper, Typography } from "@mui/material";

interface DeckContextType {
  cards: CardData[];
  setCards: React.Dispatch<React.SetStateAction<CardData[]>>;
}

export const DeckContext = createContext<DeckContextType>({
  cards: [],
  setCards: () => { },
});

function Deck() {
  const { id } = useParams<{ id: string | undefined }>();
  const [cards, setCards] = useState<CardData[]>([]);
  const [deckViewToggle, setDeckViewToggle] = useState(false)
  const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Fetch cards based on the 'id' parameter from the URL
    async function loadDeckCards(deckId: number) {
      setLoading(true);
      try {
        const data = await getDeckCards(deckId);
        setCards(data);
      } catch (err) {
        // setError(err);
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      loadDeckCards(Number(id));
    }
  }, [id]);

  const contextValue: DeckContextType = {
    cards,
    setCards,
  };

  return (
    <DeckContext.Provider value={contextValue}>
      <Header />
      <Container>
        {loading ? (
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <CircularProgress />
            <Typography variant="h6">Loading...</Typography>
          </div>
        ) : (
          <>
            <Box mt={2}>
              {id && cards.length > 0 ? (
                <Review deckInReview={Number(id)} />
              ) : (
                <Paper elevation={3} style={{ padding: "1rem" }}>
                  <Typography variant="h5">No cards found</Typography>
                </Paper>
              )}
            </Box>
            {cards.length > 0 && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => setDeckViewToggle(!deckViewToggle)}
                style={{ marginTop: "1rem" }}
              >
                {deckViewToggle ? "Hide all deck cards" : "View all deck cards"}
              </Button>
            )}
            {deckViewToggle && <View />}
          </>
        )}
      </Container>
    </DeckContext.Provider>
  );
}


export default Deck;
