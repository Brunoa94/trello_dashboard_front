import { TaskCard } from "@/models/task-card";
import React from "react";
import GeneralTaskCard from "./general-task-card";

interface Props {
  cards: TaskCard[];
  currentStatus: string;
}

const CardsGridsMobile = (props: Props) => {
  return (
    <div className="h-full w-full flex flex-col gap-4 overflow-y-scroll rounded-md">
      {props.cards
        .filter((card: TaskCard) => {
          return card.status === props.currentStatus;
        })
        .map((card: TaskCard, index: number) => (
          <GeneralTaskCard card={card} index={index} />
        ))}
    </div>
  );
};

export default CardsGridsMobile;
