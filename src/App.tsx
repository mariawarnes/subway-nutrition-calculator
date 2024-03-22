import { useState } from "react";
import "./App.css";
import Button from "./components/Button";
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
  const [selectedSalads, setSelectedSalads] = useState([]);
  const [selectedSauces, setSelectedSauces] = useState([]);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [selectedToppings, setSelectedToppings] = useState([]);

  return (
    <div className="p-3 mx-auto max-w-lg my-5 shadow-lg bg-light-green">
      <h1 className="font-black text-2xl w-full text-center font-dark-green">
        Subway Calculator
      </h1>
      <div className="flex flex-col space-y-4">
        {/* Product */}
        <SingleSelectDropdown
          title={"Product"}
          options={products}
          selected={selectedProduct}
          setSelected={setSelectedProduct}
        />
        {/* Bread */}
        <SingleSelectDropdown
          title={"Bread"}
          options={breads}
          selected={selectedBread}
          setSelected={setSelectedBread}
        />
        {/* Cheese */}
        <SingleSelectDropdown
          title={"Cheese"}
          options={cheeses}
          selected={selectedCheese}
          setSelected={setSelectedCheese}
        />
        {/* Salads */}
        <MultiSelectDropdown />
        {/* Sauces */}
        <MultiSelectDropdown />
        {/* Extras */}
        <MultiSelectDropdown />
        {/* Toppings */}
        <MultiSelectDropdown />h
      </div>
    </div>
  );
}

export default App;
