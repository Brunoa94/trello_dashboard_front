import { createContext, ReactNode, useEffect, useState } from "react";
import Service from "../core/service";
import { emptyTaskCard, TaskCard, UpdateTaskCard } from "@/models/task-card";

export interface GlobalContextType {
  cards: TaskCard[];
  updateCards: (card: UpdateTaskCard) => void;
  createCard: (card: TaskCard) => void;
  deleteCard: (id: string) => void;
  fetching: boolean;
}

export const GlobalContext = createContext<GlobalContextType>({
  cards: [],
  updateCards: () => {},
  createCard: () => {},
  deleteCard: () => {},
  fetching: true,
});

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [cards, setCards] = useState<TaskCard[]>([]);
  const [fetching, setFetching] = useState<boolean>(true);

  async function fetchCards() {
    const service = new Service();
    try {
      const response: TaskCard[] = await service.fetchCards();
      setCards(response);
      setFetching(false);
    } catch (e: any) {
      console.error("Failed to fetch cards:", e);
    }
  }

  async function updateCards(card: UpdateTaskCard) {
    let cardToUpdate: TaskCard = emptyTaskCard;

    const cardsFiltered = cards.filter((arrayCard: TaskCard) => {
      if (card.id === arrayCard.id) {
        cardToUpdate = arrayCard;
        return true;
      } else {
        return false;
      }
    });

    cardToUpdate = {
      ...cardToUpdate,
      ...card,
    };

    if (cardToUpdate.id !== "") {
      setCards([cardToUpdate, ...cardsFiltered]);
    }
  }

  async function createCard(card: TaskCard) {
    setCards([card, ...cards]);
  }

  async function deleteCard(id: string) {
    setCards([
      ...cards.filter((card: TaskCard) => {
        return card.id !== id;
      }),
    ]);
  }

  useEffect(() => {
    fetchCards();
  }, []);

  const value: GlobalContextType = {
    cards,
    updateCards,
    createCard,
    deleteCard,
    fetching,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
