import { Dispatch, SetStateAction } from "react";

export interface Ingredient {
  id: string;
  name: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
}

export interface Preset {
  id: string;
  name: string;
  ingredients: Ingredient[];
  old?: boolean;
  saver?: boolean;
}

// This type represents the initial structure of presets in the JSON file
export interface PresetWithIds {
  id: string;
  name: string;
  ingredients: string[];
  old?: boolean;
  saver?: boolean;
}

export interface SingleSelectDropdownProps {
  title: string;
  options: Ingredient[];
  selected: Ingredient | null;
  setSelected: Dispatch<React.SetStateAction<Ingredient | null>>;

  className?: string;
}

export interface MultiSelectDropdownProps {
  title: string;
  options: Ingredient[];
  selected: Ingredient[];
  setSelected: Dispatch<SetStateAction<Ingredient[]>>;
  className?: string;
}
