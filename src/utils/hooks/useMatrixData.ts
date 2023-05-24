import { useState } from "react";
import localStorageMatrices from "./useLocalStorage";

export function useMatrixData() {
  let storedMatrices = localStorage.getItem("Matrices");
  let storedPositions = localStorage.getItem("positions");
  let tempC = [1, 1, 2];
  let tempVL = [1, 1, 2];
  let tempF = [
    [1, 1, 0],
    [0.5, 0.5, 0],
    [0, 0, 1],
    [0, 0, 0.5],
  ];
  let tempL = [
    [1, 0],
    [1, 0],
    [0, 1],
    [0, 1],
  ];
  let tempT = [[4, 4]];
  let tempSyn = [
    [1, 2],
    [2, 1],
  ];
  let tempEnvSyn = tempVL[tempVL.length - 1];
  let tempEnvValue = [];
  let tempNeuronPositions =
    storedPositions !== null ? JSON.parse(storedPositions) : [];

  if (storedMatrices !== null) {
    let json = storedMatrices !== null ? JSON.parse(storedMatrices) : "";

    tempC = json.C;
    tempVL = json.VL;
    tempF = json.F;
    tempL = json.L;
    tempT = json.T;
    tempSyn = json.syn;
    tempEnvSyn = json.envSyn;
  }

  const [C, setC] = useState(tempC);
  const [VL, setVL] = useState(tempVL);
  const [F, setF] = useState(tempF);
  const [L, setL] = useState(tempL);
  const [T, setT] = useState(tempT);
  const [syn, setSyn] = useState(tempSyn);
  const [envValue, setEnvValue] = useState<number[]>(tempEnvValue);
  const [envSyn, setEnvSyn] = useState<number>(tempEnvSyn);
  const [neuronPositions, setNeuronPositions] = useState(tempNeuronPositions);

  const [SV, setSV] = useState<number[][]>([[]]);
  const [PM, setPM] = useState<number[][]>([[]]);

  return {
    C,
    setC,
    VL,
    setVL,
    F,

    setF,
    L,
    setL,
    T,
    setT,
    syn,
    setSyn,
    envValue,
    setEnvValue,
    envSyn,
    setEnvSyn,
    SV,
    setSV,
    PM,
    setPM,
    neuronPositions,
    setNeuronPositions,
  };
}
