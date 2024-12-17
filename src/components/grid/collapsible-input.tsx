import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "../ui/button";
import { TaskCard, UpdateTaskCard } from "@/models/task-card";
import { ChevronsUpDown } from "lucide-react";

interface Props {
  collapsed: string;
  setCollapsed: (value: string) => void;
  updateCard: UpdateTaskCard;
  updateInput: (value: string, variable: string) => void;
  taskCard: TaskCard;
  valuesAvailable: string[];
  idForm: string;
  inputHeader: React.ReactNode;
}

const CollapsibleInput = (props: Props) => {
  const { updateCard, collapsed, setCollapsed, valuesAvailable, updateInput } =
    props;

  const returnValue = (value: string) => {
    if (Object.keys(updateCard).includes(value)) {
      return updateCard[value];
    }

    return props.taskCard[value];
  };

  return (
    <Collapsible open={collapsed === props.idForm} className="w-full space-y-2">
      <div className="flex items-center justify-between space-x-4 max-w-full">
        {props.inputHeader}
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            onClick={() => {
              collapsed === props.idForm
                ? setCollapsed("closed")
                : setCollapsed(props.idForm);
            }}
          >
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      {props.idForm !== "avatar" && (
        <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm flex items-center gap-2">
          <span className="text-md">{returnValue(props.idForm)}</span>
        </div>
      )}
      {valuesAvailable
        .filter((value: string) => {
          return value !== returnValue(props.idForm);
        })
        .map((value: string) => (
          <>
            <CollapsibleContent className="space-y-2">
              <div
                onClick={() => {
                  setCollapsed("closed");
                  updateInput(value, props.idForm);
                }}
                className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm cursor-pointer"
              >
                {value}
              </div>
            </CollapsibleContent>
          </>
        ))}
    </Collapsible>
  );
};

export default CollapsibleInput;
