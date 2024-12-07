import React, { useEffect, useState } from "react";
import CardsColumn from "./cards-column";
import { TaskCard } from "@/models/task-card";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

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

  const handleDragEnd = (result: any) => {
    const { source, destination } = result;

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

    console.log(
      "SOURCE: " +
        JSON.stringify(source) +
        " DESTINATION: " +
        JSON.stringify(destination)
    );

    if (source.droppableId !== destination.droppableId) {
      functionsHash[source.droppableId](
        hashArray[source.droppableId].filter(
          (card: TaskCard, index: number) => {
            if (index !== source.index) {
              return true;
            } else {
              functionsHash[destination.droppableId]([
                card,
                ...hashArray[destination.droppableId],
              ]);
              return false;
            }
          }
        )
      );
    } else {
      let columnCards = hashArray[destination.droppableId];
      const element = columnCards.splice(source.index, 1)[0];
      columnCards.splice(destination.index, 0, element);

      functionsHash[destination.droppableId](columnCards);
    }

    console.log("DETETIE DTRAG END");
  };

  // const handleDragEnd = (event: any) => {
  //   const { active, over } = event;

  //   if (!over) return;

  //   if (over.id) {
  //     const hashArray: any = {
  //       TO_DO: toDoCards,
  //       IN_PROGRESS: inProgressCards,
  //       IN_TESTING: inTestingCards,
  //       DONE: doneCards,
  //     };

  //     const functionsHash: any = {
  //       TO_DO: setToDoCards,
  //       IN_PROGRESS: setInProgressCards,
  //       IN_TESTING: setInTestingCards,
  //       DONE: setDoneCards,
  //     };

  //     if (
  //       !hashArray[over.id].some((tempCard: TaskCard) => {
  //         return tempCard.title === active.id;
  //       })
  //     ) {
  //       const cardToInsert = allCards.filter((tempCard: TaskCard) => {
  //         return tempCard.title_id === active.id;
  //       });

  //       functionsHash[over.id]([cardToInsert, ...hashArray[over.id]]);
  //     }
  //   }

  //   const originId = active.id;

  //   const destinationId = over.id;

  //   console.log(
  //     `Dragged item ${originId} from origin to destination ${destinationId}`
  //   );
  // };

  return (
    <div className="w-full h-full bg-sky-800 rounded-xl px-2 md:px-4 md:grid md:grid-cols-4 md:gap-4 py-5">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="TO_DO">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              id={"TO_DO"}
              className="w-full  max-h-[calc(100vh-280px)] bg-sky-500 rounded-xl p-4 flex flex-col items-center gap-4 overflow-y-scroll"
            >
              <CardsColumn
                cards={toDoCards}
                setDraggableArea={setDraggableArea}
                setDraggingCard={setDraggingCard}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="IN_PROGRESS">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              id={"IN_PROGRESS"}
              className="w-full bg-sky-500 max-h-[calc(100vh-280px)] rounded-xl p-4 flex flex-col items-center gap-4 overflow-y-scroll"
            >
              <CardsColumn
                cards={inProgressCards}
                setDraggableArea={setDraggableArea}
                setDraggingCard={setDraggingCard}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="IN_TESTING">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              id={"IN_TESTING"}
              className="w-full  max-h-[calc(100vh-280px)] bg-sky-500 rounded-xl p-4 flex flex-col items-center gap-4 overflow-y-scroll"
            >
              <CardsColumn
                cards={inTestingCards}
                setDraggableArea={setDraggableArea}
                setDraggingCard={setDraggingCard}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="DONE">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              id={"DONE"}
              className="w-full  max-h-[calc(100vh-280px)] bg-sky-500 rounded-xl p-4 flex flex-col items-center gap-4 overflow-y-scroll"
            >
              <CardsColumn
                cards={doneCards}
                setDraggableArea={setDraggableArea}
                setDraggingCard={setDraggingCard}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default CardsGrid;
