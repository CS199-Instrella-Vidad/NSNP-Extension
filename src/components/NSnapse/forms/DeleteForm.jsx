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
    console.log(newVL);

    // CHANGE C
    let newC = props.C;
    for (let i = 0; i < indices.length; i++) {
      newC.splice(indices[i] - i, 1);
    }
    console.log(newC);
  }
  return (
    <>
      <Button variant="c1" onClick={show}>
        Delete Form
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
