import { useState } from "react";
import "./App.css";
import Button from "./components/Button";
import SingleSelectDropdown from "./components/SingleSelectDropdown";
import MultiSelectDropdown from "./components/MultiSelectDropdown";

function App() {
  const [product, setProduct] = useState("");
  const [bread, setBread] = useState("");
  const [cheese, setCheese] = useState("");
  const [salads, setSalads] = useState([]);
  const [sauces, setSauces] = useState([]);
  const [extras, setExtras] = useState([]);
  const [toppings, setToppings] = useState([]);

  const products = [
    {
      name: "6-inch Sub",
    },
    {
      name: "Footlong Sub",
    },
    {
      name: "Wrap",
    },
    {
      name: "Salad",
    },
  ];

  return (
    <div className="p-3 mx-auto max-w-lg my-5 shadow-lg bg-light-green">
      <h1 className="font-black text-2xl w-full text-center font-dark-green">
        Subway Calculator
      </h1>
      <div className="flex flex-col space-y-4">
        {/* Product */}
        <SingleSelectDropdown title={"Product"} options={products} />
        {/* Bread */}
        {/* <SingleSelectDropdown /> */}
        {/* Cheese */}
        {/* <SingleSelectDropdown /> */}
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
