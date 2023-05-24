import "../../scss/custom.scss";
import "./NSNP.css";

import { useState, useEffect } from "react";
import Menu from "../../components/NSnapse/Menu/Menu";
import Matrices from "../../components/NSnapse/Matrices/Matrices";
import WorkSpace from "../../components/NSnapse/WorkSpace/WorkSpace";
import Graph from "../../components/NSnapse/Graph/Graph";
import SubHeader from "../../components/NSnapse/SubHeader/SubHeader";

import NewNodeForm from "../../components/NSnapse/forms/NewNodeForm";
import NewInputForm from "../../components/NSnapse/forms/NewInputForm";
import EditNodeForm from "../../components/NSnapse/forms/EditNeuronForm";
import DeleteForm from "../../components/NSnapse/forms/DeleteForm";
import ClearAllForm from "../../components/NSnapse/forms/ClearAllForm";
import NewOutputForm from "../../components/NSnapse/forms/NewOutputForm";
import AddSynapse from "../../components/NSnapse/forms/AddSynapse";
import DeleteSynForm from "../../components/NSnapse/forms/DeleteSynForm";

import generateConfigurations from "../../utils/SimAlgs/generateConfiguration";
import { loadSystem, saveSystem } from "../../utils/saveload";
import { useViewer } from "../../utils/hooks/useViewer";
import localStorageMatrices from "../../utils/hooks/useLocalStorage";
import { useMatrixData } from "../../utils/hooks/useMatrixData";
import HistoryMenu from "../../components/NSnapse/HistoryMenu/HistoryMenu";
import { systemStackPush } from "../../utils/systemStackPush";
import { func } from "prop-types";

function NSNP() {
  // Control States
  const [timeSteps, setTimeSteps] = useState(0);
  const [guidedMode, setGuidedMode] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isDev, setDev] = useState(false);
  // States for the History
  const [CHist, setCHist] = useState([]);
  const [SHist, setSHist] = useState([]);
  const [PHist, setPHist] = useState([]);

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
  const [neuronPositions, setNeuronPositions] = useState([]);
  const [SNSet, setSNSet] = useState(new Set());
  function handleSNSet(){
    let SN=new Set();;
    for (let i=0;i<SV.length;i++){
      if (SV[i]==1){
        console.log(VL[i]);
        SN.add(VL[i]);
      }
    }
    console.log("From NSNP");
    console.log(SN);
    setSNSet(SN);
  }
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
  // Use Effect for reloading matrix data from local storage
  useEffect(() => {
    localStorageMatrices(matrixProps);
  }, []);

  // States for system history
  const [systemStack, setSystemStack] = useState([
    systemStackPush(
      C,
      F,
      L,
      VL,
      T,
      syn,
      envSyn,
      neuronPositions,
      "Initial System"
    ),
  ]);
  const [systemStackPointer, setSystemStackPointer] = useState(1);
  console.log("System Stack: ", systemStack);

  function pushSystem(system) {
    console.log("Stack Pointer: " + systemStackPointer);
    console.log("Stack Length: " + systemStack.length);
    // If systemStackPointer is not at the end of the stack, remove all the elements after it
    setSystemStackPointer(systemStack.length);

    if (systemStackPointer < systemStack.length - 1) {
      setSystemStack([...systemStack.slice(0, systemStackPointer), system]);
    } else {
      setSystemStack([...systemStack, system]);
    }
  }

  function handleRewind(index) {
    handleReset();
    let newSystem = systemStack[index].matrices;
    let newPositions = systemStack[index].positions;
    console.log("System Stack: ", systemStack);
    console.log("Index: ", index);
    setC(newSystem.C);
    setVL(newSystem.VL);
    setF(newSystem.F);
    setL(newSystem.L);
    setT(newSystem.T);
    setSyn(newSystem.syn);
    setEnvSyn(newSystem.envSyn);
    setNeuronPositions(newPositions);
    // TODO1: Save to Localstorage as well
    console.log("rewind");
    handleSNSet();
    setSystemStackPointer(index);
  }

  //States for Viewing WorkSpace components
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

  const [selectedNode, setSelectedNode] = useState("");
  const [selectedSyn, setSelectedSyn] = useState("");
  function handleOpenHistory() {
    setShowConfigHist(!showConfigHist);
  }
  function handleOpenSettings() {
    setShowSettings(!showSettings);
  }
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
    console.log("generate");
    handleSNSet();
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
    handleSNSet();
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
    handleSNSet();
  }

  function handleSave(matrixProps) {
    saveSystem(matrixProps);
  }

  function handleLoad(target, matrixProps) {
    loadSystem(target, matrixProps);
  }

  function handleShowGraph() {
    setShowGraph(!showGraph);
  }

  function handleEditMatrices() {
    setShowNonSimMatrices(!showNonSimMatrices);
    setShowSPMatrices(!showSPMatrices);
  }
  function resetDev() {
    setShowGraph(true);
    setShowNonSimMatrices(false);
    setShowSPMatrices(false);
  }
  
  return (
    <>
      <Menu
        load={handleLoad}
        {...matrixProps}
        save={handleSave}
        set={setDev}
        reset={resetDev}
        showMenu={showSettings}
        onClose={handleOpenSettings}
      />

      <HistoryMenu
        open={showConfigHist}
        onClose={handleOpenHistory}
        list1={systemStack}
        list2={CHist}
        list3={[]}
        itemAction={handleRewind}
      />

      <div className="body">
        <div className="nsnpheader">
          <div className="top">
            <button className="btn-c5 menubutton" onClick={handleOpenSettings}>
              Options
            </button>

            <h1>NSN P Simulator</h1>
            <button className="btn-c5 menubutton" onClick={handleOpenHistory}>
              History
            </button>
          </div>
          <div className="actionselector">
            <NewNodeForm
              {...matrixProps}
              pushSystem={pushSystem}
              selectedNode={selectedNode}
              setSelectedNode={setSelectedNode}
            />
            <NewInputForm pushSystem={pushSystem} />
            <NewOutputForm
              {...matrixProps}
              selectedNode={selectedNode}
              setSelectedNode={setSelectedNode}
              pushSystem={pushSystem}
            />
            {/* place holders */}

            <EditNodeForm
              selectedNode={selectedNode}
              setSelectedNode={setSelectedNode}
              pushSystem={pushSystem}
            />
            <DeleteForm
              {...matrixProps}
              selectedNode={selectedNode}
              setSelectedNode={setSelectedNode}
              pushSystem={pushSystem}
            />
            <ClearAllForm
              {...matrixProps}
              selectedNode={selectedNode}
              setSelectedNode={setSelectedNode}
              pushSystem={pushSystem}
            />
          </div>
          <div className="actionselector">
            <AddSynapse
              {...matrixProps}
              selectedNode={selectedNode}
              setSelectedNode={setSelectedNode}
              setSelectedSyn={setSelectedSyn}
              selectedSyn={selectedSyn}
              pushSystem={pushSystem}
            />
            <DeleteSynForm
              {...matrixProps}
              selectedNode={selectedNode}
              selectedSyn={selectedSyn}
              setSelectedNode={setSelectedNode}
              setSelectedSyn={setSelectedSyn}
              pushSystem={pushSystem}
            />
          </div>
          <SubHeader
            forward={handleGeneration}
            reset={handleReset}
            undo={handleUndo}
            edit={handleEditMatrices}
            number={timeSteps}
            checked={showGraph}
            checkbox={handleShowGraph}
            dev={isDev}
            setSims={setIsSimulating}
          />
        </div>

        {/* Matrix Inputs */}
        {showNonSimMatrices && <Matrices {...matrixProps} />}
        {/* Graph Workspace */}
        {!showNonSimMatrices && showGraph && (
          <Graph
            {...matrixProps}
            envValue={envValue}
            setEnvValue={setEnvValue}
            selectedNode={selectedNode}
            selectedSyn={selectedSyn}
            setSelectedNode={setSelectedNode}
            setSelectedSyn={setSelectedSyn}
            isSims={isSimulating}
            SNSet={SNSet}
          />
        )}
        {/* Matrix Outputs */}
        {showSPMatrices && !showGraph && <WorkSpace C={C} SV={SV} PM={PM} />}
      </div>
    </>
  );
}
export default NSNP;
