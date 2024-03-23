export interface Ingredient {
  id: string;
  name: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
}

export interface SingleSelectDropdownProps {
  title: string;
  options: Ingredient[];
  selected: Ingredient | null;
  setSelected: (value: Ingredient | null) => void;
}

export interface MultiSelectDropdownProps {
  title: string;
  options: Ingredient[];
  selected: Ingredient[] | null;
  setSelected: React.Dispatch<React.SetStateAction<Ingredient[]>>;
}
