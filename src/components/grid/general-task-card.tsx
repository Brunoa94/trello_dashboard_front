import { TaskCard } from "@/models/task-card";
import DesignCard from "./cards-types/design-card";
import DevelopmentCard from "./cards-types/development-card";
import QualityAssuranceCard from "./cards-types/quality-assurance-cards";
import BugfixCard from "./cards-types/bugfix-card";
import SpikeCard from "./cards-types/spike-card";

interface Props {
  card: TaskCard;
}

const GeneralTaskCard = (props: Props) => {
  if (props.card.story_type === "DEVELOPMENT") {
    return <DevelopmentCard card={props.card} />;
  } else if (props.card.story_type === "DESIGN") {
    return <DesignCard card={props.card} />;
  } else if (props.card.story_type === "QA") {
    return <QualityAssuranceCard card={props.card} />;
  } else if (props.card.story_type === "BUGFIX") {
    return <BugfixCard card={props.card} />;
  } else if (props.card.story_type === "SPIKE") {
    return <SpikeCard card={props.card} />;
  } else {
    return <></>;
  }
};

export default GeneralTaskCard;
