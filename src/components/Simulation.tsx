/* eslint-disable */
import React, { useEffect } from "react";
import { useState, useMemo } from "react";
import "./Simulation.css";
import { MathComponent } from "mathjax-react";
import generateConfigurations from "../utils/SimAlgs/generateConfiguration.js";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header/Header";
import SubHeader from "./SubHeader/SubHeader";
import ConfigHist from "./ConfigHist/ConfigHist";
import Settings from "./Settings/Settings";
import Matrices from "./Matrices/Matrices";
import WorkSpace from "./WorkSpace/WorkSpace";
import Graph from "./Graph/Graph";
import saveAs from "file-saver";
import convert from "xml-js";
import { useViewer } from "../utils/hooks/useViewer";
import { useMatrixData } from "../utils/hooks/useMatrixData";
import { saveSystem, loadSystem } from "../utils/saveload";

function Simulation() {
  // Control States
  const [timeSteps, setTimeSteps] = useState(0);
  const [guidedMode, setGuidedMode] = useState(false);

  // States for the History
  const [CHist, setCHist] = useState<number[][]>([]);
  const [SHist, setSHist] = useState<number[][][]>([]);
  const [PHist, setPHist] = useState<number[][][]>([]);

  // States for the System
  const {
    C,
    setC,
    VL,
    setVL,
    F,

    setF,
    L,
    setL,
    T,
    setT,
    syn,
    setSyn,
    envValue,
    setEnvValue,
    envSyn,
    setEnvSyn,
    SV,
    setSV,
    PM,
    setPM,
  } = useMatrixData();
  const [neuronPositions, setNeuronPositions] = useState<number[]>([]);
  let matrixProps = {
    C: C,
    VL: VL,
    F: F,
    L: L,
    T: T,
    syn: syn,
    envSyn: envSyn,
    neuronPositions: neuronPositions,
    setC: setC,
    setVL: setVL,
    setF: setF,
    setL: setL,
    setT: setT,
    setSyn: setSyn,
    setEnvSyn: setEnvSyn,
    setCHist: setCHist,
    setNeuronPositions: setNeuronPositions,
  };

  useEffect(() => {
    let storedMatrices = localStorage.getItem("Matrices");
    let json = storedMatrices !== null ? JSON.parse(storedMatrices) : "";
    if (json.length !== 0) {
      setC(json.C);
      setVL(json.VL);
      setF(json.F);
      setL(json.L);
      setT(json.T);
      setSyn(json.syn);
      setEnvSyn(json.envSyn);
    } else {
      setC([1, 1, 2]);
      setVL([1, 1, 2]);
      setF([
        [1, 1, 0],
        [0.5, 0.5, 0],
        [0, 0, 1],
        [0, 0, 0.5],
      ]);

      setL([
        [1, 0],
        [1, 0],
        [0, 1],
        [0, 1],
      ]);
      setT([[4, 4]]);
      setSyn([
        [1, 2],
        [2, 1],
      ]);
      setEnvSyn(2);
    }
  }, []);

  //States for Viewing components
  const {
    showNonSimMatrices,
    setShowNonSimMatrices,
    showSPMatrices,
    setShowSPMatrices,
    showConfigHist,
    setShowConfigHist,
    showSettings,
    setShowSettings,
    showGraph,
    setShowGraph,
  } = useViewer();

  // Functions for the buttons
  function handleOpenSettings() {
    setShowSettings(!showSettings);
    if (showConfigHist) {
      setShowConfigHist(false);
    }
  }
  function handleOpenHistory() {
    setShowConfigHist(!showConfigHist);
    if (showSettings) {
      setShowSettings(false);
    }
  }
  function handleShowGraph() {
    setShowGraph(!showGraph);
  }

  function handleGuidedMode() {
    setGuidedMode(!guidedMode);
  }

  function handleEditMatrices() {
    setShowNonSimMatrices(!showNonSimMatrices);
    setShowSPMatrices(!showSPMatrices);
  }

  // Main Simulation Functions
  function handleGeneration() {
    let matrices = generateConfigurations(
      guidedMode,
      [C],
      1,
      L,
      F,
      T,
      VL,
      syn,
      envSyn
    );
    let newC = matrices.unexploredStates[0];

    let newS = matrices.S;
    let newP = matrices.P;
    setC(newC);
    setSV(newS);
    setPM(newP);
    setCHist((CHist) => [...CHist, C]);
    setPHist((PHist) => [...PHist, newP]);
    setSHist((SHist) => [...SHist, newS]);
    setEnvValue((envValue) => [...envValue, matrices.finalEnvValue]);

    setShowNonSimMatrices(false);
    setShowSPMatrices(true);
    setTimeSteps(timeSteps + 1);
  }

  function handleReset() {
    if (timeSteps == 0) {
      return;
    }
    setC(CHist[0]);
    setSV([]);
    setPM([]);
    setCHist([]);
    setPHist([]);
    setSHist([]);
    setTimeSteps(0);
    setEnvValue([]);
  }

  function handleUndo() {
    if (timeSteps == 0) {
      return;
    }
    let newC = CHist[timeSteps - 1];
    let newS = SHist[timeSteps - 1];
    let newP = PHist[timeSteps - 1];
    setC(newC);
    setSV(newS);
    setPM(newP);
    setCHist(CHist.slice(0, timeSteps - 1));
    setPHist(PHist.slice(0, timeSteps - 1));
    setSHist(SHist.slice(0, timeSteps - 1));
    setEnvValue(envValue.slice(0, timeSteps - 1));
    setTimeSteps(timeSteps - 1);
  }

  function handleRewind(index) {
    if (timeSteps == 0 || index > timeSteps) {
      return;
    }
    let newC = CHist[index];
    let newS = SHist[index];
    let newP = PHist[index];
    setC(newC);
    setSV(newS);
    setPM(newP);
    setCHist(CHist.slice(0, index));
    setPHist(PHist.slice(0, index));
    setSHist(SHist.slice(0, index));
    setEnvValue(envValue.slice(0, index));
    setTimeSteps(index);
  }

  function handleSave(matrixProps) {
    saveSystem(matrixProps);
  }

  function handleLoad(target, matrixProps) {
    loadSystem(target, matrixProps);
  }

  return (
    <>
      <Settings
        open={showSettings}
        onClose={handleOpenSettings}
        itemaction={handleGuidedMode}
        itemaction1={handleShowGraph}
        itemaction2={handleSave}
        itemaction3={handleLoad}
        checked1={showGraph}
        checked={guidedMode}
        {...matrixProps}
      />
      <ConfigHist
        open={showConfigHist}
        onClose={handleOpenHistory}
        list={CHist}
        itemAction={handleRewind}
      />
      <Header leftbutton={handleOpenSettings} rightbutton={handleOpenHistory} />
      <SubHeader
        forward={handleGeneration}
        reset={handleReset}
        edit={handleEditMatrices}
        undo={handleUndo}
        number={timeSteps}
        checkbox={handleShowGraph}
        checked={showGraph}
      />

      {/* Show Matrices and Input */}
      {showNonSimMatrices && <Matrices {...matrixProps} />}

      {/* Show Simulation Matrices (WorkSpace)*/}
      {showSPMatrices && !showGraph && <WorkSpace C={C} SV={SV} PM={PM} />}

      {/* Show Graph */}
      {!showNonSimMatrices && showGraph && (
        <Graph {...matrixProps} envValue={envValue} setEnvValue={setEnvValue} />
      )}
    </>
  );
}

export default Simulation;
