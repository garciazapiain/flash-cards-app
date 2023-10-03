import React, { useEffect, useState, createContext } from "react";
import View from "./View/index";
import Review from "./Review/index";
import { useParams } from "react-router-dom";
import { getDeckCards } from "../../api";
import { CardData } from "../types";

interface DeckContextType {
  cards: CardData[];
  setCards: React.Dispatch<React.SetStateAction<CardData[]>>;
}

export const DeckContext = createContext<DeckContextType>({
  cards: [],
  setCards: () => {},
});

function Deck() {
  const { id } = useParams<{ id: string | undefined }>();
  const [cards, setCards] = useState<CardData[]>([]);
  const [deckViewToggle, setDeckViewToggle] = useState(false)
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Fetch cards based on the 'id' parameter from the URL
    async function loadDeckCards(deckId: number) {
    //   setLoading(true);
      try {
        const data = await getDeckCards(deckId);
        setCards(data);
      } catch (err) {
        // setError(err);
      } finally {
        // setLoading(false);
      }
    }
    if(id){
      loadDeckCards(Number(id));
    }
  }, [id]);

  const contextValue: DeckContextType = {
    cards,
    setCards,
  };

  return (
    <DeckContext.Provider value={contextValue}>
      <div>
        {id && <Review deckInReview={Number(id)}/>}
        <button onClick={()=>setDeckViewToggle(!deckViewToggle)}>View all deck cards</button>
        {deckViewToggle ? <View /> : null}
      </div>
    </DeckContext.Provider>
  );
}

export default Deck;
