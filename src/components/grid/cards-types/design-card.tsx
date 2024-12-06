import { TaskCard } from "@/models/task-card";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PriorityLabel from "./priority-label";
import { PiPencilSimple } from "react-icons/pi";
import { formatDate } from "./funtions/format-date";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import PopoverItems from "./popover-items";

interface Props {
  card: TaskCard;
}

const DesignCard = (props: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-full px-4 py-2 bg-white rounded-md shadow-lg hover:shadow-xl hover:shadow-green-900 shadow-green-900 border-t-2 border-green-900 cursor-pointer">
          <div className="flex flex-col gap-1">
            <div
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,1) 78%, rgba(27,94,32,1) 100%)",
              }}
              className="w-full py-2 rounded-sm px-1 flex items-center gap-2"
            >
              <div className="flex items-center">
                <PiPencilSimple className="text-xl text-green-900" />
                <span className="text-green-900 ml-2 font-roboto font-bold uppercase text-xs">
                  {props.card.story_type}
                </span>
              </div>
              <span className="text-sm font-bold ml-auto text-green-700">
                {props.card.title_id}
              </span>
            </div>
            <span className="text-md line-clamp-1 font-bold text-green-800 font-roboto">
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

export default DesignCard;
