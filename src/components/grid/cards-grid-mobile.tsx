import { TaskCard } from "@/models/task-card";
import { useContext } from "react";
import GeneralTaskCard from "./general-task-card";
import { GlobalContext } from "@/context/global-context";
import React from "react";
import { CardTaskSkeleton } from "../skeleton/card-task-skeleton";

interface Props {
  currentStatus: string;
}

const CardsGridsMobile = (props: Props) => {
  const { cards, fetching } = useContext(GlobalContext);

  return (
    <div className="h-full w-full flex flex-col gap-4 overflow-y-scroll rounded-md">
      {fetching ? (
        <>
          {Array.from({ length: 6 }).map((_, index) => (
            <React.Fragment key={`${props.currentStatus}-${index}`}>
              <CardTaskSkeleton />
            </React.Fragment>
          ))}
        </>
      ) : (
        <>
          {cards
            .filter((card: TaskCard) => {
              return card.status === props.currentStatus;
            })
            .map((card: TaskCard, index: number) => (
              <GeneralTaskCard card={card} index={index} />
            ))}
        </>
      )}
    </div>
  );
};

export default CardsGridsMobile;
