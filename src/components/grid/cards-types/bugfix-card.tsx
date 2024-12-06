import { TaskCard } from "@/models/task-card";
import React, { useState } from "react";
import PriorityLabel from "./priority-label";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { formatDate } from "./funtions/format-date";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import PopoverItems from "./popover-items";
import { returnAvatar } from "@/components/global/avatar-icons";

interface Props {
  card: TaskCard;
}

const BugfixCard = (props: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <div className="w-full px-4 py-2 bg-white rounded-md shadow-lg hover:shadow-xl hover:shadow-orange-900 shadow-orange-900 border-t-2 border-orange-900 cursor-pointer">
          <div className="flex flex-col gap-1">
            <div
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,1) 78%, rgba(230,81,0,1) 100%)",
              }}
              className="w-full py-2 rounded-sm px-1 flex items-center gap-2"
            >
              <div className="flex items-center">
                <AiOutlineThunderbolt className="text-xl text-orange-900" />
                <span className="text-orange-900 ml-2 font-roboto font-bold uppercase text-xs">
                  {props.card.story_type}
                </span>
              </div>
              <span className="text-sm font-bold ml-auto text-orange-600">
                {props.card.title_id}
              </span>
            </div>
            <span className="text-md line-clamp-1 font-bold text-orange-800 font-roboto">
              {props.card.title}
            </span>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <span className="text-sm font-roboto">Created at:</span>
                <span className="text-md font-bold font-roboto">
                  {formatDate(props.card.created_date)}
                </span>
              </div>
              <PriorityLabel priority={props.card.priority} />
            </div>
            <div className="flex items-center justify-end w-full gap-2">
              {returnAvatar(props.card.avatar, true)}
            </div>
          </div>
        </div>
      </DialogTrigger>
      <PopoverItems taskCard={props.card} setDialogOpen={setIsDialogOpen} />
    </Dialog>
  );
};

export default BugfixCard;
