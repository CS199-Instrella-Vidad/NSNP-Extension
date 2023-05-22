export function systemStackPush(
  newC,
  newF,
  newL,
  newVL,
  newT,
  newSyn,
  newEnvSyn,
  newNeuronPositions,
  message
) {
  // Add new neuron to the system

  const system = {
    matrices: {
      C: newC,
      F: newF,
      L: newL,
      VL: newVL,
      T: newT,
      syn: newSyn,
      envSyn: newEnvSyn,
    },
    positions: { neuronPositions: newNeuronPositions },
    message,
  };

  return system;
}
