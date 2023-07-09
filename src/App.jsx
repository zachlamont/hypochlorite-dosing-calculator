import { useState } from "react";

import "./App.css";

//---------------------------

import CalculationForm from "./components/CalculationForm";

function App() {
  return (
    <>
      <h1>Hypochlorite Dosing Calculator</h1>

      <CalculationForm />
    </>
  );
}

export default App;
