import { MdOutlineCheck } from "react-icons/md";
import Check from "./Check";

const Checkbox = ({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}) => {
  return (
    <div className="ml-4 flex items-center">
      <Check checked={checked} onClick={onChange} />
      <label
        htmlFor={id}
        className="ml-2 uppercase text-gray-700 font-normal text-[0.9rem] font-oswald"
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
