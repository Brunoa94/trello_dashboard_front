import React from "react";
import TaskCard from "./task-card";

const CardsColumn = () => {
  return (
    <div className="w-full h-full bg-sky-500 rounded-xl p-4 flex flex-col items-center gap-4">
      <TaskCard />
      <TaskCard />
    </div>
  );
};

export default CardsColumn;
