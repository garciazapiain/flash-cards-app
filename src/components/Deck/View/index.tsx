import { useContext } from "react";
import { DeckContext } from "../index";
import { CardData } from "../../types";

function View(): JSX.Element {
  const { cards } = useContext(DeckContext) as { cards: CardData[] };
  
  return (
    <div>
      <h1>Deck View</h1>
      <table className="card-table">
        <thead>
          <tr>
            <th>Front</th>
            <th>Back</th>
          </tr>
        </thead>
        <tbody>
          {cards.map((card) => (
            <tr key={card.id}>
              <td>{card.data.front}</td>
              <td>{card.data.back}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default View;
