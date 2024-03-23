import { useState } from "react";
import "./App.css";
import SingleSelectDropdown from "./components/SingleSelectDropdown";
import MultiSelectDropdown from "./components/MultiSelectDropdown";
import {
  products,
  breads,
  cheeses,
  salads,
  sauces,
  extras,
  toppings,
} from "./data/ingredients.json";
import { Ingredient } from "./types";

function App() {
  const [selectedProduct, setSelectedProduct] = useState<Ingredient | null>(
    null
  );
  const [selectedBread, setSelectedBread] = useState<Ingredient | null>(null);
  const [selectedCheese, setSelectedCheese] = useState<Ingredient | null>(null);
  const [selectedSalads, setSelectedSalads] = useState<Ingredient[]>([]);
  const [selectedSauces, setSelectedSauces] = useState<Ingredient[]>([]);
  const [selectedExtras, setSelectedExtras] = useState<Ingredient[]>([]);
  const [selectedToppings, setSelectedToppings] = useState<Ingredient[]>([]);
  return (
    <div className="p-3 mx-auto max-w-lg my-5 shadow-lg bg-white space-y-4">
      <h1 className="font-black text-2xl w-full text-center font-dark-green">
        Subway Calculator
      </h1>
      <div className="flex flex-col space-y-4 relative">
        {/* Product */}
        <SingleSelectDropdown
          title={"Product"}
          options={products}
          selected={selectedProduct}
          setSelected={setSelectedProduct}
        />
        {/* Bread */}
        {(selectedProduct?.id == "p-1" || selectedProduct?.id == "p-2") && (
          <SingleSelectDropdown
            title={"Bread"}
            options={breads}
            selected={selectedBread}
            setSelected={setSelectedBread}
          />
        )}
        {/* Cheese */}
        <SingleSelectDropdown
          title={"Cheese"}
          options={cheeses}
          selected={selectedCheese}
          setSelected={setSelectedCheese}
        />
        {/* Salads */}
        <MultiSelectDropdown
          title={"Salads"}
          options={salads}
          selected={selectedSalads}
          setSelected={setSelectedSalads}
        />
        {/* Sauces */}
        <MultiSelectDropdown
          title={"Sauces"}
          options={sauces}
          selected={selectedSauces}
          setSelected={setSelectedSauces}
        />
        {/* Extras */}
        <MultiSelectDropdown
          title={"Extras"}
          options={extras}
          selected={selectedExtras}
          setSelected={setSelectedExtras}
        />
        {/* Toppings */}
        <MultiSelectDropdown
          title={"Toppings"}
          options={toppings}
          selected={selectedToppings}
          setSelected={setSelectedToppings}
        />
      </div>
    </div>
  );
}

export default App;
