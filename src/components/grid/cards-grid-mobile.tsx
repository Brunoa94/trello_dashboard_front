import { TaskCard } from "@/models/task-card";
import React, { useContext } from "react";
import GeneralTaskCard from "./general-task-card";
import { GlobalContext } from "@/context/global-context";

interface Props {
  currentStatus: string;
}

const CardsGridsMobile = (props: Props) => {
  const { cards } = useContext(GlobalContext);

  return (
    <div className="h-full w-full flex flex-col gap-4 overflow-y-scroll rounded-md">
      {cards
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
