import "../../scss/custom.scss";
import "./NSNP.css";
import NewNodeForm from "../../components/NSnapse/forms/NewNodeForm";
import NewInputForm from "../../components/NSnapse/forms/NewInputForm";
import EditNodeForm from "../../components/NSnapse/forms/EditNodeForm";
import DeleteForm from "../../components/NSnapse/forms/DeleteForm";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import Menu from "../../components/Prototype/Menu/Menu";

import { useViewer } from "../../utils/hooks/useViewer";
import { useMatrixData } from "../../utils/hooks/useMatrixData";
import localStorageMatrices from "../../utils/hooks/useLocalStorage";
import Matrices from "../../components/Prototype/Matrices/Matrices";
import WorkSpace from "../../components/Prototype/WorkSpace/WorkSpace";
import Graph from "../../components/Prototype/Graph/Graph";
import SubHeader from "../../components/Prototype/SubHeader/SubHeader";
import generateConfigurations from "../../utils/SimAlgs/generateConfiguration";
import { loadSystem, saveSystem } from "../../utils/saveload";

function NSNP() {
  // modals
  const [showNewNodeModal, setShowNewNodeModal] = useState(false);
  const [showNewInputNodeModal, setShowNewInputNodeModal] = useState(false);
  const [showDelete, setDelete] = useState(false);
  const [showEdit, setshowEdit] = useState(false);

  //Modal handlers
  const handleClose = () => setShowNewNodeModal(false);
  const handleShow = () => setShowNewNodeModal(true);
  const handleNewInputClose = () => setShowNewInputNodeModal(false);
  const handleNewInputShow = () => setShowNewInputNodeModal(true);
  const handleOutputShow = () => alert("Added new Output Neuron");
  const handleDeleteClose = () => setDelete(false);
  const handleDeleteShow = () => setDelete(true);
  const handleShowEdit = () => setshowEdit(true);
  const handleCloseEdit = () => setshowEdit(false);

  // Control States
  const [timeSteps, setTimeSteps] = useState(0);
  const [guidedMode, setGuidedMode] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);

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
    console.log("Old C", C);
    localStorageMatrices(matrixProps);
    console.log("New C", C);
  }, []);

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
      <Menu load={handleLoad} {...matrixProps} save={handleSave} />

      <div className="body">
        <div className="nsnpheader">
          <center>
            <h1>NSN P Simulator</h1>
          </center>
          <div className="actionselector">
            <NewNodeForm {...matrixProps} handleCloseModal={handleClose} />
            <NewInputForm handleCloseModal={handleNewInputClose} />
            <Button variant="c5" onClick={handleOutputShow}>
              New Output Neuron
            </Button>
            {/* place holders */}

            <EditNodeForm
              handleCloseModal={handleCloseEdit}
              selectedNode={selectedNode}
            />
            <DeleteForm />
          </div>
            <SubHeader
              forward={handleGeneration}
              reset={handleReset}
              undo={handleUndo}
              number={timeSteps}
              checked={showGraph}
            />
        </div>

        {/* Matrix Inputs */}
        {showNonSimMatrices && <Matrices {...matrixProps} />}
        {/* Graph Workspace */}
        {
          <Graph
            {...matrixProps}
            envValue={envValue}
            setEnvValue={setEnvValue}
            selectedNode={selectedNode}
            setSelectedNode={setSelectedNode}
          />
        }
        {/* Matrix Outputs */}
        {showSPMatrices && !showGraph && <WorkSpace C={C} SV={SV} PM={PM} />}
      </div>
    </>
  );
}
export default NSNP;
