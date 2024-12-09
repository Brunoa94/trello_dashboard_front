import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TaskCard, UpdateTaskCard } from "@/models/task-card";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { priorities, storyTypeColors, users } from "@/data/global";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import Service from "@/core/service";
import { returnStoryTypeIcons } from "@/components/global/story-type-icons";
import { returnAvatar } from "@/components/global/avatar-icons";
import { MdOutlinePriorityHigh, MdTimeline } from "react-icons/md";
import { BsCardText } from "react-icons/bs";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  taskCard: TaskCard;
  setDialogOpen: (value: boolean) => void;
}

const PopoverItems = (props: Props) => {
  const [updateCard, setUpdateCard] = useState<UpdateTaskCard>({ id: "" });
  const [collapsed, setCollapsed] = useState<string>("closed");
  const [textDisabled, setTextDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (props.taskCard) {
      setUpdateCard({ id: props.taskCard.id });
    }
  }, [props.taskCard]);

  const updateInput = (value: string, variable: string) => {
    setUpdateCard({ ...updateCard, [variable]: value });
  };

  const returnValue = (value: string) => {
    if (Object.keys(updateCard).includes(value)) {
      return updateCard[value];
    }

    return props.taskCard[value];
  };

  const onSave = () => {
    Service.updateCard(updateCard);
    props.setDialogOpen(false);
  };

  const onDelete = () => {
    Service.deleteCard(updateCard.id);
    props.setDialogOpen(false);
  };

  return (
    <DialogContent
      style={{
        border: `4px solid ${storyTypeColors[props.taskCard.story_type]}`,
      }}
      className="w-96 shadow-3xl rounded-xl mt-4 overflow-scroll"
    >
      <div className="grid gap-2">
        <DialogTitle>
          <div className="space-y-2">
            <div className="flex items-center mt-4">
              <h4
                style={{ color: storyTypeColors[props.taskCard.story_type] }}
                className="font-medium leading-none font-roboto"
              >
                {props.taskCard.title}
              </h4>
              <div className="flex items-center ml-auto gap-2">
                <span
                  style={{ color: storyTypeColors[props.taskCard.story_type] }}
                  className="text-xs font-roboto"
                >
                  {props.taskCard.story_type}
                </span>
                <span className="ml-auto text-xs">
                  {returnStoryTypeIcons(props.taskCard.story_type)}
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {props.taskCard.title_id}
            </p>
          </div>
        </DialogTitle>
        <div className="flex flex-col gap-2">
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <MdTimeline className="text-xl" />
              <Label htmlFor="width">Status: </Label>
            </div>
            <Input
              disabled
              id="width"
              defaultValue={props.taskCard.status}
              className="ml-auto w-fit h-8"
            />
          </div>
          <div className="w-full flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <BsCardText className="text-xl" />
              <h4 className="text-sm font-semibold">Description</h4>
            </div>
            <Textarea
              disabled={textDisabled}
              id="textarea"
              defaultValue={returnValue("description")}
              className="w-full h-8"
              onChange={(e: any) => {
                updateInput(e.target.value, "description");
              }}
              onMouseEnter={() => setTextDisabled(false)}
              onMouseLeave={() => setTextDisabled(true)}
            />
          </div>
          <div className="w-full items-center gap-4">
            <Collapsible
              open={collapsed === "priority"}
              className="w-full space-y-2"
            >
              <div className="flex items-center justify-between space-x-4 max-w-full">
                <div className="flex items-center gap-2">
                  <MdOutlinePriorityHigh className="text-xl" />
                  <h4 className="text-sm font-semibold">Priority</h4>
                </div>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      collapsed === "priority"
                        ? setCollapsed("closed")
                        : setCollapsed("priority");
                    }}
                  >
                    <ChevronsUpDown className="h-4 w-4" />
                    <span className="sr-only">Toggle</span>
                  </Button>
                </CollapsibleTrigger>
              </div>
              <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm flex items-center gap-2">
                <span className="text-md">{returnValue("priority")}</span>
              </div>
              {priorities
                .filter((priority: string) => {
                  return priority !== returnValue("priority");
                })
                .map((priority: string) => (
                  <>
                    <CollapsibleContent className="space-y-2">
                      <div
                        onClick={() => {
                          setCollapsed("closed");
                          updateInput(priority, "priority");
                        }}
                        className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm cursor-pointer"
                      >
                        {priority}
                      </div>
                    </CollapsibleContent>
                  </>
                ))}
            </Collapsible>
          </div>
          <div className="w-full flex items-center gap-4">
            <Label htmlFor="maxHeight" className="text-black whitespace-nowrap">
              Created Date:
            </Label>
            <Input
              id="maxHeight"
              defaultValue={props.taskCard.created_date}
              className="w-fit h-8 ml-auto border-none"
              disabled
            />
          </div>
          <div className="w-full items-center gap-4">
            <Collapsible
              open={collapsed === "avatar"}
              className="w-full space-y-2"
            >
              <div className="flex items-center justify-between space-x-4 ">
                <div className="rounded-md font-mono text-sm">
                  {returnAvatar(returnValue("avatar"))}
                </div>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      collapsed === "avatar"
                        ? setCollapsed("closed")
                        : setCollapsed("avatar");
                    }}
                  >
                    <ChevronsUpDown className="h-4 w-4" />
                    <span className="sr-only">Toggle</span>
                  </Button>
                </CollapsibleTrigger>
              </div>
              {users
                .filter((avatar: string) => {
                  return avatar !== returnValue("avatar");
                })
                .map((avatar: string) => (
                  <CollapsibleContent className="space-y-2">
                    <div
                      onClick={() => {
                        setCollapsed("closed");
                        updateInput(avatar, "avatar");
                      }}
                      className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm cursor-pointer"
                    >
                      {avatar}
                    </div>
                  </CollapsibleContent>
                ))}
            </Collapsible>
          </div>
        </div>
        <Button
          className="bg-gray-400 mt-2"
          onClick={() => {
            onSave();
          }}
        >
          <span>Save</span>
        </Button>
        <Button
          className="bg-red-500 hover:bg-red-700"
          onClick={() => {
            onDelete();
          }}
        >
          <span>Delete</span>
        </Button>
      </div>
    </DialogContent>
  );
};

export default PopoverItems;
