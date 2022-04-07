import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CogIcon,
} from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";

function Toolbar() {
  const navigate = useNavigate();

  return (
    <div className="border-b h-10 flex justify-between items-center px-2">
      <div className="flex ">
        <ChevronLeftIcon
          onClick={() => navigate(-1)}
          className="h-8 w-8 text-gray-500 cursor-pointer"
        />
        <ChevronRightIcon
          onClick={() => navigate(1)}
          className="h-8 w-8 text-gray-500 cursor-pointer"
        />
      </div>
      <div>
        <CogIcon className="h-6 w-6 text-gray-500 cursor-pointer" />
      </div>
    </div>
  );
}

export default Toolbar;
