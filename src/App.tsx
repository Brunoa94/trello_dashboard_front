import "./App.css";
import { FaTrello } from "react-icons/fa6";
import Header from "./components/header/header";
import CardsGrid from "./components/grid/cards-grid";
import { IoMdAdd } from "react-icons/io";
import { useEffect, useState } from "react";
import Service from "./core/service";
import { TaskCard } from "./models/task-card";
import AddNewCard from "./components/card/add-new-card";

function App() {
  const [cards, setCards] = useState<TaskCard[]>([]);
  const [error, setError] = useState<string>("");
  const [addCard, setAddCard] = useState<boolean>(false);

  async function fetchCards() {
    const service = new Service();
    try {
      const response: TaskCard[] = await service.fetchCards();
      setCards(response);
    } catch (e: any) {
      setError(e.error);
    }
  }

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <div className="w-screen h-screen bg-sky-600 flex items-center justify-center flex-col">
      <div className="pb-4 flex items-center justify-start w-[calc(100%-32px)] md:w-[calc(100%-64px)] gap-x-3">
        <div className="flex items-center">
          <FaTrello className="text-3xl text-white" />
          <span className="text-3xl text-white">Trello</span>
        </div>
        <div
          onClick={() => setAddCard(true)}
          className="bg-green-600 px-4 flex items-center gap-2 py-2 rounded-lg ml-auto cursor-pointer hover:shadow-xl hover:shadow-green-700 hover:cursor-pointer"
        >
          <IoMdAdd className="text-white text-2xl cursor-pointer" />
          <span className="text-white font-roboto text-lg ml-auto">
            Create Card
          </span>
        </div>
      </div>
      <div className="w-[calc(100%-32px)] h-[calc(100%-32px)] rounded-md bg-sky-700 md:w-[calc(100%-64px)] md:h-[calc(100%-124px)] md:rounded-xl p-2 md:p-4 flex flex-col gap-y-4">
        <Header />
        <CardsGrid cards={cards} />
        {addCard && <AddNewCard setAddCard={setAddCard} />}
      </div>
    </div>
  );
}

export default App;
