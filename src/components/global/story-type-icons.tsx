import { AiOutlineThunderbolt } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa6";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { PiMagnifyingGlassLight, PiPencilSimple } from "react-icons/pi";

export const returnStoryTypeIcons = (type: string) => {
  switch (type) {
    case "BUGFIX":
      return <AiOutlineThunderbolt className="text-xl text-orange-900" />;
    case "DESIGN":
      return <PiPencilSimple className="text-xl text-green-900" />;
    case "DEVELOPMENT":
      return <MdOutlineFeaturedPlayList className="text-xl text-purple-900" />;
    case "QA":
      return <FaRegEye className="text-xl text-yellow-900" />;
    case "SPIKE":
      return <PiMagnifyingGlassLight className="text-xl text-gray-900" />;
    default:
      return null;
  }
};
