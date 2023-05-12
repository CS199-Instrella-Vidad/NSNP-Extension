import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";

import { React, useState } from "react";
import { Button } from "react-bootstrap";
function ClearAllForm(props) {
  const [status, setStatus] = useState(false);
  const show = () => setStatus(true);
  const hide = () => setStatus(false);
  const todelete = () => {
    deleteAll();
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

  function deleteAll() {
    let newVL = [];
    let newF = [];
    let newC = [];

    let newL = [];

    let newSyn = [];

    //TODO: CHANGE T

    let newEnvSyn = 1;

    // Change neuron Positions
    let newNeuronPositions = [];
    props.setNeuronPositions(newNeuronPositions);
    props.setF(newF);
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
        Clear All
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
export default ClearAllForm;
