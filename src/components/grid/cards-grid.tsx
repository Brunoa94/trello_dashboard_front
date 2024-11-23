import React from "react";
import CardsColumn from "./cards-column";
import { TaskCard } from "@/models/task-card";

interface Props {
  cards: TaskCard[];
}

const CardsGrid = (props: Props) => {
  const toDo = props.cards.filter((card: TaskCard) => {
    return card.status === "TO_DO";
  });
  const inProgress = props.cards.filter((card: TaskCard) => {
    return card.status === "IN_PROGRESS";
  });
  const inTesting = props.cards.filter((card: TaskCard) => {
    return card.status === "IN_TESTING";
  });
  const done = props.cards.filter((card: TaskCard) => {
    return card.status === "DONE";
  });

  return (
    <div className="w-full h-full bg-sky-800 rounded-xl px-2 md:px-4 md:grid md:grid-cols-4 md:gap-4 py-5">
      <CardsColumn cards={toDo} />
      <CardsColumn cards={inProgress} />
      <CardsColumn cards={inTesting} />
      <CardsColumn cards={done} />
    </div>
  );
};

export default CardsGrid;
