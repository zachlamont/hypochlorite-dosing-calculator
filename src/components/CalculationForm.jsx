import React, { useState } from "react";

const CalculationForm = () => {
  const [input1, setInput1] = useState(0);
  const [input2, setInput2] = useState(0);
  const [output, setOutput] = useState(0);

  const handleInput1Change = (e) => {
    setInput1(Number(e.target.value));
  };

  const handleInput2Change = (e) => {
    setInput2(Number(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const sum = input1 + input2;
    setOutput(sum);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="number" value={input1} onChange={handleInput1Change} />
        <input type="number" value={input2} onChange={handleInput2Change} />
        <button type="submit">Calculate</button>
      </form>
      <div>Output: {output}</div>
    </div>
  );
};

export default CalculationForm;
