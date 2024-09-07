import Dropdown, { DropdownProps } from "./Dropdown";
import { Ingredient } from "../types";

interface SingleSelectDropdownProps extends DropdownProps<Ingredient, false> {
  selected: Ingredient | null;
  setSelected: (value: Ingredient | null) => void;
}

const SingleSelectDropdown = ({
  title,
  options,
  selected,
  setSelected,
  className,
}: SingleSelectDropdownProps) => {
  return (
    <Dropdown
      title={title}
      options={options}
      selected={selected}
      setSelected={setSelected}
      className={className}
      multiple={false}
    />
  );
};

export default SingleSelectDropdown;
