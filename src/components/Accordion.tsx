import React from "react";
import { Ingredient, Preset } from "../types";
import { Disclosure } from "@headlessui/react";
import { BsChevronDown } from "react-icons/bs";
import Chip from "./Chip";
import {
  products,
  breads,
  proteins,
  cheeses,
  salads,
  sauces,
  extras,
  toppings,
} from "../data/ingredients.json";

interface AccordionProps {
  presets: Preset[];
  label: string;
  activePreset: string | null;
  selectPreset: (
    ingredients: Ingredient[],
    presetIngredientIds: string[]
  ) => void;
  setActivePreset: React.Dispatch<React.SetStateAction<string | null>>;
  clearSelected: () => void;
}

const Accordion = ({
  presets,
  label,
  activePreset,
  selectPreset,
  setActivePreset,
  clearSelected,
}: AccordionProps) => {
  const categorizePresets = (
    presets: Preset[],
    saver?: boolean,
    old?: boolean
  ) =>
    presets.filter(
      (preset) =>
        (saver ? preset.saver === saver : !preset.saver) &&
        (old ? preset.old === old : !preset.old)
    );

  const handlePresetClick = (
    presetId: string,
    presetIngredients: Ingredient[]
  ) => {
    if (activePreset === presetId) {
      setActivePreset(null);
      clearSelected();
    } else {
      const presetIngredientIds = presetIngredients.map(
        (ingredient) => ingredient.id
      );

      selectPreset(
        [
          ...products,
          ...breads,
          ...proteins,
          ...cheeses,
          ...salads,
          ...sauces,
          ...extras,
          ...toppings,
        ],
        presetIngredientIds
      );
      setActivePreset(presetId);
    }
  };

  const renderPresets = (title: string, presets: Preset[]) => (
    <>
      <h3 className="font-oswald font-bold uppercase">{title}</h3>
      <div className="space-y-2 space-x-1 mb-4">
        {presets.map((preset) => (
          <Chip
            key={preset.id}
            text={preset.name}
            handleClick={() => handlePresetClick(preset.id, preset.ingredients)}
            isActive={activePreset === preset.id}
          />
        ))}
      </div>
    </>
  );

  const currentSignaturePresets = categorizePresets(presets, false, false);
  const currentSaverPresets = categorizePresets(presets, true, false);
  const oldSignaturePresets = categorizePresets(presets, false, true);
  const oldSaverPresets = categorizePresets(presets, true, true);

  const activePresetLabel = activePreset
    ? presets.find((preset) => preset.id === activePreset)?.name
    : label;

  return (
    <Disclosure>
      <Disclosure.Button className="text-[0.9rem] font-sans relative shadow-custom font-medium w-full p-3 pr-8 rounded-lg flex items-center justify-between">
        {activePresetLabel}
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <BsChevronDown aria-hidden="true" />
        </span>
      </Disclosure.Button>
      <Disclosure.Panel>
        {currentSignaturePresets.length !== 0 &&
          renderPresets("Signatures", currentSignaturePresets)}
        {currentSaverPresets.length !== 0 &&
          renderPresets("Savers", currentSaverPresets)}
        {oldSignaturePresets.length !== 0 &&
          renderPresets(
            "Retired Signatures (since April 2024)",
            oldSignaturePresets
          )}
        {oldSaverPresets.length !== 0 &&
          renderPresets("Retired Savers (since April 2024)", oldSaverPresets)}
      </Disclosure.Panel>
    </Disclosure>
  );
};

export default Accordion;
