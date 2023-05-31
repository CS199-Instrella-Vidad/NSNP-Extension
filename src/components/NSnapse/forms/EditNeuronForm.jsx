import { useState, useEffect } from "react";
import Select from "react-select";
import { Slider, Box, Grid, Input } from "@mui/material";
import "./forms.css";
import { Modal, Button, ModalBody, ModalFooter } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { PersonPlusFill } from "react-bootstrap-icons";
import { systemStackPush } from "../../../utils/systemStackPush";
import saveSystemtoStorage from "../../../utils/saveSystemtoStorage";

function EditNeuronForm(props) {
  const [numVars, setNumVars] = useState(1);
  const [numFuncs, setNumFuncs] = useState(1);
  const [nodeOptions, setNodeOptions] = useState([]);
  const [inputVars, setInputVars] = useState([]);
  const [inputFuncs, setInputFuncs] = useState([]);
  const [inputThreshold, setInputThreshold] = useState([]);

  const [inputSynOut, setInputSynOut] = useState([]);
  const [inputSynIn, setInputSynIn] = useState([]);

  const neuronNumber = props.L.length === 0 ? 1 : props.L[0].length + 1;
  //for slider with tb
  const [varVal, setValue] = useState(1);
  const [funcVal, setFunc] = useState(1);
  const [isdisabled, setAble] = useState(true);
  const [showModal, setShow] = useState(false);

  let newC = props.C;
  let newF = props.F;
  let newL = props.L;
  let newVL = props.VL;
  let newT = props.T;
  let newSyn = props.syn;
  let newEnvSyn = props.envSyn;
  let newNeuronPositions = props.neuronPositions;

  function getNeuronVars(neuron) {
    // From VL, determine which variables are in the neuron
    let neuronVars = [];
    for (let i = 0; i < props.VL.length; i++) {
      if (props.VL[i] == neuron) {
        neuronVars.push(i);
      }
    }
    return neuronVars;
  }

  function getNeuronFuncs(neuron) {
    // From L, determine which functions are in the neuron
    let neuronFuncs = [];
    for (let i = 0; i < props.L.length; i++) {
      if (props.L[i][neuron - 1] == 1) {
        neuronFuncs.push(i);
      }
    }
    return neuronFuncs;
  }

  //for modals

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    // setNumVars(getNeuronFuncs(parseInt(props.selectedNode.slice(7))));
    // setNumFuncs(getNeuronFuncs(parseInt(props.selectedNode.slice(7))));
    // setValue(getNeuronVars(parseInt(props.selectedNode.slice(7))));
    // setFunc(getNeuronFuncs(parseInt(props.selectedNode.slice(7))));
    // Set default values of variables in form based on C
    // set default values of functions in form based on F
    // set default values of threshold in form
    // set default values of synapses in form
    setShow(true);
  };

  const toEdit = () => {
    // This will insert values needed to be inserted or concatenated into matrices
    // Variables:
    //TODO   delete all variables that contain the neuron, then add variables stored in inputVars
    // Functions:
    //TODO   delete all functions that contain the neuron, then add functions stored in inputFuncs
    // Threshold:
    //  delete all thresholds that contain the neuron, then add threshold stored in inputThreshold
    // Synapses:
    //   delete all synapses that contain the neuron, then add synapses stored in inputsynin and out

    let neuron = parseInt(props.selectedNode.slice(7));
    let varIndices = getNeuronVars(neuron); // Indices of variables of neuron in C

    let funcIndices = getNeuronFuncs(neuron); // Indices of functions of neuron in F
    console.log("varIndices", varIndices);

    // editNeuron(neuron);

    // // Adding to history
    // let system = systemStackPush(
    //   newC,
    //   newF,
    //   newL,
    //   newVL,
    //   newT,
    //   newSyn,
    //   newEnvSyn,
    //   newNeuronPositions,
    //   "Deleted a Neuron"
    // );
    // props.pushSystem(system);
    // props.setSelectedNode("");
    // hide();
  };

  function editNeuron(neuron) {
    let neuronVars = getNeuronVars(neuron);

    let indices = [];
    let idx = newVL.indexOf(neuron);
    while (idx != -1) {
      indices.push(idx);
      idx = newVL.indexOf(neuron, idx + 1);
    }
    // CHANGE VL
    newVL = newVL.filter((item) => item != neuron);
    // adjust the VL array so that no number is skipped
    for (let i = 0; i < newVL.length; i++) {
      if (newVL[i] > neuron) {
        newVL[i] = newVL[i] - 1;
      }
    }

    // Delete Variables in C and F\
    for (let i = 0; i < indices.length; i++) {
      newC.splice(indices[i] - i, 1);
      for (let j = 0; j < newF.length; j++) {
        newF[j].splice(indices[i] - i, 1);
      }
    }

    // Delete Functions in F based on L
    let fIndices = [];
    for (let i = 0; i < newL.length; i++) {
      // for each row
      if (newL[i][neuron - 1] == 1) {
        fIndices.push(i);
      }
    }

    // Filter newF
    newF = newF.filter((item, index) => !fIndices.includes(index));

    // Adjust function locations (L)

    for (let i = 0; i < newL.length; i++) {
      newL[i].splice(neuron - 1, 1);
    }

    // CHANGE T
    newT = newT.filter((item) => !fIndices.includes(item[0] - 1));
    console.log("New T: ", newT);

    // adjust the T array so that no number is skipped
    for (let i = 0; i < newT.length; i++) {
      for (let j = 0; j < fIndices.length; j++) {
        if (newT[i][0] > fIndices[j]) {
          newT[i][0] = newT[i][0] - 1;
        }
      }
    }

    // Adjust neuron locations in L
    newL = newL.filter((item, index) => !fIndices.includes(index));

    // CHANGE syn
    // remove all elements that contain neuron
    newSyn = newSyn.filter((item) => !item.includes(neuron));
    // adjust the syn array so that no number is skipped
    for (let i = 0; i < newSyn.length; i++) {
      for (let j = 0; j < newSyn[i].length; j++) {
        if (newSyn[i][j] > neuron) {
          newSyn[i][j] = newSyn[i][j] - 1;
        }
      }
    }

    // Adjust envsyn
    if (newEnvSyn > neuron - 1) {
      newEnvSyn = newEnvSyn - 1;
    }

    // Change neuron Positions
    newNeuronPositions = adjustNeuronPositions(neuron, props.neuronPositions);

    saveSystemtoStorage(
      props,
      newF,
      newL,
      newC,
      newVL,
      newSyn,
      newEnvSyn,
      newNeuronPositions,
      newT
    );
  }

  function editNeuron1() {
    // Change C
    let newC = props.C;
    newC = newC.concat(inputVars);
    props.setC(newC);

    // Change VL
    let neuronNum = props.L.length === 0 ? 1 : props.L[0].length + 1;
    let newVL = props.VL;
    for (let i = 0; i < numVars; i++) {
      newVL.push(neuronNum);
    }
    props.setVL(newVL);

    // Change F and T
    let newT = props.T;
    let newF = props.F;
    if (newF.length > 0) {
      for (let i = 0; i < newF.length; i++) {
        for (let j = 0; j < numVars; j++) {
          newF[i].push(0);
        }
        if (inputThreshold[i] !== undefined) {
          if (inputThreshold[i][0] === i) {
            newT.push([
              newF.length + inputThreshold[i][0] + 1,
              inputThreshold[i][1],
            ]);
          }
        }
      } //Push an array the length of the number of elements in a row of newF
      for (let i = 0; i < numFuncs; i++) {
        let newFRow = [];
        for (let i = 0; i < newF[0].length; i++) {
          newFRow.push(0);
        }
        for (let j = 0; j < numVars; j++) {
          newFRow[newFRow.length - numVars + j] = inputFuncs[i][j];
        }
        newF.push(newFRow);
      }
    } else {
      for (let i = 0; i < numFuncs; i++) {
        let newFRow = [];
        for (let j = 0; j < numVars; j++) {
          newFRow.push(inputFuncs[i][j]);
        }
        if (inputThreshold[i][0] === i) {
          newT.push([inputThreshold[i][0] + 1, inputThreshold[i][1]]);
        }

        newF.push(newFRow);
      }
    }

    props.setF(newF);

    // Change L
    let newL = props.L;
    if (newL.length > 0) {
      for (let i = 0; i < newL.length; i++) {
        newL[i].push(0);
      }
      for (let i = 0; i < numFuncs; i++) {
        let newLRow = [];
        for (let i = 0; i < newL[0].length; i++) {
          newLRow.push(0);
        }
        newLRow[newLRow.length - 1] = 1;
        newL.push(newLRow);
      }
    } else {
      for (let i = 0; i < numFuncs; i++) {
        let newLRow = [];
        newLRow.push(1);
        newL.push(newLRow);
      }
    }
    // Create a new column in L for the new neuron

    //Push an array the length of the number of elements in a row of newF

    props.setL(newL);

    //Change syn
    let newSyn = props.syn;
    for (let i = 0; i < inputSynIn.length; i++) {
      newSyn.push([inputSynIn[i].value + 1, neuronNumber]);
    }
    for (let i = 0; i < inputSynOut.length; i++) {
      newSyn.push([neuronNumber, inputSynOut[i].value + 1]);
    }

    //TODO: Change T

    setNumVars(1);
    setValue(1);
    setFunc(1);
    setNumFuncs(1);
    setInputVars([]);
    setInputFuncs([]);
    setInputSynOut([]);
    setInputSynIn([]);
    setInputThreshold([]);

    let system = systemStackPush(
      newC,
      newF,
      newL,
      newVL,
      newT,
      newSyn,
      props.envSyn,
      props.neuronPositions,
      "Added new neuron"
    );
    props.pushSystem(system);
    handleClose();
    saveSystemtoStorage(
      props,
      newF,
      newL,
      newC,
      newVL,
      newSyn,
      props.envSyn,
      props.neuronPositions,
      newT
    );
  }

  function handleAddVars(i, value) {
    let newVars = inputVars;
    newVars[i] = value;
    setInputVars(newVars);
  }

  function handleAddFuncs(i, j, e) {
    let newFuncs = inputFuncs;
    newFuncs[i][j] = e;
    setInputFuncs(newFuncs);
  }

  function handleAddThreshold(i, e) {
    let newThreshold = inputThreshold;
    newThreshold[i] = [i, e];
    console.log("Threshold index: ", i);
    console.log("current threshold: ", newThreshold[i]);
    setInputThreshold(newThreshold);
  }

  function handleAddSynOut(e) {
    setInputSynOut(e);
  }

  function handleAddSynIn(e) {
    setInputSynIn(e);
  }

  const handlevarSliderChange = async (event, newValue) => {
    setNumVars(parseInt(newValue));
    setValue(newValue);
    checkEmpty();
  };

  //for button
  let disabledbutton = true;

  function checkEmpty() {
    const tb = document.getElementsByClassName("inputs");
    let empty = false;
    for (let i = 0; i < tb.length; i++) {
      if (tb.item(i).value == "") {
        empty = true;
        break;
      }
    }
    if (empty == true) {
      document.getElementById("submitbutton").disabled = true;
      setAble(true);
    } else {
      document.getElementById("submitbutton").disabled = false;
      setAble(false);
    }
  }

  const handlevarInputChange = async (event) => {
    event.target.value === ""
      ? setNumVars(1)
      : setNumVars(parseInt(event.target.value));
    setValue(event.target.value === "" ? "" : Number(event.target.value));
    checkEmpty();
  };

  const handlefuncSliderChange = async (event, newValue) => {
    setNumFuncs(parseInt(newValue));
    setFunc(newValue);
    checkEmpty();
  };

  const handlefuncInputChange = async (event) => {
    event.target.value === ""
      ? setNumFuncs(1)
      : setNumFuncs(parseInt(event.target.value));
    setFunc(event.target.value === "" ? "" : Number(event.target.value));
    checkEmpty();
  };

  const handleBlur = () => {
    if (value < 1) {
      setValue(1);
    }
  };

  const handlefuncBlur = () => {
    if (value < 1) {
      setFunc(1);
    }
  };

  // Change size of inputVars when numVars changes
  useEffect(() => {
    let newInputVars = inputVars;
    if (inputVars.length < numVars) {
      for (let i = newInputVars.length; i < numVars; i++) {
        newInputVars.push(0);
      }
    } else if (inputVars.length > numVars) {
      for (let i = newInputVars.length; i > numVars; i--) {
        newInputVars.pop();
      }
    }

    setInputVars(newInputVars);
  }, [numVars]);

  // Change size of inputFuncs and when numFuncs changes
  useEffect(() => {
    let newInputFuncs = inputFuncs;
    let newInputThreshold = inputThreshold;
    if (inputFuncs.length < numFuncs) {
      for (let i = newInputFuncs.length; i < numFuncs; i++) {
        newInputFuncs.push([]);
        newInputThreshold.push([]);
        for (let j = 0; j < numVars; j++) {
          newInputFuncs[i].push(0);
        }
      }
    } else if (inputFuncs.length > numFuncs) {
      for (let i = newInputFuncs.length; i > numFuncs; i--) {
        newInputFuncs.pop();
        newInputThreshold.pop();
      }
    }

    setInputFuncs(newInputFuncs);
    setInputThreshold(newInputThreshold);
  }, [numFuncs, showModal]);

  useEffect(() => {
    let newOptions = [];
    if (props.L.length > 0) {
      for (let i = 0; i < props.L[0].length; i++) {
        newOptions.push({ value: i, label: "Neuron " + (i + 1) });
      }
    }

    setNodeOptions(newOptions);
  }, [props]);

  return (
    <>
      <Button variant="c5" onClick={handleShow}>
        Edit Neuron
      </Button>
      <Modal
        dialogclassname="modalcustom"
        keyboard={false}
        size="xl"
        backdrop="static"
        show={showModal}
        onHide={handleClose}
      >
        <Modal.Header closeButton className="sticktop">
          <h1>Create New Neuron</h1>
        </Modal.Header>
        <Modal.Body className="bodymodal">
          <div className="section">
            <h4>Variables</h4>
            <div className="sliders">
              <label>Number of Variables:</label>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                  <Slider
                    value={typeof varVal === "number" ? varVal : 1}
                    min={1}
                    max={5}
                    onChange={handlevarSliderChange}
                    aria-labelledby="input-slider"
                  />
                </Grid>
                <Grid item>
                  <Input
                    value={varVal}
                    margin="dense"
                    onChange={handlevarInputChange}
                    onBlur={handleBlur}
                    inputProps={{
                      min: 1,
                      max: 30,
                      type: "number",
                      "aria-labelledby": "input-slider",
                    }}
                  />
                </Grid>
              </Grid>
            </div>
            <div className="vargrid">
              {Array.from(Array(numVars).keys()).map((i) => {
                return (
                  <div key={i}>
                    <label>x{i + 1}</label>
                    <br />
                    <input
                      className="inputs"
                      type="number"
                      onChange={(e) => {
                        handleAddVars(i, parseInt(e.target.value));
                        checkEmpty();
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="section">
            <h4>Functions</h4>
            <div className="sliders">
              <label>Number of Functions</label>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                  <Slider
                    min={1}
                    max={30}
                    defaultValue={funcVal}
                    aria-label="Default"
                    valueLabelDisplay="on"
                    onChangeCommitted={handlefuncSliderChange}
                  />
                </Grid>
                <Grid item>
                  <Input
                    value={funcVal}
                    margin="dense"
                    onChange={handlefuncInputChange}
                    onBlur={handlefuncBlur}
                    inputProps={{
                      min: 1,
                      max: 30,
                      type: "number",
                      "aria-labelledby": "input-slider",
                    }}
                  />
                </Grid>
              </Grid>
            </div>
            <div>
              <div className="fxn">
                {/* // Add a function selector based on the number of variables the neuron has */}
                <table>
                  <tbody>
                    {Array.from(Array(numFuncs).keys()).map((i) => {
                      return (
                        <tr key={i}>
                          <th>
                            <label className="h4">Function {i + 1}</label>
                          </th>
                          {Array.from(Array(numVars).keys()).map((j) => {
                            return (
                              <td key={j}>
                                <input
                                  type="number"
                                  className="inputs"
                                  onChange={(e) => {
                                    handleAddFuncs(
                                      i,
                                      j,
                                      parseInt(e.target.value)
                                    );
                                    checkEmpty();
                                  }}
                                />
                              </td>
                            );
                          })}
                          <td>
                            Threshold
                            <input
                              type="number"
                              onChange={(e) => {
                                handleAddThreshold(i, parseInt(e.target.value));
                                checkEmpty();
                              }}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="section">
            <h4>Connections</h4>
            <div>
              <label>Outgoing Connections</label>

              <Select
                options={nodeOptions}
                isMulti={true}
                onChange={(e) => {
                  handleAddSynOut(e);
                }}
              />
            </div>
            <div>
              <label>Incoming Connections</label>
              <Select
                options={nodeOptions}
                isMulti={true}
                onChange={(e) => {
                  handleAddSynIn(e);
                }}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={isdisabled}
            onClick={toEdit}
            id="submitbutton"
            variant="c5"
          >
            Add Neuron
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditNeuronForm;
