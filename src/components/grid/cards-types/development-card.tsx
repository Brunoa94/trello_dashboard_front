import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TaskCard } from "@/models/task-card";
import PriorityLabel from "./priority-label";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { formatDate } from "./funtions/format-date";
import { Avatar } from "./global-components";
import PopoverItems from "./popover-items";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

interface Props {
  card: TaskCard;
}

const DevelopmentCard = (props: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-full px-4 py-2 bg-white rounded-md shadow-lg hover:shadow-xl hover:shadow-purple-900 shadow-purple-900 border-t-2 border-purple-900 cursor-pointer">
          <div className="flex flex-col gap-1">
            <div
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,1) 70%, rgba(76,29,149,1) 100%)",
              }}
              className="w-full py-2 rounded-sm px-1 flex items-center gap-2"
            >
              <div className="flex items-center">
                <MdOutlineFeaturedPlayList className="text-xl text-purple-900" />
                <span className="text-purple-900 ml-2 font-roboto font-bold uppercase text-xs">
                  {props.card.story_type}
                </span>
              </div>
              <span className="text-sm font-bold ml-auto text-purple-950">
                {props.card.title_id}
              </span>
            </div>
            <span className="text-md line-clamp-1 font-bold text-purple-800 font-roboto">
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

export default DevelopmentCard;
