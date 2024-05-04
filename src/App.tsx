import { useMemo, useState } from "react";
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
import { Ingredient } from "./types";
import Button from "./components/Button";
import { Disclosure } from "@headlessui/react";
import { IoChevronDownCircleSharp } from "react-icons/io5";
import { FaExternalLinkAlt } from "react-icons/fa";

function App() {
  const [selectedProduct, setSelectedProduct] = useState<Ingredient | null>(
    null
  );
  const [selectedBread, setSelectedBread] = useState<Ingredient | null>(null);
  const [selectedProteins, setSelectedProteins] = useState<Ingredient[]>([]);
  const [doubleProtein, setDoubleProtein] = useState<boolean>(false);
  const [selectedCheeses, setSelectedCheeses] = useState<Ingredient[]>([]);
  const [selectedSalads, setSelectedSalads] = useState<Ingredient[]>([]);
  const [selectedSauces, setSelectedSauces] = useState<Ingredient[]>([]);
  const [selectedExtras, setSelectedExtras] = useState<Ingredient[]>([]);
  const [selectedToppings, setSelectedToppings] = useState<Ingredient[]>([]);
  const [activePreset, setActivePreset] = useState<string | null>(null);

  const clearSelected = () => {
    setSelectedProduct(null);
    setSelectedBread(null);
    setSelectedProteins([]);
    setDoubleProtein(false);
    setSelectedCheeses([]);
    setSelectedSalads([]);
    setSelectedSauces([]);
    setSelectedExtras([]);
    setSelectedToppings([]);
    setActivePreset(null);
  };

  const selectPreset = (
    ingredients: Ingredient[],
    presetIngredientIds: string[]
  ): void => {
    // Ensure ingredients data is accessible here, either pass as argument or import directly

    // Function to filter ingredients by prefix for multi-select
    const filterByPrefixMulti = (prefix: string) =>
      ingredients.filter((ingredient: { id: string }) =>
        presetIngredientIds.some(
          (id: string) => ingredient.id === id && id.startsWith(prefix)
        )
      );

    // Set 6-inch as default for presets
    setSelectedProduct(
      ingredients.find((ingredient) => ingredient.id == "p-1") ?? null
    );
    setSelectedProteins(filterByPrefixMulti("m-"));
    // Set Italian White as default for presets
    setSelectedBread(
      ingredients.find((ingredient) => ingredient.id == "b-6") ?? null
    );
    setSelectedCheeses(filterByPrefixMulti("c-"));
    setSelectedSauces(filterByPrefixMulti("s-"));
    setSelectedSalads(filterByPrefixMulti("v-"));
    setSelectedExtras(filterByPrefixMulti("e-"));
    setSelectedToppings(filterByPrefixMulti("t-"));
  };

  // Calculate the total nutritional information
  const calculateTotalsFunction = () => {
    let totals = { calories: 0, protein: 0, carbs: 0, fat: 0 };

    const allSelectedIngredients = [
      selectedProduct,
      selectedBread,
      ...selectedProteins,
      ...selectedCheeses,
      ...selectedSalads,
      ...selectedSauces,
      ...selectedExtras,
      ...selectedToppings,
    ].filter(Boolean); // This only removes null, but not arrays

    allSelectedIngredients.forEach((ingredient) => {
      // Check if the ingredient is not an array and not null
      if (ingredient && !Array.isArray(ingredient)) {
        const multiplier =
          doubleProtein && ingredient.id.startsWith("m-") ? 2 : 1;
        totals.calories += (ingredient.calories ?? 0) * multiplier;
        totals.protein += (ingredient.protein ?? 0) * multiplier;
        totals.carbs += (ingredient.carbs ?? 0) * multiplier;
        totals.fat += (ingredient.fat ?? 0) * multiplier;
      } else if (Array.isArray(ingredient)) {
        // If it's an array, iterate over the items
        ingredient.forEach((item) => {
          if (item) {
            // Ensure item is not null
            let multiplier = 1;
            // Double the protein values for certain conditions
            if (doubleProtein && item.id.startsWith("m-")) {
              multiplier = 2;
            }

            // Aggregate totals
            totals.calories += item.calories * multiplier;
            totals.protein += item.protein * multiplier;
            totals.carbs += item.carbs * multiplier;
            totals.fat += item.fat * multiplier;
          }
        });
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

    return totals;
  };

  const calculateTotals = useMemo(calculateTotalsFunction, [
    selectedProduct,
    selectedBread,
    selectedProteins,
    selectedCheeses,
    selectedSalads,
    selectedSauces,
    selectedExtras,
    selectedToppings,
    doubleProtein,
  ]);

  const handleDoubleProtein = (): void => {
    setDoubleProtein(!doubleProtein);
    calculateTotalsFunction();
  };

  return (
    <>
      <section className="p-3 mx-auto max-w-lg my-5 shadow-lg bg-white">
        <h1 className="font-black mb-2 text-2xl w-full text-dark-green">
          Subway Nutrition Calculator
        </h1>
        <hr className="border-dotted border-t-2 border-grey" />
        <p className="my-2">
          Based on the nutritional values available at{" "}
          <a
            target="_blank"
            rel="nofollow noopener"
            className="underline"
            href="https://www.subway.com/en-GB/"
          >
            {" "}
            SUBWAY® UK & Ireland{" "}
            <FaExternalLinkAlt className="ml-1 relative bottom-[2px] inline" />
          </a>
          , values for other regions may vary.
        </p>
        <hr className="border-dotted border-t-2 border-grey" />
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
                  key={preset.id} // Ensure each button has a unique key
                  text={preset.name}
                  handleClick={() => {
                    // If the current preset is already active, deactivate it
                    if (activePreset === preset.id) {
                      setActivePreset(null);
                      clearSelected(); // Assuming you have a function to clear the selection
                    } else {
                      // Activate the current preset and apply its settings
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
                      );
                      setActivePreset(preset.id);
                    }
                  }}
                  className={`${
                    activePreset === preset.id
                      ? "bg-yellow text-dark-green"
                      : "bg-light-grey text-white"
                  }`}
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
            <div className="ml-2 flex items-center">
              <input
                id="double"
                type="checkbox"
                onChange={handleDoubleProtein}
                className="mr-2"
                checked={doubleProtein}
              />
              <label htmlFor="double">Double?</label>
            </div>
          </div>
          {/* Cheese */}
          <MultiSelectDropdown
            title={"Cheese"}
            options={cheeses}
            selected={selectedCheeses}
            setSelected={setSelectedCheeses}
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
          <Button text="Reset" handleClick={clearSelected} />
        </div>

        {/* Display the nutritional information */}
        <div className="nutrition-info pt-4">
          <h2 className="text-lg text-dark-green">Nutrition information</h2>
          <p>Adults need around 2000 kcal a day.</p>
          <table className="w-full text-sm">
            <thead className="sr-only">
              <tr>
                <th>Nutrient</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-bold">Energy (kcal)</td>
                <td>{Math.round(calculateTotals.calories)}</td>
              </tr>
              <tr>
                <td className="font-bold">Protein (g)</td>
                <td>{Math.round(calculateTotals.protein)}</td>
              </tr>
              <tr>
                <td className="font-bold">Carbohydrate (g)</td>
                <td>{Math.round(calculateTotals.carbs)}</td>
              </tr>
              <tr>
                <td className="font-bold">Fat (g)</td>
                <td>{Math.round(calculateTotals.fat)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs my-2">
          SUBWAY® is a Registered Trademark of Subway IP LLC. © 2023-
          {new Date().getFullYear()} Subway IP LLC. All Rights Reserved.
        </p>
      </section>
      <section className="p-3 mx-auto max-w-lg my-5 shadow-lg bg-white">
        <h2 className="text-lg text-dark-green">Updates</h2>
        <h3 className="font-bold">04/04/2024</h3>
        <ul className="list-disc ml-4">
          <li>Added Chipotle Cheese Steak to Signature Series</li>
          <li>Added BBQ Baller to Signature Series</li>
          <li>Added Hunter's Chicken to Signature Series</li>
        </ul>
      </section>
    </>
  );
}

export default App;
