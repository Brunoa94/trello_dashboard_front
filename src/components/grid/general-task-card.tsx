import { TaskCard } from "@/models/task-card";
import DesignCard from "./cards-types/design-card";
import DevelopmentCard from "./cards-types/development-card";
import QualityAssuranceCard from "./cards-types/quality-assurance-cards";
import BugfixCard from "./cards-types/bugfix-card";
import SpikeCard from "./cards-types/spike-card";
import Service from "@/core/service";
import { useContext } from "react";
import { GlobalContext } from "@/context/global-context";

interface Props {
  card: TaskCard;
  index: number;
}

const GeneralTaskCard = (props: Props) => {
  const { deleteCard } = useContext(GlobalContext);

  async function handleDelete(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    await Service.deleteCard(props.card.id);
    deleteCard(props.card.id);
  }

  return (
    <div
      className="w-full min-w-[250px] shrink-0"
      id={`card.${props.card.title_id}.${props.card.status}`}
    >
      <>
        {props.card.story_type === "DEVELOPMENT" ? (
          <DevelopmentCard card={props.card} onDelete={handleDelete} />
        ) : props.card.story_type === "DESIGN" ? (
          <DesignCard card={props.card} onDelete={handleDelete} />
        ) : props.card.story_type === "QA" ? (
          <QualityAssuranceCard card={props.card} onDelete={handleDelete} />
        ) : props.card.story_type === "BUGFIX" ? (
          <BugfixCard card={props.card} onDelete={handleDelete} />
        ) : props.card.story_type === "SPIKE" ? (
          <SpikeCard card={props.card} onDelete={handleDelete} />
        ) : (
          <></>
        )}
      </>
    </div>
  );
};

export default GeneralTaskCard;
