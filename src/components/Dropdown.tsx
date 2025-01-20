import { Listbox } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";
import Check from "./Check";
import { Ingredient } from "../types";

export interface DropdownProps {
  title: string;
  options: Ingredient[];
  selected: Ingredient[] | Ingredient | null;
  setSelected: (value: Ingredient[] | Ingredient | null) => void;
  className?: string;
  multiple?: boolean;
}

const Dropdown = ({
  title,
  options,
  selected: passedSelected,
  setSelected,
  className = "",
  multiple = false,
}: DropdownProps) => {
  // Convert to array for internal handling
  const selectedArray = passedSelected
    ? Array.isArray(passedSelected)
      ? passedSelected
      : [passedSelected]
    : [];

  const handleSelect = (value: Ingredient | Ingredient[]) => {
    if (Array.isArray(value)) {
      setSelected(value.length > 0 ? value : null);
      return;
    }

    if (multiple) {
      const isAlreadySelected = selectedArray.some(
        (item) => item.id === value.id
      );
      if (isAlreadySelected) {
        const newSelected = selectedArray.filter(
          (item) => item.id !== value.id
        );
        setSelected(newSelected.length > 0 ? newSelected : null);
      } else {
        setSelected([...selectedArray, value]);
      }
    } else {
      const isAlreadySelected = selectedArray.some(
        (item) => item.id === value.id
      );
      setSelected(isAlreadySelected ? null : value);
    }
  };

  const isSelected = (option: Ingredient) => {
    return selectedArray.some((selected) => selected.id === option.id);
  };

  return (
    <div className={`relative text-sm ${className}`}>
      <Listbox
        value={selectedArray}
        onChange={(value: Ingredient | Ingredient[]) => handleSelect(value)}
        multiple={multiple}
      >
        <Listbox.Button className="font-sans relative font-medium shadow-custom w-full p-3 rounded-lg flex items-center justify-between">
          {multiple
            ? selectedArray.length > 0
              ? selectedArray.map((item) => item.name).join(", ")
              : `Choose ${title}`
            : selectedArray.length > 0
            ? selectedArray[0].name
            : `Choose a ${title}`}
          <span className="pointer-events-none flex items-center justify-center">
            <FaChevronDown aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Listbox.Options className="absolute left-0 right-0 top-8 z-10 mt-1 max-h-60 overflow-auto bg-white py-2 px-0 text-subway-dark-green shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm rounded-lg">
          {options.map((option) => (
            <Listbox.Option
              key={option.id}
              value={option}
              className={({ active }) =>
                `relative flex flex-row items-center cursor-pointer p-3 select-none font-semibold ${
                  isSelected(option) || active
                    ? "bg-subway-green text-white font-bold"
                    : "text-subway-dark-green"
                }`
              }
              onClick={() => handleSelect(option)}
            >
              <>
                <Check
                  className="mr-4"
                  checked={isSelected(option)}
                  onClick={() => {}}
                  id={option.id.toString()}
                />
                {option.name}
              </>
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
};

export default Dropdown;
