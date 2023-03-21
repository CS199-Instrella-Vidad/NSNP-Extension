import { useState } from "react";

export function useMatrixData() {
  const [C, setC] = useState([1, 1, 2]);
  const [VL, setVL] = useState([1, 1, 2]);
  const [F, setF] = useState([
    [1, 1, 0],
    [0.5, 0.5, 0],
    [0, 0, 1],
    [0, 0, 0.5],
  ]);
  const [L, setL] = useState([
    [1, 0],
    [1, 0],
    [0, 1],
    [0, 1],
  ]);
  const [T, setT] = useState([[4, 4]]);
  const [syn, setSyn] = useState([
    [1, 2],
    [2, 1],
  ]);
  const [envValue, setEnvValue] = useState<number[]>([]);
  const [envSyn, setEnvSyn] = useState<number>(VL[VL.length - 1]);

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
