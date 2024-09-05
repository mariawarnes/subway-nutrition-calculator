import { useMemo, useState } from "react";
import SingleSelectDropdown from "./components/SingleSelectDropdown";
import MultiSelectDropdown from "./components/MultiSelectDropdown";
import Button from "./components/Button";
import { Disclosure } from "@headlessui/react";
import { FaExternalLinkAlt } from "react-icons/fa";
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
import { BsChevronDown } from "react-icons/bs";
import Chip from "./components/Chip";
import Checkbox from "./components/Checkbox";

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
    const filterByPrefixMulti = (prefix: string) =>
      ingredients.filter((ingredient: { id: string }) =>
        presetIngredientIds.some(
          (id: string) => ingredient.id === id && id.startsWith(prefix)
        )
      );

    setSelectedProduct(
      ingredients.find((ingredient) => ingredient.id == "p-1") ?? null
    );
    setSelectedProteins(filterByPrefixMulti("m-"));
    setSelectedBread(
      ingredients.find((ingredient) => ingredient.id == "b-6") ?? null
    );
    setSelectedCheeses(filterByPrefixMulti("c-"));
    setSelectedSauces(filterByPrefixMulti("s-"));
    setSelectedSalads(filterByPrefixMulti("v-"));
    setSelectedExtras(filterByPrefixMulti("e-"));
    setSelectedToppings(filterByPrefixMulti("t-"));
  };

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
    ].filter(Boolean);

    allSelectedIngredients.forEach((ingredient) => {
      if (ingredient && !Array.isArray(ingredient)) {
        const multiplier =
          doubleProtein && ingredient.id.startsWith("m-") ? 2 : 1;
        totals.calories += (ingredient.calories ?? 0) * multiplier;
        totals.protein += (ingredient.protein ?? 0) * multiplier;
        totals.carbs += (ingredient.carbs ?? 0) * multiplier;
        totals.fat += (ingredient.fat ?? 0) * multiplier;
      } else if (Array.isArray(ingredient)) {
        ingredient.forEach((item) => {
          if (item) {
            let multiplier = 1;
            if (doubleProtein && item.id.startsWith("m-")) {
              multiplier = 2;
            }
            totals.calories += item.calories * multiplier;
            totals.protein += item.protein * multiplier;
            totals.carbs += item.carbs * multiplier;
            totals.fat += item.fat * multiplier;
          }
        });
      }
    });

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
      <section className="max-w-screen-lg p-6 mt-10 mx-auto md:flex md:space-x-4 md:flex-row my-5 shadow-md bg-white rounded-lg">
        <div className="md:w-1/2">
          <h1 className="font-bold mb-2 text-2xl w-full">
            Subway Nutrition Calculator
          </h1>
          <p className="my-2 text-sm font-light">
            Based on the nutritional values available at{" "}
            <a
              target="_blank"
              rel="nofollow noopener"
              className="underline text-bold"
              href="https://www.subway.com/en-GB/"
            >
              SUBWAY® UK & Ireland
              <FaExternalLinkAlt className="ml-1 relative bottom-[2px] inline" />
            </a>
            , values for other regions may vary.
          </p>
          <p className="py-6 text-base">Choose from a Signature or Saver</p>
          <Disclosure>
            <Disclosure.Button className="uppercase font-oswald text-sm mb-2 relative text-gray-700 shadow-md border-2 border-transparent focus:border-subway-green font-normal w-full p-2 bg-subway-light-green pr-6 rounded-md">
              {`Retired`}
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <BsChevronDown aria-hidden="true" />
              </span>
            </Disclosure.Button>
            <Disclosure.Panel>
              <div className="space-y-2 space-x-1 mb-4">
                {presets
                  .filter((preset) => preset.old && preset.old === true)
                  .map((preset) => (
                    <Chip
                      key={preset.id}
                      text={preset.name}
                      handleClick={() => {
                        if (activePreset === preset.id) {
                          setActivePreset(null);
                          clearSelected();
                        } else {
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
                          ? " border-black"
                          : " border-transparent"
                      }`}
                    />
                  ))}
              </div>
            </Disclosure.Panel>
          </Disclosure>
          <Disclosure>
            <Disclosure.Button className="uppercase font-oswald text-sm mb-2 relative text-gray-700 shadow-md border-2 border-transparent focus:border-subway-green font-normal w-full p-2 bg-subway-light-green pr-6 rounded-md">
              {`Current`}
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <BsChevronDown aria-hidden="true" />
              </span>
            </Disclosure.Button>
            <Disclosure.Panel>
              <div className="space-y-2 space-x-1 mb-4">
                {presets
                  .filter((preset) => !preset.old)
                  .map((preset) => (
                    <Chip
                      key={preset.id}
                      text={preset.name}
                      handleClick={() => {
                        if (activePreset === preset.id) {
                          setActivePreset(null);
                          clearSelected();
                        } else {
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
                          ? " border-black"
                          : " border-transparent"
                      }`}
                    />
                  ))}
              </div>
            </Disclosure.Panel>
          </Disclosure>
          <p className="py-6 text-base">Or build your own</p>
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
              <Checkbox
                id="double"
                label="Double"
                checked={doubleProtein}
                onChange={handleDoubleProtein}
              />
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
          </div>
        </div>

        <div className="md:w-1/2">
          {/* Display the nutritional information */}
          <div className="nutrition-info max-md:pt-4">
            <h2 className="text-lg ">Nutrition information</h2>
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
            <Button text="Reset" handleClick={clearSelected} />
          </div>
          <p className="text-xs my-2">
            SUBWAY® is a Registered Trademark of Subway IP LLC. © 2023-
            {new Date().getFullYear()} Subway IP LLC. All Rights Reserved.
          </p>
        </div>
      </section>
      <section className="p-6 max-w-screen-lg mx-auto my-5 shadow-lg bg-white rounded-lg">
        <div className="space-y-2">
          <h2 className="text-lg">Updates</h2>
          <div>
            <h3 className="font-bold">05/09/2024</h3>
            <ul className="list-disc ml-4 max-w-prose">
              <li>Removed 9 Grain Wheat from Bread</li>
              <li>Added Cheese &amp; Jalapeno to Bread</li>
              <li>
                Retired Great Caesar, Meatless Philly, Bacon &amp; Sausage,
                Veggie Breakwich, Pesto Paradiso, Club Master, Chipotle Cheese
                Steak, The BBQ Baller, Hunter's Chicken and Chimichurri Steak
              </li>
              <li>
                Added Furious Chicken and Steak Texicana to Signature Series
              </li>
              <li>
                Added Ham &amp; Cheese Saver Sub Toastie and X-Spicy Nacho
                Chicken Saver Sub to Savers
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold">23/06/2024</h3>
            <ul className="list-disc ml-4">
              <li>
                Added All Star Chicken and Chimichurri Steak to Signature Series
              </li>
              <li>Added Chimichurri Sauce to Sauces</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold">04/04/2024</h3>
            <ul className="list-disc ml-4">
              <li>
                Added Chipotle Cheese Steak and BBQ Baller to Signature Series
              </li>
              <li>Added Hunter's Chicken to Signature Series</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
