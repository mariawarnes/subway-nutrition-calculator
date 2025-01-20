import { Ingredient } from "../types";
import Dropdown from "./Dropdown";

interface MultiSelectDropdownProps {
  title: string;
  options: Ingredient[];
  selected: Ingredient[];
  setSelected: (value: Ingredient[]) => void;
  className?: string;
}

const MultiSelectDropdown = ({
  title,
  options,
  selected,
  setSelected,
  className,
}: MultiSelectDropdownProps) => {
  return (
    <Dropdown
      title={title}
      options={options}
      selected={selected}
      setSelected={(value) => {
        // Ensure we only pass Ingredient[] to the setter
        if (Array.isArray(value)) {
          setSelected(value);
        } else if (value === null) {
          setSelected([]);
        } else {
          setSelected([value]);
        }
      }}
      className={className}
      multiple={true}
    />
  );
};

export default MultiSelectDropdown;
