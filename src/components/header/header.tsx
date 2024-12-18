import { useEffect, useRef } from "react";
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
        <HeaderColumn name="TO_DO" />
        <HeaderColumn name="IN_PROGRESS" />
        <HeaderColumn name="IN_TESTING" />
        <HeaderColumn name="DONE" />
      </div>
    </div>
  );
};

export default Header;
