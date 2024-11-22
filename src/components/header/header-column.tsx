import React from "react";

interface Props {
  name: string;
}

const HeaderColumn = (props: Props) => {
  return (
    <div className="w-full h-full bg-white rounded-md flex items-center justify-center">
      <span className="text-xl text-sky-900 font-roboto">{props.name}</span>
    </div>
  );
};

export default HeaderColumn;
