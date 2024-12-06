import { TaskCard } from "@/models/task-card";
import DesignCard from "./cards-types/design-card";
import DevelopmentCard from "./cards-types/development-card";
import QualityAssuranceCard from "./cards-types/quality-assurance-cards";
import BugfixCard from "./cards-types/bugfix-card";
import SpikeCard from "./cards-types/spike-card";
import { useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PopoverItems from "./cards-types/popover-items";

interface Props {
  card: TaskCard;
  setDraggingCard: (value: string) => void;
}

const GeneralTaskCard = (props: Props) => {
  const dragEnd = (e: any) => {
    props.setDraggingCard(e.target.id);
    setTimeout(() => {}, 500);
  };
  console.log("USER: " + props.card.avatar);
  return (
    <div
      className="w-full"
      draggable
      id={`card.${props.card.title_id}.${props.card.status}`}
      onDragStart={(e: any) => dragEnd(e)}
    >
      <>
        {props.card.story_type === "DEVELOPMENT" ? (
          <DevelopmentCard card={props.card} />
        ) : props.card.story_type === "DESIGN" ? (
          <DesignCard card={props.card} />
        ) : props.card.story_type === "QA" ? (
          <QualityAssuranceCard card={props.card} />
        ) : props.card.story_type === "BUGFIX" ? (
          <BugfixCard card={props.card} />
        ) : props.card.story_type === "SPIKE" ? (
          <SpikeCard card={props.card} />
        ) : (
          <></>
        )}
      </>
    </div>
  );
};

export default GeneralTaskCard;
