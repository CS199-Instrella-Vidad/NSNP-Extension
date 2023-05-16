import { env } from "process";

function functionToString(F: number[], j: number, vars, threshold) {
  let string = "";
  string += "f_{" + j + "}(";
  for (let i = 0; i < vars.length; i++) {
    string += "x_" + (i + 1) + ", ";
  }
  string = string.slice(0, -2);
  string += ") = ";
  let varCounter = 1;
  for (let i = 0; i < F.length; i++) {
    if (F[i] != 0) {
      string +=
        (F[i] > 1 ? F[i] : F[i] < 1 ? F[i] : "") + "x_{" + varCounter + "} + ";
      varCounter++;
    } else {
      if (i === vars[varCounter - 1]) {
        varCounter++;
      }
    }
  }
  string = string.slice(0, -3);

  // Threshold addition

  if (threshold != 0) {
    string += "\\,|_" + threshold;
  }
  return string;
}

export function createNeuron(VL, C, F, L, i, T) {
  let vars: number[] = [];
  let indices: number[] = [];
  let neuronText = `\\displaylines{`;

  // Get the values of the variables
  let varString = "";
  let varCounter = 1;
  for (let j = 0; j < VL.length; j++) {
    if (VL[j] === i + 1) {
      varString += "x_{" + varCounter + "}[" + C[j] + "], \\;";
      vars.push(C[j]);
      indices.push(j);
      varCounter++;
    }
  }
  varString = varString.slice(0, -4);
  neuronText += varString + "\\\\\\\\";

  let functionString = "";
  // Get the functions of the neuron

  let funCounter = 1;
  for (let j = 0; j < L.length; j++) {
    if (L[j][i] === 1) {
      let threshold: number = 0;
      for (let k = 0; k < T.length; k++) {
        if (T[k][0] === j + 1) threshold = T[k][1];
      }

      functionString +=
        functionToString(F[j], funCounter, indices, threshold) + "\\\\";
      funCounter++;
    }
  }
  neuronText += functionString + "}";

  return [
    {
      data: {
        id: "Neuron " + (i + 1),
      },
      classes: "neuron",
    },
    {
      data: {
        parent: "Neuron " + (i + 1),
        id: "neuron-contents" + i,
        label: neuronText,
      },
      position: {
        x: 100 * (2.5 * (i + 1)),
        y: 100 + 100,
      },
      classes: "neuron-contents",
    },
  ];
}

export function createEnvNode(envValue, i) {
  let envText = `\\displaylines{`;

  // Copy every 10 elements in envValue to envText
  for (let j = 0; j < envValue.length; j++) {
    if (j % 10 === 0 && j != 0) {
      // Add a double backslash every 10 elements for newline in teX
      envText += "\\\\";
    }
    envText += envValue[j] + "\\;";
  }
  envText += "\\\\";
  envText += "}";
  return [
    {
      data: {
        id: "Environment",
      },
      classes: "neuron",
    },
    {
      data: {
        parent: "Environment",
        id: "Environment Contents",
        label: envText,
      },
      position: {
        x: 100 * (2.5 * (i + 1)),
        y: 100 + 100,
      },
      classes: "envi-contents",
    },
  ];
}
