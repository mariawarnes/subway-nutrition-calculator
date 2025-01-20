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
      setSelected={(value) => {
        // Ensure we only pass Ingredient | null to the setter
        if (Array.isArray(value)) {
          setSelected(value.length > 0 ? value[0] : null);
        } else {
          setSelected(value);
        }
      }}
    />
  );
};

export default SingleSelectDropdown;
