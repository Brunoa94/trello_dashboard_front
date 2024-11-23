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
import { PiMagnifyingGlassLight } from "react-icons/pi";

interface Props {
  card: TaskCard;
}

const SpikeCard = (props: Props) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="w-full px-4 py-2 bg-white rounded-md shadow-lg hover:shadow-xl hover:shadow-gray-900 shadow-gray-900 border-t-2 border-gray-900 cursor-pointer">
          <div className="flex flex-col gap-1">
            <div
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,1) 78%, rgba(33,33,33,1) 100%)",
              }}
              className="w-full py-2 rounded-sm px-1 flex items-center gap-2"
            >
              <div className="flex items-center">
                <PiMagnifyingGlassLight className="text-xl text-gray-900" />
                <span className="text-gray-900 ml-2 font-roboto font-bold uppercase text-xs">
                  {props.card.story_type}
                </span>
              </div>
              <span className="text-sm font-bold ml-auto text-gray-600">
                APP-1146
              </span>
            </div>
            <span className="text-md line-clamp-1 font-bold text-gray-800 font-roboto">
              {props.card.title}
            </span>
            <div className="flex items-center gap-3">
              <span className="text-sm font-roboto">Created at:</span>
              <span className="text-sm font-bold font-roboto">
                {props.card.created_date}
              </span>
            </div>
            <PriorityLabel priority={props.card.priority} />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 shadow-2xl rounded-xl mt-4">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-muted-foreground">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Width</Label>
              <Input
                id="width"
                defaultValue="100%"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Max. width</Label>
              <Input
                id="maxWidth"
                defaultValue="300px"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                defaultValue="25px"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxHeight">Max. height</Label>
              <Input
                id="maxHeight"
                defaultValue="none"
                className="col-span-2 h-8"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SpikeCard;
