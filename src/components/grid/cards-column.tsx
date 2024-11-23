import React from "react";
import { TaskCard } from "@/models/task-card";
import GeneralTaskCard from "./general-task-card";

const CardsColumn = () => {
  const card: TaskCard = {
    title: "Card Title 6",
    created_date: "2024-11-20T15:00:00Z",
    priority: "HIGH",
    title_id: "APP-6784",
    story_type: "DEVELOPMENT",
    name: "Test",
    status: "TO_DO",
  };

  const cardFeature: TaskCard = {
    title: "Card Title 6",
    created_date: "2024-11-20T15:00:00Z",
    priority: "CRITICAL",
    title_id: "APP-6784",
    story_type: "DESIGN",
    name: "Test",
    status: "TO_DO",
  };

  const cardQA: TaskCard = {
    title: "Card Title 6",
    created_date: "2024-11-20T15:00:00Z",
    priority: "LOW",
    title_id: "APP-6784",
    story_type: "QA",
    name: "Test",
    status: "TO_DO",
  };

  const cardBugfix: TaskCard = {
    title: "Card Title 6",
    created_date: "2024-11-20T15:00:00Z",
    priority: "MEDIUM",
    title_id: "APP-6784",
    story_type: "BUGFIX",
    name: "Test",
    status: "TO_DO",
  };

  const cardSpike: TaskCard = {
    title: "Card Title 6",
    created_date: "2024-11-20T15:00:00Z",
    priority: "HIGH",
    title_id: "APP-6784",
    story_type: "SPIKE",
    name: "Test",
    status: "TO_DO",
  };

  return (
    <div className="w-full h-[calc(100vh-280px)] max-h-full bg-sky-500 rounded-xl p-4 flex flex-col items-center gap-4 overflow-y-scroll">
      <GeneralTaskCard card={card} />
      <GeneralTaskCard card={cardFeature} />
      <GeneralTaskCard card={cardQA} />
      <GeneralTaskCard card={cardBugfix} />
      <GeneralTaskCard card={cardSpike} />
    </div>
  );
};

export default CardsColumn;
