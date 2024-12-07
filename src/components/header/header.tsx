import React, { useEffect, useRef } from "react";
import HeaderColumn from "./header-column";

const Header = (props: { scrolledValue: number }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollLeft = props.scrolledValue;
    }
  }, [props.scrolledValue]);

  return (
    <div className="w-full h-3 md:h-16 bg-sky-800 rounded-md lg:rounded-xl flex items-center px-2 md:px-4 shrink-0">
      <div
        ref={ref}
        className="w-full h-full md:flex md:items-center md:gap-4 md:py-3 overflow-x-scroll"
      >
        <HeaderColumn name="To Do" />
        <HeaderColumn name="In Progress" />
        <HeaderColumn name="In Testing" />
        <HeaderColumn name="Done" />
      </div>
    </div>
  );
};

export default Header;
