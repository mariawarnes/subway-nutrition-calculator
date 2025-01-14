import Dropdown from "./Dropdown";
import { Ingredient } from "../types";

interface SingleSelectDropdownProps {
  title: string;
  options: Ingredient[];
  selected: Ingredient | null;
  setSelected: (value: Ingredient | null) => void;
}

const SingleSelectDropdown = ({
  title,
  options,
  selected,
  setSelected,
}: SingleSelectDropdownProps) => {
  return (
    <Dropdown
      title={title}
      options={options}
      selected={selected}
      setSelected={setSelected}
      multiple={false}
    />
  );
};

export default SingleSelectDropdown;
