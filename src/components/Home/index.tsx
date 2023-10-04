import ChooseDeck from './ChooseDeck';
import AddNewCard from './AddNewCard';

function Home() {
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
    </div>
  );
}

export default Home;
