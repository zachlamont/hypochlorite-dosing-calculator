import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

//---------------------------

import CalculationForm from "./components/CalculationForm";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Hypochlorite Dosing Calculator</h1>

      <CalculationForm />
    </>
  );
}

export default App;
