import React from "react";
import { PiWarningCircle } from "react-icons/pi";

interface Props {
  priority: string;
}

const PriorityLabel = (props: Props) => {
  if (props.priority === "CRITICAL") {
    return (
      <div className="flex items-center gap-1 ml-auto">
        <span className="text-xs text-red-600">Critical</span>
        <PiWarningCircle className="text-red-600 text-2xl" />
      </div>
    );
  } else if (props.priority === "HIGH") {
    return (
      <div className="flex items-center gap-1 ml-auto">
        <span className="text-xs text-orange-600">High</span>
        <PiWarningCircle className="text-orange-600 text-2xl" />
      </div>
    );
  } else if (props.priority === "MEDIUM") {
    return (
      <div className="flex items-center gap-1 ml-auto">
        <span className="text-xs text-yellow-500">Medium</span>
        <PiWarningCircle className="text-yellow-500 text-2xl" />
      </div>
    );
  } else {
    return (
      <div className="flex items-center gap-1 ml-auto">
        <span className="text-xs text-green-600">Low</span>
        <PiWarningCircle className="text-green-600 text-2xl" />
      </div>
    );
  }
};

export default PriorityLabel;
