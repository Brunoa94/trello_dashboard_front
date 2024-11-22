import React from "react";
import CardsColumn from "./cards-column";

interface Props {}

const CardsGrid = (props: Props) => {
  return (
    <div className="w-full h-full bg-sky-800 rounded-xl px-2 md:px-4 md:grid md:grid-cols-4 md:gap-4 py-5">
      <CardsColumn />
      <CardsColumn />
      <CardsColumn />
      <CardsColumn />
    </div>
  );
};

export default CardsGrid;
