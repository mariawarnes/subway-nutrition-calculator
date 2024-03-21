import { slugify } from "@/utils";
import { Listbox } from "@headlessui/react";
import React, { useState } from "react";

const SingleSelectDropdown = ({ title, options }) => {
  const [selected, setSelected] = useState(options[0]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      <Listbox.Button>{selected.name}</Listbox.Button>
      <Listbox.Options>
        {options.map((option) => (
          <Listbox.Option key={option.id} value={slugify(option.name)}>
            {option.name}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
};

export default SingleSelectDropdown;
