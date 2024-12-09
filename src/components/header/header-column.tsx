import ResumeButton from "../grid/resume-button";
import { status } from "@/data/global";

interface Props {
  name: string;
}

const HeaderColumn = (props: Props) => {
  return (
    <div className="flex-[0.25] w-full h-full bg-white rounded-md flex items-center justify-center shrink-0 min-w-[280px] px-4">
      <span className="text-xl text-sky-900 font-roboto">
        {status[props.name]}
      </span>
      <div className="ml-auto">
        <ResumeButton status={props.name} />
      </div>
    </div>
  );
};

export default HeaderColumn;
