import { useState } from "react";

export function useSystemHistory(matrixProps) {
  let matrices = {
    C: matrixProps.C,
    VL: matrixProps.VL,
    F: matrixProps.F,
    L: matrixProps.L,
    T: matrixProps.T,
    syn: matrixProps.syn,
    envSyn: matrixProps.envSyn,
  };
  let positions = { neuronPositions: matrixProps.neuronPositions };
  const [systemStack, setSystemStack] = useState([matrices]);
  const [positionStack, setPositionStack] = useState([positions]);
  const [systemStackMessage, setSystemStackMessage] = useState([]);
  const [systemStackPointer, setSystemStackPointer] = useState(0);

  function pushSystem(system) {
    // Remove all elements after the current pointer
    setSystemStack([
      ...systemStack.slice(0, systemStackPointer),
      system.matrices,
    ]);
    setPositionStack([
      ...positionStack.slice(0, systemStackPointer),
      system.positions,
    ]);
    setSystemStackMessage([
      ...systemStackMessage.slice(0, systemStackPointer),
      system.message,
    ]);
    setSystemStackPointer(systemStack.length - 1);
    console.log(systemStackPointer);
    console.log(systemStack);
  }

  function undoSystemChange() {
    if (systemStackPointer > 0) {
      setSystemStackPointer(systemStackPointer - 1);
    }
  }

  function redoSystemChange() {
    if (systemStackPointer < systemStack.length - 1) {
      setSystemStackPointer(systemStackPointer + 1);
    }
  }

  return {
    systemStack,
    positionStack,
    systemStackMessage,
    systemStackPointer,
    pushSystem,
    undoSystemChange,
    redoSystemChange,
  };
}
