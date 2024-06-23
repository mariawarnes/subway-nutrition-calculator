import { MdOutlineCheck } from "react-icons/md";

const Check = ({
  checked,
  onClick,
  className,
}: {
  checked: boolean;
  onClick: () => void;
  className?: string;
}) => {
  return (
    <div
      className={`flex justify-center items-center w-5 h-5 border-[1px] cursor-pointer ${
        checked ? "bg-subway-green text-white" : "border-black"
      } ${className}`}
      onClick={onClick}
    >
      {checked && <MdOutlineCheck className="text-white w-4 h-4" />}
    </div>
  );
};

export default Check;
