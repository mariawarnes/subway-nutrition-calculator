import { Listbox } from "@headlessui/react";
import React from "react";
import { MultiSelectDropdownProps } from "../types";

const MultiSelectDropdown = ({
  title,
  options,
  selected,
  setSelected,
}: MultiSelectDropdownProps) => {
  return (
    <Listbox value={selected} onChange={setSelected} multiple>
      <Listbox.Button>
        {selected?.map((singleSelected) => singleSelected.name).join(", ") ||
          "Select " + title}
      </Listbox.Button>
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

export default MultiSelectDropdown;
