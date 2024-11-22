import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaRegEye } from "react-icons/fa";
import { IoWarning } from "react-icons/io5";

const TaskCard = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="w-full px-4 py-2 bg-white rounded-md shadow-lg hover:shadow-xl hover:shadow-purple-900 shadow-purple-900 border-t-2 border-purple-900 cursor-pointer">
          <div className="flex flex-col gap-1">
            <div
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,1) 70%, rgba(76,29,149,1) 100%)",
              }}
              className="w-full py-2 rounded-sm px-1 flex items-center gap-2"
            >
              <FaRegEye className="text-xl text-purple-900" />
              <span className="text-purple-900 text-md">Epic</span>
            </div>

            <span className="text-md line-clamp-1 font-bold text-purple-900 font-roboto">
              This is the task number 1
            </span>
            <div className="flex items-center gap-3">
              <span className="text-sm font-roboto">Created at:</span>
              <span className="text-sm font-bold font-roboto">20-04-2024</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-md text-red-700 font-bold font-roboto">
                High
              </span>
              <IoWarning className="text-red-700 text-2xl" />
            </div>
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

export default TaskCard;
