import { Listbox } from "@headlessui/react";
import { MultiSelectDropdownProps } from "../types";
import { FaCheck } from "react-icons/fa";
import { IoChevronDownCircleSharp } from "react-icons/io5";

const MultiSelectDropdown = ({
  title,
  options,
  selected,
  setSelected,
  className,
}: MultiSelectDropdownProps) => {
  return (
    <div className={`relative text-sm ${className}`}>
      <Listbox value={selected} onChange={setSelected} multiple>
        <Listbox.Button className="relative text-dark-grey font-semibold w-full p-2 bg-light-green pr-6">
          {selected?.map((single) => single.name).join(", ") ||
            "Select " + title}
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <IoChevronDownCircleSharp
              className="text-grey text-base"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Listbox.Options className="absolute left-0 right-0 top-8 z-10 mt-1 max-h-60 overflow-auto bg-light-green py-1 text-dark-green shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
          {options.map((option) => (
            <Listbox.Option
              className={({ active, selected }) =>
                `relative flex flex-row p-3 select-none font-semibold hover:bg-dark-green hover:text-white ${
                  active ?? "bg-dark-green text-white"
                }
              ${selected ? "bg-dark-green text-white" : "text-dark-grey"}`
              }
              key={option.id}
              value={option}
            >
              {({ selected }) => (
                <>
                  <span
                    className={`flex h-5 w-5 flex-row items-center mr-3 bg-green text-dark-green`}
                  >
                    {selected && (
                      <FaCheck className="m-[0.125rem]" aria-hidden="true" />
                    )}
                  </span>
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

export default MultiSelectDropdown;
