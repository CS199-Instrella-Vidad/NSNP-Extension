import { useState, useEffect } from "react";
import Select from "react-select";
import { Slider } from "@mui/material";
import './forms.css';
import { Modal,Button, ModalBody, ModalFooter } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
const NewInputForm=({handleCloseModal,props=[]})=>{


  const [nodeOptions, setNodeOptions] = useState([]);
  const [inputSynOut, setInputSynOut] = useState([]);
  const [isdisabled, setAble]=useState(true);
  function checkEmpty(){
    const tb=document.getElementsByClassName("inputs");
    let empty=false;
    for(let i=0;i<tb.length;i++){
      if (tb.item(i).value==''){
        empty=true;
        break;
      }
    }
    if (empty==true){
      document.getElementById("submitbutton").disabled=true;
      setAble(true);
    }
    else{
      document.getElementById("submitbutton").disabled=false;
      setAble(false);
    }
  }

    const addInputNeuron=()=>{
        // do somethign here
        handleClose();
    };


    function handleAddSynOut(e) {
        setInputSynOut(e);
    }


    const [showModal, setShow] = useState(false);
    const handleClose = () => {
    handleCloseModal();
    setShow(false);};
    const handleShow = () => {setShow(true);};
    return(
        <>
        <Button onClick={handleShow} variant='c5'>New Input Neuron</Button>
        <Modal dialogclassName='modalcustom' keyboard={false} centered backdrop='static' show={showModal} onHide={handleClose}>
            <ModalHeader closeButton className="sticktop"><h3>Create New Input Neuron</h3></ModalHeader>
            <ModalBody>
                <div className="section">
                    <h5>Bit train</h5>
                    <input type='text'className="spiketrain inputs" onChange={checkEmpty}/>
                    <small>Enter spike train. Separate spikes with commas (e. g. 1,0,1,1).</small>
                    <br/>
                </div>
                <br/>
                <div className="section">
                <h5>Outgoing Connections</h5>
                <Select
                options={nodeOptions}
                isMulti={true}
                onChange={(e) => {
                handleAddSynOut(e);
                }}
                />
                <br/>
                </div>
            </ModalBody>
            <ModalFooter>
            <ModalFooter><Button disabled={isdisabled} onClick={addInputNeuron} id='submitbutton' variant='c5' >Add Neuron</Button></ModalFooter>
            </ModalFooter>
        </Modal>
    </>
    );
}
export default NewInputForm;