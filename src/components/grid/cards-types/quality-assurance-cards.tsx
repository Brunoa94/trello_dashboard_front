import { FaRegEye } from "react-icons/fa";
import { TaskCard } from "@/models/task-card";
import PriorityLabel from "./priority-label";
import { formatDate } from "./funtions/format-date";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import PopoverItems from "./popover-items";

interface Props {
  card: TaskCard;
}

const QualityAssuranceCard = (props: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-full px-4 py-2 bg-white rounded-md shadow-lg hover:shadow-xl hover:shadow-yellow-700 shadow-yellow-700 border-t-2 border-yellow-700 cursor-pointer">
          <div className="flex flex-col gap-1">
            <div
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,1) 78%, rgba(251,192,45,1) 100%)",
              }}
              className="w-full py-2 rounded-sm px-1 flex items-center gap-2"
            >
              <div className="flex items-center">
                <FaRegEye className="text-xl text-yellow-900" />
                <span className="text-yellow-800 ml-2 font-roboto font-bold uppercase text-xs">
                  {props.card.story_type}
                </span>
              </div>
              <span className="text-sm font-bold ml-auto text-yellow-600">
                {props.card.title_id}
              </span>
            </div>
            <span className="text-md line-clamp-1 font-bold text-yellow-800 font-roboto">
              {props.card.title}
            </span>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <span className="text-sm font-roboto">Created at:</span>
                <span className="text-sm font-bold font-roboto">
                  {formatDate(props.card.created_date)}
                </span>
              </div>
              <PriorityLabel priority={props.card.priority} />
            </div>
          </div>
        </div>
      </DialogTrigger>
      <PopoverItems taskCard={props.card} />
    </Dialog>
  );
};

export default QualityAssuranceCard;
