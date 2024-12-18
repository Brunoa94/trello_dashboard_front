import { TaskCard } from "@/models/task-card";
import PriorityLabel from "./priority-label";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { formatDate } from "./funtions/format-date";
import PopoverItems from "./popover-items";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { returnAvatar } from "@/components/global/avatar-icons";
import { TiStopwatch } from "react-icons/ti";
import { RiDeleteBin5Line } from "react-icons/ri";
interface Props {
  card: TaskCard;
  onDelete: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const DevelopmentCard = (props: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <div className="w-full px-4 py-2 bg-white rounded-md shadow-lg hover:shadow-xl hover:shadow-purple-900 shadow-purple-900 border-t-2 border-purple-900 cursor-pointer shrink-0">
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
                <TiStopwatch className="text-gray-400" />
                <span className="text-xs font-bold font-roboto text-gray-500">
                  {formatDate(props.card.created_date)}
                </span>
              </div>
              <PriorityLabel priority={props.card.priority} />
            </div>
            <div className="flex items-center justify-end w-full gap-2">
              <div
                onClick={(e: React.MouseEvent<HTMLDivElement>) =>
                  props.onDelete(e)
                }
                className="p-2 rounded-full flex items-center justify-center hover:bg-gray-200 cursor-pointer"
              >
                <RiDeleteBin5Line className="text-xl text-red-600" />
              </div>
              {returnAvatar(props.card.avatar, true)}
            </div>
          </div>
        </div>
      </DialogTrigger>
      <PopoverItems taskCard={props.card} setDialogOpen={setIsDialogOpen} />
    </Dialog>
  );
};

export default DevelopmentCard;
