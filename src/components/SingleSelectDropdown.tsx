import Dropdown, { DropdownProps } from "./Dropdown";

interface SingleSelectDropdownProps extends DropdownProps {
  selected: { id: string | number; name: string } | null;
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
