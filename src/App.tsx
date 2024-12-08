import "./App.css";
import { FaTrello } from "react-icons/fa6";
import Header from "./components/header/header";
import CardsGrid from "./components/grid/cards-grid";
import { IoMdAdd } from "react-icons/io";
import { useContext, useEffect, useState } from "react";
import Service from "./core/service";
import { TaskCard } from "./models/task-card";
import AddNewCard from "./components/card/add-new-card";
import { DragDropContext } from "react-beautiful-dnd";
import HeaderMobile from "./components/header/header-mobile";
import CardsGridsMobile from "./components/grid/cards-grid-mobile";
import { GlobalContext, GlobalProvider } from "./context/global-context";

function App() {
  const [addCard, setAddCard] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<number>(0);
  const [currentStatus, setCurrentStatus] = useState<string>("TO_DO");

  return (
    <div className="w-screen h-screen bg-sky-600 flex items-center md:justify-center flex-col px-4 md:px-0">
      <GlobalProvider>
        <div className="py-4 md:py-0 md:pb-4 flex items-center justify-start w-full md:w-[calc(100%-64px)] gap-x-3">
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
        <div className="hidden md:flex w-[calc(100%-32px)] h-[calc(100%-32px)] rounded-md bg-sky-700 md:w-[calc(100%-64px)] md:h-[calc(100%-124px)] md:rounded-xl p-2 md:p-4 flex-col gap-y-4">
          <Header scrolledValue={scrolled} />
          <CardsGrid setScrolled={setScrolled} />
          {addCard && <AddNewCard setAddCard={setAddCard} />}
        </div>
        <div className="h-[calc(100%-96px)] rounded-md bg-sky-500 w-full p-4 md:hidden gap-4 flex flex-col">
          <HeaderMobile
            currentStatus={currentStatus}
            setCurrentStatus={setCurrentStatus}
          />
          <CardsGridsMobile currentStatus={currentStatus} />
        </div>
      </GlobalProvider>
    </div>
  );
}

export default App;
