import { Link } from "react-router-dom"
import AddNewCard from "./AddNewCard";


function Home() {
    return (
        <>
            <div>
                <div>
                    <Link to={`/deck/${1}`}>Deck 1</Link>
                </div>
                <div>
                    <Link to={`/deck/${2}`}>Deck 2</Link>
                </div>
                <div>
                    <Link to={`/deck/${3}`}>Deck 3</Link>
                </div>
                <div>
                    <Link to={`/deck/${4}`}>Deck 4</Link>
                </div>
            </div>
            <AddNewCard />
        </>
    );
}

export default Home;
