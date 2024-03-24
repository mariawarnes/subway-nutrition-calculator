import { useEffect, useMemo, useState } from "react";
import "./App.css";
import SingleSelectDropdown from "./components/SingleSelectDropdown";
import MultiSelectDropdown from "./components/MultiSelectDropdown";
import {
  products,
  breads,
  proteins,
  cheeses,
  salads,
  sauces,
  extras,
  toppings,
} from "./data/ingredients.json";
import { presets } from "./data/presets.json";
import { Ingredient, Preset } from "./types";
import Button from "./components/Button";
import { Disclosure } from "@headlessui/react";
import { IoChevronDownCircleSharp } from "react-icons/io5";

function App() {
  const [selectedProduct, setSelectedProduct] = useState<Ingredient | null>(
    null
  );
  const [selectedBread, setSelectedBread] = useState<Ingredient | null>(null);
  const [selectedProteins, setSelectedProteins] = useState<Ingredient[]>([]);
  const [doubleProtein, setDoubleProtein] = useState<boolean>(false);
  const [selectedCheese, setSelectedCheese] = useState<Ingredient | null>(null);
  const [selectedSalads, setSelectedSalads] = useState<Ingredient[]>([]);
  const [selectedSauces, setSelectedSauces] = useState<Ingredient[]>([]);
  const [selectedExtras, setSelectedExtras] = useState<Ingredient[]>([]);
  const [selectedToppings, setSelectedToppings] = useState<Ingredient[]>([]);
  const [selectedIngredientsJSON, setSelectedIngredientsJSON] = useState("");

  const clearSelected = () => {
    setSelectedProduct(null);
    setSelectedBread(null);
    setSelectedProteins([]);
    setDoubleProtein(false);
    setSelectedCheese(null);
    setSelectedSalads([]);
    setSelectedSauces([]);
    setSelectedExtras([]);
    setSelectedToppings([]);
  };

  const selectPreset = (
    ingredients: Ingredient[],
    presetIngredientIds: string[]
  ) => {
    // Ensure ingredients data is accessible here, either pass as argument or import directly

    // Function to filter ingredients by prefix for multi-select
    const filterByPrefixMulti = (prefix: string) =>
      ingredients.filter((ingredient: { id: string }) =>
        presetIngredientIds.some(
          (id: string) => ingredient.id === id && id.startsWith(prefix)
        )
      );

    // Function to filter ingredient by prefix for single-select
    const filterByPrefixSingle = (prefix: string) =>
      ingredients.find((ingredient: { id: string }) =>
        presetIngredientIds.some(
          (id: string) => ingredient.id === id && id.startsWith(prefix)
        )
      );

    // Set 6-inch as default for presets
    setSelectedProduct(
      ingredients.find((ingredient) => ingredient.id == "p-1")
    );
    setSelectedProteins(filterByPrefixMulti("m-"));
    // Set Italian White as default for presets
    setSelectedBread(ingredients.find((ingredient) => ingredient.id == "b-6"));
    setSelectedCheese(filterByPrefixSingle("c-"));
    setSelectedSauces(filterByPrefixMulti("s-"));
    setSelectedSalads(filterByPrefixMulti("v-"));
    setSelectedExtras(filterByPrefixMulti("e-"));
    setSelectedToppings(filterByPrefixMulti("t-"));
  };

  // Calculate the total nutritional information
  const calculateTotals = useMemo(() => {
    let totals = { calories: 0, protein: 0, carbs: 0, fat: 0 };

    const allSelectedIngredients = [
      selectedProduct,
      selectedBread,
      ...selectedProteins,
      selectedCheese,
      ...selectedSalads,
      ...selectedSauces,
      ...selectedExtras,
      ...selectedToppings,
    ].filter(Boolean); // Remove any null values

    allSelectedIngredients.forEach((ingredient) => {
      if (
        ingredient?.calories &&
        ingredient.protein &&
        ingredient.carbs &&
        ingredient.fat
      ) {
        totals.calories += ingredient?.calories;
        totals.protein += ingredient?.protein;
        totals.carbs += ingredient.carbs;
        totals.fat += ingredient.fat;
      }
    });

    // Double the totals if the selected product has an id of "p-2" (footlong)
    if (selectedProduct?.id === "p-2") {
      totals = {
        calories: totals.calories * 2,
        protein: totals.protein * 2,
        carbs: totals.carbs * 2,
        fat: totals.fat * 2,
      };
    }

    // Double the protein if doubleProtein is true
    if (doubleProtein) {
      totals.protein = totals.protein * 2;
    }

    return totals;
  }, [
    selectedProduct,
    selectedBread,
    selectedProteins,
    selectedCheese,
    selectedSalads,
    selectedSauces,
    selectedExtras,
    selectedToppings,
    doubleProtein,
  ]);

  // useEffect(() => {
  //   const ingredients = {
  //     selectedProduct,
  //     selectedBread,
  //     selectedProteins,
  //     selectedCheese,
  //     selectedSalads,
  //     selectedSauces,
  //     selectedExtras,
  //     selectedToppings,
  //   };
  //   setSelectedIngredientsJSON(JSON.stringify(ingredients, null, 2));
  // }, [
  //   selectedProduct,
  //   selectedBread,
  //   selectedProteins,
  //   selectedCheese,
  //   selectedSalads,
  //   selectedSauces,
  //   selectedExtras,
  //   selectedToppings,
  // ]);

  return (
    <div className="p-3 mx-auto max-w-lg my-5 shadow-lg bg-white">
      <h1 className="font-black text-2xl w-full text-dark-green">
        Subway Nutrition Calculator
      </h1>
      {/* <p>{selectedIngredientsJSON}</p> */}
      <hr className="" />
      <p className="font-light text-dark-grey">text and stuff</p>
      <hr className="" />
      <Disclosure>
        <Disclosure.Button
          className={
            "relative my-4 pr-8 rounded-full inline-block px-4 py-1 bg-yellow text-dark-green"
          }
        >
          Signatures & Savers
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <IoChevronDownCircleSharp
              className="text-grey text-base"
              aria-hidden="true"
            />
          </span>
        </Disclosure.Button>
        <Disclosure.Panel>
          <div className="space-y-2 space-x-1 mb-4">
            {presets.map((preset) => (
              <Button
                text={preset.name}
                handleClick={() =>
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
                    preset.ingredients
                  )
                }
              />
            ))}
          </div>
        </Disclosure.Panel>
      </Disclosure>
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
        {/* Protein */}
        <div className="flex flex-row items-center">
          <MultiSelectDropdown
            title={"Protein"}
            options={proteins}
            selected={selectedProteins}
            setSelected={setSelectedProteins}
            className="grow"
          />
          <div className="ml-2">
            <input
              type="checkbox"
              onChange={() => setDoubleProtein(doubleProtein)}
              className="mr-2"
            />
            Double?
          </div>
        </div>
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
        <Button text="Clear All" handleClick={clearSelected} />
      </div>

      {/* Display the nutritional information */}
      <div className="nutrition-info pt-4">
        <h2 className="text-lg font-bold">Nutritional Information:</h2>
        <p>Calories: {Math.round(calculateTotals.calories)} kcal</p>
        <p>Protein: {Math.round(calculateTotals.protein)}g</p>
        <p>Carbs: {Math.round(calculateTotals.carbs)}g</p>
        <p>Fat: {Math.round(calculateTotals.fat)}g</p>
      </div>
    </div>
  );
}

export default App;
