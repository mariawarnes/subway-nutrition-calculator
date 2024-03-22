import { Listbox } from "@headlessui/react";
import { SingleSelectDropdownProps } from "../types";

const SingleSelectDropdown = ({
  title,
  options,
  selected,
  setSelected,
}: SingleSelectDropdownProps) => {
  return (
    <Listbox value={selected} onChange={setSelected}>
      <Listbox.Button>{selected?.name || "Select a " + title}</Listbox.Button>
      <Listbox.Options>
        {options.map((option) => (
          <Listbox.Option key={option.id} value={option}>
            {option.name}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
};

export default SingleSelectDropdown;
