import React, { useEffect, useState } from "react";
import CardsColumn from "./cards-column";
import { TaskCard } from "@/models/task-card";

interface Props {
  cards: TaskCard[];
}

const CardsGrid = (props: Props) => {
  const [toDoCards, setToDoCards] = useState<TaskCard[]>([]);
  const [inProgressCards, setInProgressCards] = useState<TaskCard[]>([]);
  const [inTestingCards, setInTestingCards] = useState<TaskCard[]>([]);
  const [doneCards, setDoneCards] = useState<TaskCard[]>([]);
  const [allCards, setAllCards] = useState<TaskCard[]>([]);
  const [draggableArea, setDraggableArea] = useState<string>("");
  const [draggingCard, setDraggingCard] = useState<string>("");

  function setCardInNewPosition() {
    const previousColumn = draggingCard.split(".")[2];
    const cardId = draggingCard.split(".")[1];

    if (previousColumn !== draggableArea) {
      const hashArray: any = {
        TO_DO: toDoCards,
        IN_PROGRESS: inProgressCards,
        IN_TESTING: inTestingCards,
        DONE: doneCards,
      };

      const functionsHash: any = {
        TO_DO: setToDoCards,
        IN_PROGRESS: setInProgressCards,
        IN_TESTING: setInTestingCards,
        DONE: setDoneCards,
      };

      const cardMoving = hashArray[previousColumn].find((card: TaskCard) => {
        return card.title_id === cardId;
      });

      const destinationArray = [...hashArray[draggableArea]];
      functionsHash[draggableArea]([cardMoving, ...destinationArray]);

      const previousCards = [...hashArray[previousColumn]];
      const newCards = previousCards.filter((card: TaskCard) => {
        return card.title_id !== cardId;
      });

      functionsHash[previousColumn]([...newCards]);
      setDraggableArea("");
      setDraggingCard("");
    }
  }

  useEffect(() => {
    console.log("LOG: " + draggableArea + "  " + draggingCard);
    if (draggableArea !== "" && draggingCard !== "") {
      console.log("EXECUTEI");
      setCardInNewPosition();
    }
  }, [draggableArea, draggingCard]);

  useEffect(() => {
    if (props.cards) {
      setToDoCards([
        ...props.cards.filter(
          (tempCard: TaskCard) => tempCard.status === "TO_DO"
        ),
      ]);
      setInProgressCards([
        ...props.cards.filter(
          (tempCard: TaskCard) => tempCard.status === "IN_PROGRESS"
        ),
      ]);
      setInTestingCards([
        ...props.cards.filter(
          (tempCard: TaskCard) => tempCard.status === "IN_TESTING"
        ),
      ]);
      setDoneCards([
        ...props.cards.filter(
          (tempCard: TaskCard) => tempCard.status === "DONE"
        ),
      ]);
      setAllCards(props.cards);
    }
  }, [props.cards]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over) return;

    if (over.id) {
      const hashArray: any = {
        TO_DO: toDoCards,
        IN_PROGRESS: inProgressCards,
        IN_TESTING: inTestingCards,
        DONE: doneCards,
      };

      const functionsHash: any = {
        TO_DO: setToDoCards,
        IN_PROGRESS: setInProgressCards,
        IN_TESTING: setInTestingCards,
        DONE: setDoneCards,
      };

      if (
        !hashArray[over.id].some((tempCard: TaskCard) => {
          return tempCard.title === active.id;
        })
      ) {
        const cardToInsert = allCards.filter((tempCard: TaskCard) => {
          return tempCard.title_id === active.id;
        });

        functionsHash[over.id]([cardToInsert, ...hashArray[over.id]]);
      }
    }

    const originId = active.id;

    const destinationId = over.id;

    console.log(
      `Dragged item ${originId} from origin to destination ${destinationId}`
    );
  };

  return (
    <div className="w-full h-full bg-sky-800 rounded-xl px-2 md:px-4 md:grid md:grid-cols-4 md:gap-4 py-5">
      <CardsColumn
        cards={toDoCards}
        id="TO_DO"
        setDraggableArea={setDraggableArea}
        setDraggingCard={setDraggingCard}
      />
      <CardsColumn
        cards={inProgressCards}
        id="IN_PROGRESS"
        setDraggableArea={setDraggableArea}
        setDraggingCard={setDraggingCard}
      />
      <CardsColumn
        cards={inTestingCards}
        id="IN_TESTING"
        setDraggableArea={setDraggableArea}
        setDraggingCard={setDraggingCard}
      />
      <CardsColumn
        cards={doneCards}
        id="DONE"
        setDraggableArea={setDraggableArea}
        setDraggingCard={setDraggingCard}
      />
    </div>
  );
};

export default CardsGrid;
