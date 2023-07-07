import React, { useState } from "react";

const CalculationForm = () => {
  const [hypoConc, setHypoConc] = useState(10);
  const [reservoirVolume, setReservoirVolume] = useState(15);
  const [reservoirLevel, setReservoirLevel] = useState(50);
  const [dailyFlow, setDailyFlow] = useState(0);
  const [incomingChloramineLevel, setIncomingChloramineLevel] = useState(0);
  const [currentFreeChlorineLevel, setCurrentFreeChlorineLevel] = useState(0);
  const [currentChloramineLevel, setCurrentChloramineLevel] = useState(0);
  const [targetFreeChlorine, setTargetFreeChlorine] = useState(0);
  const [doseRate, setDoseRate] = useState(0);

  //OUTPUTS:

  const [output, setOutput] = useState(0);
  const [
    outputLitresRequiredToBreakPointReservoir,
    setOutputLitresRequiredToBreakpointReservoir,
  ] = useState(0);
  const [outputTimeToBreakpointReservoir, setOutputTimeToBreakpointReservoir] =
    useState(0);

  const handleHypoConcChange = (e) => {
    setHypoConc(Number(e.target.value));
  };
  const handleReservoirVolumeChange = (e) => {
    setReservoirVolume(Number(e.target.value));
  };
  const handleReservoirLevelChange = (e) => {
    setReservoirLevel(Number(e.target.value));
  };

  const handleInput3Change = (e) => {
    setDailyFlow(Number(e.target.value));
  };
  const handleInput4Change = (e) => {
    setIncomingChloramineLevel(Number(e.target.value));
  };
  const handleInput5Change = (e) => {
    setCurrentFreeChlorineLevel(Number(e.target.value));
  };
  const handleInput6Change = (e) => {
    setCurrentChloramineLevel(Number(e.target.value));
  };
  const handleInput7Change = (e) => {
    setTargetFreeChlorine(Number(e.target.value));
  };
  const handleInput8Change = (e) => {
    setDoseRate(Number(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // NH2Cl + 2 HOCl --> NCL3 + 2H2O

    //STEP 1: moles of chloramine in reservoir

    let currentVolume = reservoirVolume * (reservoirLevel / 100);
    let currentChloramineLevelInGrams = currentChloramineLevel / 1000;
    let currentLitres = currentVolume * 1000000;
    let numberOfMolesChloraminePerLitre = currentChloramineLevelInGrams / 51.48; //n = m / mw
    let numberOfMolesChloramineTotal =
      numberOfMolesChloraminePerLitre * currentLitres;

    //STEP 2: moles of free chlorine required to breakpoint reservoir

    let numberOfMolesFreeToBreakpoint = numberOfMolesChloramineTotal * 2;

    //STEP 3: Volume of hypochlorite required to breakpoint reservoir

    let hypoConcDecimal = hypoConc / 100;
    let hypoGramsPerLitre = hypoConcDecimal * 1000;
    let hypoMolesPerLitre = hypoGramsPerLitre / 52.46;
    let litresHypoRequiredToBreakpoint =
      numberOfMolesFreeToBreakpoint / hypoMolesPerLitre;

    //STEP 4: Time required to reach breakpoint

    let timeToBreakpoint = litresHypoRequiredToBreakpoint / doseRate;

    //STEP 5: Moles of incoming Chloramine per day

    let IncomingChloramineInGrams = incomingChloramineLevel / 1000;
    let incomingLitres = dailyFlow * 1000000;
    let numberOfMolesChloraminePerLitreIncoming =
      IncomingChloramineInGrams / 51.48; //n = m / mw
    let numberOfMolesChloramineTotalIncoming =
      numberOfMolesChloraminePerLitreIncoming * incomingLitres;

    //STEP 6: moles of free chlorine required to breakpoint incoming

    let numberOfMolesFreeToBreakpointIncoming =
      numberOfMolesChloramineTotalIncoming * 2;

    //STEP 7: volume of hypochlorite required to breakpoint incoming

    let litresHypoRequiredToBreakpointIncoming =
      numberOfMolesFreeToBreakpointIncoming / hypoMolesPerLitre;

    //OUTPUTS:------------------------

    setOutput(litresHypoRequiredToBreakpointIncoming);

    setOutputLitresRequiredToBreakpointReservoir(
      litresHypoRequiredToBreakpoint
    );
    setOutputTimeToBreakpointReservoir(timeToBreakpoint);
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Hypochlorite Concentration (%):
          <input
            type="number"
            value={hypoConc}
            onChange={handleHypoConcChange}
          />
        </label>
        <label>
          Reservoir Capacity (ML):
          <input
            type="number"
            value={reservoirVolume}
            onChange={handleReservoirVolumeChange}
          />
        </label>
        <label>
          Reservoir Level (%):
          <input
            type="number"
            value={reservoirLevel}
            onChange={handleReservoirLevelChange}
          />
        </label>

        <label>
          Daily Flow (ML):
          <input
            type="number"
            value={dailyFlow}
            onChange={handleInput3Change}
          />
        </label>

        <label>
          Incoming Chloramine Level (mg/L):
          <input
            type="number"
            value={incomingChloramineLevel}
            onChange={handleInput4Change}
          />
        </label>

        <label>
          Current Free Chlorine Level (mg/L):
          <input
            type="number"
            value={currentFreeChlorineLevel}
            onChange={handleInput5Change}
          />
        </label>

        <label>
          Current Chloramine Level(mg/L):
          <input
            type="number"
            value={currentChloramineLevel}
            onChange={handleInput6Change}
          />
        </label>

        <label>
          Target Free Chlorine (mg/L):
          <input
            type="number"
            value={targetFreeChlorine}
            onChange={handleInput7Change}
          />
        </label>

        <label>
          Dose Rate (L/s):
          <input type="number" value={doseRate} onChange={handleInput8Change} />
        </label>

        <button type="submit">Calculate</button>
      </form>

      <div className="outputs-container">
        <h3>Reservoir</h3>
        <div>Output: </div> <div>{output}</div>
        <div> Volume of hypochlorite required to reach breakpoint (L)</div>
        <div>{outputLitresRequiredToBreakPointReservoir}</div>
        <div> Time to reach breakpoint (Hrs)</div>
        <div>{outputTimeToBreakpointReservoir}</div>
      </div>
    </div>
  );
};

export default CalculationForm;
