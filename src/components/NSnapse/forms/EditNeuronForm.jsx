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
  let neuron = parseInt(props.selectedNode.slice(7));

  // Closing and Opening Modals
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setInitialValues();
    setShow(true);
  };

  // Get indices of variables in neuron
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

  // Get indices of functions in neuron
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

  function setInitialValues() {
    let varIndices = getNeuronVars(neuron); // Indices of variables of neuron in C
    let funcIndices = getNeuronFuncs(neuron); // Indices of functions of neuron in F
    setNumVars(varIndices.length);
    setNumFuncs(funcIndices.length);
    setValue(varIndices.length);
    setFunc(funcIndices.length);

    // Set default values of inputVars

    let tempInputVars = [];
    for (let i = 0; i < varIndices.length; i++) {
      tempInputVars.push(JSON.parse(JSON.stringify(props.C[varIndices[i]])));
    }
    setInputVars(tempInputVars);

    // set default values of inputFuncs

    let tempInputFuncs = [];
    for (let i = 0; i < funcIndices.length; i++) {
      tempInputFuncs.push(JSON.parse(JSON.stringify(props.F[funcIndices[i]])));
    }
    //TODO: slice each row to be only length of variables (varIndices.length)
    for (let i = 0; i < tempInputFuncs.length; i++) {
      tempInputFuncs[i] = tempInputFuncs[i].slice(0, varIndices.length);
    }
    console.log("tempInputFuncs: ", tempInputFuncs);
    setInputFuncs(tempInputFuncs);

    // set default values of inputThreshold
    let tempT = props.T.filter((item) => funcIndices.includes(item[0] - 1));
    // adjust the first element of each elemen in tempT to be -1 of the original
    for (let i = 0; i < tempT.length; i++) {
      tempT[i][0] = tempT[i][0] - 1;
    }
    setInputThreshold(tempT);

    // set default values of inputSynIn
    let tempSynIn = JSON.parse(
      JSON.stringify(props.syn.filter((item) => item[1] == neuron))
    );
    for (let i = 0; i < tempSynIn.length; i++) {
      tempSynIn[i] = { value: tempSynIn[i][0] - 1 };
    }
    setInputSynIn(tempSynIn);

    // set default values of inputSynOut

    let tempSynOut = JSON.parse(
      JSON.stringify(props.syn.filter((x) => x[0] == neuron))
    );
    for (let i = 0; i < tempSynOut.length; i++) {
      tempSynOut[i] = { value: tempSynOut[i][1] - 1 };
    }
    setInputSynOut(tempSynOut);
  }

  function deleteInitialValues(neuron) {
    let indices = [];
    let idx = newVL.indexOf(neuron);
    while (idx != -1) {
      indices.push(idx);
      idx = newVL.indexOf(neuron, idx + 1);
    }

    // CHANGE VL
    newVL = newVL.filter((item) => item != neuron);

    // Delete Variables in C and F
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

    // CHANGE T
    // remove all T elements that are for functions in findices

    newT = newT.filter((item) => !fIndices.includes(item[0]));

    // Remove functions from L
    newL = newL.filter((item, index) => !fIndices.includes(index));

    // CHANGE syn
    // remove all elements that contain neuron
    newSyn = newSyn.filter((item) => !item.includes(neuron));
  }

  function insertNewValues(varIndices, funcIndices) {
    // Insert inputVars into C and for each element, insert a column in F and an element in VL
    // Insert new variables into C, neuron per var in VL, and 0 per var in each F row
    // get min index of varIndices
    console.log("inputVars", inputVars);
    console.log("inputFuncs", inputFuncs);
    console.log("inputThreshold", inputThreshold);
    console.log("inputSynIn", inputSynIn);
    console.log("inputSynOut", inputSynOut);

    // Variables (C and VL)
    let minVarIndex = Math.min(...varIndices);
    for (let i = 0; i < inputVars.length; i++) {
      newC.splice(minVarIndex + i, 0, inputVars[i]);
      newVL.splice(minVarIndex + i, 0, neuron);
      for (let j = 0; j < newF.length; j++) {
        newF[j].splice(minVarIndex + i, 0, 0);
      }
    }

    // TODO: Fix F, L, T
    console.log("OldL: " + JSON.parse(JSON.stringify(newL)));
    // Functions, Function location, T
    let minFuncIndex = Math.min(...funcIndices);
    // insert inputFuncs into F
    for (let i = 0; i < inputFuncs.length; i++) {
      newF.splice(minFuncIndex + i, 0, inputFuncs[i]);
      // insert new row in L
      newL.splice(minFuncIndex + i, 0, new Array(newL[0].length).fill(0));
      newL[minFuncIndex + i][neuron - 1] = 1;
      // insert new row in T
      for (let j = 0; j < inputThreshold.length; j++) {
        newT.push([inputThreshold[j][0] + 1, inputThreshold[j][1]]);
      }
    }
    console.log("newL: ", JSON.parse(JSON.stringify(newL)));

    // Synapses
    for (let i = 0; i < inputSynIn.length; i++) {
      newSyn.push([inputSynIn[i].value + 1, neuron]);
    }

    for (let i = 0; i < inputSynOut.length; i++) {
      newSyn.push([neuron, inputSynOut[i].value + 1]);
    }
  }

  // Duplicate neuron will use setInitialValues and insert the values at the end

  const toEdit = () => {
    let varIndices = getNeuronVars(neuron); // Indices of variables of neuron in C
    let funcIndices = getNeuronFuncs(neuron); // Indices of functions of neuron in F

    //* Next step is to delete the neuron from the matrices (here in toEdit)
    //? DONE 1. Delete neuron from matrices
    deleteInitialValues(neuron);
    //* varIndices
    //    C, delete all elements of varIndices
    //    VL, delete all elements in indices of varIndices
    //    F, delete elements each row in varIndices
    //* funcIndices
    //    F, delete all indices in funcIndices
    //    L, delete all indices in funcIndices
    //    L, no need to adjust neuron location in L

    // T, filter T such that neuron is not included
    // syn, filter syn such that neuron is not included

    //* And then insert the new values (but actually just the placeholder, same values)
    //? DONE 2. Insert inputVars, inputFuncs, into matrices based on their initial indices (syn and T can be inserted as is)
    insertNewValues(varIndices, funcIndices);
    // C, get minimum index in varIndices, then insert array elements from there
    // VL, get minimum index in varIndices, then insert neuron number * variables from there
    // F, get minimum index in funcIndices, then insert array elements from there
    // L, get minimum index in funcIndices, then insert array elements from there
    // T, insert new T at end
    // syn, insert new syns at end

    //! Once working, then we can adjust the values based on form
    //! First, we try resetting the form, replacing all the old values with new values
    // TODO 3. Adjust inputVars, inputFuncs, inputThreshold, inputSynIn, inputSynOut as needed from edit
    //! Once working, we try to use the placeholder values and store into the form so that we can edit them
    // TODO 4. Add as placeholder in form

    // Adding to history
    let system = systemStackPush(
      newC,
      newF,
      newL,
      newVL,
      newT,
      newSyn,
      newEnvSyn,
      newNeuronPositions,
      "Edited a Neuron"
    );
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
    props.pushSystem(system);
    props.setSelectedNode("");
    handleClose();
  };

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

  // Every time threshold is changed, we need to update inputThreshold
  function handleAddThreshold(i, e) {
    let newThreshold = inputThreshold;
    newThreshold[i] = [i, e];
    setInputThreshold(newThreshold);
  }

  // Every time synout is changed, we need to update inputSynOut
  function handleAddSynOut(e) {
    setInputSynOut(e);
  }

  // Every time synin is changed, we need to update inputSynIn
  function handleAddSynIn(e) {
    setInputSynIn(e);
  }

  function checkEmpty() {
    // const tb = document.getElementsByClassName("inputs");
    // let empty = false;
    // for (let i = 0; i < tb.length; i++) {
    //   if (tb.item(i).value == "") {
    //     empty = true;
    //     break;
    //   }
    // }
    // if (empty == true) {
    //   document.getElementById("submitbutton").disabled = true;
    //   setAble(true);
    // } else {
    //   document.getElementById("submitbutton").disabled = false;
    //   setAble(false);
    // }
  }

  // const handlevarSliderChange = async (event, newValue) => {
  //   setNumVars(parseInt(newValue));
  //   setValue(newValue);
  //   checkEmpty();
  // };

  const handlevarInputChange = async (event) => {
    event.target.value === ""
      ? setNumVars(1)
      : setNumVars(parseInt(event.target.value));
    // setValue(event.target.value === "" ? "" : Number(event.target.value));
    checkEmpty();
  };

  // const handlefuncSliderChange = async (event, newValue) => {
  //   setNumFuncs(parseInt(newValue));
  //   setFunc(newValue);
  //   checkEmpty();
  // };

  const handlefuncInputChange = async (event) => {
    event.target.value === ""
      ? setNumFuncs(1)
      : setNumFuncs(parseInt(event.target.value));
    // setFunc(event.target.value === "" ? "" : Number(event.target.value));
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
  if (props.selectedNode !== "") {
    return (
      <>
        <Button variant="c1" onClick={handleShow}>
          Edit {props.selectedNode}
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
            <h1>Edit {props.selectedNode}</h1>
          </Modal.Header>
          <Modal.Body className="bodymodal">
            <div className="section">
              <h4>Variables</h4>
              <div className="sliders">
                <label>Number of Variables:</label>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs>
                    {/* <Slider
                    value={typeof varVal === "number" ? varVal : 1}
                    min={1}
                    max={5}
                    onChange={handlevarSliderChange}
                    aria-labelledby="input-slider"
                  /> */}
                  </Grid>
                  <Grid item>
                    <Input
                      value={varVal}
                      margin="dense"
                      onChange={handlevarInputChange}
                      // onBlur={handleBlur}
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
                    {/* <Slider
                    min={1}
                    max={30}
                    defaultValue={funcVal}
                    aria-label="Default"
                    valueLabelDisplay="on"
                    onChangeCommitted={handlefuncSliderChange}
                  /> */}
                  </Grid>
                  <Grid item>
                    <Input
                      value={funcVal}
                      margin="dense"
                      onChange={handlefuncInputChange}
                      // onBlur={handlefuncBlur}
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
                                  handleAddThreshold(
                                    i,
                                    parseInt(e.target.value)
                                  );
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
              disabled={false}
              onClick={toEdit}
              id="submitbutton"
              variant="c5"
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  } else {
    return (
      <>
        <Button variant="c5" disabled={true}>
          Edit Neuron
        </Button>
      </>
    );
  }
}

export default EditNeuronForm;
