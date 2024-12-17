import { TaskCard } from "@/models/task-card";
import { useContext, useEffect, useState } from "react";
import GeneralTaskCard from "./general-task-card";
import { GlobalContext } from "@/context/global-context";
import React from "react";
import { CardTaskSkeleton } from "../skeleton/card-task-skeleton";

interface Props {
  currentStatus: string;
}

const CardsGridsMobile = (props: Props) => {
  const { cards, fetching } = useContext(GlobalContext);
  const [cardsList, setCardsList] = useState<TaskCard[]>([]);

  useEffect(() => {
    console.log("MUDOU");
    setCardsList(cards);
  }, [cards]);

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
          {cardsList
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
