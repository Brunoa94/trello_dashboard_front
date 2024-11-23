import React from "react";
import { TaskCard } from "@/models/task-card";
import GeneralTaskCard from "./general-task-card";

interface Props {
  cards: TaskCard[];
}

const CardsColumn = (props: Props) => {
  return (
    <div className="w-full h-[calc(100vh-280px)] max-h-full bg-sky-500 rounded-xl p-4 flex flex-col items-center gap-4 overflow-y-scroll">
      {props.cards.map((card: TaskCard) => (
        <GeneralTaskCard card={card} />
      ))}
    </div>
  );
};

export default CardsColumn;
