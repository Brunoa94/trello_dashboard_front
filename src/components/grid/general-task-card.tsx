import { TaskCard } from "@/models/task-card";
import DesignCard from "./cards-types/design-card";
import DevelopmentCard from "./cards-types/development-card";
import QualityAssuranceCard from "./cards-types/quality-assurance-cards";
import BugfixCard from "./cards-types/bugfix-card";
import SpikeCard from "./cards-types/spike-card";

interface Props {
  card: TaskCard;
  index: number;
}

const GeneralTaskCard = (props: Props) => {
  return (
    <div
      className="w-full"
      id={`card.${props.card.title_id}.${props.card.status}`}
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
