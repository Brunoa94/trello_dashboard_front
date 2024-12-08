import { createContext, ReactNode, useEffect, useState } from "react";
import Service from "../core/service";
import { TaskCard } from "@/models/task-card";

export interface GlobalContextType {
  cards: TaskCard[];
}

export const GlobalContext = createContext<GlobalContextType>({
  cards: [],
});

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [cards, setCards] = useState<TaskCard[]>([]);

  async function fetchCards() {
    const service = new Service();
    try {
      const response: TaskCard[] = await service.fetchCards();
      setCards(response);
    } catch (e: any) {
      console.error("Failed to fetch cards:", e);
    }
  }

  useEffect(() => {
    fetchCards();
  }, []);

  const value: GlobalContextType = {
    cards,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
