import { useState, useEffect } from "react";
import Select from "react-select";
import { Slider } from "@mui/material";
import './forms.css';
import { Modal,Button, ModalBody, ModalFooter } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
const NewNodeForm=({handleCloseModal, Node=0,props=[]})=> {
  const [numVars, setNumVars] = useState(1);
  const [numFuncs, setNumFuncs] = useState(1);
  const [nodeOptions, setNodeOptions] = useState([]);

  const [inputVars, setInputVars] = useState([]);
  const [inputFuncs, setInputFuncs] = useState([]);
  const [inputSynOut, setInputSynOut] = useState([]);
  const [inputSynIn, setInputSynIn] = useState([]);
  
  //const neuronNumber = props.L[0].length + 1;

  //for modals
  const [showModal, setShow] = useState(false);
  const handleClose = () => {
    handleCloseModal();
    setShow(false);};
  const handleShow = () => {setShow(true);setNumVars(1);
    setNumFuncs(1);};

  //for button
  let disabledbutton=true;
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
  function addNewNeuron() {
    // Add new neuron to the system
    console.log("adding Neuron");
    setNumVars(1);
    setNumFuncs(1);
    setInputVars([]);
    setInputFuncs([]);
    setInputSynOut([]);
    setInputSynIn([]);
    handleClose();
    console.log("added Neuron");
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
  }, [numFuncs]);

  // useEffect(() => {
  //   let newOptions = [];
  //   for (let i = 0; i < props.L[0].length; i++) {
  //     newOptions.push({ value: i, label: "Node " + (i + 1) });
  //   }
  //   setNodeOptions(newOptions);
  // }, []);
  
  return (
      <><Button variant="c2" onClick={handleShow}>
      Edit Node {Node}
    </Button>
      <Modal dialogclassName='modalcustom' keyboard={false} size='xl' backdrop='static' show={showModal} onHide={handleClose}>
      <ModalHeader closeButton className="sticktop"><h1>Node {Node}</h1></ModalHeader>
      <ModalBody className="bodymodal">
      <div className='section'>
        <h4>Variables</h4>
        <div className="sliders">
          <label>Number of Variables:</label>
          <Slider track="normal"color='secondary' min={1} max={30}vdefaultValue={1} aria-label="Default" valueLabelDisplay="on" 
          onChangeCommitted={(e,v) => {
              // Set the number of variables to the value of the input
             setNumVars(parseInt(v));
              checkEmpty();
            }}/>
        </div>
        <div className="vargrid">
          {Array.from(Array(numVars).keys()).map((i) => {
            return (
              <div>
                <label>Variable {i + 1}</label><br/>
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
      <div className='section'>
        <h4>Functions</h4>
        <div className="sliders">
          <label>Number of Functions</label>
          
          <Slider color='secondary' min={1} max={30} defaultValue={1} aria-label="Default" valueLabelDisplay="on" 
          onChangeCommitted={(e,v) => {
              // Set the number of variables to the value of the input
              setNumFuncs(parseInt(v));
              checkEmpty();
            }}/>
        </div>
        <div>
          <div className='fxn'>
            {/* // Add a function selector based on the number of variables the neuron has */}
            <table > 
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
                                handleAddFuncs(i, j, parseInt(e.target.value));
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
      
      </ModalBody>
      <ModalFooter><Button disabled={isdisabled} onClick={addNewNeuron} id='submitbutton' variant='c5' >Add Neuron</Button></ModalFooter>
      </Modal>
      </>
  );
}

export default NewNodeForm;
