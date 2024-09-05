import { Dispatch, SetStateAction } from "react";

export interface Ingredient {
  id: string;
  name: string;
  old?: boolean;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
}

export interface Preset {
  name: string;
  ingredients: Ingredient[];
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
