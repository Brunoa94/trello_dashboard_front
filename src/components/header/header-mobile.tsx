import { status } from "@/data/global";
import React from "react";
import { GrPrevious, GrNext } from "react-icons/gr";

interface Props {
  currentStatus: string;
  setCurrentStatus: (value: string) => void;
}

const HeaderMobile = (props: Props) => {
  const allStatus = ["TO_DO", "IN_PROGRESS", "IN_TESTING", "DONE"];

  function returnStatus(currentStatus: string, next: boolean) {
    const currentIndex = allStatus.findIndex(
      (status) => status === currentStatus
    );

    if (next) {
      props.setCurrentStatus(allStatus[currentIndex + 1]);
    } else {
      props.setCurrentStatus(allStatus[currentIndex - 1]);
    }
  }

  return (
    <div className="flex items-center w-full gap-4">
      {allStatus.findIndex((status) => status === props.currentStatus) > 0 && (
        <GrPrevious
          onClick={() => returnStatus(props.currentStatus, false)}
          className="text-xl text-white pointer"
        />
      )}
      <div className="w-24 flex items-center justify-center">
        <span className="text-xl font-roboto text-white whitespace-nowrap uppercase">
          {status[props.currentStatus]}
        </span>
      </div>
      {allStatus.findIndex((status) => status === props.currentStatus) <
        allStatus.length - 1 && (
        <GrNext
          onClick={() => returnStatus(props.currentStatus, true)}
          className="text-xl text-white pointer"
        />
      )}
    </div>
  );
};

export default HeaderMobile;
