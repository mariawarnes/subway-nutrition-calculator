import { Listbox } from "@headlessui/react";
import { BsChevronDown } from "react-icons/bs";
import Check from "./Check";

export interface DropdownProps {
  title: string;
  options: Array<{ id: string | number; name: string }>;
  selected: any[];
  setSelected: (value: any[]) => void;
  className?: string;
  multiple?: boolean;
}

const Dropdown = ({
  title,
  options,
  selected: passedSelected = [],
  setSelected,
  className,
  multiple = false,
}: DropdownProps) => {
  // Ensure passedSelected is always an array
  const selectedArray = Array.isArray(passedSelected)
    ? passedSelected
    : [passedSelected];

  const handleSelect = (option: any) => {
    if (multiple) {
      setSelected([...selectedArray, option]);
    } else {
      setSelected([option]);
    }
  };

  const isSelected = (option: any) => {
    return selectedArray.some((selected: any) => selected?.id === option.id);
  };

  return (
    <div className={`relative text-sm ${className}`}>
      <Listbox
        value={selectedArray}
        onChange={handleSelect}
        multiple={multiple}
      >
        <Listbox.Button className="font-sans relative font-medium shadow-custom w-full p-3 rounded-lg flex items-center justify-between">
          {multiple
            ? selectedArray?.map((single: any) => single.name).join(", ") ||
              `Choose ${title}`
            : selectedArray?.[0]?.name || `Choose a ${title}`}
          <span className="pointer-events-none flex items-center justify-center">
            <BsChevronDown aria-hidden="true" />
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
