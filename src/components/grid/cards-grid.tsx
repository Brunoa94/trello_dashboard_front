import { useContext, useEffect, useRef, useState } from "react";
import CardsColumn from "./cards-column";
import { TaskCard } from "@/models/task-card";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { GlobalContext } from "@/context/global-context";

interface Props {
  setScrolled: (value: number) => void;
}

const CardsGrid = (props: Props) => {
  const [toDoCards, setToDoCards] = useState<TaskCard[]>([]);
  const [inProgressCards, setInProgressCards] = useState<TaskCard[]>([]);
  const [inTestingCards, setInTestingCards] = useState<TaskCard[]>([]);
  const [doneCards, setDoneCards] = useState<TaskCard[]>([]);
  const [allCards, setAllCards] = useState<TaskCard[]>([]);
  const [draggableArea, setDraggableArea] = useState<string>("");
  const [draggingCard, setDraggingCard] = useState<string>("");
  const ref = useRef<HTMLDivElement>(null);
  const { cards } = useContext(GlobalContext);

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
    if (draggableArea !== "" && draggingCard !== "") {
      setCardInNewPosition();
    }
  }, [draggableArea, draggingCard]);

  useEffect(() => {
    if (cards) {
      setToDoCards([
        ...cards.filter((tempCard: TaskCard) => tempCard.status === "TO_DO"),
      ]);
      setInProgressCards([
        ...cards.filter(
          (tempCard: TaskCard) => tempCard.status === "IN_PROGRESS"
        ),
      ]);
      setInTestingCards([
        ...cards.filter(
          (tempCard: TaskCard) => tempCard.status === "IN_TESTING"
        ),
      ]);
      setDoneCards([
        ...cards.filter((tempCard: TaskCard) => tempCard.status === "DONE"),
      ]);
      setAllCards(cards);
      console.log("All Cards : " + allCards.length);
    }
  }, [cards]);

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
  };

  const onScroll = () => {
    if (ref.current) {
      props.setScrolled(ref.current.scrollLeft);
    }
  };
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
    <div
      ref={ref}
      onScroll={onScroll}
      className="w-full h-[calc(100%-86px)] bg-sky-800 rounded-xl px-2 flex flex-col md:px-4 md:flex-row md:items-center md:gap-4 py-5 shrink-0 overflow-x-scroll"
    >
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="TO_DO">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              id={"TO_DO"}
              className="w-full min-w-[282px] h-full bg-sky-500 rounded-xl p-4 flex flex-col items-center gap-4 overflow-y-scroll shrink-0 md:flex-[0.25]"
            >
              <h1 className="flex mb-4 md:hidden">{"TO_DO"}</h1>
              <CardsColumn
                cards={toDoCards}
                setDraggableArea={setDraggableArea}
                setDraggingCard={setDraggingCard}
                id="TO_DO"
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
              className="flex-[0.25] w-full min-w-[282px] bg-sky-500 h-full rounded-xl p-4 flex flex-col items-center gap-4 overflow-y-scroll shrink-0"
            >
              <CardsColumn
                cards={inProgressCards}
                setDraggableArea={setDraggableArea}
                setDraggingCard={setDraggingCard}
                id="IN_PROGRESS"
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
              className="flex-[0.25] w-full min-w-[282px]  h-full bg-sky-500 rounded-xl p-4 flex flex-col items-center gap-4 overflow-y-scroll shrink-0"
            >
              <CardsColumn
                cards={inTestingCards}
                setDraggableArea={setDraggableArea}
                setDraggingCard={setDraggingCard}
                id="IN_TESTING"
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
              className="flex-[0.25] w-full min-w-[282px]  h-full bg-sky-500 rounded-xl p-4 flex flex-col items-center gap-4 overflow-y-scroll shrink-0"
            >
              <CardsColumn
                cards={doneCards}
                setDraggableArea={setDraggableArea}
                setDraggingCard={setDraggingCard}
                id="DONE"
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
