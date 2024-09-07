import Dropdown, { DropdownProps } from "./Dropdown";
import { Ingredient } from "../types";

interface MultiSelectDropdownProps extends DropdownProps<Ingredient, true> {
  selected: Ingredient[];
  setSelected: (value: Ingredient[]) => void;
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
      setSelected={setSelected}
      className={className}
      multiple={true}
    />
  );
};

export default MultiSelectDropdown;
