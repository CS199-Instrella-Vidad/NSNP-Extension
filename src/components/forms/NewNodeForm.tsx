import { useState, useEffect } from "react";
import Select from "react-select";
import { MultiValue } from "react-select";

function NewNodeForm(props) {
  const [numVars, setNumVars] = useState(1);
  const [numFuncs, setNumFuncs] = useState(1);
  const [nodeOptions, setNodeOptions] = useState<any[]>([]);

  const [inputVars, setInputVars] = useState<any[]>([]);
  const [inputFuncs, setInputFuncs] = useState<any[]>([]);
  const [inputSynOut, setInputSynOut] = useState<MultiValue<any>>([]);
  const [inputSynIn, setInputSynIn] = useState<MultiValue<any>>([]);

  const neuronNumber = props.L[0].length + 1;

  function addNewNeuron() {
    // Add new neuron to the system

    // Change C
    let newC = props.C;
    newC = newC.concat(inputVars);
    props.setC(newC);

    // Change VL
    let neuronNum = props.L[0].length + 1;
    let newVL: any[] = props.VL;
    for (let i = 0; i < numVars; i++) {
      newVL.push(neuronNum);
    }
    props.setVL(newVL);

    // Change F
    let newF = props.F;
    for (let i = 0; i < newF.length; i++) {
      for (let j = 0; j < numVars; j++) {
        newF[i].push(0);
      }
    }
    //Push an array the length of the number of elements in a row of newF
    for (let i = 0; i < numFuncs; i++) {
      let newFRow: any[] = [];
      for (let i = 0; i < newF[0].length; i++) {
        newFRow.push(0);
      }
      for (let j = 0; j < numVars; j++) {
        newFRow[newFRow.length - numVars + j] = inputFuncs[i][j];
      }
      newF.push(newFRow);
    }
    props.setF(newF);

    // Change L
    let newL = props.L;
    // Create a new column in L for the new neuron
    for (let i = 0; i < newL.length; i++) {
      newL[i].push(0);
    }
    //Push an array the length of the number of elements in a row of newF
    for (let i = 0; i < numFuncs; i++) {
      let newLRow: any[] = [];
      for (let i = 0; i < newL[0].length; i++) {
        newLRow.push(0);
      }
      newLRow[newLRow.length - 1] = 1;
      newL.push(newLRow);
    }
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
    props.setShowNewNode(false);
  }

  function handleAddVars(i: number, value: number) {
    let newVars = inputVars;
    newVars[i] = value;
    setInputVars(newVars);
  }

  function handleAddFuncs(i: number, j: number, e: number) {
    let newFuncs = inputFuncs;
    newFuncs[i][j] = e;
    setInputFuncs(newFuncs);
  }

  function handleAddSynOut(e: MultiValue<any>) {
    setInputSynOut(e);
  }

  function handleAddSynIn(e: MultiValue<any>) {
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
  }, [numFuncs]);

  useEffect(() => {
    let newOptions: any[] = [];
    for (let i = 0; i < props.L[0].length; i++) {
      newOptions.push({ value: i, label: "Node " + (i + 1) });
    }
    setNodeOptions(newOptions);
  }, []);

  return (
    <div>
      <div>
        <h1>Create New Neuron</h1>
      </div>
      <div>
        <h2>Variables</h2>
        <div>
          <label>Number of Variables</label>
          <input
            type="number"
            min={1}
            onChange={(e) => {
              // Set the number of variables to the value of the input
              setNumVars(parseInt(e.target.value));
            }}
          />
        </div>
        <div>
          {Array.from(Array(numVars).keys()).map((i) => {
            return (
              <div>
                <label>Variable {i + 1}</label>
                <input
                  type="number"
                  onChange={(e) => {
                    handleAddVars(i, parseInt(e.target.value));
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <h2>Functions</h2>
        <div>
          <label>Number of Functions</label>
          <input
            type="number"
            min={1}
            onChange={(e) => {
              // Set the number of variables to the value of the input
              setNumFuncs(parseInt(e.target.value));
            }}
          />
        </div>
        <div>
          <div>
            {/* // Add a function selector based on the number of variables the neuron has */}

            <table className="table">
              <thead>
                <tr>
                  <th scope="col">
                    <label></label>
                  </th>
                  {Array.from(Array(numVars).keys()).map((j) => {
                    return (
                      <th scope="col">
                        <label>x{props.L.length + j}</label>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {Array.from(Array(numFuncs).keys()).map((i) => {
                  return (
                    <tr>
                      <th scope="row">
                        <label className="h4">Function {i + 1}</label>
                      </th>
                      {Array.from(Array(numVars).keys()).map((j) => {
                        return (
                          <td>
                            <input
                              type="number"
                              onChange={(e) => {
                                handleAddFuncs(i, j, parseInt(e.target.value));
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

      <div>
        <h2>Connections</h2>
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
      <button onClick={addNewNeuron}>Add Neuron</button>
    </div>
  );
}

export default NewNodeForm;
