import Dropdown, { DropdownProps } from "./Dropdown";

interface MultiSelectDropdownProps extends DropdownProps {
  selected: Array<{ id: string | number; name: string }>;
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
