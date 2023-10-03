import { useState } from "react";
import { addNewCard } from "../../api";

function AddNewCard() {
    const [front, setFront] = useState<string>("");
    const [back, setBack] = useState<string>("");

    const handleAddCard = async () => {
        // Perform validation if needed
        if (!front || !back) {
            alert("Please fill in both front and back fields.");
            return;
        }

        try {
            // Call the addNewCard function to add the card to Firestore
            await addNewCard(front, back);

            // Clear the form fields
            setFront("");
            setBack("");

            // Optionally, you can display a success message or navigate to another page
            alert(`Card added successfully`);
        } catch (error) {
            console.error("Error adding card:", error);
        }
    };

    return (
        <div>
            <h2>Add New Card</h2>
            <div>
                <input
                    type="text"
                    placeholder="Front"
                    value={front}
                    onChange={(e) => setFront(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Back"
                    value={back}
                    onChange={(e) => setBack(e.target.value)}
                />
                <button onClick={handleAddCard}>Add Card</button>
            </div>
        </div>
    );
}

export default AddNewCard;
