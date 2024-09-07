import { useEffect, useMemo, useState } from "react";
import SingleSelectDropdown from "./components/SingleSelectDropdown";
import MultiSelectDropdown from "./components/MultiSelectDropdown";
import Button from "./components/Button";
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
import { Ingredient, Preset, PresetWithIds } from "./types";
import Checkbox from "./components/Checkbox";
import Accordion from "./components/Accordion";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";

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

  const [previousTotals, setPreviousTotals] = useState<{
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  }>({ calories: 0, protein: 0, carbs: 0, fat: 0 });

  // Combine all ingredients into a single array
  const allIngredients: Ingredient[] = [
    ...products,
    ...breads,
    ...proteins,
    ...cheeses,
    ...sauces,
    ...salads,
    ...extras,
    ...toppings,
  ];

  // Create a dictionary for quick lookup by ID
  const ingredientMap: Record<string, Ingredient> = {};
  allIngredients.forEach((ingredient: Ingredient) => {
    ingredientMap[ingredient.id] = ingredient;
  });

  // Function to map ingredient IDs to Ingredient objects
  const mapPresetIngredients = (preset: PresetWithIds): Preset => {
    const mappedIngredients: Ingredient[] = preset.ingredients.map(
      (id: string) => {
        const ingredient = ingredientMap[id];
        if (!ingredient) {
          throw new Error(`Ingredient with id ${id} not found`);
        }
        return ingredient;
      }
    );

    return {
      ...preset,
      ingredients: mappedIngredients,
    };
  };

  // Apply the mapping to all presets
  const mappedPresets: Preset[] = (presets as PresetWithIds[]).map(
    mapPresetIngredients
  );

  const renderArrow = (current: number, previous: number) => {
    console.log("Current:", current, "Previous:", previous);

    if (current > previous) {
      return <BsArrowUp className="inline mr-2" />;
    } else if (current < previous) {
      return <BsArrowDown className="inline mr-2" />;
    } else {
      return null;
    }
  };

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

  useEffect(() => {
    console.log("Previous Totals:", previousTotals);
    console.log("Current Totals:", calculateTotals);
    setPreviousTotals(calculateTotals);
  }, [calculateTotals]);

  const handleDoubleProtein = (): void => {
    setDoubleProtein(!doubleProtein);
    calculateTotalsFunction();
  };

  return (
    <>
      <section className="max-w-screen-lg p-4 sm:p-10 mt-4 sm:mt-10 mx-auto md:flex md:space-x-6 md:flex-row my-5 shadow-custom bg-white rounded-lg">
        <div className="md:w-1/2">
          <h1 className="font-black mb-2 text-4xl w-full">
            <span className="text-subway-yellow font-oswald uppercase">
              Sub
            </span>
            <span className="text-subway-green font-oswald uppercase">way</span>{" "}
            Nutrition Calculator
          </h1>
          <p className="body-copy">
            Based on the nutritional values available at{" "}
            <a
              target="_blank"
              rel="nofollow noopener"
              className="underline text-sm font-bold"
              href="https://www.subway.com/en-GB/"
            >
              SUBWAY® UK & Ireland
              <FaExternalLinkAlt className="ml-1 relative bottom-[2px] inline" />
            </a>
            , values for other regions may vary.
          </p>
          <p className="sub-heading">Choose from a Signature or Saver</p>
          <div className="flex flex-col space-y-6 relative">
            <Accordion
              label="Choose a Signature or Saver"
              presets={mappedPresets}
              activePreset={activePreset}
              selectPreset={selectPreset}
              setActivePreset={setActivePreset}
              clearSelected={clearSelected}
            />
          </div>
          <p className="sub-heading">Or build your own</p>
          <div className="flex flex-col space-y-6 relative">
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
          <div className="nutrition-info max-md:pt-4 bg-white md:sticky md:top-8">
            <h2 className="sub-heading !mt-0">Nutrition Info</h2>
            <p className="body-copy">Adults need around 2000 kcal a day.</p>
            <table className="w-full text-sm">
              <thead className="sr-only">
                <tr>
                  <th>Nutrient</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="table-header">Energy (kcal)</td>
                  <td className="text-right">
                    {Math.round(calculateTotals.calories)}
                    {renderArrow(
                      calculateTotals.calories,
                      previousTotals.calories
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="table-header">Protein (g)</td>
                  <td className="text-right">
                    {Math.round(calculateTotals.protein)}
                    {renderArrow(
                      calculateTotals.protein,
                      previousTotals.protein
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="table-header">Carbohydrate (g)</td>
                  <td className="text-right">
                    {Math.round(calculateTotals.carbs)}
                    {renderArrow(calculateTotals.carbs, previousTotals.carbs)}
                  </td>
                </tr>
                <tr>
                  <td className="table-header">Fat (g)</td>
                  <td className="text-right">
                    {Math.round(calculateTotals.fat)}
                    {renderArrow(calculateTotals.fat, previousTotals.fat)}
                  </td>
                </tr>
              </tbody>
            </table>
            <Button text="Reset" handleClick={clearSelected} />

            <p className="smallprint mt-4">
              SUBWAY® is a Registered Trademark of Subway IP LLC. © 2023-
              {new Date().getFullYear()} Subway IP LLC. All Rights Reserved.
            </p>
          </div>
        </div>
      </section>
      <section className="p-8 max-w-screen-lg mx-auto my-14 shadow-custom bg-white rounded-lg">
        <div className="space-y-2">
          <h2 className="sub-heading !mt-0">Updates</h2>
          <div className="space-y-6">
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
                  Added All Star Chicken and Chimichurri Steak to Signature
                  Series
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
        </div>
      </section>
    </>
  );
}

export default App;
