import React, { useEffect, useState, createContext } from "react";
import View from "./View/index";
import Review from "./Review/index";
import { useParams } from "react-router-dom";
import { getDeckCards, resetDeckOfDay, setRandomDeckOfDay } from "../../api";
import { CardData } from "../types";
import Header from "../Header";
import { Box, Button, CircularProgress, Container, Paper, Typography, TextField } from "@mui/material";

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
  const [reviewMode, setReviewMode] = useState(false);
  const [randomCount, setRandomCount] = useState(1);
  const [hasDeckOfDay, setHasDeckOfDay] = useState(false);
  const [deckOfDayMode, setDeckOfDayMode] = useState(false);
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

  useEffect(() => {
    if (cards.some(card => card.data.deckOfDay)) {
      setHasDeckOfDay(true);
    } else {
      setHasDeckOfDay(false);
    }
  }, [cards]);

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
            {id && cards.length > 0 ? (
              reviewMode ? (
                <Review deckInReview={Number(id)} deckOfDayOnly={deckOfDayMode} />
              ) : (
                <Paper elevation={3} style={{ padding: "1rem", marginTop: "1rem" }}>
                  <Typography variant="h5">Deck Menu</Typography>

                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => setReviewMode(true)}
                    style={{ marginTop: "1rem", marginRight: "0.5rem" }}
                  >
                    Review All Cards
                  </Button>
                  {!hasDeckOfDay && (
                    <Box mt={2}>
                      <TextField
                        label="Number of random cards"
                        type="number"
                        value={randomCount}
                        onChange={(e) => setRandomCount(Number(e.target.value))}
                        inputProps={{ min: 1, max: cards.length }}
                        style={{ marginRight: "0.5rem" }}
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={async () => {
                          await setRandomDeckOfDay(Number(id), randomCount);
                          const refreshedCards = await getDeckCards(Number(id));
                          setCards(refreshedCards);
                        }}
                      >
                        Set Random Deck of the Day
                      </Button>
                    </Box>
                  )}

                  {hasDeckOfDay && (
                    <Box mt={2}>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => {
                          setDeckOfDayMode(true);
                          setReviewMode(true);
                        }}
                        style={{ marginRight: "0.5rem" }}
                      >
                        Deck of the Day
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={async () => {
                          await resetDeckOfDay(Number(id));
                          const refreshedCards = await getDeckCards(Number(id));
                          setCards(refreshedCards);
                        }}
                      >
                        Reset Deck of the Day
                      </Button>
                    </Box>
                  )}
                </Paper>
              )
            ) : (
              <Paper elevation={3} style={{ padding: "1rem" }}>
                <Typography variant="h5">No cards found</Typography>
              </Paper>
            )}

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
            {deckViewToggle && (
              <View
                cards={
                  reviewMode
                    ? deckOfDayMode
                      ? cards.filter((card) => card.data.deckOfDay)
                      : cards
                    : cards
                }
              />
            )}
          </>
        )}
      </Container>
    </DeckContext.Provider>
  );
}


export default Deck;
