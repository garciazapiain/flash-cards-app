// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, doc, getDoc, getDocs, getFirestore, query, addDoc, updateDoc, where, DocumentData, DocumentReference, QueryDocumentSnapshot, orderBy, deleteDoc } from "firebase/firestore";
import { CardData } from "./components/types";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
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
        deckOfDay: doc.data().deckOfDay || false,
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
        deckOfDay: doc.data().deckOfDay || false,
      },
    };
    return cardData;
  });
  return deckCards;
}

export async function updateCard(cardId: string, increment: number): Promise<void> {
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

// Set random deck of the day
export async function setRandomDeckOfDay(deck: number, numberOfCards: number) {

  const q = query(collectionRef, where("deck", "==", deck));
  const snapshot = await getDocs(q);

  const allCards = snapshot.docs;

  // Reset all cards in the deck to deckOfDay: false
  await Promise.all(
    allCards.map(docSnap =>
      updateDoc(doc(collectionRef, docSnap.id), { deckOfDay: false })
    )
  );

  // Shuffle and select random cards
  const shuffled = allCards.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, numberOfCards);

  // Set deckOfDay: true to the selected cards
  await Promise.all(
    selected.map(docSnap =>
      updateDoc(doc(collectionRef, docSnap.id), { deckOfDay: true })
    )
  );
}

// Reset deck of the day
export async function resetDeckOfDay(deck: number) {
  const q = query(collectionRef, where("deck", "==", deck));
  const snapshot = await getDocs(q);

  await Promise.all(snapshot.docs.map(docSnap => updateDoc(doc(collectionRef, docSnap.id), { deckOfDay: false })));
}

const groqApiKey = import.meta.env.VITE_GROQ_API_KEY;

export async function generateSentence(word: string) {
  console.log(groqApiKey);
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${groqApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama3-8b-8192',
      messages: [
        { 
          role: 'system', 
          content: 'You are a helpful assistant.' 
        },
        { 
          role: 'user', 
          content: `Write a short sentence in Czech using the word "${word}". Then give only its English translation. Respond exactly like this:\nCzech: <sentence>\nEnglish: <sentence>` 
        },
      ],
      max_tokens: 100,
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  const output = data.choices[0].message.content;

  // Example output:
  // Czech: Strom stojí u domu.
  // English: The tree stands by the house.

  const match = output.match(/Czech:\s*(.+)\s*English:\s*(.+)/i);

  if (!match) {
    throw new Error('Invalid response format');
  }

  const frontSentence = match[1].trim();
  const backSentence = match[2].trim();

  console.log('Front Sentence:', frontSentence); // Czech sentence
  console.log('Back Sentence:', backSentence);   // English translation

  return { frontSentence, backSentence };
}
