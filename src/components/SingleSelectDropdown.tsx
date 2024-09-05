import { Listbox } from "@headlessui/react";
import { SingleSelectDropdownProps } from "../types";
import { BsChevronDown } from "react-icons/bs";
import Check from "./Check";

const SingleSelectDropdown = ({
  title,
  options,
  selected,
  setSelected,
  className,
}: SingleSelectDropdownProps) => {
  return (
    <div className={`relative text-sm ${className}`}>
      <Listbox value={selected} onChange={setSelected}>
        <Listbox.Button className="uppercase font-oswald relative text-gray-700 border-2 border-subway-green font-normal w-full p-2 bg-subway-light-green pr-6 rounded-md">
          {selected?.name || `Choose a ${title}`}
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <BsChevronDown aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Listbox.Options className="absolute left-0 right-0 top-8 z-10 mt-1 max-h-60 overflow-auto bg-white py-1 text-subway-dark-green shadow-custom ring-1 ring-black/5 focus:outline-none sm:text-sm rounded-lg">
          {options.map((option) => (
            <Listbox.Option
              className={({ active, selected }) =>
                `relative flex flex-row p-3 select-none font-semibold hover:bg-subway-green hover:text-white ${
                  active
                    ? "bg-subway-green text-white"
                    : "text-subway-dark-green"
                }
                ${selected ? "bg-subway-green text-white" : "text-gray-700"}`
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

export default SingleSelectDropdown;
