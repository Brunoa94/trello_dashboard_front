import { TaskCard } from "@/models/task-card";
import GeneralTaskCard from "./general-task-card";
import { Draggable } from "react-beautiful-dnd";
import { useContext } from "react";
import { GlobalContext } from "@/context/global-context";
import { CardTaskSkeleton } from "../skeleton/card-task-skeleton";
import React from "react";

interface Props {
  cards: TaskCard[];
  setDraggableArea: (value: string) => void;
  setDraggingCard: (value: string) => void;
  id: string;
}

const CardsColumn = (props: Props) => {
  const { fetching } = useContext(GlobalContext);

  return (
    <div className="flex flex-col w-full gap-2 shrink-0">
      {!fetching ? (
        <>
          {props.cards.map((card: TaskCard, index: number) => (
            <Draggable
              draggableId={`${card.id}`}
              index={index}
              key={`${card.id}`}
            >
              {(provided, _) => (
                <div
                  ref={provided.innerRef} // Attach the draggable's ref
                  {...provided.draggableProps} // Spread draggable props
                  {...provided.dragHandleProps} // Spread drag handle props (if required)
                >
                  <GeneralTaskCard key={card.id} card={card} index={index} />
                </div>
              )}
            </Draggable>
          ))}
        </>
      ) : (
        <>
          {Array.from({ length: 6 }).map((_, index) => (
            <React.Fragment key={`${props.id}-${index}`}>
              <CardTaskSkeleton />
            </React.Fragment>
          ))}
        </>
      )}
    </div>
  );
};

export default CardsColumn;
