import { Listbox } from "@headlessui/react";
import { BsChevronDown } from "react-icons/bs";
import Check from "./Check";

export interface DropdownProps {
  title: string;
  options: Array<{ id: string | number; name: string }>;
  selected:
    | { id: string | number; name: string }
    | { id: string | number; name: string }[]
    | null;
  setSelected: (
    value:
      | { id: string | number; name: string }
      | { id: string | number; name: string }[]
  ) => void;
  className?: string;
  multiple?: boolean;
}

const Dropdown = ({
  title,
  options,
  selected,
  setSelected,
  className,
  multiple = false,
}: DropdownProps) => {
  return (
    <div className={`relative text-sm ${className}`}>
      <Listbox value={selected} onChange={setSelected} multiple={multiple}>
        <Listbox.Button className="font-sans relative font-medium shadow-custom w-full p-3 rounded-lg flex items-center justify-between">
          {multiple
            ? Array.isArray(selected)
              ? selected.map((single) => single.name).join(", ")
              : `Choose ${title}`
            : selected
            ? (selected as { id: string | number; name: string }).name
            : `Choose a ${title}`}
          <span className="pointer-events-none flex items-center justify-center">
            <BsChevronDown aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Listbox.Options className="absolute left-0 right-0 top-8 z-10 mt-1 max-h-60 overflow-auto bg-white py-2 px-0 text-subway-dark-green shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm rounded-lg">
          {options.map((option) => (
            <Listbox.Option
              className={({ active, selected }) =>
                `relative flex flex-row items-center p-3 select-none font-semibold hover:bg-subway-green hover:text-white ${
                  active
                    ? "bg-subway-green text-white"
                    : "text-subway-dark-green"
                } ${
                  selected
                    ? "bg-subway-green text-white font-bold"
                    : "text-gray-700"
                }`
              }
              key={option.id}
              value={option}
            >
              {({ selected }) => (
                <>
                  <Check
                    className="mr-4"
                    checked={selected}
                    onClick={() => {}}
                    id={""}
                  />
                  {option.name}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
};

export default Dropdown;
