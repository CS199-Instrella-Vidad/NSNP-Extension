import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";

import { React, useState } from "react";
import { Button } from "react-bootstrap";
function DeleteForm(props) {
  const [status, setStatus] = useState(false);
  const show = () => setStatus(true);
  const hide = () => setStatus(false);
  const todelete = () => {
    deleteNeuron();
    alert("Deleted");
    hide();
  };

  function adjustNeuronPositions(neuron, neuronPositions) {
    // Change neuron Positions
    let newNeuronPositions = neuronPositions;

    newNeuronPositions = newNeuronPositions.filter(
      (item) =>
        item.id != "Neuron " + neuron &&
        item.id != "neuron-contents" + neuron - 1
    );

    // For all objects in neuronPositions, if the id format is "Neuron x" or "neuron-contentsx", change the x to x-1 if x > neuron
    for (let i = 0; i < newNeuronPositions.length; i++) {
      let id = newNeuronPositions[i].id;
      // if the id is "Neuron x"
      if (id.slice(0, 7) == "Neuron ") {
        let idNum = parseInt(id.slice(7));
        if (idNum > neuron) {
          newNeuronPositions[i].id = id.slice(0, 7) + (idNum - 1);
        }
      }
      // if the id is "neuron-contentsx"
      else if (id.slice(0, 15) == "neuron-contents") {
        let idNum = parseInt(id.slice(15));

        if (idNum > neuron - 1) {
          newNeuronPositions[i].id = id.slice(0, 15) + (idNum - 1);
        }
      }
    }
    return newNeuronPositions;
  }

  function deleteNeuron() {
    let neuron = parseInt(props.selectedNode.slice(7));
    let indices = [];
    let idx = props.VL.indexOf(neuron);
    while (idx != -1) {
      indices.push(idx);
      idx = props.VL.indexOf(neuron, idx + 1);
    }

    // CHANGE VL
    let newVL = props.VL.filter((item) => item != neuron);
    // adjust the VL array so that no number is skipped
    for (let i = 0; i < newVL.length; i++) {
      if (newVL[i] > neuron) {
        newVL[i] = newVL[i] - 1;
      }
    }

    // Delete Variables in C and F
    let newF = props.F;
    let newC = props.C;
    for (let i = 0; i < indices.length; i++) {
      newC.splice(indices[i] - i, 1);
      for (let j = 0; j < newF.length; j++) {
        newF[j].splice(indices[i] - i, 1);
      }
    }

    // Delete Functions in F based on L
    let fIndices = [];
    for (let i = 0; i < props.L.length; i++) {
      // for each row
      if (props.L[i][neuron - 1] == 1) {
        fIndices.push(i);
      }
    }
    console.log(fIndices);
    newF = newF.filter((item, index) => !fIndices.includes(index));
    props.setF(newF);

    // Adjust function locations L
    let newL = props.L;
    newL = newL.filter((item, index) => !fIndices.includes(index));

    for (let i = 0; i < newL.length; i++) {
      // for each row
      if (props.L[i][neuron - 1] == 1) {
        newL[i].splice(neuron - 1, 1);
      }
    }

    // CHANGE syn
    let newSyn = props.syn;
    // remove all elements that contain neuron
    newSyn = newSyn.filter((item) => !item.includes(neuron));
    console.log("newSyn", newSyn);
    // adjust the syn array so that no number is skipped
    for (let i = 0; i < newSyn.length; i++) {
      for (let j = 0; j < newSyn[i].length; j++) {
        if (newSyn[i][j] > neuron) {
          newSyn[i][j] = newSyn[i][j] - 1;
        }
      }
    }

    // CHANGE T

    // Adjust envsyn
    let newEnvSyn = props.envSyn;
    if (newEnvSyn > neuron - 1) {
      newEnvSyn = newEnvSyn - 1;
      if (newEnvSyn == 0) {
        newEnvSyn = 1;
      }
    }

    // Change neuron Positions
    let newNeuronPositions = adjustNeuronPositions(
      neuron,
      props.neuronPositions
    );
    props.setNeuronPositions(newNeuronPositions);
    props.setVL(newVL);
    props.setL(newL);
    props.setC(newC);
    props.setEnvSyn(newEnvSyn);
    props.setSyn(newSyn);
    const json = {
      C: newC,
      VL: newVL,
      F: newF,
      L: newL,
      T: props.T,
      syn: newSyn,
      envSyn: newEnvSyn,
      neuronPositions: newNeuronPositions,
    };
    localStorage.setItem("Matrices", JSON.stringify(json));
    localStorage.setItem("positions", JSON.stringify(newNeuronPositions));
  }
  return (
    <>
      <Button variant="c1" onClick={show}>
        Delete {props.selectedNode}
      </Button>
      <Dialog open={status} onClose={hide}>
        <DialogTitle>Alert: Deleting a Node</DialogTitle>
        <DialogContent>
          You are about to Delete {props.selectedNode}
        </DialogContent>
        <DialogActions>
          <Button onClick={hide}>Disagree</Button>
          <Button onClick={todelete} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default DeleteForm;
