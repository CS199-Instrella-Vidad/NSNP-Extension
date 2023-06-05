import { Modal, Button, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import { useState, useEffect } from "react";
function GuidedForm(props){//trigger, functions list, nueron id
    const [Show, setShow] = useState(false)
    function fxnret(){
            //return fucntion here
    }
    return(
        <Modal show={props.trigger}
        dialogclassname="modalcustom"
        keyboard={false}
        centered
        backdrop="static"
        onHide={handleClose}>
        <ModalHeader closeButton className="sticktop">
          <h3>Select Function for Neuron {props.neuronid}</h3>
        </ModalHeader>
        {props.functions.map((fxn)=>{
            <Button id={fxn} onClick={fxnret}>fxn</Button>
        })}
        </Modal>
    );
}
export default GuidedForm;