import { useState, useEffect } from "react";
import Select from "react-select";
import { Slider, Box, Grid, Input } from "@mui/material";
import "./forms.css";
import { Modal, Button, ModalBody, ModalFooter } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { PersonPlusFill } from "react-bootstrap-icons";
function NewNodeForm(props) {
  const [numVars, setNumVars] = useState(1);
  const [numFuncs, setNumFuncs] = useState(1);
  const [nodeOptions, setNodeOptions] = useState([]);
  const [inputVars, setInputVars] = useState([]);
  const [inputFuncs, setInputFuncs] = useState([]);
  const [inputSynOut, setInputSynOut] = useState([]);
  const [inputSynIn, setInputSynIn] = useState([]);

  const neuronNumber = props.L.length === 0 ? 1 : props.L[0].length + 1;
  //for slider with tb
  const [varVal, setValue] = useState(1);
  const [funcVal, setFunc] = useState(1);
  const handlevarSliderChange = async (event, newValue) => {
    setNumVars(parseInt(newValue));
    setValue(newValue);
    checkEmpty();
  };

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
  //for modals
  const [showModal, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
    setNumVars(1);
    setNumFuncs(1);
  };
  //for button
  let disabledbutton = true;
  const [isdisabled, setAble] = useState(true);
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
  function addNewNeuron() {
    // Add new neuron to the system
    const oldC = props.C;
    const oldF = props.F;
    const oldL = props.L;
    const oldVL = props.VL;
    const oldT = props.T;
    const oldSyn = props.syn;
    const oldEnvSyn = props.envSyn;

    const system = {
      matrices: {
        C: JSON.parse(JSON.stringify(oldC)),
        F: JSON.parse(JSON.stringify(oldF)),
        L: JSON.parse(JSON.stringify(oldL)),
        VL: JSON.parse(JSON.stringify(oldVL)),
        T: JSON.parse(JSON.stringify(oldT)),
        syn: JSON.parse(JSON.stringify(oldSyn)),
        envSyn: JSON.parse(JSON.stringify(oldEnvSyn)),
      },
      positions: { neuronPositions: props.neuronPositions },
      message: "",
    };

    system.message = "Added new neuron";
    props.pushSystem(system.matrices, system.positions);
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

    // Change F
    let newF = props.F;
    if (newF.length > 0) {
      for (let i = 0; i < newF.length; i++) {
        for (let j = 0; j < numVars; j++) {
          newF[i].push(0);
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
    setNumVars(1);
    setNumFuncs(1);
    setInputVars([]);
    setInputFuncs([]);
    setInputSynOut([]);
    setInputSynIn([]);
    handleClose();
    const json = {
      C: newC,
      VL: newVL,
      F: newF,
      L: newL,
      T: props.T,
      syn: newSyn,
      envSyn: props.envSyn,
      neuronPositions: props.neuronPositions,
    };
    localStorage.setItem("Matrices", JSON.stringify(json));
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

  function handleAddSynOut(e) {
    setInputSynOut(e);
  }

  function handleAddSynIn(e) {
    setInputSynIn(e);
  }

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

  // Change size of inputFuncs when numFuncs changes
  useEffect(() => {
    let newInputFuncs = inputFuncs;
    if (inputFuncs.length < numFuncs) {
      for (let i = newInputFuncs.length; i < numFuncs; i++) {
        newInputFuncs.push([]);
        for (let j = 0; j < numVars; j++) {
          newInputFuncs[i].push(0);
        }
      }
    } else if (inputFuncs.length > numFuncs) {
      for (let i = newInputFuncs.length; i > numFuncs; i--) {
        newInputFuncs.pop();
      }
    }

    setInputFuncs(newInputFuncs);
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
        New Neuron
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

              {/* <Slider
                id='varsl'
                track="normal"
                min={1}
                max={30}
                defaultvalue={1}
                aria-label="Default"
                valueLabelDisplay="on"
                onChangeCommitted={(e, v) => {
                  // Set the number of variables to the value of the input
                  varVal=parseInt(v)%31;
                  setNumVars(parseInt(varVal));
                  checkEmpty();
                  e.value=varVal;
                  document.getElementById('vartb').value=varVal;
                }}
              /> */}
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
                  <div>
                    <label>x{props.VL.length + i + 1}</label>
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
                        <tr>
                          <th>
                            <label className="h4">Function {i + 1}</label>
                          </th>
                          {Array.from(Array(numVars).keys()).map((j) => {
                            return (
                              <td>
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
            onClick={addNewNeuron}
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

export default NewNodeForm;
