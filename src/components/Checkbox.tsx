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
    <div className="ml-2 flex items-center">
      <Check checked={checked} onClick={onChange} />
      <label htmlFor={id} className="ml-4 font-light">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
