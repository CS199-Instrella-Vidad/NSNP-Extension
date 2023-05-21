export function systemStackPush(props) {
  // Add new neuron to the system
  const oldC = props.C;
  const oldF = props.F;
  const oldL = props.L;
  const oldVL = props.VL;
  const oldT = props.T;
  const oldSyn = props.syn;
  const oldEnvSyn = props.envSyn;

  const system = {
    matrices: {
      C: JSON.parse(JSON.stringify(oldC)),
      F: JSON.parse(JSON.stringify(oldF)),
      L: JSON.parse(JSON.stringify(oldL)),
      VL: JSON.parse(JSON.stringify(oldVL)),
      T: JSON.parse(JSON.stringify(oldT)),
      syn: JSON.parse(JSON.stringify(oldSyn)),
      envSyn: JSON.parse(JSON.stringify(oldEnvSyn)),
    },
    positions: { neuronPositions: props.neuronPositions },
  };

  return system;
}
