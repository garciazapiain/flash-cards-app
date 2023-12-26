import { useEffect, useState } from 'react';
import ChooseDeck from './ChooseDeck';
import AddNewCard from './AddNewCard';
import { getCards } from '../../api';
import View from '../Deck/View';
import { CardData } from '../types'; // Make sure to import the CardData type
import { Button } from '@mui/material';

function Home() {
  const [cards, setCards] = useState<CardData[]>([]);
  const [viewToggle, setViewToggle] = useState(false); // Add this line

  useEffect(() => {
    const fetchCards = async () => {
      const fetchedCards = await getCards();
      setCards(fetchedCards); // Update the state with the fetched cards
      console.log(fetchedCards);
    };

    fetchCards();
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ChooseDeck />
      <AddNewCard />
      {cards.length > 0 && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setViewToggle(!viewToggle)}
          style={{ marginTop: "1rem" }}
        >
          {viewToggle ? "Hide all cards" : "View all cards"}
        </Button>
      )}
      {viewToggle && <View cards={cards} />}
    </div>
  );
}

export default Home;