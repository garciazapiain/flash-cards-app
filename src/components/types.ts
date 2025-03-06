// api.ts
export interface CardData {
    id: string;
    data: {
      front: string;
      back: string;
      deck: number;
      lastUpdated: Date;
      deckOfDay: boolean;
    };
  }
  
  // Other API functions...
  