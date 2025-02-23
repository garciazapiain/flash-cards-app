// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, doc, getDoc, getDocs, getFirestore, query, addDoc, updateDoc, where, DocumentData, DocumentReference, QueryDocumentSnapshot, orderBy, deleteDoc } from "firebase/firestore";
import { CardData } from "./components/types";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkgIbTR-IsloHpqf1S5bTgjYvi6RU90ac",
  authDomain: "flashdecks-2e557.firebaseapp.com",
  databaseURL: "https://flashdecks-2e557-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "flashdecks-2e557",
  storageBucket: "flashdecks-2e557.appspot.com",
  messagingSenderId: "22016442438",
  appId: "1:22016442438:web:86c537e9d0386f9657ca47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const collectionRef = collection(db, 'deck');

export async function getCards(): Promise<CardData[]> {
  const snapshot = await getDocs(collectionRef);
  const cards: CardData[] = snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
    const cardData: CardData = {
      id: doc.id, // Access the document ID
      data: {
        front: doc.data().front || "", // Make sure to handle missing properties if necessary
        back: doc.data().back || "",
        deck: doc.data().deck || 0,
        lastUpdated: doc.data().lastUpdated?.toDate() || new Date(),
      },
    };
    return cardData;
  });
  return cards;
}

export async function addNewCard(front: string, back: string): Promise<string> {
  try {
    // Create a new card data object
    const newCard = {
      front,
      back,
      deck: 1,
      lastUpdated: new Date(0),
    };

    // Define the collection reference here
    const collectionRef = collection(db, 'deck'); // Replace 'deck' with your actual collection name

    // Add the new card to Firestore
    const docRef: DocumentReference = await addDoc(collectionRef, newCard);

    // Return the ID of the newly created document (card)
    return docRef.id;
  } catch (error) {
    console.error("Error adding card:", error);
    throw error; // Propagate the error for error handling in components
  }
}

export async function getDeckCards(deck: number): Promise<CardData[]> {
  const q = query(
    collectionRef,
    where("deck", "==", Number(deck)),
    orderBy("lastUpdated"),
  );
  const snapshot = await getDocs(q);
  const deckCards: CardData[] = snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
    const cardData: CardData = {
      id: doc.id, // Access the document ID
      data: {
        front: doc.data().front || "", // Make sure to handle missing properties if necessary
        back: doc.data().back || "",
        deck: doc.data().deck || 0,
        lastUpdated: doc.data().lastUpdated?.toDate() || new Date(),
      },
    };
    return cardData;
  });
  return deckCards;
}

export async function updateCard(cardId: string, increment: number): Promise<void> {
  console.log('will update card')
  try {
    // Get a reference to the card document in Firestore
    const cardRef = doc(collectionRef, cardId);
    // Fetch the existing card data
    const cardSnapshot = await getDoc(cardRef);

    if (cardSnapshot.exists()) {
      // Extract the existing card data
      const cardData: DocumentData = cardSnapshot.data();

      // Update the "deck" property by incrementing it
      cardData.deck = (cardData.deck || 0) + increment;

      // Update the lastUpdatedDate property to the current date and time
      cardData.lastUpdated = new Date();

      console.log("Updating card:", cardData);

      // Update the card document in Firestore with the modified data
      await updateDoc(cardRef, cardData);
    }
  } catch (error) {
    console.error("Error updating card:", error);
  }
}

export async function updateCardTimestamp(cardId: string): Promise<void> {
  try {
    const cardRef = doc(collectionRef, cardId);

    // Only update the lastUpdated field
    await updateDoc(cardRef, {
      lastUpdated: new Date()
    });

  } catch (error) {
    console.error("Error updating card timestamp:", error);
  }
}

export async function discardCard(cardId: string) {
  try {
    // Create a reference to the card document
    const cardRef = doc(collectionRef, cardId);

    // Delete the card document from Firestore
    await deleteDoc(cardRef);

    // Return a success message or handle as needed
    return "Card deleted successfully";
  } catch (error) {
    console.error("Error deleting card:", error);
    throw error; // Propagate the error for error handling in components
  }
}