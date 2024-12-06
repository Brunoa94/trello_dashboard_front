import React, { useRef } from "react";
import { TaskCard } from "@/models/task-card";
import GeneralTaskCard from "./general-task-card";

interface Props {
  cards: TaskCard[];
  id: string;
  setDraggableArea: (value: string) => void;
  setDraggingCard: (value: string) => void;
}

const CardsColumn = (props: Props) => {
  const dragOverItem = useRef();

  const dragEnter = (e: any) => {
    //console.log("AREA " + e.currentTarget.id);
    //props.setDraggableArea(e.currentTarget.id);
  };

  const dragEnd = (e: any) => {
    console.log("ENTREI " + props.id);
    props.setDraggableArea(e.currentTarget.id);
  };

  return (
    <div
      id={props.id}
      className="w-full h-[calc(100vh-280px)] max-h-full bg-sky-500 rounded-xl p-4 flex flex-col items-center gap-4 overflow-y-scroll"
      onDragOver={(e) => dragEnd(e)}
    >
      {props.cards.map((card: TaskCard) => (
        <GeneralTaskCard card={card} setDraggingCard={props.setDraggingCard} />
      ))}
    </div>
  );
};

export default CardsColumn;
