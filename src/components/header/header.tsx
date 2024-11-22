import React from "react";
import HeaderColumn from "./header-column";

function Header() {
  return (
    <div className="w-full h-3 md:h-16 bg-sky-800 rounded-md lg:rounded-xl flex items-center px-2 md:px-4 shrink-0">
      <div className="w-full h-full md:grid md:grid-cols-4 md:gap-4 md:py-3">
        <HeaderColumn name="To Do" />
        <HeaderColumn name="In Progress" />
        <HeaderColumn name="In Testing" />
        <HeaderColumn name="Done" />
      </div>
    </div>
  );
}

export default Header;
