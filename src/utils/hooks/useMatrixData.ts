import { useState } from "react";
import localStorageMatrices from "./useLocalStorage";
export function useMatrixData() {
  let storedMatrices = localStorage.getItem("Matrices");
  let json = storedMatrices !== null ? JSON.parse(storedMatrices) : "";

  const [C, setC] = useState(json.C);
  const [VL, setVL] = useState(json.VL);
  const [F, setF] = useState(json.F);
  const [L, setL] = useState(json.L);
  const [T, setT] = useState(json.T);
  const [syn, setSyn] = useState(json.syn);
  const [envValue, setEnvValue] = useState<number[]>([]);
  const [envSyn, setEnvSyn] = useState<number>(json.envSyn);

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
  };
}
