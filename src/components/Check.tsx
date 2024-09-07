import { MdOutlineCheck } from "react-icons/md";

const Check = ({
  id,
  checked,
  onClick,
  className,
}: {
  id: string;
  checked: boolean;
  onClick: () => void;
  className?: string;
}) => {
  return (
    <div className="relative">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onClick}
        className="hidden"
      />
      <div
        className={`flex justify-center shadow-custom items-center w-5 h-5 border-2 border-subway-green rounded-sm cursor-pointer ${
          checked ? "bg-subway-green text-white" : "border-black"
        } ${className}`}
        onClick={onClick}
      >
        {checked && <MdOutlineCheck className="text-white w-4 h-4" />}
      </div>
    </div>
  );
};

export default Check;
