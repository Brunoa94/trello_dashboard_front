import React, { useRef } from "react";
import { TaskCard } from "@/models/task-card";
import GeneralTaskCard from "./general-task-card";
import { Draggable, Droppable } from "react-beautiful-dnd";

interface Props {
  cards: TaskCard[];
  setDraggableArea: (value: string) => void;
  setDraggingCard: (value: string) => void;
}

const CardsColumn = (props: Props) => {
  return (
    <div className="flex flex-col w-full gap-2 shrink-0">
      {props.cards.map((card: TaskCard, index: number) => (
        <Draggable draggableId={`${card.id}`} index={index} key={`${card.id}`}>
          {(provided, snapshot) => (
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
    </div>
  );
};

export default CardsColumn;
